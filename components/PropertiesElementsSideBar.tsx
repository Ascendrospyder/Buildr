import React from 'react';
import useDesigner from './hooks/useDesigner';
import { FormElements } from './FormElements';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from './ui/button';

function PropertiesElementsSideBar() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;
  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-between items-center mb-2'>
        <p className='text-md text-muted-foreground animate-pulse'>
          Element Properties
        </p>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesElementsSideBar;
