import {
  data
} from '../../main.js';
import {
  saveFrameImageData
} from '../frame-manager.js';

const monitor = document.querySelector('.animation-wrapper__monitor');
let animationFrames = [];

function startAnimation() {
  let counter = 0;

  frameToPNG();

  setInterval(() => {
    if (counter === data.frameData.size) counter = 0;

    if (animationFrames[counter]) {
      setImageSize()
      monitor.src = data.frameData.get(animationFrames[counter]).img;
      counter++;
    }
  }, 1000);
}

function frameToPNG(allFrames) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = data.canv.width;
  canvas.height = data.canv.height;

  if (allFrames) {
    for (const frame of data.frameData.keys()) {
      getPNG(frame);
    }
  } else {
    getPNG(data.currentFrame);
  }


  function getPNG(frame) {
    const layersList = document.querySelectorAll('.list-layer');
    const imageData = data.frameData.get(frame).imageData;
    const frameData = data.frameData.get(frame);
    frameData.animationImageData = [];

    for (const layer of layersList) {
      let Uint8ClampedArr;

      if (!imageData.get(layer)) {
        const clearImageData = data.frameData.get(data.currentFrame).frame.ctx.getImageData(0, 0, data.canv.width, data.canv.height).data;
        Uint8ClampedArr = new Uint8ClampedArray(clearImageData);
      } else {
        Uint8ClampedArr = new Uint8ClampedArray(imageData.get(layer).data);
      }
      frameData.animationImageData.push(new ImageData(Uint8ClampedArr, data.canv.width, data.canv.height));
    }

    for (let i = 0; i < frameData.animationImageData.length; i += 1) {
      let dt_1, dt_2;

      if (frameData.animationImageData[i]) {
        dt_1 = frameData.animationImageData[i].data;
      }
      if (frameData.animationImageData[i + 1]) {
        dt_2 = frameData.animationImageData[i + 1].data
      }

      if (dt_1 && dt_2) {
        for (let i = 0; i < dt_1.length; i += 4) {
          if (dt_1[i] === 0 && dt_1[i + 1] === 0 && dt_1[i + 2] === 0) {
            dt_1[i] = dt_2[i];
            dt_1[i + 1] = dt_2[i + 1];
            dt_1[i + 2] = dt_2[i + 2];
            dt_1[i + 3] = dt_2[i + 3];
          }
        }
        frameData.animationImageData.splice(i + 1, 1);
      }
    }

    const canvas_1 = document.createElement('canvas');
    const ctx_1 = canvas_1.getContext('2d');
    ctx.putImageData(frameData.animationImageData[0], 0, 0);

    animationFrames = document.getElementsByClassName('frame-column__frame-wrapper');

    let image = new Image();
    let dataImg = canvas.toDataURL('image/png', 1.0);
    image.src = dataImg;

    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      canvas_1.width = canvas.width * 20;
      canvas_1.height = canvas.height * 20;
      ctx_1.imageSmoothingEnabled = false;
      ctx_1.drawImage(canvas, 0, 0, canvas_1.width, canvas_1.height);

      frameData.img = canvas_1.toDataURL();
    }
  }
}

function setImageSize() {
  if (data.canv.width > data.canv.height) {
    monitor.style.width = '100%';
    monitor.style.height = 100 / (data.canv.width / data.canv.height) + '%';
  } else {
    monitor.style.height = '100%';
    monitor.style.width = 100 / (data.canv.height / data.canv.width) + '%';
  }
}

export {
  startAnimation
};
export {
  frameToPNG
};