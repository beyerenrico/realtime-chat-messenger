'use client';

import { FC, ReactNode } from 'react';
import SidebarChats from '@/components/sidebar-chats';
import SidebarFooter from '@/components/sidebar-footer';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

type DashboardContentDesktopProps = {
  children: ReactNode;
};

const DashboardContentDesktop: FC<DashboardContentDesktopProps> = ({ children }) => {
  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel defaultSize={15} className='min-w-[250px] flex flex-col justify-between'>
        <div className='flex-grow overflow-y-scroll'>
          <SidebarChats />
        </div>
        <SidebarFooter />
      </ResizablePanel>
      <ResizableHandle withHandle/>
      <ResizablePanel defaultSize={85}>
        <div className='p-6'>
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default DashboardContentDesktop;
