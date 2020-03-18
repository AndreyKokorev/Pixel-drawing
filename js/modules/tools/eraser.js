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
      const x0 = Math.floor(e.offsetX / data.canvIndex);
      const y0 = Math.floor(e.offsetY / data.canvIndex);

      data.currentCtx.clearRect(x - data.deflection, y - data.deflection, data.pixelSize, data.pixelSize);
    }
  })

  data.canv.addEventListener('mouseup', () => {
    isMouseDown = false;
  })

  data.canv.addEventListener('mousemove', (e) => {
    if (data.tools.isEraser === true && isMouseDown === true) {
      const x = Math.floor(e.offsetX / data.canvIndex);
      const y = Math.floor(e.offsetY / data.canvIndex);

      drawBresLine(x0, y0, x, y);

      x0 = x;
      y0 = y;
    }
  });
}

export default eraser;