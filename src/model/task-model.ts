import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db-connection";
import { ITask } from "../interface/model-interface";
import { TaskStatus } from "../constants/enum";

const Task = sequelize.define<Model<ITask, Omit<ITask, 'createdAt' | 'updatedAt' | 'uId'>>>(
    "Task",
    {

        uId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(TaskStatus)),
            allowNull: false,
            defaultValue: TaskStatus.TO_DO
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        assignedTo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        timestamps: true,
        hooks: {
            beforeSave: (tasks) => {
                tasks.setDataValue('name', tasks.getDataValue('name').trim().toLowerCase())
                tasks.setDataValue('description', tasks.getDataValue('description').trim().toLowerCase())
            },
        },
    }
);
 
export default Task;
