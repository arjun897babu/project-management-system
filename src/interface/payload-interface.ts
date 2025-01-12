import { IUser } from "./model-interface"

export type ILoginPayload = Pick<IUser, 'email' | 'password'>
export type ISignUpPayload = Pick<IUser, 'name'> & ILoginPayload