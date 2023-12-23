import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';

const Dashboard = async () => {
  const session = await getServerSession(authConfig);

  if (!session) notFound();

  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default Dashboard;
