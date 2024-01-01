import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import ChatList from '@/components/chat-list';
import { Heading1 } from '@/components/ui/typography';
import { authConfig } from '@/lib/auth';

const Dashboard = async () => {
  const session = await getServerSession(authConfig);

  if (!session) notFound();

  return (
    <div>
      <Heading1>Your Chats</Heading1>
      <ChatList />
    </div>
  );
};

export default Dashboard;
