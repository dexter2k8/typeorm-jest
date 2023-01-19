import { AnySchema, array, number, object, SchemaOf, string } from 'yup';
import { IProjectData, ITechData } from '../interfaces/users';

export const createUserProjectSchema: SchemaOf<IProjectData> = object().shape({
    name: string().required(),
    description: string(),
    technologies: array().of(
        object().shape<Record<keyof ITechData, AnySchema>>({
            id: number(),
        })
    ),
});
