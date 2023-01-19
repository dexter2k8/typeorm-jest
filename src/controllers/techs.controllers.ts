import { Request, Response } from 'express';
import { ITechRequest } from '../interfaces/users';
import CreateTechService from '../services/technologies/createTech.service';
import listTechsService from '../services/technologies/listTechs.service';

const createTechController = async (req: Request, res: Response) => {
    const techData: ITechRequest = req.body;
    const newTechnology = await CreateTechService(techData);
    return res.status(201).json(newTechnology);
};

const listTechsController = async (req: Request, res: Response) => {
    const techs = await listTechsService();
    return res.status(200).json(techs);
  };

export { createTechController, listTechsController };
