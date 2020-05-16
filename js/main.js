import toolsManager from './modules/tools/toolsManager.js';
import pen from './modules/tools/pen.js';
import paintBucket from './modules/tools/paint-bucket.js';
import paintAll from './modules/tools/paintAll.js';
import eraser from './modules/tools/eraser.js';
import rectangle from './modules/tools/rectangle.js';
import line from './modules/tools/line.js';
import circle from './modules/tools/circle.js';
import colorPickerTool from './modules/tools/color-picker-tool.js';
import move from './modules/tools/move.js';
import lighten from './modules/tools/lighten.js';
import styleColor from './modules/style-color.js';
import {chooseColor} from './modules/color-panel/choose-color.js';
import setPixelSize from './modules/tools/pixel-size.js';
import layersManager from './modules/right-control-panel/layers-manager.js';
import {frameManager} from './modules/frame-manager.js';
import setCanvasWrapperSize from './modules/right-control-panel/canvas-size.js';
import pointer from './modules/pointer.js';
import {startAnimation} from './modules/right-control-panel/animation-manager.js';
import asidePanelManager from './modules/aside-panel/aside-panel-manager.js';
import setHotKeys from './modules/hot-keys.js';
import transform from './modules/right-control-panel/transform-manager.js';
import miniMapInit from './modules/right-control-panel/mini-map.js';
import tips from './modules/tips.js';
let data;

runApp();

async function runApp() {
  const canvasBase = document.querySelector('.canvas-base');
  const canvasLayer_1 = document.querySelector('.canvas-layer-1');
  const canvasUpper = document.querySelector('.canvas-layer-upper');
  const ctxLayer_1 = canvasLayer_1.getContext('2d');
  const ctxUpper = canvasUpper.getContext('2d');
  const canvPrevFrame = document.querySelector('.canvas-prev-frame');
  const canvNextFrame = document.querySelector('.canvas-next-frame');
  const canvPrevFrameCtx = canvPrevFrame.getContext('2d');
  const canvNextFrameCtx = canvNextFrame.getContext('2d');
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  let canvasPixelWidth;

  canvasLayer_1.width = 40;

  let promise = new Promise((resolve) => {
    const interval = setInterval(() => {
      if (canvasBase.offsetWidth > 0) {
        clearInterval(interval)
        resolve();
      };
    }, 30);
  });
  await promise;

  canvasPixelWidth = Math.floor((canvasBase.offsetWidth * 0.99) / canvasLayer_1.width); 
  canvasWrapper.style.width = `${canvasLayer_1.width * canvasPixelWidth}px`;
  canvasLayer_1.height = Math.floor(canvasBase.offsetHeight * 0.99 / canvasPixelWidth);
  canvasWrapper.style.height = `${canvasLayer_1.height * canvasPixelWidth}px`;

  canvPrevFrame.width = canvasLayer_1.width;
  canvPrevFrame.height = canvasLayer_1.height;
  canvNextFrame.width = canvasLayer_1.width;
  canvNextFrame.height = canvasLayer_1.height;
  canvasUpper.width = canvasLayer_1.width;
  canvasUpper.height = canvasLayer_1.height;

  data = {
    canvasBase,
    canvasWrapper,
    canvPrevFrame,
    canvNextFrame,
    canvPrevFrameCtx,
    canvNextFrameCtx,
    basicLayer: canvasLayer_1,
    basicCtx: ctxLayer_1,
    canv: canvasUpper,
    ctx: ctxUpper,
    currentLayer: canvasLayer_1,
    currentCtx: ctxLayer_1,
    canvIndex: canvasPixelWidth,
    pixelSize: 1,
    deflection: localStorage.getItem('deflection') || 0,
    tools: {
      isPen: true,
      isMirrorPen: false,
      isPaintBucket: false,
      isPaintAll: false,
      isEraser: false,
      isRectangle: false,
      isLine: false,
      isCircle: false,
      isColorPicker: false,
      isMove: false,
      isLighten: false
    },
    offTools() {
      this.tools.isPen = false;
      this.tools.isMirrorPen = false;
      this.tools.isPaintBucket = false;
      this.tools.isPaintAll = false;
      this.tools.isChooseColor = false;
      this.tools.isEraser = false;
      this.tools.isLine = false;
      this.tools.isRectangle = false;
      this.tools.isCircle = false;
      this.tools.isColorPicker = false;
      this.tools.isMove = false;
      this.tools.isLighten = false;
    }
  };

  if (navigator.vendor !== 'Google Inc.') {
    document.querySelector('.frame-column').style.width = '135px';
  }
  
  initModules();
}

function initModules() {
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
  paintAll();
  eraser();
  line();
  rectangle();
  circle();
  colorPickerTool();
  move();
  lighten();
  startAnimation();
  asidePanelManager();
  transform();
  miniMapInit();
  setHotKeys();
  tips();
}

export {data};

//To do:
//дергается подсказка
//Cors при загрузке картинки
//Оптимизировать lighten tool
//При удалении фрейма остаются слои след. и пред. фрейма
// Разработать алгоритм отрабатывания инструмента при выходе за границы канваса
//Сделать отмену изменений
//Удаление изображений фреймов
//Удалить иди доделать изменение цвета текста при выборе цвета