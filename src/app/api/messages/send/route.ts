import { nanoid } from 'nanoid';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { fetchRedis } from '@/helpers/redis';
import { authConfig } from '@/lib/auth';
import { cryptr } from '@/lib/cryptr';
import { db } from '@/lib/db';
import { Message } from '@/lib/validations/message';
import { sendMessageValidator } from '@/lib/validations/send-message';

export async function POST (req: Request) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json() as { content: string, chatId: string };
    const { content: messageToSend } = sendMessageValidator.parse({ content: body.content });

    const [userId1, userId2] = body.chatId.split('--');

    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response('Unauthorized', { status: 401 });
    }

    const friendId = session.user.id === userId1 ? userId2 : userId1;
    const friendList = await fetchRedis('smembers', `user:${session.user.id}:friends`) as string[];
    const isFriend = friendList.includes(friendId);

    if (!isFriend) {
      return new Response('Unauthorized', { status: 401 });
    }

    const sender = JSON.parse(await fetchRedis('get', `user:${session.user.id}`) as string) as User;
    const timestamp = Date.now();

    const message: Message = {
      id: nanoid(),
      senderId: session.user.id,
      recipientId: friendId,
      content: messageToSend,
      createdAt: timestamp,
      seen: false,
    };

    await db.zadd(`chat:${body.chatId}:messages`, {
      score: timestamp,
      member: cryptr.encrypt(JSON.stringify(message))
    });

    return new Response('Message sent.');
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload.', { status: 422 });
    }

    return new Response('Invalid request.', { status: 400 });
  }
}
