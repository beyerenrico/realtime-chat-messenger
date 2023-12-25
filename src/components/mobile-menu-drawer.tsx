import { LucideMenu } from 'lucide-react';
import { FC } from 'react';
import SidebarFooter from '@/components/sidebar-footer';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

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
          <SidebarFooter />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenuDrawer;
