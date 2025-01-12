import { NextFunction, Request, Response } from "express";
import { IJWT } from "../interface/service-interfaces";
import { CustomError } from "../utils/custom-error";
import { HttpStatusCode } from "../constants/enum";
import {JwtPayload } from "jsonwebtoken";

export class AuthMiddleWare {
    private jwtService: IJWT
    constructor(jwtService: IJWT) {
        this.jwtService = jwtService
    }

    isAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = this.extractToken(req);
            const decoded = this.verifyAndDecode(token);
            req.params.userId = decoded._id;
            return next();

        } catch (error) {
            next(error)
        }
    }

    extractToken(req: Request): string {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (token) {
                return token
            }
            throw new CustomError('unauthorized', HttpStatusCode.UNAUTHORIZED, 'token')
        } catch (error) {
            throw error
        }
    }

    verifyAndDecode(token: string): JwtPayload {
        try {
            const decoded = this.jwtService.verifyAccessToken(token) as JwtPayload;
            if (decoded && decoded.role === 'user') {
                return decoded
            }
            throw new CustomError('forebidden', HttpStatusCode.FORBIDDEN, 'token')
        } catch (error) {
            throw error
        }
    }
}