import { Request, Response, NextFunction } from "express";
import { ExpressAsyncFn } from "../types/ExpressAsyncFn";
import ExternalErrorHandler from "../Errors/ExternalError";
import { ApiError } from "../Errors/ApiError";
import { AxiosError } from "axios";

// Special function to be a centeral entry point to catch errors from the callback functions
export default function tryCatch(fun: ExpressAsyncFn) {
  return (req: Request, res: Response, next: NextFunction) => {
    fun(req, res, next).catch((err: Error) => {
      if (err instanceof ExternalErrorHandler)
        return res.status(err.statusCode || 500).json({ error: err.message });
      else if (err instanceof ApiError)
        return res.status(err.statusCode).json({ error: err.message });
      else if (err instanceof AxiosError)
        return res.status(err.response?.status!).json({error: err.response?.data});

      next(err);
    });
  };
}
