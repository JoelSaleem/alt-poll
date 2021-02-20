import e, { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      // @ts-ignore
      user: any;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(401)
    next("You are not authorized for this action");
  } else {
    next();
  }
};
