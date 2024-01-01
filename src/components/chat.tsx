'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { pusherClient } from '@/lib/pusher';
import { useStore } from '@/lib/store';
import { cn, toPusherKey } from '@/lib/utils';
import { Message } from '@/lib/validations/message';
import { sendMessageValidator } from '@/lib/validations/send-message';

type ChatProps = {
  chatPartner: Omit<User, 'emailVerified'>;
  initialMessages: Message[];
  chatId: string;
};

type FormData = z.infer<typeof sendMessageValidator>;

type Payload = {
  content: string;
  chatId: string
};

const Chat: FC<ChatProps> = ({ chatPartner, initialMessages, chatId }) => {
  const { session } = useStore();
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState<number | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(sendMessageValidator),
    defaultValues: {
      content: '',
    }
  });

  useEffect(() => {
    textareaRef.current?.focus();
    scrollDownRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(() => {
    textareaRef.current?.focus();
    scrollDownRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isLoading]);

  useEffect(() => {
    const messageSentHandler = (e: { message: Message, sender: User }) => {
      setChatMessages((prev) => [
        e.message,
        ...prev,
      ]);
    };

    pusherClient.subscribe(toPusherKey(`user:${session?.user.id}:send_message`));
    pusherClient.bind('send_message', messageSentHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${session?.user.id}:send_message`));
      pusherClient.unbind('send_message', messageSentHandler);
    };
  }, [session?.user.id]);

  if (!session) return null;

  const SendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      const { content: validatedMessage } = sendMessageValidator.parse({ content });
      const payload: Payload = {
        content: validatedMessage,
        chatId
      };

      await axios.post('/api/messages/send', payload);

      form.reset();
    } catch {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    const newMessage: Message = {
      id: nanoid(),
      senderId: session.user.id,
      recipientId: chatPartner.id,
      content: data.content,
      createdAt: Date.now(),
      seen: false,
    };
    setChatMessages((prev) => [
      newMessage,
      ...prev,
    ]);
    await SendMessage(data.content);
  };

  if (!session) return null;

  return (
    <>
      <div className='overflow-y-scroll flex-1 max-h-[calc(100svh-8rem)]'>
        {chatMessages.length === 0 && (
          <div className='flex items-center justify-center h-full'>
            <span className='text-lg opacity-50 text-center'>Start this conversation by sending a message</span>
          </div>
        )}

        {chatMessages.length > 0 && (
          <>
            <div className='flex items-center justify-center'>
              <span className='text-sm opacity-40 mt-4 text-center'>Start of the conversation</span>
            </div>

            <div className='chat flex flex-col-reverse'>
              <div ref={scrollDownRef}></div>
              {chatMessages.map((message) => {
                const isCurrentUser = message.senderId === session.user.id;
                const convertedDate = new Date(message.createdAt).toLocaleTimeString(navigator.language, {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div key={message.id} className={cn('flex', {
                    'justify-end group-right': isCurrentUser,
                    'justify-start group-left': !isCurrentUser,
                  })}>
                    <div className={cn('flex items-end gap-2 w-full', {
                      'flex-row-reverse': isCurrentUser,
                    })}>
                      <div className='w-8 h-8 flex-shrink-0'>
                        <Image
                          src={isCurrentUser ? (session.user.image || '') : chatPartner.image}
                          alt={`Profile image of ${isCurrentUser ? session.user.name : chatPartner.name}`}
                          width={32}
                          height={32}
                          className='w-8 h-8 !rounded-full bg-accent hidden'
                        />
                      </div>
                      <div className='flex items-center max-w-[70%]'>
                        <div className={cn('p-2 rounded-lg space-x-2', {
                          'bg-chat-sender text-chat-sender-foreground': isCurrentUser,
                          'bg-chat-recipient text-chat-recipient-foreground': !isCurrentUser,
                        })}>
                          <span>{message.content}</span>
                          <span className='block text-right text-xs opacity-50 mt-1'>{convertedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className='bg-background/80 flex-shrink-0 mt-4 md:mt-8 pt-2 flex items-center relative'>
        <Form {...form}>
          <form className='w-full h-full flex items-end gap-2' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormControl>
                    <Textarea
                      {...field}
                      onHeightChange={setTextareaHeight}
                      ref={textareaRef}
                      disabled={isLoading}
                      id='content'
                      placeholder={`Message to @${chatPartner.name}`}
                      className='h-full resize-none'
                      minRows={3}
                      maxRows={10}
                      maxLength={2000}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
};

export default Chat;
