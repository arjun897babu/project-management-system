import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db-connection";
import { IProject } from "../interface/model-interface";
import Task from "./task-model";

const Project = sequelize.define<Model<IProject, Pick<IProject, 'description' | 'name' | 'userId'>>>(
    "Project",
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },

    {
        tableName:'projects',
        timestamps: true,
        hooks: {
            beforeSave: (projects) => {
                projects.setDataValue('name', projects.getDataValue('name').trim().toLowerCase())
                projects.setDataValue('description', projects.getDataValue('description').trim())
            },
        },
    }
);


//project -> task [one-to-many relation]
Project.hasMany(Task, { foreignKey: 'projectId' })
Task.belongsTo(Project, { foreignKey: 'projectId' });

export default Project;