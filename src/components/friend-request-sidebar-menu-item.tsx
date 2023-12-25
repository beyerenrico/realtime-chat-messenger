'use client';

import { LucideRadio } from 'lucide-react';
import Link from 'next/link';
import { notFound, usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

type FriendRequestSidebarMenuItemProps = {};

const FriendRequestSidebarMenuItem: FC<FriendRequestSidebarMenuItemProps> = ({}) => {
  const { session, unseenFriendRequestsCount } = useStore();
  const pathName = usePathname();
  const menuItem = {
    id: 2,
    name: 'Friend Requests',
    href: '/dashboard/requests',
    Icon: LucideRadio,
  };

  if (!session) notFound();

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
