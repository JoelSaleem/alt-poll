import { Express } from "express";

export const initVoteRoutes = (app: Express) => {
  app.get("/votes", (req, res) => {
    res.send("init vote routes");
  });
};
