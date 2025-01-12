import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";
import { HttpStatusCode, ResponseStatus } from "../constants/enum";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if (error instanceof CustomError) {
        return res.status(error.statusCode).json(generateErrorResponse(error))
    } else {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
            {
                status: ResponseStatus.ERROR,
                message: error.message
            }
        )
    }

}

export const wildCardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return res.status(HttpStatusCode.NOT_FOUND).json({
        status: ResponseStatus.ERROR,
        message: 'requested url is not found'
    })
}


function generateErrorResponse(err: CustomError) {
    const error = err.field ? { [err.field]: err.message } : err.err;
    return {
        status: ResponseStatus.ERROR,
        message: err.message,
        error
    }
}