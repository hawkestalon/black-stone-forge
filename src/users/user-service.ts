import { IPrismaService } from './../database/prisma-service';
import { Prisma, User } from '@prisma/client';

export interface IUserService {
    findUser: (input: Prisma.UserWhereUniqueInput) => Promise<User>;
    createUser: (data: Prisma.UserCreateInput) => Promise<User>;
}

export default class UserService {
    private prismaService: any
    constructor(prismaService: IPrismaService) {
        this.prismaService = prismaService;
    }

    public async findUser(input: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaService.user.findUnique({where: input});
    }

    public async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({ data })
    }
}
