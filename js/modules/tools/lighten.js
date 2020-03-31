import {
  data
} from '../../main.js';

function lighten() {
  let x0, y0, mouseDown, color;
  let coords_cache = [];

  data.canv.addEventListener('mousedown', (e) => {
    if (data.tools.isLighten === true) {
      mouseDown = true;

      if (e.altKey === false) {
      manipulateColor(e, 7);
      }
    }

    data.canv.addEventListener('mousemove', function move(e) {
      if (data.tools.isLighten === true && mouseDown === true) {
        manipulateColor(e, 1);
      }

      data.canv.addEventListener('mouseup', (e) => {
        mouseDown = false;
        coords_cache.length = 0;
        data.canv.removeEventListener('mousemove', move)
      })
    });
  });

  function manipulateColor(e, coefficient) {
    x0 = Math.floor(e.offsetX / data.canvIndex);
    y0 = Math.floor(e.offsetY / data.canvIndex);

    let startX = x0 - data.deflection;
    let startY = y0 - data.deflection;
    const colors = data.currentCtx.getImageData(startX, startY, data.pixelSize, data.pixelSize).data;

    if (!e.ctrlKey) {
      coords_cache.length = 0;
    }
    
    for (let i = 0; i < colors.length; i += 4) output: {
      if (e.ctrlKey) {
        for (let j = 0; j < coords_cache.length; j++) {
          if (startX == coords_cache[j][0] && startY == coords_cache[j][1]) {
            setNextCoords();

            break output;
          }
        }
      }
     
      color = tinycolor(`rgba(${colors.slice(i, i + 4)})`);

      if (e.shiftKey) {
        color = color.darken(coefficient).toString();
      } else if(!e.shiftKey) {
        color = color.lighten(coefficient).toString();
      }


      data.currentCtx.fillStyle = color;
      data.currentCtx.fillRect(startX, startY, 1, 1);

      coords_cache.push([startX, startY]);

      setNextCoords();
    }

    function setNextCoords() {
      if (startX < x0 - data.deflection + +data.pixelSize - 1) {
        startX++;
      } else {
        startX = x0 - data.deflection;
        startY++;
      }
    }
  }
}

export default lighten;