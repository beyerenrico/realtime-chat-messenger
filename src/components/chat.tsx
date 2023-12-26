'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { LucideSend } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
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
    await SendMessage(data.content);
  };

  if (!session) return null;

  return (
    <>
      <div className='-m-4 md:-m-6 px-4 overflow-y-scroll h-full max-h-[calc(100vh-8rem)]' style={{ height: `calc(100vh - ${textareaHeight}px - 5rem)` }}>
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
                    <div className={cn('flex items-center space-x-2 max-w-[80%]', {
                      'flex-row-reverse': isCurrentUser,
                    })}>
                      <div className='flex items-center'>
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
      <div className='bg-background/80 -mx-4 md:-mx-6 mt-4 md:mt-6 px-4 pt-1 flex items-center relative' style={{ height: `calc(${textareaHeight}px + 0.25rem)` }}>
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
            <Button
              type='submit'
              className='flex items-center justify-center'
              isLoading={isLoading}
              disabled={isLoading}
            >
              <span className='sr-only'>Send message to {chatPartner.name}</span>
              <LucideSend size={20} />
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Chat;
