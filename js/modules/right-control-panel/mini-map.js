import {
  data
} from '../../main.js';

function miniMapInit() {
  const miniMap = document.querySelector('.animation-wrapper__mini-map');
  const bg = document.querySelector('.animation-wrapper__background');
  const zoom = document.querySelector('.zoom');
  let start = true;
  let scale = 1;
  let xMin, xMax, yMin, yMax;
  let x0, y0, x, y;
  let currentTop = 0,
    currentLeft = 0,
    top = 0,
    left = 0;
  let isMouseDown;
  let ratioX, ratioY;
  let isWidth, isHeight;
  let miniMapWidthBefore = miniMap.offsetWidth;
  let miniMapHeightBefore = miniMap.offsetHeight;
  let stopShiftX = false,
    stopShiftY = false;
  


  zoom.textContent = 100 + ' %';

  data.canvasBase.addEventListener('wheel', (e) => {
    ratioX = data.canvasWrapper.getBoundingClientRect().width / bg.offsetWidth;
    ratioY = data.canvasWrapper.getBoundingClientRect().height / bg.offsetHeight;
    scale += e.deltaY * (-0.0004);
    scale = Math.min(Math.max(0.125, scale), 4);
    zoom.textContent = `${Math.round(scale * 100)}%`;
    data.canvasWrapper.style.transform = `scale(${scale})`;

    isWidth = data.canvasWrapper.getBoundingClientRect().width > data.canvasBase.offsetWidth * 0.99;
    isHeight = data.canvasWrapper.getBoundingClientRect().height > data.canvasBase.offsetHeight * 0.99;

    if (!isWidth || !isHeight) {
      start = true;
      stopShiftX = false;
      stopShiftY = false;
      miniMap.style.left = 'auto';
      miniMap.style.top = 'auto';
      currentLeft = 0;
      currentTop = 0;
    }

    if (Math.floor(miniMap.getBoundingClientRect().left) <= Math.floor(bg.getBoundingClientRect().left)) {
      if (isWidth || isHeight) {
        if (start !== true) {
          stopShiftX = true;
          miniMap.style.left = '0';
        }
      }
    }

    if (Math.floor(miniMap.getBoundingClientRect().top) <= Math.floor(bg.getBoundingClientRect().top)) {
      if (isWidth || isHeight) {
        if (start === false) {
          stopShiftY = true;
          miniMap.style.top = '0';
        }
      }
    }

    if (Math.floor(miniMap.getBoundingClientRect().bottom) >= Math.floor(bg.getBoundingClientRect().bottom)) {
      if (isWidth || isHeight) {
        if (start === false) {
          stopShiftY = true;
          miniMap.style.bottom = '0';
          miniMap.style.top = 'auto';

        }
      }
    }

    if (Math.floor(miniMap.getBoundingClientRect().right) >= Math.floor(bg.getBoundingClientRect().right)) {
      if (isWidth || isHeight) {
        if (start !== true) {
          stopShiftX = true;
          miniMap.style.right = '0';
          miniMap.style.left = 'auto';
        }
      }
    }

    if (isWidth) {
      setMiniMapWidth();
      setMiniMapShiftX();

      function setMiniMapWidth() {
        miniMap.style.opacity = '1';
        const ratioW = data.canvasWrapper.getBoundingClientRect().width / data.canvasBase.offsetWidth * 0.99;
        const X = miniMap.offsetWidth;
        miniMap.style.width = `${bg.offsetWidth / ratioW}px`;
        const deltaX = X - miniMap.offsetWidth;

        if (deltaX > 0) {
          xMin = xMin - deltaX;
          xMax = xMax + deltaX;
        } else {
          xMin = xMin + deltaX;
          xMax = xMax - deltaX;
        }
      }

      function setMiniMapShiftX() {
        const miniMapWidthAfter = miniMap.offsetWidth;
        const shift = (miniMapWidthBefore - miniMapWidthAfter) / 2;

        if (stopShiftX === false) {
          console.log('stopShift')
          if (e.deltaY < 0) {
            left = currentLeft + shift;
            miniMap.style.left = left + 'px';
          } else {
            left = currentLeft + shift;
            miniMap.style.left = left + 'px';
          }
        }

        currentLeft = currentLeft + shift;
        miniMapWidthBefore = miniMapWidthAfter;
      }
    }

    if (isHeight) {
      setMiniMapHeight();
      setMiniMapShiftY();

      function setMiniMapHeight() {
        miniMap.style.opacity = '1';
        const ratioH = data.canvasWrapper.getBoundingClientRect().height / data.canvasBase.offsetHeight * 0.99;
        const Y = Math.floor(miniMap.offsetHeight);
        miniMap.style.height = `${bg.offsetHeight/ ratioH}px`;
        const deltaY = Y - Math.floor(miniMap.offsetHeight);

        if (deltaY > 0) {
          yMin = yMin - deltaY;
          yMax = yMax + deltaY;
        } else {
          yMin = yMin + deltaY;
          yMax = yMax - deltaY;
        }
      }

      function setMiniMapShiftY() {
        const miniMapHeightAfter = miniMap.offsetHeight;
        const shift = (miniMapHeightBefore - miniMapHeightAfter) / 2;
        if (stopShiftY === false) {
          if (e.deltaY < 0) {
            top = currentTop + shift;
            miniMap.style.top = top + 'px';
          } else {
            top = currentTop + shift;
            miniMap.style.top = top + 'px';
          }
        }
        currentTop = currentTop + shift;
        miniMapHeightBefore = miniMapHeightAfter;
      }
    }

    if (!isWidth && !isHeight) {
      miniMap.style.opacity = '0';
    }

    moveCanvasWrapper();
  });

  miniMap.addEventListener('mousedown', (e) => {
    xMin = Math.floor(bg.getBoundingClientRect().left) - Math.floor(miniMap.getBoundingClientRect().left);
    xMax = Math.floor(bg.getBoundingClientRect().right) - Math.floor(miniMap.getBoundingClientRect().right);
    yMin = Math.floor(bg.getBoundingClientRect().top) - Math.floor(miniMap.getBoundingClientRect().top);
    yMax = Math.floor(bg.getBoundingClientRect().bottom) - Math.floor(miniMap.getBoundingClientRect().bottom);
    currentTop = top;
    currentLeft = left;

    if (isWidth || isHeight) {
      isMouseDown = true;
    }

    x0 = e.pageX;
    y0 = e.pageY;
  });

  miniMap.addEventListener('mousemove', (e) => {
    start = false;
    stopShiftX = false;
    stopShiftY = false;

    if (isMouseDown === true) {
      x = e.pageX;
      y = e.pageY;
      const rangeX = (x - x0);
      const rangeY = (y - y0);

      //if (!(rangeX % 3) || !(rangeY % 3)) {
      left = ((rangeX <= xMin) ? xMin : (rangeX >= xMax) ? xMax : rangeX) + currentLeft;
      top = ((rangeY <= yMin) ? yMin : (rangeY >= yMax) ? yMax : rangeY) + currentTop;

      miniMap.style.left = left + 'px';
      miniMap.style.top = top + 'px';
      moveCanvasWrapper();
      //}
    }
  });

  miniMap.addEventListener('mouseup', () => {
    isMouseDown = false;
    currentTop = top;
    currentLeft = left;
  });

  miniMap.addEventListener('mouseout', () => {
    isMouseDown = false;
  });

  function moveCanvasWrapper() {
    const marginLeft = (bg.offsetWidth - miniMap.offsetWidth) / 2;
    const marginTop = (bg.offsetHeight - miniMap.offsetHeight) / 2;
    const currentMarginLeft = miniMap.getBoundingClientRect().left - bg.getBoundingClientRect().left;
    const currentMarginTop = miniMap.getBoundingClientRect().top - bg.getBoundingClientRect().top;

    data.canvasWrapper.style.left = (marginLeft - currentMarginLeft) * ratioX + 'px';
    data.canvasWrapper.style.top = (marginTop - currentMarginTop) * ratioY + 'px';
    // const marginLeft = Math.ceil((bg.offsetWidth - miniMap.offsetWidth) / 2);
    // const marginTop = Math.ceil((bg.offsetHeight - miniMap.offsetHeight) / 2);
    // const currentMarginLeft = Math.floor(miniMap.getBoundingClientRect().left - bg.getBoundingClientRect().left);
    // const currentMarginTop = Math.floor(miniMap.getBoundingClientRect().top - bg.getBoundingClientRect().top);

    // data.canvasWrapper.style.left = (marginLeft - currentMarginLeft) * Math.ceil(ratioX) + 'px';
    // data.canvasWrapper.style.top = (marginTop - currentMarginTop) * Math.ceil(ratioY) + 'px';
  }
}

export default miniMapInit;


// function a() {
//   const miniMap = document.querySelector('.animation-wrapper__mini-map');
//   const bg = document.querySelector('.animation-wrapper__background');
//   const zoom = document.querySelector('.zoom');
//   let canvasBaseW = data.canvasBase.offsetWidth * 0.99;
//   let scale = 1;
//   let xMin, xMax, yMin, yMax;
//   let x0, y0, x, y;
//   let currentTop, currentLeft, top, left;
//   let isMouseDown;
//   let ratioX, ratioY;
//   let isWidth, isHeight;
//   let widthBefore;
//   let X;

//   zoom.textContent = 100 + ' %';

//   data.canvasBase.addEventListener('wheel', (e) => {
//     scale += e.deltaY * (-0.0004);
//     scale = Math.min(Math.max(0.125, scale), 4);
//     zoom.textContent = `${Math.round(scale * 100)}%`;
//     data.canvasWrapper.style.transform = `scale(${scale})`;

//     isWidth = data.canvasWrapper.getBoundingClientRect().width > data.canvasBase.offsetWidth * 0.99;
//     isHeight = data.canvasWrapper.getBoundingClientRect().height > data.canvasBase.offsetHeight * 0.99;

//     if (Math.floor(miniMap.getBoundingClientRect().left) <= Math.floor(bg.getBoundingClientRect().left)) {
//       if (isWidth || isHeight) {
//         const ratioW = Math.round(data.canvasWrapper.getBoundingClientRect().width) / data.canvasBase.offsetWidth;
//         miniMap.style.width = `${bg.offsetWidth / ratioW}px`;
//         if (!X) {
//           X = Math.floor(miniMap.offsetWidth);
//         }
//         const deltaX = X - Math.floor(miniMap.offsetWidth);
//         miniMap.style.left = `${currentLeft - (miniMap.offsetWidth-widthBefore)/2 - deltaX/2}px`;
//         X = Math.floor(miniMap.offsetWidth);
//       }
//     }

//     if (isWidth) {
//       miniMap.style.opacity = '1';
//       const ratioW = data.canvasWrapper.getBoundingClientRect().width / data.canvasBase.offsetWidth * 0.99;
//       const X = miniMap.offsetWidth;
//       miniMap.style.width = `${bg.offsetWidth / ratioW}px`;
//       const deltaX = X - miniMap.offsetWidth;

//       if (deltaX > 0) {
//         xMin = xMin - deltaX;
//         xMax = xMax + deltaX;
//       } else {
//         xMin = xMin + deltaX;
//         xMax = xMax - deltaX;
//       }
//     }

//     if (isHeight) {
//         miniMap.style.opacity = '1';
//         const ratioH = data.canvasWrapper.getBoundingClientRect().height / data.canvasBase.offsetHeight * 0.99;
//         const Y = Math.floor(miniMap.offsetHeight);
//         miniMap.style.height = `${bg.offsetHeight/ ratioH}px`;
//         const deltaY = Y - Math.floor(miniMap.offsetHeight);

//         if (deltaY > 0) {
//           yMin = yMin - deltaY;
//           yMax = yMax + deltaY;
//         } else {
//           yMin = yMin + deltaY;
//           yMax = yMax - deltaY;
//         } 
//     }

//     if (!isWidth && !isHeight) {
//       miniMap.style.opacity = '0';
//     }

//   });

//   miniMap.addEventListener('mousedown', (e) => {
//     xMin = Math.floor(bg.getBoundingClientRect().left) - Math.floor(miniMap.getBoundingClientRect().left);
//     xMax = Math.floor(bg.getBoundingClientRect().right) - Math.floor(miniMap.getBoundingClientRect().right);
//     yMin = Math.floor(bg.getBoundingClientRect().top) - Math.floor(miniMap.getBoundingClientRect().top);
//     yMax = Math.floor(bg.getBoundingClientRect().bottom) - Math.floor(miniMap.getBoundingClientRect().bottom);
//     ratioX = data.canvasWrapper.getBoundingClientRect().width / bg.offsetWidth;
//     ratioY = data.canvasWrapper.getBoundingClientRect().height / bg.offsetHeight;

//     if (isWidth || isHeight) {
//       isMouseDown = true;
//     }

//     x0 = e.pageX;
//     y0 = e.pageY;
//   });

//   miniMap.addEventListener('mousemove', (e) => {
//     if (isMouseDown === true) {
//       x = e.pageX;
//       y = e.pageY;
//       const rangeX = (x - x0);
//       const rangeY = (y - y0);

//       //if (!(rangeX % 3) || !(rangeY % 3)) {
//         left = ((rangeX <= xMin) ? xMin : (rangeX >= xMax) ? xMax : rangeX);
//         if (currentLeft) {
//           left = left + currentLeft;
//         }

//         top = ((rangeY <= yMin) ? yMin : (rangeY >= yMax) ? yMax : rangeY);
//         if (currentTop) {
//           top = top + currentTop;
//         }

//         miniMap.style.left = left * 2 + 'px';
//         miniMap.style.top = top * 2 + 'px';

//         data.canvasWrapper.style.right = left * ratioX + 'px';
//         data.canvasWrapper.style.bottom = top * ratioY + 'px';
//       //}
//     }

//   });

//   miniMap.addEventListener('mouseup', () => {
//     isMouseDown = false;
//     currentTop = top;
//     currentLeft = left;
//     widthBefore = miniMap.offsetWidth;
//   });

//   miniMap.addEventListener('mouseout', () => {
//     isMouseDown = false;
//   });
// }