import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import { User } from '../entities/user.entity';

const existsUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);

    //Verifica se o usuário passado na rota é o mesmo que está logado    
    if (req.user.uuid != req.params.id)
        if (!req.user.isAdm) return res.status(403).json({ message: 'Missing admin permissions' });

    //Verifica se o usuário da rota existe
    const findClient = await userRepository.findOneBy({ id: req.params.id });
    if (!findClient) return res.status(404).json({ message: 'User not found!' });
    else req.client = findClient;
    return next();
};

export default existsUserMiddleware;
