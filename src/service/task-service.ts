import { IChangeStatusPayload, ICreateTaskPayload } from "../interface/payload-interface";
import { IResponse, ITaskResponse } from "../interface/response-interface";
import { ITaskService } from "../interface/service-interfaces";
import { HttpStatusCode, ResponseStatus, TaskStatus } from "../constants/enum";
import Task from "../model/task-model";
import { CustomError } from "../utils/custom-error";

export class TaskService implements ITaskService {
    async createTask(payload: ICreateTaskPayload): Promise<IResponse> {
        try {
            const task = await Task.create(payload);
            return {
                status: ResponseStatus.SUCCESS,
                message: 'task created successfully',
            }
        } catch (error) {
            throw error
        }
    }

    async getTask(taskId: number): Promise<ITaskResponse> {
        try {
            const task = await Task.findOne({ where: { uId: taskId } });
            if (!task) {
                throw new CustomError('Task not found', HttpStatusCode.NOT_FOUND, 'task')
            }
            return {
                status: ResponseStatus.SUCCESS,
                message: 'task fetched successfully',
                data: { task: task.dataValues }
            }
        } catch (error) {
            throw error
        }
    }

    async deleteTask(taskId: number): Promise<IResponse> {
        try {
            await Task.destroy({ where: { uId: taskId } })
            return {
                status: ResponseStatus.SUCCESS,
                message: 'task deleted successfully',
            }
        } catch (error) {
            throw error
        }
    }
    async getTaskByUser(userId: number): Promise<ITaskResponse> {
        const tasks = await Task.findAll({ where: { userId } });

        return {
            status: ResponseStatus.SUCCESS,
            message: 'task fetched successfully',
            data: {
                task: tasks.map(task => task.dataValues)
            }
        }
    }

    async changeStatus(payload: IChangeStatusPayload): Promise<IResponse> {
        try {
            const [updated] = await Task.update(
                { status: payload.status },
                { where: { uId: payload.taskId, userId: payload.userId } }
            );

            if (updated == 0) {
                throw new CustomError(`task not found`, HttpStatusCode.NOT_FOUND, 'task');
            };

            return {
                status: ResponseStatus.SUCCESS,
                message: `task status updated`
            }
        } catch (error) {
            throw error
        }
    }
}