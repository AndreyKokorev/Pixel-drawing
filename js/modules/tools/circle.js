import {
  data
} from '../../main.js';

function circle() {
  let x0, y0, x1, y1;
  let mouseDown;

  data.canv.addEventListener('mousedown', (e) => {
    if (data.tools.isCircle === true) {
      console.log('1')
      mouseDown = true;

      data.ctx.lineWidth = data.pixelSize;
      data.ctx.strokeStyle = data.colors.currentColor;
      data.currentCtx.lineWidth = data.pixelSize;
      data.currentCtx.strokeStyle = data.colors.currentColor;
      data.currentCtx.imageSmoothingEnabled = false;

      

      x0 = Math.floor(e.offsetX / data.canvIndex);
      y0 = Math.floor(e.offsetY / data.canvIndex);
      data.ctx.beginPath();
      data.ctx.arc(x0, y0, 8, 0, 2 * Math.PI);
      data.ctx.stroke();
      data.ctx.closePath();
    }

    // data.canv.addEventListener('mousemove', function mouseMove(e) {
    //   if (mouseDown === true) {
    //     data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);

    //     x1 = Math.floor(e.offsetX / data.canvIndex);
    //     y1 = Math.floor(e.offsetY / data.canvIndex);

    //     data.ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    //   }
    // })

    // data.canv.addEventListener('mouseup', () => {
    //   mouseDown = false;

    //   if (data.tools.isCircle === true) {
    //     data.currentCtx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    //     console.log(x0, y0, x1 - x0, y1 - y0)


    //     data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);
    //   }
    // })
  })

}

export default circle;

function drawEllipse(ctx, coords, sizes, angle) {
  ctx.beginPath();
  ctx.save(); // сохраняем стейт контекста
  ctx.translate(coords[0], coords[1]); // перемещаем координаты в центр эллипса
  ctx.rotate(angle); // поворачиваем координатную сетку на нужный угол
  ctx.scale(1, sizes[1] / sizes[0]); // сжимаем по вертикали
  ctx.arc(0, 0, sizes[0], 0, Math.PI * 2); // рисуем круг
  ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
  ctx.strokeStyle = 'green';
  ctx.stroke(); // обводим
  ctx.closePath();
}