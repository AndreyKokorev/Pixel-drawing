import toolsManager from './modules/tools/toolsManager.js';
import pen from './modules/tools/pen.js';
import paintBucket from './modules/tools/paint-bucket.js';
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
  canvInnerWidth: 32,
  canvIndex: canvasWrapperWidth / canvasLayer_1.width,
  marginX: 0,
  marginY: 0,
  pixelSize: 1,
  tools: {
    isPen: false,
    isPaintBucket: false,
    isPaintAll: false,
    isEraser: false
  },
  offTools() {
    this.tools.isPen = false;
    this.tools.isChooseColor = false;
    this.tools.isPaintBucket = false;
    this.tools.isEraser = false;
    this.tools.isStroke = false;
    this.tools.isRecktangle = false;
    this.tools.isCircle = false;
  }
}

data.canvInnerHeight = canvasLayer_1.height

data.tools.isPen = true;

styleColor();
chooseColor();
setPixelSize();
layersManager();
setCanvasWrapperSize();
pointer();
toolsManager();
pen();
paintBucket();



//To do:
//настроить центровку мыши при больших размерах пера
//переписать названия функций
//Удалить иди доделать изменение цвета текста при выборе цвета