import {
  data
} from '../../main.js';

function setCanvasWrapperSize() {
  const canvasBase = document.querySelector('.canvas-base');
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  const canvasArray = canvasWrapper.children;
  const sizeSubmitButton = document.querySelector('.canvas-size-wrapper .button-submit');
  const zoom = document.querySelector('.zoom');
  let baseWidth = canvasBase.offsetWidth;
  let scale = 1;

  let ratio = data.canv.width / data.canv.height;
  let diff = canvasWrapper.offsetWidth /  canvasBase.offsetWidth;

  zoom.textContent = 100 + ' %';

  canvasBase.addEventListener('wheel', (e) => {
    scale += e.deltaY * (-0.0001);
    scale = Math.min(Math.max(0.125, scale), 4);

    zoom.textContent = `${Math.round(scale * 100)}%`;
    canvasWrapper.style.transform = `scale(${scale})`;
  });

  window.addEventListener('resize', () => {
    baseWidth = canvasBase.offsetWidth;

    canvasWrapper.style.width = `${baseWidth * diff}px`;
    canvasWrapper.style.height = `${data.canv.offsetWidth / ratio}px`;

    data.canvIndex = canvasWrapper.offsetWidth / data.currentLayer.width;
  });

  sizeSubmitButton.addEventListener('click', () => {
    const canvasBase = document.querySelector('.canvas-base');
    const width = +document.querySelector('.canvas-width-input').value;
    const height = +document.querySelector('.canvas-height-input').value;

    if (Number.isInteger(width) && Number.isInteger(height)) {
      data.canv.width = width;
      data.currentLayer.width = width;
      data.canv.height = height;
      data.currentLayer.height = height;

      if (width > height) {
        data.canvIndex = Math.floor((canvasBase.offsetWidth * 0.99) / data.canv.width);
      } else if (height > width) {
        data.canvIndex = Math.floor((canvasBase.offsetHeight * 0.99) / data.canv.height);
      } else if (width === height) {
        data.canvIndex = Math.floor((canvasBase.offsetWidth * 0.99) / height);
      }

      canvasWrapper.style.width = `${data.canv.width * data.canvIndex}px`;
      canvasWrapper.style.height = `${data.canv.height * data.canvIndex}px`;

      ratio = data.canv.width / data.canv.height;
      diff = data.canv.offsetWidth / canvasBase.offsetWidth;
    }
  })

}

export default setCanvasWrapperSize;