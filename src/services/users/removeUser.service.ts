import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const removeUserService = async (uuid: string):Promise<void> => {
    const userRepository = AppDataSource.getRepository(User);
    const findClient = await userRepository.findOneBy({ id: uuid });
    if (!findClient) throw new AppError("User not found!", 404);  
    //softRemove não exclui, apenas gera uma data na entity @DeleteDateColumn()
    await userRepository.softRemove(findClient);
  };
  
  export default removeUserService;