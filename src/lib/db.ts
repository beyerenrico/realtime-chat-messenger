import { Redis } from '@upstash/redis';
import { getEnvironmentVariable } from '@/lib/utils';

export const db = new Redis({
  url: getEnvironmentVariable('UPSTASH_REDIS_REST_URL'),
  token: getEnvironmentVariable('UPSTASH_REDIS_REST_TOKEN'),
});
