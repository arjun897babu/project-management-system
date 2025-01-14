import express from "express";
import morgan from "morgan";
import { config } from 'dotenv'
config();
import { serverConfig } from './constants/server-config'
import { connectDb } from "./config/db-connection";
import { errorHandler, wildCardMiddleware } from "./middleware/error-middleware";
import { userAuthRoutes } from "./routes/user-auth-routes";
import { projectRoutes } from "./routes/project-routes";
import { taskRoutes } from "./routes/task-routes";

const App = express();
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(morgan("dev"));

connectDb();

App.use('/api/user', userAuthRoutes);
App.use('/api/project', projectRoutes);
App.use('/api/task', taskRoutes);

App.use(errorHandler);
App.use("*", wildCardMiddleware);

App.listen(serverConfig.port, () => {
    console.log(`server running on http://localhost:${serverConfig.port}`)
})

