import { Session } from 'next-auth';
import { FC, ReactNode } from 'react';
import DashboardContentDesktop from '@/components/dashboard-content-desktop';
import DashboardContentMobile from '@/components/dashboard-content-mobile';
import DashboardHeader from '@/components/dashboard-header';

type DashboardLayoutGroupProps = {
  children: ReactNode;
  session: Session;
};

const DashboardLayoutGroup: FC<DashboardLayoutGroupProps> = async ({ children, session }) => {
  return (
    <div className='h-full grid grid-rows-dashboard-layout'>
      <DashboardHeader session={session} />
      <div className='hidden md:block max-h-dashboard-layout'>
        <DashboardContentDesktop session={session}>{children}</DashboardContentDesktop>
      </div>
      <div className='md:hidden'>
        <DashboardContentMobile session={session}>{children}</DashboardContentMobile>
      </div>
    </div>
  );
};

export default DashboardLayoutGroup;
