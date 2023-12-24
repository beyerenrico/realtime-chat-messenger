import Link from 'next/link';
import { Session } from 'next-auth';
import { FC } from 'react';
import MobileMenuDrawer from '@/components/mobile-menu-drawer';
import { ModeToggle } from '@/components/theme-toggle';

type DashboardHeaderProps = {
  session: Session;
};

const DashboardHeader: FC<DashboardHeaderProps> = ({ session }) => {
  return (
    <div className='border-b px-4 md:px-6 h-16 flex items-center justify-between'>
      <Link href='/' className='font-bold'>Realtime Chat Messenger</Link>
      <div className='flex gap-2 items-center'>
        <ModeToggle />
        <MobileMenuDrawer session={session} />
      </div>
    </div>
  );
};

export default DashboardHeader;
