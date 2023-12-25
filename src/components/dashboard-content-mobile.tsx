import { FC, ReactNode } from 'react';

type DashboardContentMobileProps = {
  children: ReactNode;
}

const DashboardContentMobile: FC<DashboardContentMobileProps> = ({ children }) => {
  return (
    <div className='p-4'>
      {children}
    </div>
  );
};

export default DashboardContentMobile;
