import {
  data
} from '../../main.js';
import {
  frameSizeAll
} from '../frame-manager.js';
import {
  renderAllFrames
} from '../frame-manager.js';
import {
  saveFrameImageData
} from '../frame-manager.js';
import {
  frameToPNG
} from './animation-manager.js';

function setCanvasWrapperSize() {
  const canvasBase = document.querySelector('.canvas-base');
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  const sizeSubmitButton = document.querySelector('.canvas-size-wrapper .button-submit');
  const widthField = document.querySelector('.canvas-width-input');
  const heightField = document.querySelector('.canvas-height-input');
  const canvasResolution = document.querySelector('.canvas-resolution .text');
  let canvasRatio = data.canv.width / data.canv.height;
  let wrapperRatio = canvasWrapper.offsetWidth / canvasBase.offsetWidth;
  let baseWidth = canvasBase.offsetWidth;

  canvasResolution.textContent = 'resol: ' + `${data.canv.width} x ${data.canv.height}`
  widthField.placeholder = `< ${Math.floor(canvasBase.offsetWidth * 0.99)}`;
  heightField.placeholder = `< ${Math.floor(canvasBase.offsetHeight * 0.99)}`;

  window.addEventListener('resize', () => {
    baseWidth = canvasBase.offsetWidth;

    canvasWrapper.style.width = `${baseWidth * wrapperRatio}px`;
    canvasWrapper.style.height = `${data.canv.offsetWidth / canvasRatio}px`;

    data.canvIndex = canvasWrapper.offsetWidth / data.currentLayer.width;

    widthField.placeholder = `< ${Math.floor(canvasBase.offsetWidth * 0.99)}`;
    heightField.placeholder = `< ${Math.floor(canvasBase.offsetHeight * 0.99)}`;
  });

  sizeSubmitButton.addEventListener('click', () => {
    const canvasBase = document.querySelector('.canvas-base');
    let width = +widthField.value;
    let height = +heightField.value;

    widthField.placeholder = `< ${Math.floor(canvasBase.offsetWidth * 0.99)}`;
    heightField.placeholder = `< ${Math.floor(canvasBase.offsetHeight * 0.99)}`;

    if (!width) {
      width = data.canv.width;

    }

    if (!height) {
      height = data.canv.height;

    }

    if (Number.isInteger(width) && Number.isInteger(height)) {
      data.canvPrevFrame.width = width;
      data.canvPrevFrame.height = height;
      data.canvNextFrame.width = width;
      data.canvNextFrame.height = height;
      data.canv.width = width;
      data.canv.height = height;


      if (width > canvasBase.offsetWidth * 0.99 || height > canvasBase.offsetHeight * 0.99) {
        data.canvIndex = 1;
        canvasWrapper.style.width = `${width}px`;
        canvasWrapper.style.height = `${height}px`;
      } else {
          if(width/height > canvasBase.offsetWidth/canvasBase.offsetHeight) {
            data.canvIndex = (canvasBase.offsetWidth * 0.99) / data.canv.width;
          } else if(width/height < canvasBase.offsetWidth/canvasBase.offsetHeight){
            data.canvIndex = (canvasBase.offsetHeight * 0.99) / data.canv.height;       
          } else {
            if(canvasBase.offsetWidth > canvasBase.offsetHeight) {
              data.canvIndex = (canvasBase.offsetHeight * 0.99) / data.canv.height; 
            } else {
              data.canvIndex = (canvasBase.offsetWidth * 0.99) / data.canv.width;
            }
          }
              
        canvasWrapper.style.width = `${data.canv.width * data.canvIndex}px`;
        canvasWrapper.style.height = `${data.canv.height * data.canvIndex}px`;
      }

      for (let layer of data.layers) {
        const prevWidth = layer[1].canv.width;
        const prevHeight = layer[1].canv.height;
        const imageData = layer[1].ctx.getImageData(0, 0, prevWidth, prevHeight);

        layer[1].canv.width = width;
        layer[1].canv.height = height;
        layer[1].ctx.putImageData(imageData, 0, 0);
      }

      canvasRatio = data.canv.width / data.canv.height;
      wrapperRatio = data.canv.offsetWidth / canvasBase.offsetWidth;

      widthField.placeholder = width;
      heightField.placeholder = height;
      widthField.value = '';
      heightField.value = '';
    }

    saveFrameImageData(data.currentFrame, true);
    frameSizeAll();

    if (!data.adaptImage) {
      renderAllFrames(document.querySelector('.list-layer.selected'));
      frameToPNG(true);
    }
    canvasResolution.textContent = 'resol: ' + `${data.canv.width} x ${data.canv.height}`
  });
}

export default setCanvasWrapperSize;