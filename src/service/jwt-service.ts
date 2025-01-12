import { JwtPayload, sign, verify, TokenExpiredError } from "jsonwebtoken"
import { CustomError } from "../utils/custom-error";
import { HttpStatusCode } from "../constants/enum";
import { IJWT } from "../interface/service-interfaces";

export class JWT implements IJWT {
    private jwtSecret: string = process.env.JWT_SECRET!
    private jwtExpire: string = process.env.JWT_EXPIRE!

    generateAccessToken(payload: JwtPayload,) {
        try {
            return sign(payload, this.jwtSecret, { expiresIn: this.jwtExpire });
        } catch (error) {
            throw new CustomError(
                "Failed to generate token",
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                "token"
            );
        }
    }
    verifyAccessToken(token: string) {
        try {
            return verify(token, this.jwtSecret);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new CustomError(error.message, HttpStatusCode.UNAUTHORIZED, 'token')
            } else {
                throw new CustomError('invalid token', HttpStatusCode.FORBIDDEN, 'token')
            }
        }
    }

}