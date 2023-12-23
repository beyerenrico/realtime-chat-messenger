'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LucidePlus } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addFriendValidator } from '@/lib/validations/add-friend';

type AddFriendButtonProps = {};

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
    defaultValues: {
      email: '',
    }
  });

  const AddFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await fetch('/api/friends/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: validatedEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success('Friend request sent');
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        form.setError('email', {
          message: error.message,
        });
        return;
      }

      form.setError('email', {
        message: 'Uh! Something went wrong. Please try again later.',
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    await AddFriend(data.email);
  };

  return (
    <Form {...form}>
      <form className='max-w-sm w-full space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add friend by email</FormLabel>
              <FormControl>
                <Input {...field} type='email' id='email' placeholder='friend@example.com' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='mb-2'>
          <LucidePlus size={16} />
          Add
        </Button>
      </form>
    </Form>
  );
};

export default AddFriendButton;
