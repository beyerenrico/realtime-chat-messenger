'use client';

import { LucideRadio } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FriendRequestSidebarMenuItemProps = {
  sessionId: string;
  initialUnseenFriendRequestsCount: number;
};

const FriendRequestSidebarMenuItem: FC<FriendRequestSidebarMenuItemProps> = ({ sessionId, initialUnseenFriendRequestsCount }) => {
  const [unseenFriendRequestsCount, setUnseenFriendRequestsCount] = useState<number>(initialUnseenFriendRequestsCount);
  const pathName = usePathname();
  const menuItem = {
    id: 2,
    name: 'Friend Requests',
    href: '/dashboard/requests',
    Icon: LucideRadio,
  };

  return (
    <li>
      <Button variant='ghost' className={cn(
        { 'bg-accent': pathName === menuItem.href },
        'w-full justify-start'
      )} asChild>
        <Link href={menuItem.href}>
          <menuItem.Icon size={20} />
          <span className='truncate'>{menuItem.name}</span>
          {unseenFriendRequestsCount > 0 && (
            <Badge>{unseenFriendRequestsCount}</Badge>
          )}
        </Link>
      </Button>
    </li>
  );
};

export default FriendRequestSidebarMenuItem;
