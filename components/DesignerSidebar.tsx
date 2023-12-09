import React from 'react';
import { FormElement, FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';

function DesignerSidebar() {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  );
}

export default DesignerSidebar;
