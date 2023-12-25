'use client';

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import PendingFriendRequestCard from '@/components/pending-friend-request-card';

type PendingFriendRequestsProps = {
  initialPendingFriendRequests: Awaited<PendingFriendRequest>[];
};

const PendingFriendRequests: FC<PendingFriendRequestsProps> = ({ initialPendingFriendRequests }) => {
  const router = useRouter();
  const [pendingFriendRequests, setPendingFriendRequests] = useState<PendingFriendRequest[]>(initialPendingFriendRequests);

  const handleFriendRequest = (id: string) => {
    setPendingFriendRequests((prev) => prev.filter((user) => user.id !== id));
    router.refresh();
  };

  return (
    <div className='flex flex-wrap gap-2'>
      {pendingFriendRequests.length === 0 ? (
        <div className='text-gray-500'>
          No pending friend requests
        </div>
      ) : (
        pendingFriendRequests.map((user) => (
          <PendingFriendRequestCard key={user.id} user={user} onHandleFriendRequest={handleFriendRequest} />
        ))
      )}
    </div>
  );
};

export default PendingFriendRequests;
