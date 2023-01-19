import { Request, Response } from "express";
import { IAddressUpdate, IUserAddress, IUserUpdate } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import removeUserService from "../services/users/removeUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import updateAddressService from "../services/users/updateAddress.service";

const createUserController = async (req: Request, res: Response) => {
    const userData: IUserAddress = req.body;
    const newUser = await createUserService(userData);
    return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    const users = await listUsersService(limit, offset);
    return res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response) => {
    const updateData: IUserUpdate = req.body;
    const data = await updateUserService(req.user, req.client, updateData);
    return res.status(200).json(data);
};

const updateAddressController = async (req: Request, res: Response) => {
    const updateData: IAddressUpdate = req.body;
    const data = await updateAddressService(req.user, req.client, updateData);
    return res.status(200).json(data);
};

const removeUserController = async (req: Request, res: Response) => {
    const data = await removeUserService(req.params.id);
    return res.status(204).json(data);
};

export {
    createUserController,
    listUsersController,
    updateUserController,
    updateAddressController,
    removeUserController,
};
