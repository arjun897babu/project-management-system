import { NextFunction, Request,Response } from "express";
import { ITaskService } from "../interface/service-interfaces";
import { validateuId } from "../utils/helper";
import { HttpStatusCode } from "../constants/enum";

export class TaskController {
    private taskService: ITaskService
    constructor(taskService: ITaskService) {
        this.taskService = taskService
    }

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = validateuId(req.params.userId)
            const projectId = validateuId(req.params.projectId)
            const { name, description } = req.body
            const response = await this.taskService.createTask({ description, name, projectId, userId })
            return res.status(HttpStatusCode.CREATED).json(response)
        } catch (error) {
            next(error)
        }

    };

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = validateuId(req.params.taskId)
            const response = await this.taskService.deleteTask(taskId)
            return res.status(HttpStatusCode.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getUserTask(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = validateuId(req.params.userId)
            const response = await this.taskService.getTaskByUser(userId)
            return res.status(HttpStatusCode.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }

    async changeTaskStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = validateuId(req.params.taskId)
            const userId = validateuId(req.params.userId)
            const { status } = req.body
            const response = await this.taskService.changeStatus({ status, taskId, userId })
            return res.status(HttpStatusCode.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }
}