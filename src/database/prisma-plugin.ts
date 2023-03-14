import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";
import buildPrismaService, { IPrismaService } from "./prisma-service";

declare module 'fastify' {
    interface FastifyInstance {
        prismaService: PrismaClient;
    }
}

const prismaConnector = fp(async (fastify: any, opts: any, done: any) => {
    const prismaClient = buildPrismaService();
    await prismaClient.connect();

    fastify.decorate('prismaService', prismaClient.prismaClient);

    fastify.addHook('onClose', async () => {
        await prismaClient.disconnect();
    })

    done()
});

export default prismaConnector;
