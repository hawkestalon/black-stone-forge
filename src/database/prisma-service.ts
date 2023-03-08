import { PrismaClient } from "@prisma/client";

export interface IPrismaService {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}

export default class PrismaService {
    public prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    public async connect(): Promise<void> {
        return this.prismaClient.$connect();
    }

    public async disconnect(): Promise<void> {
        return this.prismaClient.$disconnect();
    }
}