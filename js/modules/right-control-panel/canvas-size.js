import {
  data
} from '../../main.js';

function setCanvasWrapperSize() {
  const canvasBase = document.querySelector('.canvas-base');
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  let scale = 1;

  canvasBase.addEventListener('wheel', (e) => {

    scale += e.deltaY * (-0.0001);

    scale = Math.min(Math.max(.125, scale), 4);

    canvasWrapper.style.transform = `scale(${scale})`;
  })
}



export default setCanvasWrapperSize;