import express from "express";
import { JWT } from "../service/jwt-service";
import { UserAuth } from "../service/user-auth-service";
import { Bcrypt } from "../service/bcrypt-service";
import { UserController } from "../controller/user-controller";

export const jwtService = new JWT()
export const bcrypt = new Bcrypt()
const userAuthService = new UserAuth(jwtService, bcrypt);
const userAuthController = new UserController(userAuthService);

const userAuthRoutes = express.Router()

userAuthRoutes.post('/login', userAuthController.login.bind(userAuthController));
userAuthRoutes.post('/signup', userAuthController.signUp.bind(userAuthController));
userAuthRoutes.post('/logout', userAuthController.logout.bind(userAuthController));

export { userAuthRoutes }