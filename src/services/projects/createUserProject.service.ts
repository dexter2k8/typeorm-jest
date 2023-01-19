import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { IProjectData } from "../../interfaces/users";

const createUserProjectService = async (userId: string, projectData: IProjectData[]): Promise<Project[]> => {
    const data = { user: userId, ...projectData };

    //Cria novo projeto com REPOSITORY. QUERYBUILDER não funciona pois salva o projeto sem as tecnologias
    const projectRepository = AppDataSource.getRepository(Project);
    const newProject = projectRepository.create(data);
    return await projectRepository.save(newProject);
};

export default createUserProjectService;
