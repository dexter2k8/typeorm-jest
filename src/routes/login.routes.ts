import { Router } from 'express';
import { loginUserController } from '../controllers/login.controllers';
import dataValidationMiddleware from '../middlewares/dataValidation.middleware';
import { loginUserSchema } from '../serializers/login.schema';

const loginRoutes = Router();

loginRoutes.post('', dataValidationMiddleware(loginUserSchema), loginUserController);

export default loginRoutes;
