import {
  data
} from '../../main.js';

function eraser() {
  let isMouseDown = false;

  data.canv.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    if (data.tools.isEraser === true) {
      const x = Math.floor(e.offsetX / data.canvIndex);
      const y = Math.floor(e.offsetY / data.canvIndex);

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

      data.currentCtx.clearRect(x - data.deflection, y - data.deflection, data.pixelSize, data.pixelSize);
    }
  });
}

export default eraser;