'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { toast } from 'sonner';
import { pusherClient } from '@/lib/pusher';
import { useStore } from '@/lib/store';
import { toPusherKey } from '@/lib/utils';

type ClientSideNotificationManagerProps = {};

const ClientSideNotificationManager: FC<ClientSideNotificationManagerProps> = ({}) => {
  const router = useRouter();
  const { session, unseenFriendRequestsCount, setUnseenFriendRequestsCount } = useStore();

  useEffect(() => {
    const friendRequestHandler = (e: IncomingFriendRequest) => {
      toast(`${e.name} sent you a friend request.`, {
        duration: 5000,
        position: 'top-right',
        action: {
          label: 'View',
          onClick: () => router.push('/dashboard/requests')
        }
      });
      router.refresh();
    };

    const friendRequestAcceptedHandler = (e: PendingFriendRequest) => {
      toast.info(`${e.name} accepted your friend request.`, {
        position: 'top-right'
      });
      router.refresh();
    };

    const messageSentHandler = (e: { message: Message, sender: User }) => {
      toast(e.sender.name, {
        description: e.message.content,
        position: 'top-right',
      });
    };

    pusherClient.subscribe(toPusherKey(`user:${session?.user.id}:incoming_friend_requests`));
    pusherClient.bind('incoming_friend_requests', friendRequestHandler);

    pusherClient.subscribe(toPusherKey(`user:${session?.user.id}:accept_friend_request`));
    pusherClient.bind('accept_friend_request', friendRequestAcceptedHandler);

    pusherClient.subscribe(toPusherKey(`user:${session?.user.id}:send_message`));
    pusherClient.bind('send_message', messageSentHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${session?.user.id}:incoming_friend_requests`));
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler);

      pusherClient.unsubscribe(toPusherKey(`user:${session?.user.id}:accept_friend_request`));
      pusherClient.unbind('accept_friend_request', friendRequestAcceptedHandler);

      pusherClient.unsubscribe(toPusherKey(`user:${session?.user.id}:send_message`));
      pusherClient.unbind('send_message', messageSentHandler);
    };
  }, [router, session, setUnseenFriendRequestsCount, unseenFriendRequestsCount]);

  return null;
};

export default ClientSideNotificationManager;
