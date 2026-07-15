import { useUIStore } from '@/store';
import { Drawer } from './Drawer';

export function GlobalDrawer() {
  const { drawerContent, drawerPosition, closeDrawer } = useUIStore();

  return (
    <Drawer 
      isOpen={!!drawerContent} 
      onClose={closeDrawer} 
      position={drawerPosition}
    >
      {drawerContent}
    </Drawer>
  );
}
