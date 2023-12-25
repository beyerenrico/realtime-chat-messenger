'use client';

import { Session } from 'next-auth';
import { FC, useEffect } from 'react';
import { useStore } from '@/lib/store';

type ClientSideStateManagerProps = {
  session: Session;
  unseenFriendRequestsCount: number;
  friends: Omit<User, 'emailVerified'>[];
};

const ClientSideStateManager: FC<ClientSideStateManagerProps> = ({ session, unseenFriendRequestsCount, friends }) => {
  const { setSession, setUnseenFriendRequestsCount, setFriends } = useStore();

  useEffect(() => {
    setSession(session);
    setUnseenFriendRequestsCount(unseenFriendRequestsCount);
    setFriends(friends);
  }, [session, unseenFriendRequestsCount, friends, setSession, setUnseenFriendRequestsCount, setFriends]);

  return null;
};

export default ClientSideStateManager;
