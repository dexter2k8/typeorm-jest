import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users";

const loginUserService = async ({ email, password }: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        select: { password: true, deletedAt: true, isAdm: true, id: true },
        where: { email: email },
    });

    if (!user) throw new AppError("Invalid user/password", 400);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError("Invalid user/password", 400);
    
    // O sinal ! representa que o parâmetro seguramente será passado
    const token = sign({ isAdm: user.isAdm, addressId: user.address.id }, process.env.SECRET_KEY!, {
        subject: user.id,
        expiresIn: "24h",
    });

    return token;
};

export default loginUserService;
