import { SchemaOf, object, string, number } from 'yup';
import { ITechRequest } from '../interfaces/users';

export const createTechSchema: SchemaOf<ITechRequest> = object().shape({
    name: string().required()
});
