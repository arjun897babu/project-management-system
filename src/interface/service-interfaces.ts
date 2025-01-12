import { JwtPayload } from "jsonwebtoken";
import { ILoginResponse, IResponse } from "./response-interface";
import { ISignUpPayload, ILoginPayload } from "./payload-interface";

export interface IJWT {
    generateAccessToken(payload: JwtPayload): string;
    verifyAccessToken(token: string): JwtPayload | string;
}

export interface IBcrypt {
    hash(plainTextPassword: string): Promise<string>;
    compare(reqPassword: string, hashedPassword: string): Promise<boolean>
}
export interface IUserAuth {
    login(payload: ILoginPayload): Promise<ILoginResponse>
    signUp(payload: ISignUpPayload): Promise<IResponse>
}