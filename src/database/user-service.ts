import { Prisma, User } from '@prisma/client';
import PrismaService from './prisma-service';

export default class UserService {
    private prismaService: any
    constructor(prismaService: any) {
        this.prismaService = prismaService;
    }

    public async findUser(input: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaService.user.find({where: input});
    }

    public async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({ data })
    }
}