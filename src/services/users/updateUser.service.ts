import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";

const updateUserService = async (user: any, client: any, userData: IUserUpdate): Promise<User[]> => {
    if ("isAdm" in userData && !user.isAdm) throw new AppError("Only admin can change admin status", 403);

    const userRepository = AppDataSource.getRepository(User);

    try {
        const updateUser = userRepository.create({ ...client, ...userData });        
        return await userRepository.save(updateUser);
    } catch (error: any) {
        throw new AppError(error.message, 400);
    }
};

export default updateUserService;
