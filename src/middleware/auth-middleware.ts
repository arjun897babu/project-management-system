import { NextFunction, Request, Response } from "express";
import { IJWT, IProjectService, ITaskService } from "../interface/service-interfaces";
import { CustomError } from "../utils/custom-error";
import { HttpStatusCode } from "../constants/enum";
import { JwtPayload } from "jsonwebtoken";
import { validateuId } from "../utils/helper";

export class AuthMiddleWare {
    private jwtService: IJWT;
    private taskService: ITaskService;
    private projectService: IProjectService;
    constructor(jwtService: IJWT, taskService: ITaskService, projectService: IProjectService) {
        this.jwtService = jwtService
        this.projectService = projectService
        this.taskService = taskService
    }

    async isAuth(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('authentication middle ware is called')
            const token = this.extractToken(req);
            const decoded = this.verifyAndDecode(token);
            req.params.userId = decoded.uId;
            return next();

        } catch (error) {
            next(error)
        }
    }

    private extractToken(req: Request): string {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (token) {
                return token
            }
            throw new CustomError('unauthorized:Token not found', HttpStatusCode.UNAUTHORIZED, 'token')
        } catch (error) {
            throw error
        }
    }

    private verifyAndDecode(token: string): JwtPayload {
        try {
            const decoded = this.jwtService.verifyAccessToken(token) as JwtPayload;
            if (decoded && decoded.role === 'user') {
                return decoded
            }
            throw new CustomError('forebidden: invalid token ', HttpStatusCode.FORBIDDEN, 'token')
        } catch (error) {
            throw error
        }
    }

    isOwner(resource: 'project' | 'task') {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const userId = validateuId(req.params.userId);
                const projectId = validateuId(req.params.projectId);
                const taskIdId = validateuId(req.params.taskId);

                let resourceData: any
                if (resource === 'project') {
                    if (!projectId) {
                        throw new CustomError('invalid project id', HttpStatusCode.BAD_REQUEST, 'projectId')
                    }
                    resourceData = await this.projectService.getProject({ userId: userId, uId: projectId });
                } else if (resource === 'task') {
                    if (!taskIdId) {
                        throw new CustomError('invalid project id', HttpStatusCode.BAD_REQUEST, 'projectId')
                    }
                    resourceData = await this.taskService.getTask(taskIdId);
                }

                if (!resourceData) {
                    throw new CustomError(
                        `${resource} not found`,
                        HttpStatusCode.NOT_FOUND,
                        resource
                    );
                };

                const resourceUserId = resource === 'project'
                    ? resourceData.data?.project?.userId
                    : resourceData.data?.task?.userId;

                if (resourceUserId !== userId) {
                    throw new CustomError(
                        'forbidden: only project owner have the permission',
                        HttpStatusCode.FORBIDDEN,
                        resource
                    );
                }

                return next();
            } catch (error) {
                next(error)
            }
        }
    }

}