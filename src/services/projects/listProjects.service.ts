import AppDataSource from '../../data-source';
import { Project } from '../../entities/project.entity';

const listProjectsService = async () => {
    //Listar usuários com REPOSITORY
    //return await AppDataSource.getRepository(Project).find({ relations: { user: true } });

    //Listar usuários com QUERYBUILDER
    return await AppDataSource.getRepository(Project)
        .createQueryBuilder('projects')
        .leftJoinAndSelect('projects.user', 'user')
        .getMany();
};

export default listProjectsService;
