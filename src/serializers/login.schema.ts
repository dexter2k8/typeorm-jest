import { object, SchemaOf, string } from 'yup';
import { IUserLogin } from '../interfaces/users';

export const loginUserSchema: SchemaOf<IUserLogin> = object().shape({
    email: string().email().required(),
    password: string().min(4).required(),
});
