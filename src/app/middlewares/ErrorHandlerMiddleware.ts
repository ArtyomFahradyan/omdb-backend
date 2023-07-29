import { NextFunction, Request, Response } from "express";
import { ServiceUnavailable } from "app/errors";
import { BAD_REQUEST_CODE } from "app/constatnts";

class ErrorHandlerMiddleware {
    static async handler(
        err: Error & { status: number; errors: any },
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (!err.status) {
            next(new ServiceUnavailable(err.message));
        }

        let status = err.status || BAD_REQUEST_CODE;

        return res.status(status).json({
            status: status,
            data: null,
            message: err.message || "",
            errors: err.errors || null,
            body: req.body,
        });
    }
}

export default ErrorHandlerMiddleware;
