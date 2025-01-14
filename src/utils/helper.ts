import { CustomError } from "./custom-error";
import { HttpStatusCode } from "../constants/enum";

export const validateuId = (uId: string) => {
    try {
        const convertedId = parseInt(uId, 10);
        if(typeof convertedId !== 'number'){
            throw new CustomError('invalid id',HttpStatusCode.BAD_REQUEST,'id')
        } 
        return  convertedId 
    } catch (error) {
        throw error
    }
}

