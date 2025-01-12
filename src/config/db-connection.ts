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

import Projects from '../model/project-model'
import Tasks from '../model/task-model'
import Users from '../model/user-model'


//user -> project [many-to-many relation]
Users.belongsToMany(Projects, { through: 'UserProjects', foreignKey: 'userId', timestamps: true })
Projects.belongsToMany(Users, { through: 'UserProjects', foreignKey: 'projectId', timestamps: true })

//project -> task [one-to-many relation]
Projects.hasMany(Tasks, { foreignKey: 'projectId' })
Tasks.belongsTo(Projects, { foreignKey: 'projectId' })

//user -> task [one-to-many relation]
Users.hasMany(Tasks, { foreignKey: 'assignedTo' })
Tasks.belongsTo(Users, { foreignKey: 'assignedTo' })


export const connectDb = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: false })
    } catch (error) {
        await sequelize.close()
        throw error
    }
}

