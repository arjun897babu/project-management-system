import bcrypt from "bcryptjs";
import { IBcrypt } from "../interface/service-interfaces";

export class Bcrypt implements IBcrypt {
    private salt: number = parseInt(process.env.BCRYPT_SALT!, 10);
    async hash(plainTextPassword: string): Promise<string> {
        try {
            const hashedPassword = await bcrypt.hash(plainTextPassword, this.salt);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }

    async compare(reqPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            const isTrue = await bcrypt.compare(reqPassword, hashedPassword);
            return isTrue;
        } catch (error) {
            throw error;
        }
    }
}