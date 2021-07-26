import { requireAuth } from "@js-alt-poll/common";
import { Express } from "express";
import passport from "passport";

export const initAuthRoutes = (app: Express) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"],
    }),
    (req, res) => {
      res.send({});
    }
  );

  app.get(
    "/auth/callback",
    passport.authenticate("google", { failureRedirect: "/auth/failed" }),
    (req, res) => {
      // res.redirect("http://localhost:3000/");
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

  app.get("/auth/current_user", requireAuth, (req, res) => {
    res.send(req.currentUser);
  });
};
