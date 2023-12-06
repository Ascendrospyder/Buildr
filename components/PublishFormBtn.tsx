import React from 'react';
import { Button } from './ui/button';
import { MdPublish } from 'react-icons/md';

function PublishFormBtn() {
  return (
    <Button className='gap-2 text-white bg-gradient-to-r from-purple-600 to-blue-600 font-bold'>
      <MdPublish className='h-4 w-4' />
      Publish
    </Button>
  );
}

export default PublishFormBtn;
