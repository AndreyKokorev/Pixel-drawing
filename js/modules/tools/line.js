import {
  data
} from '../../main.js';
import drawBresLine from '../bresenham-alg.js';
import {
  frameToPNG
} from '../right-control-panel/animation-manager.js';
import {
  saveFrameImageData
} from '../frame-manager.js';
import {
  renderFrame
} from '../frame-manager.js';

function line() {
  let x0, y0, x1, y1;
  let mouseDown;

  data.canv.addEventListener('mousedown', (e) => {
    if (data.tools.isLine === true) {
      mouseDown = true;

      data.ctx.lineWidth = data.pixelSize;
      data.ctx.strokeStyle = data.colors.currentColor;
      data.ctx.fillStyle = data.colors.currentColor;

      x0 = Math.floor(e.offsetX / data.canvIndex);
      y0 = Math.floor(e.offsetY / data.canvIndex);
    }
  })

  data.canv.addEventListener('mousemove', function mouseMove(e) {
    if (mouseDown === true) {
      data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);

      x1 = Math.floor(e.offsetX / data.canvIndex);
      y1 = Math.floor(e.offsetY / data.canvIndex);
      if (x1 < 0) {
        console.log(e.pageX)
        x1 = e.page + 1;
      }
      drawBresLine(x0, y0, x1, y1, drawRect);
    }
    // if (e.offsetX == -1 || e.offsetY == -1) {
    //   mouseDown = false;
    //   mouseUP();
    // }

  })

  data.canv.addEventListener('mouseup', () => {
    if (mouseDown === true) {
      mouseUp();
    }
  })

  function drawRect(x, y) {
    data.ctx.fillRect(x - data.deflection, y - data.deflection, data.pixelSize, data.pixelSize);
    data.ctx.fill();
  }

  function mouseUp() {
    mouseDown = false;

    drawBresLine(x0, y0, x1, y1);

    data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);

    saveFrameImageData(data.currentFrame, true);
    renderFrame();
    frameToPNG();
  }
}

export default line;