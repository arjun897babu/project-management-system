import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db-connection";
import { IProject } from "../interface/model-interface";

const Project = sequelize.define<Model<IProject, Omit<IProject, 'createdAt' | 'updatedAt' | 'uId'>>>(
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
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },

    {
        timestamps: true,
        hooks: {
            beforeSave: (projects) => {
                projects.setDataValue('name', projects.getDataValue('name').trim().toLowerCase())
                projects.setDataValue('description', projects.getDataValue('description').trim())
            },
        },
    }
);

export default Project;