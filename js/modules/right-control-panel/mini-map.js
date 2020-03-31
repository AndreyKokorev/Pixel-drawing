import {
  data
} from '../../main.js';

function miniMapInit() {
  const miniMap = document.querySelector('.animation-wrapper__mini-map');
  const bg = document.querySelector('.animation-wrapper__background');
  let xMin, xMax, yMin, yMax;
  let x0, y0, x, y;
  let currentTop, currentLeft, top, left;
  let isMouseDown;


  data.canvasWrapper.addEventListener('wheel', () => {
    const isWidth = data.canvasWrapper.getBoundingClientRect().width > data.canvasBase.offsetWidth * 0.99;
    const isHeight = data.canvasWrapper.getBoundingClientRect().height > data.canvasBase.offsetHeight * 0.99;

    if (Math.floor(miniMap.getBoundingClientRect().left) < Math.floor(bg.getBoundingClientRect().left)) {
      //miniMap.style.left = `${200 - miniMap.getBoundingClientRect().width *1.5}px`;
      //  miniMap.style.top = 'auto';
      //  miniMap.style.right = 'auto';
      // const ratioW = Math.round(data.canvasWrapper.getBoundingClientRect().width) / data.canvasBase.offsetWidth;
      // miniMap.style.width = `${bg.offsetWidth / ratioW}px`;
      // const deltaX = X - Math.floor(miniMap.offsetWidth);
      // miniMap.style.left = `${left - deltaX}px`;

      // console.log('1')
    }
    if (isWidth) {
      miniMap.style.opacity = '1';
      const ratioW = Math.round(data.canvasWrapper.getBoundingClientRect().width) / data.canvasBase.offsetWidth;
      const X = Math.floor(miniMap.offsetWidth);
      miniMap.style.width = `${bg.offsetWidth / ratioW}px`;
      const deltaX = X - Math.floor(miniMap.offsetWidth);
      if(deltaX > 0) {
        xMin = xMin - deltaX;
        xMax = xMax + deltaX;
      } else {
        xMin = xMin + deltaX;
        xMax = xMax +- deltaX;
      }
      
    }

    if (isHeight) {
      miniMap.style.opacity = '1';
      const ratioH = Math.round(data.canvasWrapper.getBoundingClientRect().height) / data.canvasBase.offsetHeight;
      const Y = Math.floor(miniMap.offsetHeight);
      miniMap.style.height = `${bg.offsetHeight/ ratioH}px`;
      const deltaY = Y - Math.floor(miniMap.offsetHeight);
      if(deltaY > 0) {
        yMin = yMin - deltaY;
        yMax = yMax + deltaY;
      } else {
        yMin = yMin + deltaY;
        yMax = yMax - deltaY;
      }    
    }

    if (!isWidth && !isHeight) {
      miniMap.style.opacity = '0';
    }

  });

  miniMap.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    x0 = e.pageX;
    y0 = e.pageY;
  });

  miniMap.addEventListener('mousemove', (e) => {
    if (isMouseDown === true) {
      x = e.pageX;
      y = e.pageY;
      const rangeX = (x - x0);
      const rangeY = (y - y0);

      if (currentLeft) {
        const margin = currentLeft + rangeX;
        left = ((margin <= xMin) ? xMin : (margin >= xMax) ? xMax : margin);
      } else {
        left = ((rangeX <= xMin) ? xMin : (rangeX >= xMax) ? xMax : rangeX);
      }

      if (currentTop) {
        const margin = currentTop + rangeY;
        top = ((margin <= yMin) ? yMin : (margin >= yMax) ? yMax : margin);
      } else {
        top = ((rangeY <= yMin) ? yMin : (rangeY >= yMax) ? yMax : rangeY);
      }

      miniMap.style.left = left * 2 + 'px';
      miniMap.style.top = top * 2 + 'px';
      const ratioX = data.canvasWrapper.getBoundingClientRect().width/bg.offsetWidth;
      const ratioY = data.canvasWrapper.getBoundingClientRect().height/bg.offsetHeight;
      data.canvasWrapper.style.right = left * ratioX + 'px';
      data.canvasWrapper.style.bottom = top * ratioY + 'px';

      const marginLeft = Math.floor(miniMap.getBoundingClientRect().left) - Math.floor(bg.getBoundingClientRect().left);
      const marginRight = Math.floor(miniMap.getBoundingClientRect().right) - Math.ceil(bg.getBoundingClientRect().right);
      const marginTop = Math.floor(miniMap.getBoundingClientRect().top) - Math.floor(bg.getBoundingClientRect().top);
      const marginBottom = Math.floor(miniMap.getBoundingClientRect().bottom) - Math.floor(bg.getBoundingClientRect().bottom);

      if (marginRight === 0 || marginRight === 1) {
        xMax = (currentLeft) ? currentLeft + rangeX - 1 : rangeX - 1;
      }

      if (marginLeft === 0 || marginLeft === 1) {
        xMin = (currentLeft) ? currentLeft + rangeX : rangeX;
      }

      if (marginBottom === 0 || marginBottom === 1) {
        yMax = (currentTop) ? currentTop + rangeY : rangeY;
      }

      if (marginTop === 0 || marginTop === 1) {
        yMin = (currentTop) ? currentTop + rangeY : rangeY;
      }
    }
  });

  miniMap.addEventListener('mouseup', (e) => {
    isMouseDown = false;
    x0 = e.pageX;
    y0 = e.pageY;
    currentTop = top;
    currentLeft = left;
  });

  miniMap.addEventListener('mouseout', () => {
    isMouseDown = false;
  });
}

export default miniMapInit;