import { Express } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

export const googleAuth = (app: Express) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"],
    }),
    (req, res) => {
      console.log("success");
      res.send({});
    }
  );

  app.get(
    "/auth/callback",
    passport.authenticate("google", { failureRedirect: "/auth/failed" }),
    (req, res) => {
      console.log("success");
      res.redirect("/");
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.session = null;
    req.logOut();
    res.redirect("/");
  });

  app.get("/auth/failed", (req, res) => {
    res.send("failed");
  });
};
