import {
  data
} from '../../main.js';
import drawBresLine from '../bresenham-alg.js';

function eraser() {
  let isMouseDown = false;
  let x0, y0, x, y;

  data.canv.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    if (data.tools.isEraser === true) {
      x0 = Math.floor(e.offsetX / data.canvIndex);
      y0 = Math.floor(e.offsetY / data.canvIndex);

      data.currentCtx.clearRect(x0 - data.deflection, y0 - data.deflection, data.pixelSize, data.pixelSize);
    }
  })

  data.canv.addEventListener('mouseup', () => {
    isMouseDown = false;
  })

  data.canv.addEventListener('mousemove', (e) => {
    if (data.tools.isEraser === true && isMouseDown === true) {
      x = Math.floor(e.offsetX / data.canvIndex);
      y = Math.floor(e.offsetY / data.canvIndex);

      drawBresLine(x0, y0, x, y);

      x0 = x;
      y0 = y;
    }
  });
}

export default eraser;