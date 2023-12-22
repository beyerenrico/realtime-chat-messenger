import {FC} from 'react';
import Typography from '@/components/ui/typography';

type HomeProps = {

};

const Home: FC<HomeProps> = ({}) => {
  return (
    <main className='grid grid-cols-1 p-24'>
      <Typography type='h1'>Hello World!</Typography>
    </main>
  );
};

export default Home;
