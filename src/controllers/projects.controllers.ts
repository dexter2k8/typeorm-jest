import { Request, Response } from 'express';
import { Project } from '../entities/project.entity';
import createUserProjectService from '../services/projects/createUserProject.service';
import deleteProjectService from '../services/projects/deleteProject.service';
import listProjectsService from '../services/projects/listProjects.service';
import listUserProjectsService from '../services/projects/listUserProjects.service';

const createUserProjectController = async (req: Request, res: Response) => {
    const projectData: Project[] = req.body;
    const newProject = await createUserProjectService(req.user.uuid, projectData);
    return res.status(201).json(newProject);
};

const listProjectsController = async (req: Request, res: Response) => {
    const projects = await listProjectsService();
    return res.status(200).json(projects);
};

const listUsersProjectsController = async (req: Request, res: Response) => {
    const userProjects = await listUserProjectsService(req.params.id);
    return res.status(200).json(userProjects);
};

const deleteProjectController = async (req: Request, res: Response) => {
    const data = await deleteProjectService(req.user, req.params.id);
    return res.status(204).json(data);
};

export { createUserProjectController, listProjectsController, listUsersProjectsController, deleteProjectController };
