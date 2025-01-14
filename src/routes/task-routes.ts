import express from "express";
import { TaskController } from "../controller/task-controller";
import { authMiddleWare, taskService } from "./user-auth-routes";
import { validationMiddleWare } from "../middleware/validation-middleware";
import { resourceSchema, taskSchema, taskStatusSchema } from "../utils/validation";

const taskController = new TaskController(taskService);
const taskRoutes = express.Router();

taskRoutes
    .route('/')
    .get(authMiddleWare.isAuth.bind(authMiddleWare), taskController.getUserTask.bind(taskController)) // get user specific tasks
taskRoutes
    .route('/:taskId')
    .put(authMiddleWare.isAuth.bind(authMiddleWare), validationMiddleWare(taskStatusSchema), taskController.changeTaskStatus.bind(taskController))
    .delete(authMiddleWare.isAuth.bind(authMiddleWare), authMiddleWare.isOwner('task'), taskController.deleteTask.bind(taskController))
taskRoutes
    .route('/project/:projectId')
    .post(authMiddleWare.isAuth.bind(authMiddleWare), authMiddleWare.isOwner('project'), validationMiddleWare(resourceSchema), taskController.createTask.bind(taskController))

export { taskRoutes }