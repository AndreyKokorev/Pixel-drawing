import {data} from '../main.js';

function drawBresLine(x2, y2, x3, y3, rect) {
  const dx = x3 - x2;
  const dy = y3 - y2;
  const dx1 = Math.abs(dx);
  const dy1 = Math.abs(dy);
  let x,
    y,
    px,
    py,
    xe,
    ye,
    i;
  const rectDrawing = rect || drawRect;

  px = 2 * dy1 - dx1;
  py = 2 * dx1 - dy1;

  if (dy1 <= dx1) {
    if (dx >= 0) {
      x = x2;
      y = y2;
      xe = x3;
    } else {
      x = x3;
      y = y3;
      xe = x2;
    }

    rectDrawing(x, y);

    for (i = 0; x < xe; i += 1) {
      x += 1;

      if (px < 0) {
        px += 2 * dy1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          y += 1;
        } else {
          y -= 1;
        }
        px += 2 * (dy1 - dx1);
      }

      rectDrawing(x, y);
    }
  } else {
    if (dy >= 0) {
      x = x2;
      y = y2;
      ye = y3;
    } else {
      x = x3;
      y = y3;
      ye = y2;
    }

    rectDrawing(x, y);

    for (i = 0; y < ye; i += 1) {
      y += 1;

      if (py <= 0) {
        py += 2 * dx1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          x += 1;
        } else {
          x -= 1;
        }
        py += 2 * (dx1 - dy1);
      }

      rectDrawing(x, y);
    }
  }
}
function drawRect(x, y) {
  data.currentCtx.fillRect(x - data.deflection, y - data.deflection, data.pixelSize, data.pixelSize);
  data.currentCtx.fill();
}

export default drawBresLine;