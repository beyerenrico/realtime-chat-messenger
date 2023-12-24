import { FC } from 'react';

const SidebarChats: FC = () => {
  return (
    <div className='p-4 md:p-6'>
      <span className='text-xs font-semibold mb-2 text-slate-500 block'>Your Chats</span>
      <nav>
        <ul role='list' className='grid gap-2'></ul>
      </nav>
    </div>
  );
};

export default SidebarChats;
