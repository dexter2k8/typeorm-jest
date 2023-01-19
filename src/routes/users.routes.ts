import { Router } from 'express';
import {
    createUserController,
    removeUserController,
    listUsersController,
    updateUserController,
    updateAddressController,
} from '../controllers/users.controllers';
import adminUserMiddleware from '../middlewares/adminUser.middleware';
import authUserMiddleware from '../middlewares/authUser.middleware';
import dataValidationMiddleware from '../middlewares/dataValidation.middleware';
import existsUserMiddleware from '../middlewares/existsUser.middleware';
import { addressUpdateSchema, createUserSchema, userUpdateSchema } from '../serializers/users.schema';

const userRoutes = Router();

userRoutes.post('', dataValidationMiddleware(createUserSchema), createUserController);

userRoutes.patch(
    '/:id',
    authUserMiddleware,
    existsUserMiddleware,
    dataValidationMiddleware(userUpdateSchema),
    updateUserController
);

userRoutes.patch(
    '/:id/address',
    authUserMiddleware,
    existsUserMiddleware,
    dataValidationMiddleware(addressUpdateSchema),
    updateAddressController
);

userRoutes.get('', authUserMiddleware, adminUserMiddleware, listUsersController);

userRoutes.delete('/:id', authUserMiddleware, existsUserMiddleware, removeUserController);

export default userRoutes;
