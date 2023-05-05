import { Request, Response, Handler, ErrorRequestHandler } from "express";

const devRes = <T>(err: T, res: Response) => {
    console.log(err);
}

const prodRes = <T>(err: T, res: Response) => {
    console.log(err);
}

export default function ErrorHandler<T>(err: T, req: Request, res: Response) {
    if(process.env.NODE_ENV === 'development') devRes(err, res);
    else prodRes(err, res);
}
