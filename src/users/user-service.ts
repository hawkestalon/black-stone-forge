import { PrismaClient } from '@prisma/client';
import { IPrismaService } from './../database/prisma-service';
import { Prisma, User } from '@prisma/client';

export interface IUserService {
    findUser: (input: Prisma.UserWhereUniqueInput) => Promise<User | null>;
    createUser: (data: Prisma.UserCreateInput) => Promise<User>;
}

export default function buildUserService(prismaService: PrismaClient): IUserService {
    return {
        async findUser(input: Prisma.UserWhereUniqueInput): Promise<User | null> {
            return prismaService.user.findUnique({where: input});
        },
        async createUser(data: Prisma.UserCreateInput): Promise<User> {
            return prismaService.user.create({ data })
        }
    }
}