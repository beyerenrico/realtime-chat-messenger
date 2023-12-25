import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import IncomingFriendRequests from '@/components/incoming-friend-requests';
import PendingFriendRequests from '@/components/pending-friend-requests';
import { Separator } from '@/components/ui/separator';
import { Heading1, Heading2 } from '@/components/ui/typography';
import { getIncomingFriendRequests, getPendingFriendRequests } from '@/helpers/redis';
import { authConfig } from '@/lib/auth';

const AddPage: FC = async () => {
  const session = await getServerSession(authConfig);
  if (!session) notFound();

  const incomingFriendRequests = await getIncomingFriendRequests(session.user.id);
  const pendingFriendRequests = await getPendingFriendRequests(session.user.id);

  return (
    <div>
      <Heading1>Friend Requests</Heading1>
      <Separator className='mb-8' />
      <div className='grid gap-8'>
        <div>
          <Heading2>Incoming</Heading2>
          <IncomingFriendRequests initialIncomingFriendRequests={incomingFriendRequests} />
        </div>
        <div>
          <Heading2>Pending</Heading2>
          <PendingFriendRequests initialPendingFriendRequests={pendingFriendRequests} />
        </div>
      </div>
    </div>
  );
};

export default AddPage;
