'use client';

import axios from 'axios';
import { LucideUserRound, LucideX } from 'lucide-react';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type PendingFriendRequestCardProps = {
  user: Awaited<IncomingFriendRequest>;
  onHandleFriendRequest: (id: string) => void;
}

const PendingFriendRequestCard: FC<PendingFriendRequestCardProps> = ({ user, onHandleFriendRequest }) => {
  const cancelFriendRequest = async () => {
    await axios.post('/api/requests/cancel', { id: user.id });
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
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={cancelFriendRequest} className='bg-destructive p-2 rounded-lg text-destructive-foreground hover:bg-destructive/90 transition'>
              <LucideX size={18}/>
              <span className='sr-only'>Cancel Pending Friend Request</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cancel Request</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PendingFriendRequestCard;
