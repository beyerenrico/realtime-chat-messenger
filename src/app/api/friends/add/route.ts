import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { fetchRedis } from '@/helpers/redis';
import { authConfig } from '@/lib/auth';
import { db } from '@/lib/db';
import { addFriendValidator } from '@/lib/validations/add-friend';

export async function POST (req: Request, res: Response) {
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
    const isAlreadyAdded = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;

    if (Boolean(isAlreadyAdded)) {
      return new Response('You already sent a friend request to this user.', { status: 400 });
    }

    // Check if user is already a friend
    const isAlreadyFriend = (await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;

    if (Boolean(isAlreadyFriend)) {
      return new Response('User is already a friend', { status: 400 });
    }

    // Add friend request to user
    await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

    return new Response('Friend request sent.', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload.', { status: 422 });
    }

    return new Response('Invalid request.', { status: 400 });
  }
}
