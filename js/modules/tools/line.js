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

      drawBresLine(x0, y0, x1, y1, drawRect);
    }
  })

  data.canv.addEventListener('mouseup', () => {
    if (data.tools.isLine === true) {
      mouseDown = false;

      drawBresLine(x0, y0, x1, y1);

      data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);

      saveFrameImageData(data.currentFrame, true);
      renderFrame();
      frameToPNG();
    }
  })

  function drawRect(x, y) {
    data.ctx.fillRect(x, y, data.pixelSize, data.pixelSize);
    data.ctx.fill();
  }
}

export default line;