import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heading1, Heading2 } from '@/components/ui/typography';

type HomeProps = {

};

const Home: FC<HomeProps> = ({}) => {
  return (
    <main className='grid grid-cols-1 p-24'>
      <Heading1>Hello World!</Heading1>
      <Heading2>Subheading</Heading2>
      <Separator className='my-4' />
      <div className='grid grid-cols-2 gap-4'>
        <Button isLoading={true}>Loading Button</Button>
        <Button>Button</Button>
        <Button variant='outline' isLoading={true}>Outline Loading Button</Button>
        <Button variant='outline'>Outline Button</Button>
      </div>
    </main>
  );
};

export default Home;
