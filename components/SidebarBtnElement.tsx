import React from 'react';
import { FormElement } from './FormElements';
import { Button } from './ui/button';

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button
      variant={'outline'}
      className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'
    >
      <Icon className='h-8 w-8 text-pink-600 cursor-grab' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
}

export default SidebarBtnElement;
