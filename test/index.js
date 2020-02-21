const canvWrapper = document.querySelector('.canvas-wrapper');
const canv = document.querySelector('.canvas.layer-main');
const ctx = canv.getContext('2d');
const colorPicker = document.querySelector('.lower-panel__color-picker');
const colors = document.querySelectorAll('.lower-panel__item');
const search = document.querySelector('.search-field');

canv.width = localStorage.getItem('canvWidth') || 512;
canv.height = localStorage.getItem('canvWidth') || 512;

const par = {
  isDownload: false,
  canvIndex: 512 / canv.width,
  marginX: 0,
  marginY: 0
};

const instruments = {
  filters: {
    l: document.querySelector('.filters').addEventListener('click', (e) => {
      if (e.target.classList.contains('greyscale')) instruments.filters.applyFilter('greyscale');
    }),
    applyFilter: (filter) => {
      if (filter === 'greyscale') {
        const imageData = ctx.getImageData(0, 0, canv.width, canv.height);
        const dt = imageData.data;
        for (let i = 0; i < dt.length; i += 4) {
          const r = dt[i];
          const g = dt[i + 1];
          const b = dt[i + 2];
          const y = 0.299 * r + 0.587 * g + 0.114 * b;
          dt[i] = y;
          dt[i + 1] = y;
          dt[i + 2] = y;
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }
};

const rangeCanv = document.querySelector('.canvas-size');
rangeCanv.setAttribute('value', `${localStorage.getItem('range')}`);
rangeCanv.addEventListener('change', function func() {
  const img = new Image();
  img.src = canv.toDataURL();
  rangeCanv.setAttribute('value', `${this.value}`);
  if (this.value === '1') {
    canv.width = 128;
    canv.height = 128;
    par.canvIndex = 512 / 128;
  }
  if (this.value === '2') {
    canv.width = 256;
    canv.height = 256;
    par.canvIndex = 512 / 256;
  }
  if (this.value === '3') {
    canv.width = 512;
    canv.height = 512;
    par.canvIndex = 1;
  }
  paint.setColFunc();
  draw(img);
  ctx.imageSmoothingEnabled = false;
});
document.querySelector('.search-button').addEventListener('click', () => {
  const text = search.value;
  search.value = '';
  drawImage(text);
});

changeColor();
//paint();
paintBucket();
chooseColor();
toolsIndication();
saveWorkingArea();
loadLStorage();
hotKeys();
//eraser();
//drawingLine();
drawingRect();
function getImage(word) {
  const clientID = 'f0c987e8bc6a095e2a4fc94da5548f940b393b2ce416b3535920c1df0dbd46e8';
  const img = new Image();
  const url = `https://api.unsplash.com/photos/random?query=${word}&client_id=${clientID}`;
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      img.src = data.urls.full;
      img.crossOrigin = 'Anonymous';
    });
  return img;
}
async function drawImage(word) {
  const image = await getImage(word);
  draw(image);
}

function eraser() {

  canv.addEventListener('mousedown', (e) => {
    ctx.clearRect(e.offsetX / par.canvIndex, e.offsetY / par.canvIndex, 1, 1);
  })

  canv.addEventListener('mousemove', (e) => {
    ctx.clearRect(e.offsetX / par.canvIndex, e.offsetY / par.canvIndex, 1, 1);
  });
}
function drawingRect() {
  let x0, y0, x1, y1;
  let mouseDown;
  let canvasLayer = document.createElement('canvas');
  canvasLayer.classList.add('canvas', 'layer-1');
  canvasLayer.style.zIndex = '100';
  canvasLayer.style.position = 'absolute';
  canvasLayer.style.left = '0';
  canvWrapper.appendChild(canvasLayer);
  const canvLayer1 = document.querySelector('.canvas.layer-1');
  const ctxLayer1 = canvLayer1.getContext('2d');
  canvLayer1.width = canv.width;
  canvLayer1.height = canv.height;

  canvLayer1.addEventListener('mousedown', (e) => {
    ctxLayer1.lineWidth = 256;
    ctxLayer1.strokeStyle = paint.color;
    mouseDown = true;
    x0 =  Math.floor(e.offsetX / par.canvIndex);
    y0 =  Math.floor(e.offsetY / par.canvIndex); 
  })
  canvLayer1.addEventListener('mousemove', function mouseMove(e) {
    if (mouseDown === true){
      ctxLayer1.clearRect(0, 0, canv.width, canv.height);
      x1 =  Math.floor(e.offsetX / par.canvIndex);
      y1 =  Math.floor(e.offsetY / par.canvIndex);
      ctxLayer1.strokeRect(x0, y0, x1 - x0, y1 - y0);
      //ctxLayer1.stroke();
    }   
  })
  canvLayer1.addEventListener('mouseup', () => {
    mouseDown = false;
    ctx.lineWidth = 10;
    ctx.strokeStyle = paint.color;
    ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    
    ctxLayer1.clearRect(0,0, canv.width, canv.height)
  })
}
function drawingLine() {
  let x0, y0, x1, y1;
  let mouseDown;
  let canvasLayer = document.createElement('canvas');
  canvasLayer.classList.add('canvas', 'layer-1');
  canvasLayer.style.zIndex = '100';
  canvasLayer.style.position = 'absolute';
  canvasLayer.style.left = '0';
  canvWrapper.appendChild(canvasLayer);
  const canvLayer1 = document.querySelector('.canvas.layer-1');
  const ctxLayer1 = canvLayer1.getContext('2d');
  canvLayer1.width = canv.width;
  canvLayer1.height = canv.height;

  canvLayer1.addEventListener('mousedown', (e) => {
    ctxLayer1.lineWidth = 1;
    ctxLayer1.strokeStyle = paint.color;
    ctxLayer1.fillStyle = paint.color;
    mouseDown = true;
    x0 =  Math.floor(e.offsetX / par.canvIndex);
    y0 =  Math.floor(e.offsetY / par.canvIndex); 
  })
  canvLayer1.addEventListener('mousemove', function mouseMove(e) {
    if (mouseDown === true){
      ctxLayer1.clearRect(0,0, canv.width, canv.height)
      x1 =  Math.floor(e.offsetX / par.canvIndex);
      y1 =  Math.floor(e.offsetY / par.canvIndex);
      drawLine(x0, y0, x1, y1, drawRect);
    }   
  })
  canvLayer1.addEventListener('mouseup', () => {
    mouseDown = false;
    drawLine(x0, y0, x1, y1);
    ctxLayer1.clearRect(0,0, canv.width, canv.height)
  })

  function drawRect(x, y) {
    ctxLayer1.fillRect(x, y, 1, 1);
    ctxLayer1.fill();
  }
}

function draw(image) {
  const img = image;
  let marginX = 0;
  let marginY = 0;
  let ratio;
  let w;
  let h;
  img.onload = () => {
    if (img.width > img.height) {
      ratio = img.width / img.height;
      w = canv.width;
      h = canv.width / ratio;
      marginY = (canv.width - h) / 2;
      par.marginY = marginY;
    } else {
      ratio = img.height / img.width;
      w = canv.width / ratio;
      h = canv.height;
      marginX = (canv.height - w) / 2;
      par.marginX = marginX;
    }
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.drawImage(img, marginX, marginY, w, h);
  };
}

function offTools() {
  paint.on = false;
  chooseColor.on = false;
  paintBucket.on = false;
}

function changeColor() {
  let percent1 = 10;
  let percent2 = 20;
  let i = 20;
  const saveData = JSON.parse(localStorage.getItem('colors'));
  changeColor.colors = new Map();

  try {
    changeColor.colors.set(colors[0], saveData[0][1]);
  } catch (error) {
    changeColor.colors.set(colors[0], 'rgb(72, 255, 0)');
  }
  try {
    changeColor.colors.set(colors[1], saveData[1][1]);
  } catch (error) {
    changeColor.colors.set(colors[1], 'rgb(98, 0, 255)');
  }
  try {
    changeColor.colors.set(colors[2], saveData[2][1]);
  } catch (error) {
    changeColor.colors.set(colors[2], 'rgb(255, 30, 0)');
  }
  try {
    changeColor.colors.set(colors[3], saveData[3][1]);
  } catch (error) {
    changeColor.colors.set(colors[3], 'rgb(0, 17, 255)');
  }

  colors[0].style.background = `linear-gradient(to right, ${changeColor.colors.get(colors[0])} 14%, white 27%)`;
  colors[1].style.background = `linear-gradient(to right, ${changeColor.colors.get(colors[1])} 14%, white 27%)`;

  paint.color = localStorage.getItem('penColor') || changeColor.colors.get(colors[0]);

  colors.forEach((item) => {
    item.addEventListener('click', () => {
      paint.color = changeColor.colors.get(item);
      paint.setColFunc();
    });
  });

  changeColor.picker = (item) => {
    const color = colorPicker.value || changeColor.colors.get(item);

    changeColor.colors.set(colors[1], changeColor.colors.get(colors[0]));
    colors[1].style.background = `linear-gradient(to right, ${changeColor.colors.get(colors[1])} 14%, white 27%)`;
    changeColor.colors.set(colors[0], color);
    colors[0].style.background = `linear-gradient(to right, ${changeColor.colors.get(colors[0])} 14%, white 27%)`;
    paint.color = changeColor.colors.get(colors[0]);
    paint.setColFunc();
  };

  colors[0].addEventListener('dblclick', () => {
    colorPicker.click();

    colorPicker.addEventListener('input', function func() {
      changeColor.picker();
      colorPicker.removeEventListener('input', func);
    });
  });

  colors.forEach((item) => {
    const sameItem = item;
    sameItem.addEventListener('mouseover', () => {
      sameItem.addEventListener('mouseout', () => {
        percent1 = 10;
        percent2 = 20;
        i = 20;
        sameItem.style.background = `linear-gradient(to right, ${changeColor.colors.get(item)} ${percent1 += 4}%, white ${percent2 += 7}%)`;
        clearInterval(int);
      });

      let int = setInterval(() => {
        sameItem.style.background = `linear-gradient(to right, ${changeColor.colors.get(item)} ${percent1 += 4}%, white ${percent2 += 7}%)`;

        if (percent1 > 40) clearInterval(int);
      }, i -= 1);
    });
  });
}

function paint() {
  const item = document.querySelector('.upper-panel__item-3');
  let mouseDown = false;
  let x0,
    y0,
    x1,
    y1;

  paint.on = true;
  paint.setColFunc = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = paint.color;
    ctx.fillStyle = paint.color;
  };

  paint.setColFunc();

  item.addEventListener('click', () => {
    offTools();
    paint.on = true;
    ctx.fillStyle = changeColor.colors.get(colors[0]);

    canv.addEventListener('mouseup', (e) => {
      if (paint.on === true) {
        mouseDown = false;
        x1 = Math.floor(e.offsetX / par.canvIndex);
        y1 = Math.floor(e.offsetY / par.canvIndex);
      }
    });

    canv.addEventListener('mousedown', (e) => {
      if (paint.on === true) {
        mouseDown = true;
        x0 = Math.floor(e.offsetX / par.canvIndex);
        y0 = Math.floor(e.offsetY / par.canvIndex);
        drawRect(Math.floor(e.offsetX / par.canvIndex), Math.floor(e.offsetY / par.canvIndex));
      }
    });

    canv.addEventListener('mousemove', (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      if (mouseDown && paint.on === true) {
        if (Math.abs(x / par.canvIndex - x0) > 2 || Math.abs(y / par.canvIndex - y0) > 2) {
          x1 = Math.floor(e.offsetX / par.canvIndex);
          y1 = Math.floor(e.offsetY / par.canvIndex);
          drawLine(x0, y0, x1, y1);
          x0 = x1;
          y0 = y1;
        }
      }
    });
  });
  item.click();
}

function drawRect(x, y) {
  ctx.fillRect(x, y, 1, 1);
  ctx.fill();
}

function drawLine(x2, y2, x3, y3, rect) {
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
  console.log(rectDrawing)
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
paint.setColFunc();

function paintBucket() {
  const item = document.querySelector('.upper-panel__item-1');

  item.addEventListener('click', () => {
    offTools();
    paintBucket.on = true;
    ctx.fillStyle = changeColor.colors.get(colors[0]);

    canv.addEventListener('mousedown', (e) => {
      if (paintBucket.on === true) {
        const x = Math.floor(e.offsetX / par.canvIndex);
        const y = Math.floor(e.offsetY / par.canvIndex);
        const getColor = ctx.getImageData(x, y, 1, 1);
        const color = [getColor.data[0], getColor.data[1], getColor.data[2], getColor.data[3]];
        floodFill(x, y, hexDec(ctx.fillStyle), color);
      }
    });
  });

  function hexDec(h) {
    const m = h.slice(1).match(/.{2}/g);

    m[0] = parseInt(m[0], 16);
    m[1] = parseInt(m[1], 16);
    m[2] = parseInt(m[2], 16);
    const array = m.join(',').split(',').map(number => +number);
    array.push(255);
    return array;
  }
}

function floodFill(x, y, workColors, pixelColor) {
  const imageData = ctx.getImageData(0, 0, canv.width, canv.height);
  const w = imageData.width;
  const h = imageData.height;
  const stack = [
    [x, y]
  ];
  let pixel;
  let point = 0;
  let k = 1200000;

  while (k > 0) {
    k -= 1;

    pixel = stack.pop();

    if (pixel === undefined) {
      break;
    }

    if (pixel[0] >= 0 || pixel[0] < w || pixel[1] >= 0 || pixel[1] < h) {
      point = (pixel[1] * w + pixel[0]) * 4;

      if (compare(point)) {
        put(point);

        stack.push([
          pixel[0] - 1,
          pixel[1]
        ]);
        stack.push([
          pixel[0] + 1,
          pixel[1]
        ]);
        stack.push([
          pixel[0],
          pixel[1] - 1
        ]);
        stack.push([
          pixel[0],
          pixel[1] + 1
        ]);
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);

  function compare(counter) {
    let hit = 0;
    let number = counter;
    pixelColor.forEach((color) => {
      if (color === imageData.data[number]) hit += 1;
      number += 1;
    });

    if (hit === 4) return true;
    return false;
  }

  function put(counter) {
    let number = counter;
    workColors.forEach((color) => {
      imageData.data[number] = color;
      number += 1;
    });
  }
}

function chooseColor() {
  const item = document.querySelector('.upper-panel__item-2');

  item.addEventListener('click', () => {
    offTools();
    chooseColor.on = true;

    canv.addEventListener('mousedown', (e) => {
      if (chooseColor.on === true) {
        const x = Math.floor(e.offsetX / par.canvIndex);
        const y = Math.floor(e.offsetY / par.canvIndex);
        const getColor = ctx.getImageData(x, y, 1, 1);
        let color = `rgba(${getColor.data[0]}, ${getColor.data[1]}, ${getColor.data[2]}, ${(getColor.data[3])})`;
        const prevColor = changeColor.colors.get(colors[0]);

        if (color === 'rgba(0, 0, 0, 0)') {
          color = 'rgba(255, 255, 255, 255)';
        }

        changeColor.colors.set(colors[0], color);
        changeColor.colors.set(colors[1], prevColor);
        colors[0].style.background = `linear-gradient(to right, ${changeColor.colors.get(colors[0])} 14%, white 27%)`;
        colors[1].style.background = `linear-gradient(to right, ${changeColor.colors.get(colors[1])} 14%, white 27%)`;
        paint.color = color;
        paint.setColFunc();
      }
    });
  });
}

function toolsIndication() {
  const toolsPanel = document.querySelector('.upper-panel');
  toolsIndication.tools = document.querySelector('.upper-panel').querySelectorAll('span');

  toolsIndication.tools[2].classList.add('active');
  toolsIndication.tools[2].classList.add('chosen');

  toolsPanel.addEventListener('mouseover', (e) => {
    if (e.target.nodeName === 'SPAN') {
      e.target.classList.add('active');
    }
  });
  toolsPanel.addEventListener('mouseout', (e) => {
    if (e.target.nodeName === 'SPAN' && e.target.classList.contains('chosen') === false) {
      e.target.classList.remove('active');
    }
  });
  toolsPanel.addEventListener('click', (e) => {
    if (e.target.nodeName === 'SPAN') {
      toolsIndication.delCl(e.target);
    }
  });
  toolsIndication.delCl = (node) => {
    toolsIndication.tools.forEach((item) => {
      item.classList.remove('active');
      item.classList.remove('chosen');
    });
    node.classList.add('chosen');
    node.classList.add('active');
  };
}

function loadLStorage() {
  const img = new Image();
  img.src = localStorage.getItem('canvas');
  img.onload = () => {
    par.isDownload = true;
    ctx.drawImage(img, 0, 0);
  };
}

function saveWorkingArea() {
  document.addEventListener('mouseout', () => {
    localStorage.setItem('colors', JSON.stringify([...changeColor.colors]));
    localStorage.setItem('canvas', canv.toDataURL());
    localStorage.setItem('penColor', paint.color);
    localStorage.setItem('range', rangeCanv.getAttribute('value'));
    localStorage.setItem('canvWidth', canv.width);
  });
}

function hotKeys() {
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 67) {
      document.querySelector('.upper-panel__item-2').click(); // C
      toolsIndication.delCl(document.querySelector('.upper-panel__item-2 span'));
    }
    if (e.keyCode === 66) {
      document.querySelector('.upper-panel__item-1').click(); // B
      toolsIndication.delCl(document.querySelector('.upper-panel__item-1 span'));
    }
    if (e.keyCode === 80) {
      document.querySelector('.upper-panel__item-3').click(); // P
      toolsIndication.delCl(document.querySelector('.upper-panel__item-3 span'));
    }
    if (e.keyCode === 82) { // R
      localStorage.removeItem('colors');
      localStorage.removeItem('canvas');
      ctx.clearRect(0, 0, canv.width, canv.height)
    }
  });
}