import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { logger } from "./logger";
import { User, UserDbProps } from "./models/User";
import { userProducer } from "./messaging/userProducer";
import { UserEvents } from "@js-alt-poll/common";
// logger.debug("secret key  " + JSON.stringify(process.env, null, 4));
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("No Google Client Id found");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("No Google Client secret found");
}

if (!process.env.JWT_SECRET) {
  throw new Error("No jwt secret found");
}

passport.serializeUser((user, done) => {
  done(null, (user as UserDbProps).id);
});

passport.deserializeUser(async (id: string, done) => {
  let err = null;
  let user: User | undefined;

  try {
    user = await User.getUserById(id);
  } catch (e) {
    err = e;
  }

  if (!user && !err) {
    err = `No user found for id: ${id}`;
  }

  done(err, user?.serialise());
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID.trim(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET.trim(),
      callbackURL: "/auth/callback", // TODO: PUT IN CONFIG MAP
    },

    async function (accessToken, refreshToken, profile, done) {
      const name = profile.name?.givenName ?? profile.displayName;
      const googleId = profile.id;

      let err = null;

      let existingUser: UserDbProps | undefined;
      try {
        existingUser = (await User.getUserByGoogleId(googleId))?.serialise();
        logger.info("existing user found: " + JSON.stringify(existingUser));
      } catch (e) {
        err = e;
      }

      let createdUser: UserDbProps | undefined;
      if (!err && !existingUser) {
        try {
          createdUser = (await User.createUser(name, googleId))?.serialise();

          logger.info("publish: " + JSON.stringify(createdUser, null, 4));
          userProducer.publish(
            UserEvents.USER_CREATED,
            JSON.stringify(createdUser)
          );
        } catch (e) {
          err = e;
        }
      }

      if (!err && !(existingUser ?? createdUser)) {
        err = "Could not find user for session";
      }

      done(err, existingUser ?? createdUser);
    }
  )
);
