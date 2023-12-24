import { redirect } from 'next/navigation';
import { FC } from 'react';

const Home: FC = ({}) => {
  redirect('/signin');
};

export default Home;
