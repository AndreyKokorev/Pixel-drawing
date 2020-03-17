import {
  data
} from '../../main.js';
import {
  frameToPNG
} from '../right-control-panel/animation-manager.js';
import {
  saveFrameImageData
} from '../frame-manager.js';
import {
  renderFrame
} from '../frame-manager.js';

function move() {
  let mouseDown;
  let x0, y0, x, y;
  let currentLayer;
  let copyLayerData;
  let transitoryCanvas;
  let transitoryCanvasCtx

  data.canv.addEventListener('mousedown', (e) => {
    mouseDown = true;
    if (data.tools.isMove === true) {
      currentLayer = document.querySelector('.list-layer.selected');
      transitoryCanvas = document.createElement('canvas');
      transitoryCanvasCtx = transitoryCanvas.getContext('2d');
      transitoryCanvas.width = data.canv.width;
      transitoryCanvas.height = data.canv.height;

      x0 = Math.floor(e.offsetX / data.canvIndex);
      y0 = Math.floor(e.offsetY / data.canvIndex);
     
    }


    data.canv.addEventListener('mouseup', function mouseUp(e) {
      if (mouseDown === true && data.tools.isMove === true) {
        if (e.shiftKey && e.ctrlKey) {
          moveShiftKey();
          moveCtrlKey();
          moveShiftCtrlKey();
        } else if (e.shiftKey) {
          moveShiftKey();
        } else if (e.ctrlKey) {
          moveCtrlKey();
        }

        saveFrameImageData(data.currentFrame, true);
        renderFrame();

        if (e.ctrlKey) {
          frameToPNG(true);
        } else {
          frameToPNG();
        }
      }

      mouseDown = false;
      data.canv.removeEventListener('mouseup', mouseUp);
    })
  });

  data.canv.addEventListener('mousemove', (e) => {
    if (mouseDown === true && data.tools.isMove === true) {
      x = Math.floor(e.offsetX / data.canvIndex);
      y = Math.floor(e.offsetY / data.canvIndex);

      moveCurrentLayer();
    }
  });

  function moveCurrentLayer() {
    const imageData = data.frameData.get(data.currentFrame).imageData.get(currentLayer);
    data.currentCtx.clearRect(0, 0, data.canv.width, data.canv.height);
    data.currentCtx.putImageData(imageData, x - x0, y - y0);
  }

  function moveCtrlKey() {
    for (const frame of data.frameData.keys()) {
      const frameData = data.frameData.get(frame);
      const oldImageData = frameData.frame.ctx.getImageData(0, 0, data.canv.width, data.canv.height);

      frameData.frame.ctx.clearRect(0, 0, data.canv.width, data.canv.height);
      frameData.frame.ctx.putImageData(oldImageData, x - x0, y - y0);

      const newImageData = frameData.frame.ctx.getImageData(0, 0, data.canv.width, data.canv.height);
      frameData.imageData.set(currentLayer, newImageData);
    }
  }

  function moveShiftKey() {
    for (const layer of data.layers.keys()) {
      const imageData = data.frameData.get(data.currentFrame).imageData.get(layer);
    
      data.layers.get(layer).ctx.clearRect(0, 0, data.canv.width, data.canv.height);
      data.layers.get(layer).ctx.putImageData(imageData, x - x0, y - y0);
    }
  }

  function moveShiftCtrlKey() {
    for (const frame of data.frameData.keys()) {
      if (frame !== data.currentFrame) {
        const frameData = data.frameData.get(frame);

        for (const layer of frameData.imageData.keys()) {
          if (layer !== currentLayer) {
            const image = frameData.imageData.get(layer);

            transitoryCanvasCtx.putImageData(image, x - x0, y - y0);
            const newImage = transitoryCanvasCtx.getImageData(0, 0, data.canv.width, data.canv.height);
            frameData.imageData.set(layer, newImage);
          }
        }
      }
    }
  }
}

export default move;