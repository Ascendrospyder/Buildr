'use client';

import React, { useState } from 'react';
import DesignerSidebar from './DesignerSidebar';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from './FormElements';
import useDesigner from './hooks/useDesigner';
import { idGenerator } from '@/lib/idGenerator';

function Designer() {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: 'design-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(0, newElement);
      }
    },
  });
  // const [elements, setElements] = useState<FormElementInstance, null>(null);

  return (
    <div className='flex w-full h-full'>
      <div className='p-4 w-full'>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary/20'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <div className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
              Drop Here
            </div>
          )}
          {droppable.isOver && (
            <div className='p-4 w-full'>
              <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className='flex flex-col w-full p-4 gap-2'>
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const DesignerElement = FormElements[element.type].designerComponent;
  const topHalfDroppable = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalfDroppable = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  return (
    <div className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'>
      <div
        ref={topHalfDroppable.setNodeRef}
        className='absolute w-full h-1/2 rounded-t-md'
      ></div>
      <div
        ref={bottomHalfDroppable.setNodeRef}
        className='absolute w-full bottom-0 h-1/2 rounded-b-md'
      ></div>
      <div className='flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none'>
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
};

export default Designer;
