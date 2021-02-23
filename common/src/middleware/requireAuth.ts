import { Request, Response, NextFunction } from "express";
import { UserDbProps } from "../db/models/User";

declare global {
  namespace Express {
    interface Request {
      // @ts-ignore
      user: any;
      currentUser?: UserDbProps;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(401);
    next("You are not authorized for this action");
  } else {
    req.currentUser = req.user;
    next();
  }
};
