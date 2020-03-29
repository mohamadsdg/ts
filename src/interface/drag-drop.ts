export interface Draggable {
  dragStartHandler(e: DragEvent): void;
  dragEndHandler(e: DragEvent): void;
}
export interface DragTarget {
  dropHandler(e: DragEvent): void;
  dragOverHandler(e: DragEvent): void;
  dragLeaveHandler(e: DragEvent): void;
}
