import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import Chat from '@/components/chat';
import { getChatMessages } from '@/helpers/redis';
import { authConfig } from '@/lib/auth';
import { db } from '@/lib/db';

type ChatPageProps = {
  params: {
    chatId: string;
  }
};

const ChatPage: FC<ChatPageProps> = async ({ params }) => {
  const session = await getServerSession(authConfig);
  if (!session) notFound();

  const { user } = session;
  const { chatId } = params;

  const [userId1, userId2] = chatId.split('--');

  if (userId1 !== user.id && userId2 !== user.id) notFound();

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = await db.get(`user:${chatPartnerId}`) as User;
  const initialMessages = await getChatMessages(chatId);

  return (
    <Chat chatPartner={chatPartner} initialMessages={initialMessages} chatId={chatId} />
  );
};

export default ChatPage;
