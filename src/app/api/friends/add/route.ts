import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { checkIfAlreadyAdded, checkIfHasFriendRequestFromUser, checkIfUserIsFriend, fetchRedis } from '@/helpers/redis';
import { authConfig } from '@/lib/auth';
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { addFriendValidator } from '@/lib/validations/add-friend';

export async function POST (req: Request) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json() as { email: string };

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const idToAdd = (await fetchRedis(
      'get',
      `user:email:${emailToAdd}`
    )) as string | null;

    // Check if user exists
    if (idToAdd === null) {
      return new Response('User not found.', { status: 404 });
    }

    // Check if user tries to add himself
    if (idToAdd === session.user.id) {
      return new Response('You cannot add yourself as a friend.', { status: 400 });
    }

    // Check if user has already sent a friend request
    await checkIfAlreadyAdded(session.user.id, idToAdd);

    // Check if user has already a friend request from the user
    await checkIfHasFriendRequestFromUser(session.user.id, idToAdd);

    // Check if user is already a friend
    await checkIfUserIsFriend(session.user.id, idToAdd);

    // Notify user, that friend request has been sent
    const data: IncomingFriendRequest = {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.name || '',
      image: session.user.image || '',
    };
    await pusherServer.trigger(
      toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
      'incoming_friend_requests',
      data
    );

    // Add friend request to user
    await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
    await db.sadd(`user:${session.user.id}:pending_friend_requests`, idToAdd);

    return new Response('Friend request sent.', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload.', { status: 422 });
    }

    return new Response('Invalid request.', { status: 400 });
  }
}
