import {
  data
} from '../../main.js';

function paintBucket() {
  data.canv.addEventListener('mousedown', (e) => {
    if (data.tools.isPaintBucket === true) {
      const x = Math.floor(e.offsetX / data.canvIndex);
      const y = Math.floor(e.offsetY / data.canvIndex);
      const getColor = data.currentCtx.getImageData(x, y, 1, 1);
      const color = [getColor.data[0], getColor.data[1], getColor.data[2], getColor.data[3]];

      floodFill(x, y, hexDec(data.currentCtx.fillStyle), color);
    }
  });

  function hexDec(h) {
    console.log(h)
    const m = h.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);

    const array = m.join(',').split(',').map(number => +number);
    array.push(255);

    return array;
  }
}

function floodFill(x, y, workColors, pixelColor) {
  const imageData = data.currentCtx.getImageData(0, 0, data.currentLayer.width, data.currentLayer.height);
  const w = imageData.width;
  const h = imageData.height;
  const stack = [
    [x, y]
  ];
  let pixel;
  let point = 0;
  let k = 1200000;

  while (k > 0) {
    k -= 1;

    pixel = stack.pop();

    if (pixel === undefined) {
      break;
    }

    if (pixel[0] >= 0 || pixel[0] < w || pixel[1] >= 0 || pixel[1] < h) {
      point = (pixel[1] * w + pixel[0]) * 4;

      if (compare(point)) {
        put(point);

        stack.push([
          pixel[0] - 1,
          pixel[1]
        ]);
        stack.push([
          pixel[0] + 1,
          pixel[1]
        ]);
        stack.push([
          pixel[0],
          pixel[1] - 1
        ]);
        stack.push([
          pixel[0],
          pixel[1] + 1
        ]);
      }
    }
  }
  data.currentCtx.putImageData(imageData, 0, 0);

  function compare(counter) {
    let hit = 0;
    let number = counter;
    pixelColor.forEach((color) => {
      if (color === imageData.data[number]) hit += 1;
      number += 1;
    });

    if (hit === 4) return true;
    return false;
  }

  function put(counter) {
    let number = counter;
    workColors.forEach((color) => {
      imageData.data[number] = color;
      number += 1;
    });
  }
}

export default paintBucket;