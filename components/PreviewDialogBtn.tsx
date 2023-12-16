import React from 'react';
import { Button } from './ui/button';
import { MdPreview } from 'react-icons/md';
import useDesigner from './hooks/useDesigner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormElements } from './FormElements';

function PreviewDialogBtn() {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'} className='gap-2'>
          <MdPreview className='h-5 w-5' />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
        <div className='px-4 py-4 border-b'>
          <p className='text-muted-foreground text-lg font-bold'>
            Preview Buildr Form
          </p>
          <p className='text-sm text-muted-foreground'>
            This is how your forms look like to your users!
          </p>
        </div>
        <div className='bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/topographyNormal.svg)] dark:bg-[url(/topographyDark.svg)] overflow-y-auto'>
          {/* Holds all the content for our preview */}
          <div className='max-w-[700px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto'>
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;

              return <FormComponent key={element.id} elementInstance={element} />
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialogBtn;
