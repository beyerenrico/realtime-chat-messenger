import Link from 'next/link';
import { FC } from 'react';
import MobileMenuDrawer from '@/components/mobile-menu-drawer';
import { ModeToggle } from '@/components/theme-toggle';

const DashboardHeader: FC = () => {
  return (
    <div className='border-b px-4 md:px-6 h-16 flex items-center justify-between'>
      <Link href='/' className='font-bold'>Realtime Chat Messenger</Link>
      <div className='flex gap-2 items-center'>
        <ModeToggle />
        <MobileMenuDrawer />
      </div>
    </div>
  );
};

export default DashboardHeader;
