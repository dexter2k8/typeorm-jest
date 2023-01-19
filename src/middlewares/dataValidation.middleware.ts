import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

const dataValidationMiddleware = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        //abortEarly: false retorna todos os erros de validação. true retorna apenas o primeiro
        //stripUnknow: true remove campos não existentes no schema do yup.
        const validatedData = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
        req.body = validatedData;
        return next();
    } catch (error: any) {
        return res.status(400).json({ message: error.errors });
    }
};

export default dataValidationMiddleware;
