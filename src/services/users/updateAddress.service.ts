import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appError";
import { IAddressUpdate } from "../../interfaces/users";

const updateAddressService = async (user: any, client: any, userData: IAddressUpdate): Promise<Address[]> => {
    if ("isAdm" in userData && !user.isAdm) throw new AppError("Only admin can change admin status", 401);

    const addressRepository = AppDataSource.getRepository(Address);

    try {
        const updateAddress = addressRepository.create({ ...client.address, ...userData });        
        return await addressRepository.save(updateAddress);
    } catch (error: any) {
        throw new AppError(error.message, 400);
    }
};

export default updateAddressService;
