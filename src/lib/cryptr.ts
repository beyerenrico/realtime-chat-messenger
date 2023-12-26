import Cryptr from 'cryptr';
import { getEnvironmentVariable } from '@/lib/utils';

export const cryptr = new Cryptr(getEnvironmentVariable('ENCRYPTION_KEY'));
