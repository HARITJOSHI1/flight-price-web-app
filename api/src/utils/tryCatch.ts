import { Request, Response, NextFunction } from "express";
import { ExpressAsyncFn } from "../types/ExpressAsyncFn";
import ExternalErrorHandler from "../Errors/ExternalError";
import { ApiError } from "../Errors/ApiError";

// Special function to be a centeral entry point to catch errors from the callback functions
export default function tryCatch(fun: ExpressAsyncFn) {
  return (req: Request, res: Response, next: NextFunction) => {
    fun(req, res, next).catch((err: Error) => {
      if (err instanceof ExternalErrorHandler)
        return res
          .status(err.statusCode || 500)
          .json({ error: err.message });
          
      else if (err instanceof ApiError)
        return res.status(err.statusCode).json({ error: err.message });

      next(err);
    });
  };
}
