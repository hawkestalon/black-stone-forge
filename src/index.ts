import fastify from 'fastify';
import prismaConnector from './database/prisma-plugin';
import UserPlugin from './users/user-plugin';
import ChatPlugin from './chat/chat-plugin';

const PORT = process.env.PORT || 3000;

const server = fastify({ logger: true });

server.register(prismaConnector);
server.register(UserPlugin);
server.register(ChatPlugin);

server.get('/ping', async (request, reply) => {
  reply.send('PONG')
});

server.listen({port: 3000}, (err, address) => {
  if(err) {
    console.error(err);
  }
  console.log("LISTENING ON PORT: 3000")
});
