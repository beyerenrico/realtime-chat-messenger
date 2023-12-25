import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Heading1 } from '@/components/ui/typography';
import { authConfig } from '@/lib/auth';

const Dashboard = async () => {
  const session = await getServerSession(authConfig);

  if (!session) notFound();

  return (
    <div>
      <Heading1>Dashboard</Heading1>
    </div>
  );
};

export default Dashboard;
