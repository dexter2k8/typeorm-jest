import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            user: {
                uuid: string;
                isAdm: string;
                addressId: string;
            };
            client: {
                id: string;
                name: string;
                email: string;
                password: string;
                isAdm: boolean;
            };
        }
    }
}
