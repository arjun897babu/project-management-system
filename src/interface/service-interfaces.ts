import { JwtPayload } from "jsonwebtoken";
import { IGetProjectResponse, IGetUserResponse, ILoginResponse, IResponse, ITaskResponse } from "./response-interface";
import { ISignUpPayload, ILoginPayload, ICreateTaskPayload, IProjectRUD, IProjectCreatePayload, IUpdateProjectPayload, IAddUserPayload, IRemoveUserPayload, IChangeStatusPayload } from "./payload-interface";
import { ITask } from "./model-interface";
import { TaskStatus } from "../constants/enum";

export interface IJWT {
    generateAccessToken(payload: JwtPayload): string;
    verifyAccessToken(token: string): JwtPayload | string;
}

export interface IBcrypt {
    hash(plainTextPassword: string): Promise<string>;
    compare(reqPassword: string, hashedPassword: string): Promise<boolean>
}
export interface IUserService {
    login(payload: ILoginPayload): Promise<ILoginResponse>
    signUp(payload: ISignUpPayload): Promise<IResponse>
    getUser(userId: number): Promise<IGetUserResponse>
    getAllUsers(): Promise<IGetUserResponse>
}
export interface ITaskService {
    createTask(payload: ICreateTaskPayload): Promise<IResponse>;
    changeStatus(payload:IChangeStatusPayload): Promise<IResponse>;
    getTask(userId: number): Promise<ITaskResponse>;
    getTaskByUser(userId: number): Promise<IResponse>;
    deleteTask(taskId: number): Promise<IResponse>;
}
export interface IProjectService {
    createProject(payload: IProjectCreatePayload): Promise<IResponse>;
    updateProject(payload: IUpdateProjectPayload): Promise<IResponse>;
    getProject(payload: IProjectRUD): Promise<IGetProjectResponse>;
    getAllProject(userId: number): Promise<IGetProjectResponse>;
    addUser(payload: IAddUserPayload): Promise<IResponse>;
    removeUser(payload: IRemoveUserPayload): Promise<IResponse>;
    deleteProject(payload: IProjectRUD): Promise<IResponse>;
}