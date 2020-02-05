import pen from './modules/tools/pen.js';
import styleColor from './modules/style-color.js';
import chooseColor from './modules/choose-color.js';
import setPixelSize from './modules/tools/pixel-size.js';

const canvasLayer_1 = document.querySelector('.canvas.layer-main');
const canvasUpper = document.querySelector('.canvas.layer-upper');
const ctxLayer_1 = canvasLayer_1.getContext('2d');
const ctxUpper = canvasUpper.getContext('2d');

canvasLayer_1.width = localStorage.getItem('canvWidth') || 32;
canvasLayer_1.height = localStorage.getItem('canvWidth') || 32;

export const data = {
  canv: canvasLayer_1,
  ctx: ctxLayer_1,
  isDownload: false,
  canvIndex: 512 / canvasLayer_1.width,
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
pen();
console.log(data)

//To do:
//настроить рисование линии