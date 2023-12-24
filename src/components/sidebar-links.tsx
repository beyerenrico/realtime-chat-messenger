'use client';

import { LucideIcon, LucideRadio, LucideUserPlus2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
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
  },
  {
    id: 2,
    name: 'Friend Requests',
    href: '/dashboard/requests',
    Icon: LucideRadio,
  }
];

const SidebarLinks: FC<{session: Session}> = ({ session }) => {
  const pathName = usePathname();

  return (
    <div className=' p-4 md:p-6'>
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
        </ul>
      </nav>
    </div>
  );
};

export default SidebarLinks;
