import { Router } from 'express';
import { createTechController, listTechsController } from '../controllers/techs.controllers';
import adminUserMiddleware from '../middlewares/adminUser.middleware';
import authUserMiddleware from '../middlewares/authUser.middleware';
import dataValidationMiddleware from '../middlewares/dataValidation.middleware';
import { createTechSchema } from '../serializers/techs.schema';

const techRoutes = Router();

techRoutes.post('', authUserMiddleware, adminUserMiddleware, dataValidationMiddleware(createTechSchema),createTechController);

techRoutes.get('', authUserMiddleware, listTechsController);

export default techRoutes;
