const titleBar = document.getElementById('title-bar');
const draggable = document.getElementById('draggable');

let lastMousePosition;

const handleMove = (mouseMoveEvent) => {
  const delta = {
    x: mouseMoveEvent.clientX - lastMousePosition.x,
    y: mouseMoveEvent.clientY - lastMousePosition.y,
  };

  lastMousePosition = {
    x: mouseMoveEvent.clientX,
    y: mouseMoveEvent.clientY,
  };

  draggable.style.left = `${draggable.offsetLeft + delta.x}px`;
  draggable.style.top = `${draggable.offsetTop + delta.y}px`;
};

const stopDrag = () => {
  document.onmousemove = null;
  document.onmouseup = null;
  document.ontouchmove = null;
  document.ontouchend = null;
};

const startDrag = (mouseDownEvent) => {
  lastMousePosition = {
    x: mouseDownEvent.clientX,
    y: mouseDownEvent.clientY,
  };

  document.onmousemove = handleMove;
  document.ontouchmove = (e) => handleMove(e.touches[0]);

  document.onmouseup = document.ontouchend = stopDrag;
};

titleBar.onmousedown = (e) => {
  e.preventDefault();
  startDrag(e);
};

titleBar.ontouchstart = (e) => {
  e.preventDefault();
  startDrag(e.touches[0]);
};
