import {
  data
} from '../../main.js';
import {renderAllFrames} from '../frame-manager.js';

function paintAll() {
  data.canv.addEventListener('mousedown', (event) => {
    if (data.tools.isPaintAll === true) {
      const x = Math.floor(event.offsetX / data.canvIndex);
      const y = Math.floor(event.offsetY / data.canvIndex);
      const getColor = data.currentCtx.getImageData(x, y, 1, 1);
      const color = [getColor.data[0], getColor.data[1], getColor.data[2], getColor.data[3]];

      replaceColor(hexDec(data.currentCtx.fillStyle), color, event);
    }
  });

  function hexDec(h) {
    const m = h.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);

    const array = m.join(',').split(',').map(number => +number);
    array.push(255);

    return array;
  }
}

function replaceColor(selectedColor, replaceableColor, event) {
  const currentLayer = document.querySelector('.list-layer.selected');
  const sCol = selectedColor;
  const rCol = replaceableColor;

  if (event.shiftKey) {
    const frameData = data.frameData.get(data.currentFrame);

    for (const layerData of frameData.imageData.values()) {
      replace(layerData);

      for (const layer of data.layers.keys()) {
        frameData.canvas.get(layer).ctx.putImageData(frameData.imageData.get(layer), 0, 0);
      }
    }
  } else if (event.ctrlKey) {
    for (const frame of data.frameData.keys()) {
      const frameData = data.frameData.get(frame);
      for (const layerData of frameData.imageData.values()) {
        replace(layerData);

        for (const layer of data.layers.keys()) {
          frameData.canvas.get(layer).ctx.putImageData(frameData.imageData.get(layer), 0, 0);
        }
      }
    }
    for (const layerListItem of data.layers.keys()) {
      renderAllFrames(layerListItem);
    }   
  } else {
    const layer = document.querySelector('.list-layer.selected');
    const frameData = data.frameData.get(data.currentFrame);

    replace(false,layer);

    frameData.canvas.get(layer).ctx.putImageData(frameData.imageData.get(layer), 0, 0);
  }

  function replace(layerData) {
    const dt = layerData.data || data.frameData.get(data.currentFrame).imageData.get(currentLayer).data;

    for (let i = 0; i < dt.length; i += 4) {
      if (dt[i] === rCol[0] && dt[i + 1] === rCol[1] && dt[i + 2] === rCol[2] && dt[i + 3] === rCol[3]) {
        dt[i] = sCol[0];
        dt[i + 1] = sCol[1];
        dt[i + 2] = sCol[2];
        dt[i + 3] = sCol[3];
      }
    }
  }
}

export default paintAll;