import pen from './modules/tools/pen.js';
import styleColor from './modules/style-color.js';
import chooseColor from './modules/choose-color.js';
import setPixelSize from './modules/tools/pixel-size.js';
import layersManager from './modules/right-control-panel/layers-manager.js';
import setCanvasWrapperSize from './modules/right-control-panel/canvas-size.js';
import pointer from './modules/pointer.js';

const canvasLayer_1 = document.querySelector('.canvas-layer-1');
const canvasUpper = document.querySelector('.canvas-layer-upper');
const ctxLayer_1 = canvasLayer_1.getContext('2d');
const ctxUpper = canvasUpper.getContext('2d');
const canvasWrapper = document.querySelector('.canvas-wrapper');
const canvasWrapperWidth = canvasWrapper.offsetWidth;
const canvasWrapperHeight = canvasWrapper.offsetHeight;

canvasLayer_1.width = localStorage.getItem('canvWidth') || 32;
canvasLayer_1.height = localStorage.getItem('canvWidth') || Math.floor(canvasWrapperHeight / (canvasWrapperWidth / 32));
canvasUpper.width = canvasLayer_1.width;
canvasUpper.height = canvasLayer_1.height;
canvasWrapper.style.height = `${canvasWrapperWidth / canvasLayer_1.width * canvasLayer_1.height}px`;

export const data = {
  basicLayer: canvasLayer_1,
  basicCtx: ctxLayer_1,
  canv: canvasUpper,
  ctx: ctxUpper,
  currentLayer: canvasLayer_1,
  currentCtx: ctxLayer_1,
  isDownload: false,
  canvSize: 32,
  canvIndex: canvasWrapperWidth / canvasLayer_1.width,
  marginX: 0,
  marginY: 0,
  pixelSize: 1,
  tools: {
    isPen: false,
    isChooseColor: false,
    isPaintBucket: false
  },
  offTools() {
    this.tools.isPen = false;
    this.tools.isChooseColor = false;
    this.tools.isPaintBucket = false;
  }
}

data.tools.pen = true;

styleColor();
chooseColor();
setPixelSize();
layersManager();
setCanvasWrapperSize();
pen();
pointer();


//To do:
//настроить рисование линии
//настроить центровку мыши при больших размерах пера
//Item.click() delete from pen
//переписать названия функций