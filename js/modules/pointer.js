import {
  data
} from '../main.js';

function pointer() {
  const canvas = document.querySelector('.canvas-layer-upper');
  const ctx = canvas.getContext('2d');



  canvas.addEventListener('mousemove', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let x = Math.floor(e.offsetX / data.canvIndexX);
    let y = Math.floor(e.offsetY / data.canvIndexY);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.055)';
    ctx.fillRect(x, y, data.pixelSize, data.pixelSize);
    ctx.fill();

    canvas.addEventListener('mouseout', function deletePointer() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.removeEventListener('mouseout', deletePointer);
    })
  })
}

export default pointer;