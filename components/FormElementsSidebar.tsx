import React from 'react';
import SidebarBtnElement from './SidebarBtnElement';
import { FormElements } from './FormElements';
import { Separator } from './ui/separator';

function FormElementsSidebar() {
  return (
    <div>
      <p className='text-md text-foreground/50'>Drag and Drop Elements</p>
      <Separator className='my-3' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 place-items-center'>
        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-center'>
          Layout Elements
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubtitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />

        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-center'>
          Form Elements
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
}

export default FormElementsSidebar;
