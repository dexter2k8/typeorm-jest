import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const listUserProjectsService = async (userId: string) => {
    const userRepository = AppDataSource.getRepository(User);

    //Localizar projetos do usuário com REPOSITORY
    // const findUser = await userRepository.findOne({
    //     relations: { projects: { technologies: true } },
    //     where: { id: userId },
    // });

    //Localizar projetos do usuário com QUERYBUILDER
    const findUser = userRepository
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.projects', 'projects')
        .leftJoinAndSelect('projects.technologies', 'technologies')
        .where('users.id = :id', { id: userId })
        .getOne();

    //Lança um erro se usuário não existir no db
    if (!findUser) throw new AppError('User not found!', 404);

    return findUser;
};

export default listUserProjectsService;
