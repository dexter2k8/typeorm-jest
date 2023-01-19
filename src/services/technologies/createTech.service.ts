import AppDataSource from '../../data-source';
import { Technology } from '../../entities/technology.entity';
import { AppError } from '../../errors/appError';
import { ITechRequest } from '../../interfaces/users';

const CreateTechService = async (techData: ITechRequest): Promise<ITechRequest> => {
    const techRepository = AppDataSource.getRepository(Technology);

    //Lança um erro se trcnologia já existir no db
    const findUser = await techRepository.findOneBy({ name: techData.name });
    if (findUser) throw new AppError('Technology already registered', 409);

    // Cria nova tecnologia com REPOSITORY
    const newTechnology = techRepository.create(techData);
    await techRepository.save(newTechnology);
    return newTechnology;

    //Cria nova tecnologia com QUERYBUILDER (Não passa no JEST, apenas no insomnia)
    // const newTechnology = await AppDataSource.createQueryBuilder()
    //     .insert()
    //     .into(Technology)
    //     .values(techData)
    //     .returning('*')
    //     .execute();
    // return newTechnology.raw;

};

export default CreateTechService;
