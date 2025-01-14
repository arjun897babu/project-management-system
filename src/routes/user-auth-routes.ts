import express from "express";
import { JWT } from "../service/jwt-service";
import { UserAuth } from "../service/user-service";
import { Bcrypt } from "../service/bcrypt-service";
import { UserController } from "../controller/user-controller";
import { AuthMiddleWare } from "../middleware/auth-middleware";
import { ProjectService } from "../service/project-service";
import { TaskService } from "../service/task-service";

export const jwtService = new JWT()
export const bcrypt = new Bcrypt()
export const projectService = new ProjectService()
export const taskService  = new TaskService()
export const authMiddleWare = new AuthMiddleWare(jwtService, taskService, projectService);

const userAuthService = new UserAuth(jwtService, bcrypt);
const userAuthController = new UserController(userAuthService);

const userAuthRoutes = express.Router()

userAuthRoutes.post('/login', userAuthController.login.bind(userAuthController));
userAuthRoutes.post('/signup', userAuthController.signUp.bind(userAuthController));
userAuthRoutes.post('/logout',authMiddleWare.isAuth.bind(authMiddleWare), userAuthController.logout.bind(userAuthController));
userAuthRoutes.get('/', authMiddleWare.isAuth.bind(authMiddleWare), userAuthController.getUser.bind(userAuthController));
userAuthRoutes.get('/all', authMiddleWare.isAuth.bind(authMiddleWare), userAuthController.getAllUsers.bind(userAuthController));

export { userAuthRoutes }