import passport from "passport";
import { UserDbProps } from "@js-alt-poll/common";
import { User } from "./db/models/User";

passport.serializeUser((user, done) => {
  console.log("serialise", user);
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
