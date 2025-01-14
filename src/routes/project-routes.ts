import express from 'express'
import { authMiddleWare, projectService } from './user-auth-routes';
import { ProjectController } from '../controller/project-controller';


const projectController = new ProjectController(projectService)


const projectRoutes = express.Router();

projectRoutes
    .route('/')
    .post(authMiddleWare.isAuth.bind(authMiddleWare), projectController.createProject.bind(projectController))
    .get(authMiddleWare.isAuth.bind(authMiddleWare), projectController.getAllProject.bind(projectController));
projectRoutes
    .route('/:projectId')
    .get(authMiddleWare.isAuth.bind(authMiddleWare), authMiddleWare.isOwner('project'), projectController.getProject.bind(projectController))
    .put(authMiddleWare.isAuth.bind(authMiddleWare), authMiddleWare.isOwner('project'), projectController.updateProject.bind(projectController))
    .delete(authMiddleWare.isAuth.bind(authMiddleWare), authMiddleWare.isOwner('project'), projectController.deleteProject.bind(projectController));
projectRoutes
    .route('/users/:projectId')
    .put(authMiddleWare.isAuth.bind(authMiddleWare), authMiddleWare.isOwner('project'), projectController.addUser.bind(projectController))
    .delete(authMiddleWare.isAuth.bind(authMiddleWare), authMiddleWare.isOwner('project'), projectController.removeUser.bind(projectController))
export { projectRoutes }