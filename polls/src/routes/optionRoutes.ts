import { Express } from "express";

export const initOptionRoutes = (app: Express) => {
  app.get("/polls/:pollId/options", (req, res) => {});

  app.get("/polls/:pollId/options/:optionId", (req, res) => {});
};
