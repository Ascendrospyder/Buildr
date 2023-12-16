import React, { startTransition, useState, useTransition } from 'react';
import { Button } from './ui/button';
import { MdPublish } from 'react-icons/md';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from './ui/use-toast';
import { PublishFormDb } from '@/actions/form';
import { useRouter } from 'next/navigation';

function PublishFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const publishForm = async () => {
    try {
      await PublishFormDb(id);
      toast({
        title: 'Congrats',
        description: 'Your form was successfully published 🥳',
      });
      // after submitting go ahead and refresh the page
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Your form could not be published, please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className='gap-2 text-white bg-gradient-to-r from-purple-600 to-blue-600 font-bold'>
          <MdPublish className='h-4 w-4' />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl'>
            Are you sure you wish to publish your form?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-md text-muted-foreground'>
            This action{' '}
            <strong>
              <u>cannot</u>
            </strong>{' '}
            be undone. This will permanently publish your form and you will{' '}
            <strong>
              <u>not</u>
            </strong>{' '}
            be able to make further changes or edits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-[#bc0a63]'
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Continue {loading && <ImSpinner2 className='animate-spin ml-1' />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
