import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import SidebarBtnElement from './SidebarBtnElement';
import { ElementsType, FormElements } from './FormElements';
import useDesigner from './hooks/useDesigner';

function DraggableOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  const { elements } = useDesigner();

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isSideBarElement = draggedItem.data?.current?.isDesignerBtnElement;

  if (isSideBarElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElement formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const elementOfInterest = elements.find(
      (element) => element.id === elementId
    );

    if (!elementOfInterest) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent =
        FormElements[elementOfInterest.type].designerComponent;

      node = (
        <div className='flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-50'>
          <DesignerElementComponent elementInstance={elementOfInterest} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DraggableOverlayWrapper;
