import { FC } from 'react';
import AddFriendButton from '@/components/add-friend-button';
import { Heading1 } from '@/components/ui/typography';

const AddPage: FC = () => {
  return (
    <div className='space-y-4'>
      <Heading1>Add a friend</Heading1>
      <AddFriendButton />
    </div>
  );
};

export default AddPage;
