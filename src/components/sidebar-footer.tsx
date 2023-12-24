'use client';

import { LucideLoader2, LucideLogOut, LucideUserRound } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import SidebarLinks from '@/components/sidebar-links';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const SidebarFooter: FC<{session: Session}> = ({ session }) => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
    } catch (error) {
      toast.error('There was a problem signing out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div>
      <Separator />
      <SidebarLinks session={session} />
      <Separator />
      <div className='flex gap-2 p-4 md:p-6 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar className='h-8 w-8'>
            {session.user.image && <AvatarImage src={session.user.image} />}
            <AvatarFallback>
              <LucideUserRound size={18} />
            </AvatarFallback>
          </Avatar>
          <div className='grid'>
            <p className='font-medium truncate'>{session.user.name}</p>
            <p className='text-xs font-medium truncate'>{session.user.email}</p>
          </div>
        </div>
        <Button size='icon' variant='outline' onClick={handleSignOut} className='flex-shrink-0'>
          {isSigningOut ? <LucideLoader2 size={14} className='animate-spin' /> : <LucideLogOut size={14} />}
        </Button>
      </div>
    </div>
  );
};

export default SidebarFooter;
