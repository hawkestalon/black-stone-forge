import { PrismaClient } from "@prisma/client";

export default class PrismaService {
    private prismaClient: PrismaClient;

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