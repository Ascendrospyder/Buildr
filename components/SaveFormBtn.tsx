import React from 'react';
import { Button } from './ui/button';
import { IoMdSave } from 'react-icons/io';

function SaveFormBtn() {
  return (
    <Button variant={'outline'} className='gap-2'>
      <IoMdSave className='h-4 w-4' />
      Save
    </Button>
  );
}

export default SaveFormBtn;
