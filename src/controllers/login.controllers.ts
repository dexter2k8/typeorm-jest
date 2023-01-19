import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import loginUserService from "../services/login/loginUser.service";

export const loginUserController = async (req: Request, res: Response) => {
    const loginData: IUserLogin = req.body;
    const token = await loginUserService(loginData);
    return res.status(200).json({ token });
  };