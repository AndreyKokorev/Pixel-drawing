import {
  data
} from '../../main.js';

function setCanvasWrapperSize() {
  const canvasBase = document.querySelector('.canvas-base');
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  const sizeSubmitButton = document.querySelector('.canvas-size-wrapper .button-submit');
  const zoom = document.querySelector('.zoom');
  const baseWidth = canvasBase.offsetWidth;
  let canvasWrapperWidth = canvasWrapper.offsetWidth;
  let canvasWrapperHeight = canvasWrapper.offsetHeight;
  let scale = 1;

  zoom.textContent = 100 + ' %';

  canvasBase.addEventListener('wheel', (e) => {
    scale += e.deltaY * (-0.0001);
    scale = Math.min(Math.max(0.125, scale), 4);

    zoom.textContent = `${Math.round(scale * 100)}%`;
    canvasWrapper.style.transform = `scale(${scale})`;
  });

  window.addEventListener('resize', () => {
    const ratio = canvasBase.offsetWidth / baseWidth;

    canvasWrapper.style.width = `${canvasWrapperWidth * ratio}px`;
    canvasWrapper.style.height = `${canvasWrapperHeight * ratio}px`;
    
    data.canvIndex = canvasWrapper.offsetWidth / data.currentLayer.width;
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

    canvasWrapperWidth = canvasWrapper.offsetWidth;
    canvasWrapperHeight = canvasWrapper.offsetHeight;

    function setWidth() {
      data.currentLayer.width = width;
      data.canv.width = width;

      if (width >= height) {
        data.canvIndex = Math.floor((canvasBase.offsetWidth * 0.99) / data.canv.width);
      }
      
      canvasWrapper.style.width = `${data.canv.width * data.canvIndex}px`;
    }

    function setHeight() {
      data.currentLayer.height = height;
      data.canv.height = height;

      if (height >= width) {
        data.canvIndex = Math.floor((canvasBase.offsetHeight * 0.99) / data.canv.height);
      };

      canvasWrapper.style.height = `${data.canv.height * data.canvIndex}px`;
    }
  })

}

export default setCanvasWrapperSize;