import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';

const listUsersService = async (limit: number, offset: number): Promise<User[]> => {
    return await AppDataSource.getRepository(User).find({
        order: { name: 'DESC' },
        skip: offset || 0,
        take: limit || 20,
    });
};

export default listUsersService;
