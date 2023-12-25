'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import IncomingFriendRequestCard from '@/components/incoming-friend-request-card';
import { useStore } from '@/lib/store';

type IncomingFriendRequestsProps = {
  initialIncomingFriendRequests: Awaited<IncomingFriendRequest>[];
};

const IncomingFriendRequests: FC<IncomingFriendRequestsProps> = ({ initialIncomingFriendRequests }) => {
  const router = useRouter();
  const { setUnseenFriendRequestsCount } = useStore();
  const [incomingFriendRequests, setIncomingFriendRequests] = useState<IncomingFriendRequest[]>(initialIncomingFriendRequests);

  const handleFriendRequest = (id: string) => {
    setIncomingFriendRequests((prev) => prev.filter((user) => user.id !== id));
    router.refresh();
  };

  useEffect(() => {
    setUnseenFriendRequestsCount(incomingFriendRequests.length);
  }, [incomingFriendRequests, setUnseenFriendRequestsCount]);

  return (
    <div className='flex flex-wrap gap-2'>
      {incomingFriendRequests.length === 0 ? (
        <div className='text-gray-500'>
          No incoming friend requests
        </div>
      ) : (
        incomingFriendRequests.map((user) => (
          <IncomingFriendRequestCard key={user.id} user={user} onHandleFriendRequest={handleFriendRequest}/>
        ))
      )}
    </div>
  );
};

export default IncomingFriendRequests;
