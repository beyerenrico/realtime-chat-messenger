'use client';

import axios from 'axios';
import { LucideCheck, LucideUserRound, LucideX } from 'lucide-react';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useStore } from '@/lib/store';

type IncomingFriendRequestCardProps = {
  user: Awaited<IncomingFriendRequest>;
  onHandleFriendRequest: (id: string) => void;
}

const IncomingFriendRequestCard: FC<IncomingFriendRequestCardProps> = ({ user, onHandleFriendRequest }) => {
  const { session } = useStore();

  const acceptFriendRequest = async () => {
    await axios.post('/api/requests/accept', { id: user.id });
    onHandleFriendRequest(user.id);
  };

  const declineFriendRequest = async () => {
    await axios.post('/api/requests/decline', { id: user.id });
    onHandleFriendRequest(user.id);
  };

  return (
    <div className='border rounded-lg inline-flex items-center gap-4 p-4'>
      <Avatar>
        <AvatarImage src={user.image}/>
        <AvatarFallback><LucideUserRound size={18}/></AvatarFallback>
      </Avatar>
      <div>
        <p className='font-semibold'>{user.name}</p>
        <p className='text-sm'>{user.email}</p>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={acceptFriendRequest} className='bg-success p-2 rounded-lg text-success-foreground hover:bg-success/90 transition'>
              <LucideCheck size={18}/>
              <span className='sr-only'>Accept Incoming Friend Request</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Accept</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={declineFriendRequest} className='bg-destructive p-2 rounded-lg text-destructive-foreground hover:bg-destructive/90 transition'>
              <LucideX size={18}/>
              <span className='sr-only'>Decline Incoming Friend Request</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Decline</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default IncomingFriendRequestCard;
