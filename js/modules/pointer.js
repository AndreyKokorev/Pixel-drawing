import {
  data
} from '../main.js';

function pointer() {
  data.ctx.fillStyle = 'rgba(0, 0, 0, 0.055)';

  data.canv.addEventListener('mousemove', (e) => {
    let x = Math.floor(e.offsetX / data.canvIndex);
    let y = Math.floor(e.offsetY / data.canvIndex);

    data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);  
    data.ctx.fillRect(x, y, data.pixelSize, data.pixelSize);
    data.ctx.fill();

    data.canv.addEventListener('mouseout', function deletePointer() {
      data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);
      data.canv.removeEventListener('mouseout', deletePointer);
    })
  })
}

export default pointer;