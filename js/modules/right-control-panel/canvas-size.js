import {
  data
} from '../../main.js';

function setCanvasWrapperSize() {
  const canvasBase = document.querySelector('.canvas-base');
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  const sizeSubmitButton = document.querySelector('.canvas-size-wrapper .button-submit');
  const zoom = document.querySelector('.zoom');
  let canvasWrapperWidth = canvasWrapper.offsetWidth;
  let scale = 1;

  zoom.textContent = 100 + ' %';

  canvasBase.addEventListener('wheel', (e) => {
    scale += e.deltaY * (-0.0001);
    scale = Math.min(Math.max(0.125, scale), 4);

    zoom.textContent = `${Math.round(scale * 100)}%`;
    canvasWrapper.style.transform = `scale(${scale})`;
  });

  window.addEventListener('resize', () => {
    if (canvasWrapper.offsetWidth !== canvasWrapperWidth) {
      const aspectRatio = canvasWrapperWidth / canvasWrapper.offsetHeight;


      canvasWrapper.style.height = `${canvasWrapper.offsetWidth / aspectRatio}px`;
      canvasWrapperWidth = canvasWrapper.offsetWidth;
      data.canvIndex = canvasWrapperWidth / data.canvInnerWidth;
    }
  });

  sizeSubmitButton.addEventListener('click', () => {
    const canvasBase = document.querySelector('.canvas-base');
    const width = +document.querySelector('.canvas-width-input').value;
    const height = +document.querySelector('.canvas-height-input').value;

    if (Number.isInteger(width) && Number.isInteger(height)) {
      if (width > height) {
        setWidth();
        setHeight();
      } else {
        setHeight();
        setWidth();
      }
    }

    function setWidth() {
      data.canvInnerWidth = width;
      data.currentLayer.width = data.canvInnerWidth;
      data.canv.width = data.canvInnerWidth;

      if (width >= height) {
        data.canvIndex = (canvasBase.offsetWidth * 0.99) / data.canvInnerWidth;
      }
console.log(data.canvIndex)
      canvasWrapper.style.width = `${data.canvInnerWidth * data.canvIndex}px`;
    }

    function setHeight() {
      data.canvInnerHeight = height;
      data.currentLayer.height = data.canvInnerHeight;
      data.canv.height = data.canvInnerHeight;

      if (height >= width) {
        data.canvIndex = (canvasBase.offsetHeight * 0.99) / data.canvInnerHeight;
      };
      
      canvasWrapper.style.height = `${data.canvInnerHeight * data.canvIndex}px`;
    }
  })

}



export default setCanvasWrapperSize;