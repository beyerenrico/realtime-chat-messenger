import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React, { FC } from 'react';
import DashboardLayoutGroup from '@/components/dashboard-layout-group';
import { authConfig } from '@/lib/auth';


type LayoutProps = {
  children: React.ReactNode;
}

const DashboardLayout: FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(authConfig);

  if (!session) notFound();

  return (
    <DashboardLayoutGroup session={session}>
      {children}
    </DashboardLayoutGroup>
  );
};

export default DashboardLayout;
