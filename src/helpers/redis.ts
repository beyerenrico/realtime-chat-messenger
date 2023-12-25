import { notFound } from 'next/navigation';
import { z } from 'zod';
import { getEnvironmentVariable } from '@/lib/utils';
import { messageListValidator } from '@/lib/validations/message';

const upstashRedisRestUrl = getEnvironmentVariable('UPSTASH_REDIS_REST_URL');
const upstashRedisRestToken = getEnvironmentVariable('UPSTASH_REDIS_REST_TOKEN');

type Command = 'zrange' | 'sismember' | 'get' | 'smembers';

export async function fetchRedis (
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${upstashRedisRestToken}`
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  const data = await response.json();

  return data.result;
}

export async function getMultipleUsersById (ids: string[]) {
  const promises = ids.map(async (id) => {
    const sender = (await fetchRedis('get', `user:${id}`)) as string | null;

    if (!sender) return {} as Omit<User, 'emailVerified'>;

    const parsedSender = JSON.parse(sender) as User;

    return {
      id,
      email: parsedSender.email,
      name: parsedSender.name,
      image: parsedSender.image
    } as Omit<User, 'emailVerified'>;
  });

  return await Promise.all(promises);
}

export async function getIncomingFriendRequests (userId: string) {
  const requests = await fetchRedis('smembers', `user:${userId}:incoming_friend_requests`);

  return getMultipleUsersById(requests);
}

export async function getPendingFriendRequests (userId: string) {
  const requests = await fetchRedis('smembers', `user:${userId}:pending_friend_requests`);

  return getMultipleUsersById(requests);
}

export async function checkIfUserIsFriend (userId: string, friendId: string) {
  const isAlreadyFriend = (await fetchRedis(
    'sismember',
    `user:${userId}:friends`,
    friendId
  )) as 0 | 1;

  if (Boolean(isAlreadyFriend)) {
    return new Response('User is already a friend', { status: 400 });
  }
}

export async function checkIfHasFriendRequestFromUser (userId: string, friendId: string) {
  const hasFriendRequestFromUser = (await fetchRedis(
    'sismember',
    `user:${userId}:incoming_friend_requests`,
    friendId
  )) as 0 | 1;

  if (Boolean(hasFriendRequestFromUser)) {
    return new Response('You already have a friend request from this user.', { status: 400 });
  }
}

export async function checkIfAlreadyAdded (userId: string, friendId: string) {
  const isAlreadyAdded = (await fetchRedis(
    'sismember',
    `user:${friendId}:incoming_friend_requests`,
    userId
  )) as 0 | 1;

  if (Boolean(isAlreadyAdded)) {
    return new Response('You already sent a friend request to this user.', { status: 400 });
  }
}

export async function checkIfFriendRequestExists (userId: string, friendId: string) {
  const friendRequestExits = (await fetchRedis(
    'sismember',
    `user:${userId}:incoming_friend_requests`,
    friendId
  )) as 0 | 1;

  if (!Boolean(friendRequestExits)) {
    return new Response('You do not have a friend request from this user.', { status: 400 });
  }
}

export async function getChatMessages (chatId: string) {
  try {
    const result: string[] = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1);

    const messages = result.map((message) => JSON.parse(message) as Message);
    const reversedMessages = messages.reverse();

    return messageListValidator.parse(reversedMessages);
  } catch (error) {
    return notFound();
  }
}
