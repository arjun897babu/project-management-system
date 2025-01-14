import { HttpStatusCode, ResponseStatus } from "../constants/enum";
import { ISignUpPayload, ILoginPayload } from "../interface/payload-interface";
import { IGetUserResponse, ILoginResponse, IResponse } from "../interface/response-interface";
import { IBcrypt, IJWT, IUserService } from "../interface/service-interfaces";
import User from "../model/user-model";
import Users from "../model/user-model";
import { CustomError } from "../utils/custom-error";

export class UserAuth implements IUserService {

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

    async getUser(userId: number): Promise<IGetUserResponse> {
        try {
            const user = await User.findByPk(userId, { attributes: ['email', 'uId', 'name'] });
            if (!user) {
                throw new CustomError('user not found', HttpStatusCode.BAD_REQUEST, 'email')
            }
            return {
                status: ResponseStatus.SUCCESS,
                message: 'data fetched successfully',
                data: {
                    user: user.dataValues
                }
            }
        } catch (error) {
            throw error
        }
    }
    async getAllUsers(): Promise<IGetUserResponse> {
        const users = await Users.findAll({ attributes: ['email', 'uId', 'name'] });
        return {
            status: ResponseStatus.SUCCESS,
            message: 'user data fetched successfully',
            data: {
                user: users.map((user) => user.dataValues)
            }
        }
    }
}