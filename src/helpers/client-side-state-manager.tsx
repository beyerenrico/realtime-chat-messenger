'use client';

import { Session } from 'next-auth';
import { FC, useEffect } from 'react';
import { useStore } from '@/lib/store';

type ClientSideStateManagerProps = {
  session: Session;
  unseenFriendRequestsCount: number;
};

const ClientSideStateManager: FC<ClientSideStateManagerProps> = ({ session, unseenFriendRequestsCount }) => {
  const { setSession, setUnseenFriendRequestsCount } = useStore();

  useEffect(() => {
    setSession(session);
    setUnseenFriendRequestsCount(unseenFriendRequestsCount);
  }, [session, unseenFriendRequestsCount, setSession, setUnseenFriendRequestsCount]);

  return null;
};

export default ClientSideStateManager;
