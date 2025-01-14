import { NextFunction, Request, Response } from "express";
import { IProjectService, ITaskService } from "../interface/service-interfaces";
import { HttpStatusCode } from "../constants/enum";
import { CustomError } from "../utils/custom-error";
import { validateuId } from "../utils/helper";

export class ProjectController {
    private projectService: IProjectService
    // private taskService: ITaskService

    constructor(projectService: IProjectService, taskService?: ITaskService) {
        this.projectService = projectService
        // this.taskService = taskService
    };

    //create a project
    async createProject(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = validateuId(req.params.userId)
            const { name, description } = req.body;
            const response = await this.projectService.createProject({ description, name, userId });
            return res.status(HttpStatusCode.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    };

    //get a single project
    async getProject(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = validateuId(req.params.userId)
            const projectId = validateuId(req.params.projectId)
            if (!projectId) {
                throw new CustomError('bad request', HttpStatusCode.BAD_REQUEST, 'projectId')
            }
            const response = await this.projectService.getProject({ userId, uId: projectId });
            return res.json(HttpStatusCode.OK).json(response)

        } catch (error) {
            next(error)
        }
    };
    //get all project for single user
    async getAllProject(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = validateuId(req.params.userId)
            const response = await this.projectService.getAllProject(userId);
            return res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            next(error)
        }
    }
    //delete a project
    async deleteProject(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = validateuId(req.params.userId)
            const projectId = validateuId(req.params.projectId)
            const response = await this.projectService.deleteProject({ userId, uId: projectId });
            return res.status(HttpStatusCode.OK).json(response)

        } catch (error) {
            next(error)
        }
    };
    
    //update a single project
    async updateProject(req: Request, res: Response, next: NextFunction) {
        try {

            const { description, name } = req.body
            const projectId = validateuId(req.params.projectId)
            const userId = validateuId(req.params.userId)

            const response = await this.projectService.updateProject({ description, name, uId: projectId, userId });
            return res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            next(error)
        }
    };

    //adding multiple user to a project
    async addUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { contributersId } = req.body;

            if (!Array.isArray(contributersId) || !contributersId.every((id) => typeof id === 'number')) {
                throw new CustomError('bad request', HttpStatusCode.BAD_REQUEST, 'userlist')
            }

            const projectId = validateuId(req.params.projectId)
            const userId = validateuId(req.params.userId)


            const response = await this.projectService.addUser({ contributersId, ownerId: userId, projectId });
            return res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            throw error
        }
    }

    //removing user from project
    async removeUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { contributerId } = req.body;
            const projectId = validateuId(req.params.projectId)
            const userId = validateuId(req.params.userId)
            const response = await this.projectService.removeUser({ contributerId, ownerId: userId, projectId });
            return res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            throw error
        }
    }

} 