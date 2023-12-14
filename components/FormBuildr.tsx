'use client';

import { formSchemaType } from '@/schemas/form';
import React from 'react';
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

function FormBuildr({ form }: { form: Form }) {
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

  const sensors = useSensors(mouseSensor, touchSensor);
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
                <SaveFormBtn />
                <PublishFormBtn />
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
