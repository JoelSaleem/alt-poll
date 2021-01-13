import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("No Google Client Id found");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("No Google Client secret found");
}

passport.serializeUser((user, done) => {
  console.log("serialize user", user);
  //   console.log("serialize user", user.id);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log("deserialize user", id);
  done(null, { id });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID.trim(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET.trim(),
      callbackURL: "http://alt-poll.dev/auth/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
      done(null);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return done(err, user);
      //   });
    }
  )
);
