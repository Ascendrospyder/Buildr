import React, { useTransition } from 'react';
import { Button } from './ui/button';
import { IoMdSave } from 'react-icons/io';
import useDesigner from './hooks/useDesigner';
import { UpdateFormContentDb } from '@/actions/form';
import { toast } from './ui/use-toast';
import { ImSpinner2 } from 'react-icons/im';

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const dataToSend = JSON.stringify(elements);
      await UpdateFormContentDb(id, dataToSend);
      toast({
        title: 'Congrats',
        description: 'Form successfully updated and saved!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Your form could not be saved, please try again.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <Button
      variant={'outline'}
      className='gap-2'
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <IoMdSave className='h-4 w-4' />
      Save
      {loading && <ImSpinner2 className='animate-spin' />}
    </Button>
  );
}

export default SaveFormBtn;
