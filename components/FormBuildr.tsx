'use client';

import { formSchemaType } from '@/schemas/form';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Form } from '@prisma/client';
import PreviewDialogBtn from './PreviewDialogBtn';
import SaveFormBtn from './SaveFormBtn';
import PublishFormBtn from './PublishFormBtn';
import Designer from './Designer';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DraggableOverlayWrapper from './DraggableOverlayWrapper';
import useDesigner from './hooks/useDesigner';
import Loading from '@/app/(dashboard)/buildr/[id]/loading';
import { Input } from './ui/input';
import { FaCopy } from 'react-icons/fa6';
import { toast } from './ui/use-toast';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoIosArrowRoundForward } from 'react-icons/io';
import Confetti from 'react-confetti';

function FormBuildr({ form }: { form: Form }) {
  const { setElements } = useDesigner();
  // TODO: Maybe in the near future go ahead and think of a way to prevent delay
  const [isDataFetched, setIsDataFetched] = useState(false);

  // The following code creates a sensor for at least 10px to be
  // recognised as a drag and drop, this allows us to click the delete
  // design element button
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  // pull existing form components from the db to show existing
  // components if editing a form
  useEffect(() => {
    const elements = JSON.parse(form.content); // parse existing content in db
    setElements(elements);
  }, [form, setElements]);

  const sensors = useSensors(mouseSensor, touchSensor);

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  // if the form is published show a different UI
  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
        <div className='flex flex-col items-center justify-center h-full w-full '>
          <div className='max-w-md'>
            <h1 className='text-center text-4xl font-bold text-[#bc0a63] border-b pb-2 mb-10'>
              Your Form Was Published 🕺🎉🥳
            </h1>
            <h2 className='text-2xl font-semibold text-center'>
              Don&apos;t be shy, share this form!
            </h2>
            <h3 className='text-lg text-muted-foreground border-b pb-6 pt-2'>
              Anyone with this link can view and submit the form!
            </h3>
            <div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
              <Input readOnly value={shareUrl} />
              <Button
                className='mt-2 w-full bg-[#bc0a63]'
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: 'Successfully copied url to clipboard 🥳',
                  });
                }}
              >
                Copy Link <FaCopy className='ml-2 w-4 h-4' />
              </Button>
            </div>
            <div className='flex justify-between'>
              <Button
                variant={'link'}
                asChild
                className='text-[#bc0a63] text-md font-semibold'
              >
                <Link href={'/'} className='gap-2'>
                  <IoIosArrowRoundBack className='w-7 h-7' />
                  Go Back Home
                </Link>
              </Button>
              <Button
                variant={'link'}
                asChild
                className='text-[#bc0a63] text-md font-semibold'
              >
                <Link href={`/forms/${form.id}`} className='gap-2'>
                  Form Details
                  <IoIosArrowRoundForward className='w-7 h-7' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className='flex flex-col w-full'>
        <nav className='flex justify-between border-b-2 p-4 gap-3 items-center'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form:</span>
            {form.name}
          </h2>
          <div className='flex items-center gap-4 '>
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/topographyNormal.svg)] dark:bg-[url(/topographyDark.svg)]'>
          <Designer />
        </div>
      </main>
      <DraggableOverlayWrapper />
    </DndContext>
  );
}

export default FormBuildr;
