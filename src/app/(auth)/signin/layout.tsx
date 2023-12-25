import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
}

export default async function SignInLayout ({ children }: LayoutProps) {
  return (
    <div className='h-full grid place-items-center'>
      {children}
    </div>
  );
}
