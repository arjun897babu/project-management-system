import { TaskStatus } from "../constants/enum"
import { IProject, ITask, IUser } from "./model-interface"

export type ILoginPayload = Pick<IUser, 'email' | 'password'>
export type ISignUpPayload = Pick<IUser, 'name'> & ILoginPayload
export type ICreateTaskPayload = Pick<ITask, 'name' | 'description' | 'projectId' | 'userId'>
export type IProjectCreatePayload = Omit<IProject, 'uId' | 'createdAt' | 'updatedAt'>
export type IProjectRUD = Pick<IProject, 'uId' | 'userId'>
export type IUpdateProjectPayload = Pick<IProject, 'name' | 'description'> & IProjectRUD
export type IAddUserPayload = { contributersId: number[], projectId: number, ownerId: number };
export type IRemoveUserPayload = { contributerId: number, projectId: number, ownerId: number };
export type IChangeStatusPayload = { status: TaskStatus, taskId: number, userId: number }