import { Router } from 'express';
import {
    createUserProjectController,
    deleteProjectController,
    listProjectsController,
    listUsersProjectsController,
} from '../controllers/projects.controllers';
import adminUserMiddleware from '../middlewares/adminUser.middleware';
import authUserMiddleware from '../middlewares/authUser.middleware';
import dataValidationMiddleware from '../middlewares/dataValidation.middleware';
import existsUserMiddleware from '../middlewares/existsUser.middleware';
import { createUserProjectSchema } from '../serializers/projects.schema';

const projectRoutes = Router();

projectRoutes.post(
    '',
    authUserMiddleware,
    dataValidationMiddleware(createUserProjectSchema),
    createUserProjectController
);
projectRoutes.get('', authUserMiddleware, adminUserMiddleware, listProjectsController);
projectRoutes.get('/:id', authUserMiddleware, existsUserMiddleware, listUsersProjectsController);
projectRoutes.delete('/:id', authUserMiddleware, deleteProjectController);

export default projectRoutes;
