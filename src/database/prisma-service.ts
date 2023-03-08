import { PrismaClient } from "@prisma/client";

export interface IPrismaService {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    prismaClient: PrismaClient;
}

export default function buildPrismaService(): IPrismaService {
    const prismaClient = new PrismaClient();

    return {
        prismaClient,
        async connect(): Promise<void> {
            return this.prismaClient.$connect();
        },
        async disconnect(): Promise<void> {
            return this.prismaClient.$disconnect();
        }
    }
}