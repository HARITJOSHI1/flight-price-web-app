import { Request, Response, Handler, ErrorRequestHandler } from "express";

const devRes = <T>(err: T, res: Response) => {
    console.log('🛑Error occured in dev:', err);

    // If err is of type Error
    if(err instanceof Error) res.status(500).json({error: err.message});
    else res.status(500).json(err);
}

const prodRes = <T>(err: T, res: Response) => {
    if(err instanceof Error) res.status(500).json({error: err.message});
    else res.status(500).json({error: 'Something went wrong'});
}

export default function ErrorHandler<T>(err: T, req: Request, res: Response) {
    if(process.env.NODE_ENV === 'development') devRes(err, res);
    else prodRes(err, res);
}
