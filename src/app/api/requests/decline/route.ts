import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { checkIfFriendRequestExists, checkIfUserIsFriend } from '@/helpers/redis';
import { authConfig } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST (req: Request) {
  try {
    const body = await req.json();

    const { id: idToDecline } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authConfig);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Check if user is already a friend
    await checkIfUserIsFriend(session.user.id, idToDecline);

    // Check if session user has a friend request from the user
    await checkIfFriendRequestExists(session.user.id, idToDecline);

    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToDecline);
    await db.srem(`user:${idToDecline}:pending_friend_requests`, session.user.id);

    return new Response('Friend request declined.', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 });
    }

    return new Response('Invalid request', { status: 400 });
  }
}
