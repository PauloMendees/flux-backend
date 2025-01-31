import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Requesting to: ${req.url}, method: ${req.method}`);

  next();
}
