import {data} from '../../main.js';
import drawBresLine from '../bresenham-alg.js';

function pen() {
  const item = document.querySelector('.upper-panel__item-1');
  let mouseDown = false;
  let x0,
    y0,
    x1,
    y1;

  pen.setColFunc();

  item.addEventListener('click', () => {
    pen.setColFunc();
    data.offTools();
    data.tools.isPen = true;
    pen.setColFunc();
    
    data.canv.addEventListener('mouseup', (e) => {
      if (data.tools.isPen === true) {
        mouseDown = false;
        x1 = Math.floor(e.offsetX / data.canvIndex);
        y1 = Math.floor(e.offsetY / data.canvIndex);
      }
    });

    data.canv.addEventListener('mousedown', (e) => {
      pen.setColFunc();
      if (data.tools.isPen === true) {
        mouseDown = true;
        x0 = Math.floor(e.offsetX / data.canvIndex);
        y0 = Math.floor(e.offsetY / data.canvIndex);
        drawRect(Math.floor(e.offsetX / data.canvIndex), Math.floor(e.offsetY / data.canvIndex));
      }
    });

    data.canv.addEventListener('mousemove', (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      if (mouseDown && data.tools.isPen === true) {
        if (Math.abs(x / data.canvIndex - x0) > 2 || Math.abs(y / data.canvIndex - y0) > 2) {
          x1 = Math.floor(e.offsetX / data.canvIndex);
          y1 = Math.floor(e.offsetY / data.canvIndex);
          drawBresLine(x0, y0, x1, y1);
          x0 = x1;
          y0 = y1;
        }
      }
    });
  });
  item.click();
}
pen.setColFunc = () => {
  data.ctx.strokeStyle = data.colors.currentColor;
  data.currentCtx.strokeStyle = data.colors.currentColor;
  data.ctx.fillStyle = data.colors.currentColor;
  data.currentCtx.fillStyle = data.colors.currentColor;
};
function drawRect(x, y) {
  data.currentCtx.fillRect(x, y, data.pixelSize, data.pixelSize);
  data.currentCtx.fill();
}

export default pen;