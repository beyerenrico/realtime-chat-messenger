import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';

type LayoutProps = {
  children: React.ReactNode;
}

export default async function SignInLayout ({ children }: LayoutProps) {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className='h-full'>
      {children}
    </div>
  );
}
