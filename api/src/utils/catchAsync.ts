import { Request, Response, NextFunction } from "express";
import { ExpressAsyncFn } from "../types/ExpressAsyncFn";
import ExternalErrorHandler from "../Errors/ExternalErrorHandler";

// Special function to be a centeral entry point to catch errors from the callback functions
export default function catchAsync(fun: ExpressAsyncFn) {
  return (req: Request, res: Response, next: NextFunction) => {
    fun(req, res, next).catch((err: Error) => {
      if (err instanceof ExternalErrorHandler)
        return res
          .status(err.data.statusCode || 404)
          .json({ error: err.message });
          
      next(err);
    });
  };
}
