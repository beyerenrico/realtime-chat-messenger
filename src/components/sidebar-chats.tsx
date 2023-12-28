'use client';

import { FC } from 'react';
import ChatList from '@/components/chat-list';

const SidebarChats: FC = () => {
  return (
    <div className='p-4 md:p-6'>
      <span className='text-xs font-semibold mb-4 text-slate-500 block'>Your Chats</span>
      <ChatList />
    </div>
  );
};

export default SidebarChats;
