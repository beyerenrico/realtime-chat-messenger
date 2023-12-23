import {getServerSession} from 'next-auth';
import {authOptions} from '@/lib/auth';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default Dashboard;
