import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { ErrorObj } from "../constants/types";
import { CustomError } from "../utils/custom-error";
import { HttpStatusCode } from "../constants/enum";

export const validationMiddleWare = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                let err: ErrorObj = {};
                for (let eItem of error.errors) {
                    if (!err[eItem.path[0]]) {
                        err[eItem.path[0]] = eItem.message;
                    }
                }
                throw new CustomError(
                    "bad request:please provide valid details",
                    HttpStatusCode.BAD_REQUEST,
                    undefined,
                    err
                );
            }
            return next(error);
        }
    };
};