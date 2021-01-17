import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { query } from "./db";
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
  console.log("serialise user", user);
  done(null, (user as User[])?.[0].id);
});

passport.deserializeUser(async (id: string, done) => {
  const lookupUser = `
        SELECT * FROM "Users"
        WHERE id = $1
        LIMIT 1
      `;
  let err = null;
  let user: User | undefined;
  try {
    user = (await query(lookupUser, [id]))?.[0];
  } catch (e) {
    err = e;
  }
  console.log("deserialize", user);

  done(err, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID.trim(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET.trim(),
      callbackURL: "http://alt-poll.dev/auth/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      const name = profile.name?.givenName ?? profile.displayName;
      const googleId = profile.id;

      let err = null;
      let user = null;
      const lookupUser = `
        SELECT * FROM "Users"
        WHERE google_id = $1
        LIMIT 1
      `;
      try {
        user = await query(lookupUser, [googleId]);
        logger.info("existing user: " + JSON.stringify(user));
      } catch (e) {
        err = e;
        logger.error(e);
      }

      if ((user ?? []).length == 0) {
        const insertUser = `
        INSERT INTO "Users"(name, google_id)
        VALUES($1, $2)
        `;
        try {
          await query(insertUser, [name, googleId]);
          user = await query(lookupUser, [googleId]);
          logger.info("created user " + JSON.stringify(user));
        } catch (e) {
          err = e;
          logger.error(e);
        }
      }
      console.log("found user", user);
      logger.info(user);

      done(err, user);
    }
  )
);
