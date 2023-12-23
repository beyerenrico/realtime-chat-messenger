'use client';

import Image from 'next/image';
import {signIn} from 'next-auth/react';
import {FC, useState} from 'react';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

type SignInProps = {};

const providers = [
  {
    name: 'Google',
    id: 'google',
  },
  {
    name: 'Github',
    id: 'github',
  }
];

const SignIn: FC<SignInProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  async function loginWithOAuthProvider(provider: string) {
    setIsLoading(true);

    try {
      await signIn(provider);
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'There was a problem with your request.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='min-h-full flex items-center justify-center p-4'>
        <Card>
          <CardHeader>
            <CardTitle>
              Sign in to your account
            </CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 space-y-2'>
            {providers.map((provider) => (
              <Button key={provider.id} isLoading={isLoading} onClick={() => loginWithOAuthProvider(provider.id)} className='flex' size='lg'>
                {!isLoading && <Image src={`/${provider.id}-logo.svg`} alt={`Sign in with ${provider.name}`} width={20} height={20} />}
                Continue with {provider.name}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignIn;
