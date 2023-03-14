import { FastifyInstance, FastifyPluginCallback, FastifyRequest } from 'fastify';
import buildChatService from './chat-service';

interface ChatRequestBody {
  message: string;
  author: number;
  room: string;
}

const chatPlugin = async (fastify: FastifyInstance, opts: any, done: any) => {
  const chatService = buildChatService(fastify.prismaService);

  fastify.post('/chat', async (request: FastifyRequest<{Body: ChatRequestBody}>, reply) => {
    return chatService.createChat(request.body);
  });

  done();
} 