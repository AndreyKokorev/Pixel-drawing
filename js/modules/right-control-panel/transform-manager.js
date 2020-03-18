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
import {
  renderAllFrames
} from '../frame-manager.js';

function transform() {
  const transformPanel = document.querySelector('.transform-panel');
  const flipImage = document.querySelector('.button-flip-image');
  const rotateImage = document.querySelector('.button-rotate-image');
  const cloneImage = document.querySelector('.button-clone-image');
  let transitoryCanvas = document.createElement('canvas');
  let transitoryCanvasCtx = transitoryCanvas.getContext('2d');

  transformPanel.addEventListener('click', (e) => {
    const currentLayer = document.querySelector('.list-layer.selected');
    let counter;

    transitoryCanvas.width = data.canv.width;
    transitoryCanvas.height = data.canv.height;

    if (e.target === cloneImage) {

      for (const frame of data.frameData.keys()) {
        const imageData = data.layers.get(currentLayer).ctx.getImageData(0, 0, data.canv.width, data.canv.height);
        const frameData = data.frameData.get(frame);

        frameData.imageData.set(currentLayer, imageData);
      }
      renderAllFrames(currentLayer);
      frameToPNG(true);
    }

    if (e.target === flipImage) {

      if (e.altKey && e.ctrlKey) {
        counter = 0;

        for (const frame of data.frameData.keys()) {
          const frameData = data.frameData.get(frame);
          counter++;
          for (const layer of frameData.imageData.keys()) {
            transformAllFrames(frame, layer);
          }
        }
      } else if (e.ctrlKey) {
        for (const layer of data.layers.keys()) {
          flip(layer);
        }
      } else if (e.altKey) {
        counter = 0;

        for (const frame of data.frameData.keys()) {
          counter++;
          transformAllFrames(frame);
        }
      } else {
        flip();
      }
    }

    if (e.target === rotateImage) {
      if (e.altKey && e.ctrlKey) {
        counter = 0;

        for (const frame of data.frameData.keys()) {
          const frameData = data.frameData.get(frame);
          counter++;
          for (const layer of frameData.imageData.keys()) {
            transformAllFrames(frame, layer);
          }
        }
      } else if (e.ctrlKey) {
        for (const layer of data.layers.keys()) {
          rotate(layer)
        }
      } else if (e.altKey) {
        counter = 0;

        for (const frame of data.frameData.keys()) {
          counter++;
          transformAllFrames(frame);
        }
      } else {
        rotate();
      }

    }

    function transformAllFrames(frame, layer) {
      const frameData = data.frameData.get(frame);
      let image;

      if (frameData.imageData.get(layer || currentLayer)) {
        image = frameData.imageData.get(layer || currentLayer);
      } else {
        return;
      }

      transitoryCanvasCtx.putImageData(image, 0, 0);
      transitoryCanvasCtx.save();

      const imageFromURL = new Image();
      imageFromURL.src = transitoryCanvas.toDataURL();
      imageFromURL.onload = function () {

        if (e.shiftKey) {
          if (e.target === flipImage) {
            transitoryCanvasCtx.translate(0, data.canv.height);
            transitoryCanvasCtx.scale(1, -1);
          } else if (e.target === rotateImage) {
            ctx.translate(0, data.canv.height);
            ctx.rotate(-90 * Math.PI / 180);
          }
        } else {
          if (e.target === flipImage) {
            transitoryCanvasCtx.translate(data.canv.width, 0);
            transitoryCanvasCtx.scale(-1, 1);
          } else if (e.target === rotateImage) {
            ctx.translate(data.canv.width, 0);
            ctx.rotate(90 * Math.PI / 180);
          }
        }

        transitoryCanvasCtx.clearRect(0, 0, data.canv.width, data.canv.height);
        transitoryCanvasCtx.drawImage(imageFromURL, 0, 0, data.canv.width, data.canv.height);
        transitoryCanvasCtx.restore();

        const newImage = transitoryCanvasCtx.getImageData(0, 0, data.canv.width, data.canv.height);
        frameData.imageData.set(layer || currentLayer, newImage);

        if (counter == data.frameData.size) {
          for (const layer of data.layers.keys()) {
            const ctx = data.layers.get(layer).ctx;
            ctx.putImageData(data.frameData.get(data.currentFrame).imageData.get(layer), 0, 0)
          }

          renderAllFrames(currentLayer);
          frameToPNG(true);
        }
      }
    }

    function flip(layer) {
      const image = new Image();
      let ctx;

      if (layer) {
        ctx = data.layers.get(layer).ctx;
        ctx.save();
        image.src = data.layers.get(layer).canv.toDataURL();
      } else {
        ctx = data.currentCtx
        ctx.save();
        image.src = data.currentLayer.toDataURL();
      }

      image.onload = function () {

        if (e.shiftKey) {
          ctx.translate(0, data.canv.height);
          ctx.scale(1, -1);

        } else {
          ctx.translate(data.canv.width, 0);
          ctx.scale(-1, 1);
        }

        ctx.clearRect(0, 0, data.canv.width, data.canv.height);
        ctx.drawImage(image, 0, 0, data.canv.width, data.canv.height);
        ctx.restore();

        saveFrameImageData(data.currentFrame, true);
        renderFrame();
        frameToPNG();
      }
    }

    function rotate(layer) {
      const image = new Image();
      let ctx;
      if (layer) {
        ctx = data.layers.get(layer).ctx;
        ctx.save();
        image.src = data.layers.get(layer).canv.toDataURL();
      } else {
        ctx = data.currentCtx
        ctx.save();
        image.src = data.currentLayer.toDataURL();
      }

      image.onload = function () {
        let translateY, translateX;

        if (data.canv.width > data.canv.height) {
          translateX = Math.round(data.canv.width - data.canv.height / 2);
        } else {
          translateY = Math.round((data.canv.height - data.canv.width) / 2);
        }
        console.log((data.canv.height - data.canv.width) / 2)
        if (e.shiftKey) {
          ctx.translate(0, data.canv.width);
          ctx.rotate(-90 * Math.PI / 180);

        } else {
          console.log(translateY)
          ctx.translate(data.canv.width, translateY);
          ctx.rotate(90 * Math.PI / 180);
          //ctx.translate(-data.canv.width, -translateY);
        }

        ctx.clearRect(0, 0, data.canv.width, data.canv.height);
        ctx.drawImage(image, 0, 0, data.canv.width, data.canv.height);
        ctx.restore();
      }
    }
  });
}

export default transform;