import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const prismaConnector: FastifyPluginAsync = fp(async (fastify, opts) => {
    const prismaClient = new PrismaClient();
    await prismaClient.$connect();

    fastify.decorate('prisma', prismaClient);

    fastify.addHook('onClose', async () => {
        await prismaClient.$disconnect();
    })
});

export default prismaConnector;
