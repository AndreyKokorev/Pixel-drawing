import pen from './modules/tools/pen.js';
import styleColor from './modules/style-color.js';
import chooseColor from './modules/choose-color.js';

const canvasLayer_1 = document.querySelector('.canvas.layer-main');
const ctxLayer_1 = canvasLayer_1.getContext('2d');

canvasLayer_1.width = localStorage.getItem('canvWidth') || 512;
canvasLayer_1.height = localStorage.getItem('canvWidth') || 512;

export const data = {
  canv: canvasLayer_1,
  ctx: ctxLayer_1,
  isDownload: false,
  canvIndex: 512 / canvasLayer_1.width,
  marginX: 0,
  marginY: 0,
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
pen();
console.log(data)

