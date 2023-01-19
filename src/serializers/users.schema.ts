import { SchemaOf, object, string, boolean, date, AnySchema, number } from "yup";
import { IAddressUpdate, IUserAddress, IUserRequest, IUserUpdate } from "../interfaces/users";

const createUserSchema: SchemaOf<IUserAddress> = object().shape({
    street: string().required(),
    state: string().min(2).max(2).required(),
    zipCode: string().min(8).max(8),
    user: object().shape<Record<keyof IUserRequest, AnySchema>>({
        name: string().min(3).max(50).required(),
        email: string().email().required(),
        password: string().min(4).required(),
        isAdm: boolean().required(),
    }),
});

const userUpdateSchema: SchemaOf<IUserUpdate> = object().shape({
    email: string().email(),
    name: string().min(3).max(50),
    password: string().min(4),
    isAdm: boolean(),
});

const addressUpdateSchema: SchemaOf<IAddressUpdate> = object().shape({
    street: string(),
    state: string().min(2).max(2),
    zipCode: string().min(8).max(8),
});

export { createUserSchema, userUpdateSchema, addressUpdateSchema };
