import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { ElementsType, FormElements } from "./FormElements";

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

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isSideBarElement = draggedItem.data?.current?.isDesignerBtnElement;

  if (isSideBarElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElement formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DraggableOverlayWrapper;
