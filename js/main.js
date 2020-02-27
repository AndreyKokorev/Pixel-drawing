import toolsManager from './modules/tools/toolsManager.js';
import pen from './modules/tools/pen.js';
import paintBucket from './modules/tools/paint-bucket.js';
import eraser from './modules/tools/eraser.js';
import rectangle from './modules/tools/rectangle.js';
import line from './modules/tools/line.js';
import circle from './modules/tools/circle.js';
import styleColor from './modules/style-color.js';
import chooseColor from './modules/choose-color.js';
import setPixelSize from './modules/tools/pixel-size.js';
import layersManager from './modules/right-control-panel/layers-manager.js';
import {frameManager} from './modules/frame-manager.js';
import setCanvasWrapperSize from './modules/right-control-panel/canvas-size.js';
import pointer from './modules/pointer.js';

const canvasBase = document.querySelector('.canvas-base');
const canvasLayer_1 = document.querySelector('.canvas-layer-1');
const canvasUpper = document.querySelector('.canvas-layer-upper');
const ctxLayer_1 = canvasLayer_1.getContext('2d');
const ctxUpper = canvasUpper.getContext('2d');
const canvasWrapper = document.querySelector('.canvas-wrapper');
let canvasPixelWidth;

renderCanvas();

export const data = {
  basicLayer: canvasLayer_1,
  basicCtx: ctxLayer_1,
  canv: canvasUpper,
  ctx: ctxUpper,
  currentLayer: canvasLayer_1,
  currentCtx: ctxLayer_1,
  canvIndex: canvasPixelWidth,
  marginX: 0,
  marginY: 0,
  pixelSize: 1,
  deflection: localStorage.getItem('deflection') || 0,
  tools: {
    isPen: false,
    isPaintBucket: false,
    isPaintAll: false,
    isEraser: false,
    isRectangle: false,
    isLine: false,
    isCircle: false
  },
  offTools() {
    this.tools.isPen = false;
    this.tools.isChooseColor = false;
    this.tools.isPaintBucket = false;
    this.tools.isEraser = false;
    this.tools.isLine = false;
    this.tools.isRectangle = false;
    this.tools.isCircle = false;
  }
}

data.tools.isPen = true;

styleColor();
chooseColor();
setPixelSize();
layersManager();
frameManager();
setCanvasWrapperSize();
pointer();
toolsManager();
pen();
paintBucket();
eraser();
line();
rectangle();
circle();

function renderCanvas() {
  canvasLayer_1.width = 48;
  canvasPixelWidth = Math.floor((canvasBase.offsetWidth * 0.99) / canvasLayer_1.width);
  canvasWrapper.style.width = `${canvasLayer_1.width * canvasPixelWidth}px`;

  canvasLayer_1.height =  Math.floor(canvasBase.offsetHeight * 0.99 / canvasPixelWidth);
  canvasWrapper.style.height = `${canvasLayer_1.height * canvasPixelWidth}px`;
  
  canvasUpper.width = canvasLayer_1.width;
  canvasUpper.height = canvasLayer_1.height;
}

//To do:
//favicon error
//для резинки сделать алгоритм брезенхема
//Сделать дополнительный слой
//Оптимизировать количество обработчиков событий
//доработать алгоритм заливки
//переписать названия функций
//Удалить иди доделать изменение цвета текста при выборе цвета