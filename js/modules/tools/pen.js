import {
  data
} from '../../main.js';
import drawBresLine from '../bresenham-alg.js';

function pen() {
  let mouseDown = false;
  let x0,
    y0,
    x1,
    y1;

  data.canv.addEventListener('mouseup', (e) => {
    if (data.tools.isPen === true || data.tools.isMirrorPen === true) {
      mouseDown = false;
      x1 = Math.floor(e.offsetX / data.canvIndex);
      y1 = Math.floor(e.offsetY / data.canvIndex);
    }
  });

  data.canv.addEventListener('mousedown', (e) => {
    pen.setColFunc();
    
    if (data.tools.isPen === true || data.tools.isMirrorPen === true) {
      mouseDown = true;
      x0 = Math.floor(e.offsetX / data.canvIndex);
      y0 = Math.floor(e.offsetY / data.canvIndex);
      drawRect(x0, y0);
    }
    if (data.tools.isMirrorPen === true) {
      drawRect(data.canv.width - 1 - x0, y0);
    }
  });

  data.canv.addEventListener('mousemove', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    if (mouseDown && (data.tools.isPen === true || data.tools.isMirrorPen === true)) {
      if (Math.abs(x / data.canvIndex - x0) > 0 || Math.abs(y / data.canvIndex - y0) > 0) {
        x1 = Math.floor(e.offsetX / data.canvIndex);
        y1 = Math.floor(e.offsetY / data.canvIndex);
        drawBresLine(x0, y0, x1, y1);

        if (data.tools.isMirrorPen === true) {
          if (e.shiftKey) {
            drawBresLine(x0, data.canv.height - 1 - y0, x1, data.canv.height - 1 - y1);
          } else if (e.ctrlKey) {
            drawBresLine(x0, data.canv.height - 1 - y0, x1, data.canv.height - 1 - y1);
            drawBresLine(data.canv.width - 1 - x0, y0, data.canv.width - 1 - x1, y1);
            drawBresLine(data.canv.width - 1 - x0, data.canv.height - 1 - y0, data.canv.width - 1 - x1, data.canv.height - 1 - y1);
          } else {
            drawBresLine(data.canv.width - 1 - x0, y0, data.canv.width - 1 - x1, y1);
          }
        }
        x0 = x1;
        y0 = y1;
      }
    }
  });
}

pen.setColFunc = () => {
  data.currentCtx.strokeStyle = data.colors.currentColor;
  data.currentCtx.fillStyle = data.colors.currentColor;
};

function drawRect(x, y) {
  data.currentCtx.fillRect(x - data.deflection, y - data.deflection, data.pixelSize, data.pixelSize);
  data.currentCtx.fill();
}

export default pen;