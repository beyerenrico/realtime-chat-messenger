import { Session } from 'next-auth';
import { FC, ReactNode } from 'react';

type DashboardContentMobileProps = {
  children: ReactNode;
  session: Session;
}

const DashboardContentMobile: FC<DashboardContentMobileProps> = ({ children, session }) => {
  return (
    <div className='p-4'>
      {children}
    </div>
  );
};

export default DashboardContentMobile;
