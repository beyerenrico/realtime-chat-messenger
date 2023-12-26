import { z } from 'zod';

export const messageValidator = z.object({
  id: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
  content: z.string().max(2000),
  createdAt: z.number(),
  seen: z.boolean(),
});

export const messageListValidator = z.array(messageValidator);

export type Message = z.infer<typeof messageValidator>;
