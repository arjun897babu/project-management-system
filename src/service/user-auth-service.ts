import { Model } from "sequelize";
import { HttpStatusCode, ResponseStatus } from "../constants/enum";
import { ISignUpPayload, ILoginPayload } from "../interface/payload-interface";
import { ILoginResponse, IResponse } from "../interface/response-interface";
import { IBcrypt, IJWT, IUserAuth } from "../interface/service-interfaces";
import User from "../model/user-model";
import Users from "../model/user-model";
import { CustomError } from "../utils/custom-error";
import { IUser } from "../interface/model-interface";

export class UserAuth implements IUserAuth {
    jwt: IJWT
    bcrypt: IBcrypt
    constructor(jwt: IJWT, bcrypt: IBcrypt) {
        this.bcrypt = bcrypt
        this.jwt = jwt
    }

    async login(payload: ILoginPayload): Promise<ILoginResponse> {
        try {

            const user = await User.findOne({
                where: {
                    email: payload.email
                },
                attributes: ['uId', 'password']
            });

            if (!user) {
                throw new CustomError('account not found', HttpStatusCode.NOT_FOUND, 'email')
            }

            const isPassword = await this.bcrypt.compare(payload.password, user.getDataValue('password'));

            if (!isPassword) {
                throw new CustomError('invalid password', HttpStatusCode.BAD_REQUEST, 'password')
            }

            const token = this.jwt.generateAccessToken({ uId: user.getDataValue('uId'), role: 'user' })

            return {
                status: ResponseStatus.SUCCESS,
                message: "logged successfully",
                data: {
                    token
                }
            }
        } catch (error) {
            throw error
        }
    }
    async signUp(payload: ISignUpPayload): Promise<IResponse> {


        try {
            const hashedPassword = await this.bcrypt.hash(payload.password);

            await Users.create({
                email: payload.email,
                password: hashedPassword,
                name: payload.name
            });

            return {
                status: ResponseStatus.SUCCESS,
                message: 'account created successfully'
            }

        } catch (error) {
            throw error
        }
    }
}