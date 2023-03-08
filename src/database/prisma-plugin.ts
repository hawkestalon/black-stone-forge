import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import PrismaService, { IPrismaService } from "./prisma-service";

declare module 'fastify' {
    interface FastifyInstance {
        prismaService: IPrismaService;
    }
}

const prismaConnector = fp(async (fastify: any, opts: any, done: any) => {
    const prismaClient = new PrismaService();
    await prismaClient.connect();

    fastify.decorate('prismaService', prismaClient.prismaClient);

    fastify.addHook('onClose', async () => {
        await prismaClient.disconnect();
    })

    done()
});

export default prismaConnector;
