import { Request, Response, NextFunction } from "express";
import { QueryParams } from "./QueryParams";

// Type for async functions cb's which express calls based on receving the request
export type ExpressAsyncFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
