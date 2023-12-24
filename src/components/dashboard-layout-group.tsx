'use client';

import { Session } from 'next-auth';
import { FC } from 'react';
import { ModeToggle } from '@/components/theme-toggle';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Paragraph } from '@/components/ui/typography';

type DashboardLayoutGroupProps = {
  children: React.ReactNode;
  session: Session;
};

const DashboardLayoutGroup: FC<DashboardLayoutGroupProps> = ({ children, session }) => {
  return (
    <div className='h-full overflow-hidden'>
      <div className='border-b px-6 h-16 flex items-center justify-between'>
        <span className='font-bold'>Realtime Chat Messenger</span>
        <ModeToggle />
      </div>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={15}>
          <div className='grid grid-cols-1 p-6'>
            <Paragraph>{session.user.name}</Paragraph>
            <Paragraph>{session.user.email}</Paragraph>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <div className='p-6'>
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DashboardLayoutGroup;
