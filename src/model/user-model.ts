import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db-connection";
import { IUser } from "../interface/model-interface";

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
        timestamps: true,
        hooks: {
            beforeSave: (user) => {
                user.setDataValue('name', user.getDataValue('name').trim().toLowerCase())
                user.setDataValue('email', user.getDataValue('email').trim())
            },
        },
    }
);

export default User;
