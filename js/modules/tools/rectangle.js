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

function rectangle() {
  let x0, y0, x1, y1;
  let mouseDown;

  data.canv.addEventListener('mousedown', (e) => {
    if (data.tools.isRectangle === true) {
      mouseDown = true;

      data.ctx.lineWidth = data.pixelSize;
      data.ctx.strokeStyle = data.colors.currentColor;
      data.currentCtx.lineWidth = data.pixelSize;
      data.currentCtx.strokeStyle = data.colors.currentColor;

      x0 = Math.floor(e.offsetX / data.canvIndex);
      y0 = Math.floor(e.offsetY / data.canvIndex);
    }

    data.canv.addEventListener('mousemove', function mouseMove(e) {
      if (mouseDown === true) {
        data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);

        x1 = Math.floor(e.offsetX / data.canvIndex);
        y1 = Math.floor(e.offsetY / data.canvIndex);

        if (data.pixelSize == 1 || data.pixelSize == 3 || data.pixelSize == 5) {
          data.ctx.strokeRect(x0 + 0.5, y0 + 0.5, x1 - x0, y1 - y0);
        } else {
          data.ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
        }
      }
    })

    data.canv.addEventListener('mouseup', () => {
      mouseDown = false;

      if (data.tools.isRectangle === true) {
        if (data.pixelSize == 1 || data.pixelSize == 3 || data.pixelSize == 5) {
          data.currentCtx.strokeRect(x0 + 0.5, y0 + 0.5, x1 - x0, y1 - y0);
        } else {
          data.currentCtx.strokeRect(x0, y0, x1 - x0, y1 - y0);
        }
        data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);

        saveFrameImageData(data.currentFrame, true);
        renderFrame();
        frameToPNG();
      }
    });
  })
}

export default rectangle;