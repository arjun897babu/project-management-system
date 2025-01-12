import { ResponseStatus } from "../constants/enum";

export interface IResponse {
    status: ResponseStatus;
    message: string;
}

export interface ILoginResponse extends IResponse {
    data: {
        token: string
    }
}