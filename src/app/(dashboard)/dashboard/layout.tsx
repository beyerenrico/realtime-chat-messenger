import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import DashboardLayoutGroup from '@/components/dashboard-layout-group';
import { authConfig } from '@/lib/auth';

export default async function DashboardLayout ({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfig);

  if (!session) notFound();

  return (
    <DashboardLayoutGroup session={session}>
      {children}
    </DashboardLayoutGroup>
  );
}
