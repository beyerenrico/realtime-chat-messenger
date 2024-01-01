import { FC, ReactNode } from 'react';

type DashboardContentMobileProps = {
  children: ReactNode;
}

const DashboardContentMobile: FC<DashboardContentMobileProps> = ({ children }) => {
  return (
    <div className='h-full p-4 flex flex-col justify-between'>
      {children}
    </div>
  );
};

export default DashboardContentMobile;
