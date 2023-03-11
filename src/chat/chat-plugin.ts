import { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import buildChatService from './chat-service';

interface ChatRequestBody {
  message: string;
  authorId?: number;
  room: string;
}

const chatPlugin = async (fastify: FastifyInstance, opts: any, done: any) => {
  const chatService = buildChatService(fastify.prismaService);

  fastify.post('/chats', async (request: FastifyRequest<{Body: ChatRequestBody}>, reply: FastifyReply) => {
    const createChatBody = {
      ...request.body,
      author: {
        connect: {id: request.body.authorId}
      }
    }
    delete createChatBody.authorId;
    return chatService.createChat(createChatBody);
  });

  fastify.get('/chats', async (request: FastifyRequest, reply: FastifyReply) => {
    return chatService.getChats();
  });

  fastify.delete('/chats/:id', async (request: FastifyRequest<{Params: { id: string }}>, reply: FastifyReply) => {
    return chatService.deleteChat({id: Number(request.params.id)});
  })

  done();
} 

export default chatPlugin;
