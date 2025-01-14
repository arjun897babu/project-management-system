import { TaskStatus } from "../constants/enum";
interface ITimeStamps {
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IUser extends ITimeStamps {
    name: string;
    email: string;
    password: string;
    uId: number;
}

export interface IProject extends ITimeStamps {
    uId: number;
    name: string;
    description: string;
    userId: number //owner
}

export interface ITask extends ITimeStamps {
    uId: number;
    name: string;
    description: string;
    status: TaskStatus;
    projectId: number;
    userId:number //owner
}