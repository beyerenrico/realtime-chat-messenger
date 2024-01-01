import { FC, ReactNode } from 'react';
import DashboardContentDesktop from '@/components/dashboard-content-desktop';
import DashboardContentMobile from '@/components/dashboard-content-mobile';
import DashboardHeader from '@/components/dashboard-header';

type DashboardLayoutGroupProps = {
  children: ReactNode;
};

const DashboardLayoutGroup: FC<DashboardLayoutGroupProps> = ({ children }) => {
  return (
    <div className='h-[100svh] grid grid-rows-dashboard-layout'>
      <DashboardHeader />
      <div className='hidden md:block max-h-dashboard-layout'>
        <DashboardContentDesktop>{children}</DashboardContentDesktop>
      </div>
      <div className='md:hidden max-h-dashboard-layout'>
        <DashboardContentMobile>{children}</DashboardContentMobile>
      </div>
    </div>
  );
};

export default DashboardLayoutGroup;
