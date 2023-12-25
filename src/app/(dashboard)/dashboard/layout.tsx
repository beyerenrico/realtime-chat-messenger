import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React, { FC } from 'react';
import DashboardLayoutGroup from '@/components/dashboard-layout-group';
import ClientSideStateManager from '@/helpers/client-side-state-manager';
import { fetchRedis } from '@/helpers/redis';
import { authConfig } from '@/lib/auth';

type LayoutProps = {
  children: React.ReactNode;
}

const DashboardLayout: FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(authConfig);
  if (!session) notFound();

  const unseenFriendRequestsCount = (
    await fetchRedis(
      'smembers',
      `user:${session.user.id}:incoming_friend_requests`
    ) as User[]
  ).length;

  return (
    <>
      <ClientSideStateManager session={session} unseenFriendRequestsCount={unseenFriendRequestsCount} />
      <DashboardLayoutGroup>
        {children}
      </DashboardLayoutGroup>
    </>
  );
};

export default DashboardLayout;
