import { NextFunction, Request, Response } from "express";
import { IUserAuth } from "../interface/service-interfaces";
import { HttpStatusCode } from "../constants/enum";

export class UserController {
    private userService: IUserAuth
    constructor(userService: IUserAuth) {
        this.userService = userService;
    }

    async signUp(req: Request, res: Response, next: NextFunction){
        try {
            const { name, email, password } = req.body;
            console.log(req.body)
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
    async logout(req: Request, res: Response, next: NextFunction) {
        return res.status(HttpStatusCode.OK).json()
    }
}