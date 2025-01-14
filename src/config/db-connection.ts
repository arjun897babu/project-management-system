import { Sequelize } from "sequelize";
import { serverConfig } from "../constants/server-config";

export const sequelize = new Sequelize(
    serverConfig.db,//db name
    serverConfig.db_user_name,
    serverConfig.db_password,
    {
        host: serverConfig.db_host,
        dialect: 'postgres',
        port: serverConfig.db_port,
        logging: false
    }
);
/**
 * 
 * PORT=3001
JWT_SECRET=d9eebd9f-63d6-4e30-b00a-8bf5139b263e
JWT_EXPIRE=15m
BCRYPT_SALT=10
DB_NAME=postgres
DB_USER_NAME=postgres
DB_PASSWORD=ArJ*hsX5sXsZ.Ms
DB_HOST=db.hmbjgndaiszxblonmhye.supabase.co
process.env.NODE_ENV=production
 */

export const connectDb = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: false })
    } catch (error) {
        await sequelize.close()
        throw error
    }
}

