import { NextFunction, Request, Response } from "express";

const adminUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.isAdm) return res.status(403).json({ message: 'User must be admin' });

    return next();
};

export default adminUserMiddleware;
