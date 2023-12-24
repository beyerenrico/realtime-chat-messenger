'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { LucidePlus } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addFriendValidator } from '@/lib/validations/add-friend';

type AddFriendButtonProps = {};

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessState, setShowSuccessState] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
    defaultValues: {
      email: '',
    }
  });

  const AddFriend = async (email: string) => {
    try {
      setIsLoading(true);
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post('/api/friends/add', {
        email: validatedEmail
      });

      setShowSuccessState(true);
    } catch (error) {
      setShowSuccessState(false);

      if (error instanceof z.ZodError) {
        form.setError('email', {
          message: error.message,
        });
        return;
      }

      if (error instanceof AxiosError) {
        form.setError('email', {
          message: error.response?.data
        });
        return;
      }

      form.setError('email', {
        message: 'Uh! Something went wrong. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    await AddFriend(data.email);
  };

  return (
    <Form {...form}>
      <form className='grid grid-cols-1 max-w-md w-full space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Add friend by email</FormLabel>
                <FormControl>
                  <Input {...field} type='email' id='email' placeholder='friend@example.com' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-8' isLoading={isLoading}>
            <LucidePlus size={16} />
            Add
          </Button>
        </div>
        {showSuccessState && (
          <p className='text-sm font-medium text-success'>
            Friend request sent!
          </p>
        )}
      </form>
    </Form>
  );
};

export default AddFriendButton;
