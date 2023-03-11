import { FastifyReply, FastifyRequest } from "fastify";
import buildUserService from "./user-service";
import { User } from '@prisma/client';

interface IParams {
  id: string;
}

interface ICreateUserBody {
  email: string;
  password: string;
  username: string;
  name: string;
}

const userPlugin = async (fastify: any, opts: any, done: any) => {
  const userService = buildUserService(fastify.prismaService);

  // routes
  fastify.get('/users/:id', async (request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) => {
    const { id } = request.params;
    return userService.findUser({ id: Number(id)});
  });

  fastify.post('/users', (request: FastifyRequest<{Body: ICreateUserBody}>, reply: FastifyReply) => {
    return userService.createUser(request.body);
  });

  done();
};

export default userPlugin;