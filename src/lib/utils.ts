import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEnvironmentVariable (name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

export function chatIdConstructor (user1: string, user2: string) {
  return [user1, user2].sort().join('--');
}

export function chatHrefConstructor (user1: string, user2: string) {
  return `/dashboard/chat/${chatIdConstructor(user1, user2)}`;
}

export const toPusherKey = (key: string) => key.replace(/:/g, '__');
