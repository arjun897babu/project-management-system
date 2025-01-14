import express from "express";
import { TaskController } from "../controller/task-controller";
import { authMiddleWare, taskService } from "./user-auth-routes";

const taskController = new TaskController(taskService);
const taskRoutes = express.Router();

taskRoutes
    .route('/')
    .get(authMiddleWare.isAuth.bind(authMiddleWare), taskController.getUserTask.bind(taskController)) // get user specific tasks
taskRoutes
    .route('/:taskId')
    .put(authMiddleWare.isAuth.bind(authMiddleWare), taskController.changeTaskStatus.bind(taskController))
    .delete(authMiddleWare.isAuth.bind(authMiddleWare), authMiddleWare.isOwner('task'), taskController.getUserTask.bind(taskController))
taskRoutes
    .route('/:projectId')
    .post(authMiddleWare.isAuth.bind(authMiddleWare), authMiddleWare.isOwner('project'), taskController.createTask.bind(taskController))

export { taskRoutes }