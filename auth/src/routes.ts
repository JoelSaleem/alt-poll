import { Express } from "express";
import passport from "passport";
import { execute } from "./db";
import { logger } from "./logger";

export const initRoutes = (app: Express) => {
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
    passport.authenticate("google", { failureRedirect: "/failed" }),
    (req, res) => {
      console.log("success");
      res.redirect("/");
    }
  );

  app.post("/logout", (req, res) => {
    req.session = null;
    req.logOut();
    res.redirect("/");
  });

  app.get("/failed", (req, res) => {
    res.send("failed");
  });

  app.listen(3000, () => {
    logger.info("listenning on port 3000");
  });
};
