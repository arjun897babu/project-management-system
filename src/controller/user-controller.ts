import { NextFunction, Request, Response } from "express";
import { IUserService } from "../interface/service-interfaces";
import { HttpStatusCode, ResponseStatus } from "../constants/enum";
import { validateuId } from "../utils/helper";

export class UserController {
    private userService: IUserService
    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;
            const response = await this.userService.signUp({ name, email, password })
            return res.status(HttpStatusCode.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const response = await this.userService.login({ email, password })
            return res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            next(error)
        }
    }
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = validateuId(req.params.userId)

            const response = await this.userService.getUser(userId)
            return res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.userService.getAllUsers()
            return res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            next(error)
        }
    };

    async logout(req: Request, res: Response, next: NextFunction) {
        try {

            return res.status(HttpStatusCode.OK).json({
                status: ResponseStatus.SUCCESS,
                message: 'logged out successfully'
            })
        } catch (error) {
            next(error)
        }
    }
}