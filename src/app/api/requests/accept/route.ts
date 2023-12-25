import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { checkIfFriendRequestExists, checkIfUserIsFriend } from '@/helpers/redis';
import { authConfig } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST (req: Request) {
  try {
    const body = await req.json();

    const { id: idToAccept } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authConfig);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Check if user is already a friend
    await checkIfUserIsFriend(session.user.id, idToAccept);

    // Check if session user has a friend request from the user
    await checkIfFriendRequestExists(session.user.id, idToAccept);

    await db.sadd(`user:${session.user.id}:friends`, idToAccept);
    await db.sadd(`user:${idToAccept}:friends`, session.user.id);
    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAccept);
    await db.srem(`user:${idToAccept}:pending_friend_requests`, session.user.id);

    return new Response('Friend request accepted.', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 });
    }

    return new Response('Invalid request', { status: 400 });
  }
}
