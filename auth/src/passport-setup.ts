import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { createUser, getUserByGoogleId, getUserById } from "./db/util";
import { logger } from "./logger";
import { User } from "./types/User";

logger.info("secret key", process.env);
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
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
  let err = null;
  let user: User | undefined;

  try {
    user = await getUserById(id);
  } catch (e) {
    err = e;
  }

  done(err, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID.trim(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET.trim(),
      callbackURL: "http://alt-poll.dev/auth/callback", // TODO: PUT IN CONFIG MAP
    },

    async function (accessToken, refreshToken, profile, done) {
      const name = profile.name?.givenName ?? profile.displayName;
      const googleId = profile.id;

      let err = null;

      let existingUser = null;
      try {
        existingUser = await getUserByGoogleId(googleId);
        logger.info("existing user found: " + JSON.stringify(existingUser));
      } catch (e) {
        err = e;
      }

      let createdUser = null;
      if (!err && !existingUser) {
        try {
          createdUser = await createUser(name, googleId);
        } catch (e) {
          err = e;
        }
      }

      done(err, existingUser ?? createdUser);
    }
  )
);
