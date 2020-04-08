import {
  data
} from '../../main.js';
import {
  getColor
} from '../color-panel/choose-color.js'

function colorPickerTool() {

  data.canv.addEventListener('mousedown', (e) => {
    if (data.tools.isColorPicker === true) {
      const x = Math.floor(e.offsetX / data.canvIndex);
      const y = Math.floor(e.offsetY / data.canvIndex);
      let color = data.currentCtx.getImageData(x, y, 1, 1).data;

      color = `rgba(${[color.slice(0,3), 1]})`;

      getColor(color)
    }
  })
}

export default colorPickerTool;