import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const authUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    //Verifica se o usuário tem token
    if (!authToken) return res.status(401).json({ message: "Missing authorization headers." });

    // Extrai a palavra "Bearer", salvando apenas o token
    const token = authToken.split(" ")[1];

    //Verifica se o token é válido
    return verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if (error) return res.status(401).json({ message: error.message });

        //Extrai do token os dados do usuário logado e salva na requisição
        // A tipagem de "user" é declarada manualmente em src/@types/express
        req.user = { isAdm: decoded.isAdm, uuid: decoded.sub, addressId: decoded.addressId };

        return next();
    });
};

export default authUserMiddleware;
