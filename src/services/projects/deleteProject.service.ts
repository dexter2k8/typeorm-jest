import AppDataSource from '../../data-source';
import { Project } from '../../entities/project.entity';
import { AppError } from '../../errors/appError';

const deleteProjectService = async (user: any, projId: string) => {
    const projRepository = AppDataSource.getRepository(Project);

    //Verifica se existe o projeto passado na rota
    const findProject = await projRepository.findOne({ relations: { user: true }, where: { id: +projId } });
    if (!findProject) throw new AppError('Project not found!', 404);

    console.log(user.uuid, findProject.user.id);

    //Verifica se o usuário logado é dono do projeto, caso contrário deve ser admin
    if (user.uuid != findProject.user.id) if (!user.isAdm) throw new AppError('Missing admin permissions', 403);

    //Excluir projeto com REPOSITORY
    //await projRepository.delete({ id: +projId });

    //Excluir projeto com QUERYBUILDER
    await projRepository
    .createQueryBuilder('projects')
    .delete()
    .from(Project)
    .where("id = :id", { id: +projId })
    .execute()

    return {};
};

export default deleteProjectService;
