'use client';

import React, { useState } from 'react';
import DesignerSidebar from './DesignerSidebar';
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from './FormElements';
import useDesigner from './hooks/useDesigner';
import { idGenerator } from '@/lib/idGenerator';
import { Button } from './ui/button';
import { FaTrashAlt } from 'react-icons/fa';

function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();

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
      const isDroppingOverDesignDropArea =
        over.data?.current?.isDesignerDropArea;

      // scenario 1: where I add element into the drop zone but not between
      if (isDesignerBtnElement && isDroppingOverDesignDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        // initially dropping at first position however should be at last pos
        addElement(elements.length, newElement);
        return;
      }

      // scenario 2: where I have to place a field in between existing design elements
      // this could be either top or bottom
      const isDroppingOverDesignElementTop =
        over.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignElementBottom =
        over.data?.current?.isBottomHalfDesignerElement;

      if (
        isDesignerBtnElement &&
        (isDroppingOverDesignElementTop || isDroppingOverDesignElementBottom)
      ) {
        console.log('Is this getting called?');
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overId = over.data?.current?.elementId;
        const overElementIdx = elements.findIndex((el) => el.id === overId);

        if (overElementIdx === -1) {
          throw new Error('Element was not found');
        }

        // lets inititally set idx to the top half, however if its at the
        // bottom just minus 1 to the index
        let idx = overElementIdx;

        if (isDroppingOverDesignElementBottom) {
          idx = overElementIdx - 1;
        }

        addElement(idx, newElement);
      }

      // scenario 3: dragging an existing element on to the top or bottom
      // TODO: Fix the issue where dragging to move elements existing in the drag and drop zone
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      if (
        (isDroppingOverDesignElementTop || isDroppingOverDesignElementBottom) &&
        isDraggingDesignerElement
      ) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIdx = elements.findIndex((el) => el.id === activeId);
        const overElementIdx = elements.findIndex((el) => el.id === overId);

        if (activeElementIdx === -1 || overElementIdx === -1) {
          throw new Error('Element not found');
        }

        const currentActiveElements = { ...elements[activeElementIdx] };
        removeElement(activeId);

        // console.log(
        //   'dropping at bottom = ' + isDroppingOverDesignElementBottom
        // );
        // console.log('dropping at top = ' + isDroppingOverDesignElementTop);

        // lets inititally set idx to the top half, however if its at the
        // bottom just minus 1 to the index
        let idx = overElementIdx;
        if (isDroppingOverDesignElementBottom) {
          idx = overElementIdx + 1;
        }

        addElement(idx, currentActiveElements);
      }
    },
  });
  // const [elements, setElements] = useState<FormElementInstance, null>(null);

  return (
    <div className='flex w-full h-full'>
      <div
        className='p-4 w-full'
        onClick={(e) => {
          // the moment I click on an element set it to null in case I click
          // outside the box
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-4 ring-primary/50'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <div className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
              Drop Here
            </div>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className='p-4 w-full'>
              <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className='flex flex-col w-full p-4 gap-2'>
              {elements.map((element) => (
                <DesignerElementWrapper
                  key={element.id}
                  element={element}
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                />
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
  selectedElement,
  setSelectedElement,
}: {
  element: FormElementInstance;
  selectedElement: FormElementInstance | null;
  setSelectedElement: (element: FormElementInstance | null) => void;
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const DesignerElement = FormElements[element.type].designerComponent;
  const topHalfDroppable = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const { removeElement } = useDesigner();

  const bottomHalfDroppable = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
      onMouseOver={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(event) => {
        event.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalfDroppable.setNodeRef}
        className='absolute w-full h-1/2 rounded-t-md'
      ></div>
      <div
        ref={bottomHalfDroppable.setNodeRef}
        className='absolute w-full bottom-0 h-1/2 rounded-b-md'
      ></div>
      {mouseIsOver && (
        <>
          <div className='absolute right-0 h-full'>
            <Button
              variant={'outline'}
              className='flex justify-center items-center h-full border rounded-md rounded-l-none bg-red-500'
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <FaTrashAlt className='h-5 w-5' />
            </Button>
          </div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
            <p className='text-muted-foreground text-sm'>
              Click for properties or drag to move around
            </p>
          </div>
        </>
      )}
      <div
        className={cn(
          'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
          mouseIsOver && 'opacity-40 blur-sm',
          topHalfDroppable.isOver && 'border-t-4 border-t-foreground',
          bottomHalfDroppable.isOver && 'border-t-4 border-t-foreground'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
};

export default Designer;
