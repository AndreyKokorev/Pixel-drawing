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
import styleColor from './modules/style-color.js';
import {
  chooseColor
} from './modules/color-panel/choose-color.js';
import setPixelSize from './modules/tools/pixel-size.js';
import layersManager from './modules/right-control-panel/layers-manager.js';
import {
  frameManager
} from './modules/frame-manager.js';
import setCanvasWrapperSize from './modules/right-control-panel/canvas-size.js';
import pointer from './modules/pointer.js';
import {
  startAnimation
} from './modules/right-control-panel/animation-manager.js';
import asidePanelManager from './modules/aside-panel/aside-panel-manager.js';
import setHotKeys from './modules/hot-keys.js'
import transform from './modules/right-control-panel/transform-manager.js'

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
    isMirrorPen: false,
    isPaintBucket: false,
    isPaintAll: false,
    isEraser: false,
    isRectangle: false,
    isLine: false,
    isCircle: false,
    isColorPicker: false,
    isMove: false
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
paintAll();
eraser();
line();
rectangle();
circle();
colorPickerTool();
move();
startAnimation();
asidePanelManager();
transform();
setHotKeys();

function renderCanvas() {
  canvasLayer_1.width = 55;
  canvasPixelWidth = Math.floor((canvasBase.offsetWidth * 0.99) / canvasLayer_1.width);
  canvasWrapper.style.width = `${canvasLayer_1.width * canvasPixelWidth}px`;

  canvasLayer_1.height = Math.floor(canvasBase.offsetHeight * 0.99 / canvasPixelWidth);
  canvasWrapper.style.height = `${canvasLayer_1.height * canvasPixelWidth}px`;

  canvasUpper.width = canvasLayer_1.width;
  canvasUpper.height = canvasLayer_1.height;
}

//To do:
//Ограничить размер канваса у фрейм менеджера
//Выставить максимальный размер файла при сохранении
//При загрузе изображений вылетает Uint8 из animation-manager
//При загрузке изображения с пк при 4 пункте слетает канвас
//При выставлении высокого разрешения канваса, он исчезает, возможно из-за превышения размеров контейнера
// Разработать алгоритм отрабатывания инструмента при выходе за границы канваса
//? при скачивании изображения вылазило предупреждение в адресной строке
//Сделать отмену изменений
//Удаление изображений фреймов
//? При удалении фрейма прекращается анимация 
//При быстром добавлении(дублировании) нескольких подряд слоёв ошибка,gри высоком фпс не успевает загрузиться PNG
//Добавить инструменты
//Удалить иди доделать изменение цвета текста при выборе цвета