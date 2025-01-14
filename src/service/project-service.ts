import { Sequelize } from "sequelize";
import { HttpStatusCode, ResponseStatus } from "../constants/enum";
import { IAddUserPayload, IProjectCreatePayload, IProjectRUD, IRemoveUserPayload, IUpdateProjectPayload } from "../interface/payload-interface";
import { IGetProjectResponse, IResponse } from "../interface/response-interface";
import { IProjectService } from "../interface/service-interfaces";
import Project from "../model/project-model";
import User from "../model/user-model";
import { CustomError } from "../utils/custom-error";

export class ProjectService implements IProjectService {

    async createProject(payload: IProjectCreatePayload): Promise<IGetProjectResponse> {
        try {
            const project = await Project.create(payload);
            const user = await User.findByPk(payload.userId) as any
            if (user) {
                user.addProject(project)
            }
            return {
                status: ResponseStatus.SUCCESS,
                message: 'project fetched successfully',
                data: {
                    project: project.dataValues
                }
            }
        } catch (error) {
            throw error
        }
    }

    //To get a specific project 
    async getProject(payload: IProjectRUD): Promise<IGetProjectResponse> {
        try {
            const project = await Project.findOne({
                where: {
                    uId: payload.uId,
                },
            });

            if (!project) {
                throw new CustomError('project not found', HttpStatusCode.BAD_REQUEST, 'project')
            }

            return {
                status: ResponseStatus.SUCCESS,
                message: 'project fetched successfully',
                data: {
                    project: project.dataValues
                }
            }

        } catch (error) {
            throw error
        }
    }

    //get a project for specifc user
    async getAllProject(userId: number): Promise<IGetProjectResponse> {
        try {
            const projects = await Project.findAll({
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['password'] },  
                        through: { attributes: [] }
                    }
                ],
                attributes: { exclude: ['userId'] } 
                
                
            });

            return {
                status: ResponseStatus.SUCCESS,
                message: 'projects fetched successfully',
                data: {
                    project: projects.map((project) => project.dataValues)
                }
            }
        } catch (error) {
            throw error
        }
    }

    //update a specific project
    async updateProject(payload: IUpdateProjectPayload): Promise<IResponse> {
        try {
            const [updated] = await Project.update(
                { name: payload.name, description: payload.description },
                { where: { uId: payload.uId } }
            );

            console.log('updated project:', updated)

            if (updated === 0) {
                throw new CustomError(
                    'Failed to update the project',
                    HttpStatusCode.INTERNAL_SERVER_ERROR,
                    'project'
                );
            }

            return {
                status: ResponseStatus.SUCCESS,
                message: 'project updated successfully'
            };

        } catch (error) {
            throw error
        }
    }

    //delete a specifc project
    async deleteProject(payload: IProjectRUD): Promise<IResponse> {
        try {
            const deleted = await Project.destroy({
                where: {
                    uId: payload.uId,
                    userId: payload.userId
                }
            });

            if (deleted === 0) {
                throw new CustomError('no project found', HttpStatusCode.BAD_REQUEST, 'project')
            }

            return {
                status: ResponseStatus.SUCCESS,
                message: 'project deleted successfully'
            }

        } catch (error) {
            throw error
        }
    }

    // Add users to a project.
    async addUser(payload: IAddUserPayload): Promise<IResponse> {
        try {
            const [users, project] = await Promise.all([
                User.findAll({ where: { uId: payload.contributersId } }),
                Project.findByPk(payload.projectId) as any
            ]);

            if (!project) {
                throw new CustomError('Project not found', 404, 'project');
            }

            if (users.length !== payload.contributersId.length) {
                throw new CustomError('Some users were not found.', HttpStatusCode.NOT_FOUND, 'user');
            }
            await project.addUsers(users);
            return {
                status: ResponseStatus.SUCCESS,
                message: 'user added successfully'
            }
        } catch (error) {
            throw error
        }
    }

    // Remove users from a project.
    async removeUser(payload: IRemoveUserPayload): Promise<IResponse> {

        try {
            return {
                status: ResponseStatus.SUCCESS,
                message: 'removed user from project successfully'
            }
        } catch (error) {
            throw error
        }
    }
}