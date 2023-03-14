import { PrismaClient } from '@prisma/client';
import { Chat, Prisma } from '@prisma/client';

export interface IChatService {
  getChats: () => Promise<Chat[]>;
  getUserChats: (whereInput: Prisma.ChatWhereInput) => Promise<Chat[]>;
  createChat: (data: Prisma.ChatCreateInput) => Promise<Chat>;
  deleteChat: (whereInput: Prisma.ChatWhereUniqueInput) => Promise<void>
}

export default function buildChatService(prismaService: PrismaClient): IChatService {
  const prismaClient = prismaService;

  async function getChats(): Promise<Chat[]> {
    return prismaClient.chat.findMany();
  }

  async function getUserChats(whereInput: Prisma.ChatWhereInput): Promise<Chat[]> {
    return prismaClient.chat.findMany({ where: whereInput})
  }

  async function createChat(data: Prisma.ChatCreateInput): Promise<Chat> {
    return prismaClient.chat.create({ data })
  }

  async function deleteChat(whereInput: Prisma.ChatWhereUniqueInput): Promise<void> {
    const result = await prismaClient.chat.delete({ where: whereInput });
  }

  return {
    getChats,
    getUserChats,
    createChat,
    deleteChat
  }
}