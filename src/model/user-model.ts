import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db-connection";
import { IUser } from "../interface/model-interface";
import Project from "./project-model";
import Task from "./task-model";

const User = sequelize.define<Model<IUser, Pick<IUser, 'email' | 'password' | 'name'>>>(
    "User",
    {
        uId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeSave: (user) => {
                user.setDataValue('name', user.getDataValue('name').trim().toLowerCase())
                user.setDataValue('email', user.getDataValue('email').trim())
            },
        },
    }
);

//user -> project [many-to-many relation]
User.belongsToMany(Project, { through: 'user_projects', foreignKey: 'userId', otherKey: 'projectId', timestamps: true })
Project.belongsToMany(User, { through: 'user_projects', foreignKey: 'projectId', otherKey: 'userId', timestamps: true  })

//user -> task [one-to-many relation]
User.hasMany(Task, { foreignKey: 'assignedTo' })
Task.belongsTo(User, { foreignKey: 'assignedTo' });


export default User;
