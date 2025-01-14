import { ResponseStatus } from "../constants/enum";
import { IProject, ITask, IUser } from "./model-interface";

export interface IResponse {
    status: ResponseStatus;
    message: string;
}

/**************************
         User 
 ***************************/
export interface ILoginResponse extends IResponse {
    data: {
        token: string
    }
}

export interface IGetUserResponse extends IResponse {
    data: {
        user: Pick<IUser, 'name' | 'email' | 'uId'> | Pick<IUser, 'name' | 'email' | 'uId'>[]
    }
}

/**************************
         Tasks 
 ***************************/
export interface ITaskResponse extends IResponse {
    data: {
        task: ITask | ITask[]
    }
}

/**************************
         Projects 
 ***************************/
export interface IGetProjectResponse extends IResponse {
    data: {
        project: IProject | IProject[]
    }
}