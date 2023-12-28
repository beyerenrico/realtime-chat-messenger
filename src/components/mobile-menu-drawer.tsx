import { LucideMenu } from 'lucide-react';
import { FC } from 'react';
import SidebarChats from '@/components/sidebar-chats';
import SidebarFooter from '@/components/sidebar-footer';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';

const MobileMenuDrawer: FC = () => {
  return (
    <div className='md:hidden'>
      <Drawer>
        <DrawerTrigger>
          <div className='border rounded h-10 w-10 flex items-center justify-center'>
            <LucideMenu size={24}/>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <SidebarChats />
          <Separator />
          <SidebarFooter />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenuDrawer;
