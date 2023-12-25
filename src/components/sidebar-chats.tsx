'use client';

import { LucideUserRound } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { chatHrefConstructor, cn } from '@/lib/utils';

const SidebarChats: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { session, friends } = useStore();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev.filter((message) => !pathname.includes(message.senderId));
      });
    }
  }, [pathname]);

  if (!session) return null;
  if (!friends) return null;

  return (
    <div className='p-4 md:p-6'>
      <span className='text-xs font-semibold mb-4 text-slate-500 block'>Your Chats</span>
      <nav>
        <ul role='list' className='space-y-2 overflow-hidden'>
          {friends.sort().map((friend) => {
            const unseenMessagesCount = unseenMessages.filter((message) => message.senderId === friend.id).length;

            return (
              <li key={friend.id}>
                <Button variant='ghost' className={cn(
                  { 'bg-accent': pathname === chatHrefConstructor(session.user.id, friend.id) },
                  'w-full flex justify-start py-8'
                )} asChild>
                  <a href={chatHrefConstructor(session.user.id, friend.id)}>
                    <div className='flex-shrink-0'>
                      <Avatar className='w-6 h-6'>
                        <AvatarImage src={friend.image}/>
                        <AvatarFallback><LucideUserRound size={14}/></AvatarFallback>
                      </Avatar>
                    </div>
                    <div className='truncate'>
                      <p className='text-sm font-medium truncate'>{friend.name}</p>
                      <p className='text-xs truncate text-slate-500'>
                        Show latest message of chat
                      </p>
                    </div>
                    {unseenMessagesCount > 0 && (
                      <Badge className='ml-auto'>
                        {unseenMessagesCount}
                      </Badge>
                    )}
                  </a>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarChats;
