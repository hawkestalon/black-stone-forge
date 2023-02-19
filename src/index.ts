import fastify from 'fastify';

const server = fastify();

server.get('/ping', async (request, reply) => {
  reply.send('PONG')
});

server.listen({port: 3000}, (err, address) => {
  if(err) {
    console.error(err);
  }
})