import AppDataSource from '../../data-source';
import { Address } from '../../entities/address.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUserAddress } from '../../interfaces/users';

const createUserService = async (userData: IUserAddress):Promise<Address> => {
    const userRepository = AppDataSource.getRepository(User);
    const addressRepository = AppDataSource.getRepository(Address);

    //Lança um erro se usuário já existir no db
    const findUser = await userRepository.findOneBy({ email: userData.user.email });
    if (findUser) throw new AppError('User already exists', 409);    
    
    //Cria novo usuário no db
    const newUser = addressRepository.create(userData);    
    return await addressRepository.save(newUser);
};

export default createUserService;
