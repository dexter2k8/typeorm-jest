import AppDataSource from "../../data-source"
import { Technology } from "../../entities/technology.entity"
import { ITechRequest } from "../../interfaces/users"

const listTechsService = async():Promise<ITechRequest[]> => {
    return await AppDataSource.getRepository(Technology).find()
}

export default listTechsService