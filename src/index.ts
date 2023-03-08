import fastify from 'fastify';
import prismaConnector from './db/db-connector';

const PORT = process.env.PORT || 3000;

const server = fastify();

server.register(prismaConnector);

server.get('/ping', async (request, reply) => {
  reply.send('PONG')
});

server.listen({port: 3000}, (err, address) => {
  if(err) {
    console.error(err);
  }
});
