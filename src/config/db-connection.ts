import { Sequelize } from "sequelize";
import { serverConfig } from "../constants/server-config";

export const sequelize = new Sequelize(
    serverConfig.db,
    serverConfig.db_user_name,
    serverConfig.db_password,
    {
        host: serverConfig.db_host,
        dialect: 'postgres',
        port: serverConfig.db_port,
        logging: false
    }
);


export const connectDb = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: false })
    } catch (error) {
        await sequelize.close()
        throw error
    }
}

