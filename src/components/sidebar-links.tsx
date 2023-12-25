'use client';

import { LucideIcon, LucideUserPlus2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import FriendRequestSidebarMenuItem from '@/components/friend-request-sidebar-menu-item';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

type MenuItem = {
  id: number;
  name: string;
  href: string;
  Icon: LucideIcon;
}

const sidebarMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Add Friend',
    href: '/dashboard/add',
    Icon: LucideUserPlus2,
  }
];

const SidebarLinks: FC = () => {
  const pathName = usePathname();
  const { session, unseenFriendRequestsCount } = useStore();

  if (!session) return null;

  return (
    <div className='p-4 md:p-6'>
      <span className='text-xs font-semibold mb-2 text-slate-500 block'>Overview</span>
      <nav>
        <ul role='list' className='grid gap-2'>
          {sidebarMenuItems.map(({ id, href, name, Icon }) => (
            <li key={id}>
              <Button variant='ghost' className={cn(
                { 'bg-accent': pathName === href },
                'w-full justify-start'
              )} asChild>
                <Link href={href}>
                  <Icon size={20} />
                  <span className='truncate'>{name}</span>
                </Link>
              </Button>
            </li>
          ))}
          <FriendRequestSidebarMenuItem sessionId={session.user.id} initialUnseenFriendRequestsCount={unseenFriendRequestsCount} />
        </ul>
      </nav>
    </div>
  );
};

export default SidebarLinks;
