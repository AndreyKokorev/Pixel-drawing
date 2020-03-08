import {
  data
} from '../../main.js';
import {
  renderAllFrames
} from '../frame-manager.js';
import {
  renderFrame
} from '../frame-manager.js';
import {
  saveFrameImageData
} from '../frame-manager.js';
import {
  frameToPNG
} from '../right-control-panel/animation-manager.js'

function asidePanelManager() {
  const asidePanel = document.querySelector('.aside-panel');
  const url = document.querySelector('.url');
  let drawImage = native;
  let state = 'close';

  asidePanel.addEventListener('click', (e) => {
    const operatingWrapper = document.querySelector('.aside-panel__operating-wrapper');
    const saveOperating = document.querySelector('.aside-panel__save-operating');
    const saveInstrument = document.querySelector('.icon-save');
    const importOperating = document.querySelector('.aside-panel__import-operating');
    const importInstrument = document.querySelector('.icon-import');
    const range = saveOperating.querySelector('.range');
    const savePNG = saveOperating.querySelector('.button-save-image');
    const multiplier = saveOperating.querySelector('.multiplier');
    const widthInput = saveOperating.querySelector('.width');
    const heightInput = saveOperating.querySelector('.height');
    const filesName = saveOperating.querySelector('.files-name');
    const importURL = importOperating.querySelector('.button-import-url');
    const importFile = importOperating.querySelector('.button-import-file')
    const nativeSize = document.getElementById('native-size');
    const stretchImage = document.getElementById('stretch-image');
    const adaptCanvas = document.getElementById('adapt-canvas');

    if (e.target.firstChild === saveInstrument || e.target === saveInstrument) {
      if (state === 'close' || state === 'import') {
        widthInput.placeholder = data.canv.width;
        heightInput.placeholder = data.canv.height;
        range.value = 1;

        manipulateCSS(saveInstrument, saveOperating);
        multiplier.textContent = '1.0x'

        state = 'save';

      } else if (state === 'save') {
        operatingWrapper.style.width = '0';
        saveInstrument.parentElement.style.background = 'rgba(33, 189, 85, 0.692)';

        state = 'close'
      }
    }

    if (e.target.firstChild === importInstrument || e.target === importInstrument) {
      if (state === 'close' || state === 'save') {
        importInstrument.parentElement.style.background = 'rgba(245, 221, 7, 0.993)';
        manipulateCSS(importInstrument, importOperating);

        state = 'import';
      } else if (state === 'import') {
        operatingWrapper.style.width = '0';
        importInstrument.parentElement.style.background = 'rgba(33, 189, 85, 0.692)';

        state = 'close';
      }
    }

    if (e.target === savePNG) {
      save();
    } else if (e.target === nativeSize) {
      drawImage = native;
    } else if (e.target === stretchImage) {
      drawImage = stretch;
    } else if (e.target === adaptCanvas) {
      drawImage = adapt;
    } else if (e.target === importURL) {
      drawImage((importFile.value) ? importFile : url);
    }

    range.oninput = setResolution;

    function setResolution() {
      const value = Number(range.value);

      multiplier.textContent = value.toFixed(1) + 'x';
      widthInput.placeholder = `${data.canv.width * value }`;
      heightInput.placeholder = `${data.canv.height * value }`;
    }

    function save() {
      const keys = document.querySelectorAll('.frame-column__frame-wrapper');
      const frame = data.frameData.get(keys[0]).animationImageData[0];
      const canvas_1 = document.createElement('canvas');
      const canvas_2 = document.createElement('canvas');
      const ctx_1 = canvas_1.getContext('2d');
      const ctx_2 = canvas_2.getContext('2d');
      let dataURL, image, url;


      canvas_1.width = data.canv.width;
      canvas_1.height = data.canv.height;
      ctx_1.putImageData(frame, 0, 0);

      dataURL = canvas_1.toDataURL('image/png', 1.0);
      image = new Image();
      image.src = dataURL;

      image.onload = function () {
        canvas_1.width = image.width;
        canvas_1.height = image.height;
        ctx_1.drawImage(image, 0, 0);

        canvas_2.width = widthInput.placeholder;
        canvas_2.height = heightInput.placeholder;
        ctx_2.imageSmoothingEnabled = false;
        ctx_2.drawImage(canvas_1, 0, 0, canvas_2.width, canvas_2.height);

        dataURL = canvas_2.toDataURL('image/png', 1.0);

        url = document.createElement('a');
        document.body.appendChild(url);
        url.href = dataURL;
        url.download = (filesName.value) ? `${filesName.value}.png` : 'image.png';
        url.click();
        document.body.removeChild(url);
      }
    }

    function stretch(path) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = path.value;
      path.value = '';

      image.onload = () => {
        data.currentCtx.clearRect(0, 0, data.canv.width, data.canv.height);
        
        data.currentCtx.drawImage(image, 0, 0, data.canv.width, data.canv.height);
        
        saveFrameImageData(data.currentFrame, true);
        renderFrame();
        frameToPNG();
      }
    }

    function adapt(path) {
      const changeSize = document.querySelector('.canvas-size-wrapper .button-submit');
      const widthField = document.querySelector('.canvas-width-input');
      const heightField = document.querySelector('.canvas-height-input');
      const image = new Image();

      image.crossOrigin = "Anonymous";
      image.src = path.value;
      path.value = '';
      console.log( image.src)
      image.onload = () => {
        data.adaptImage = true;
        widthField.value = image.width;
        heightField.value = image.height;
        changeSize.click();
        data.adaptImage = false;
        
        data.currentCtx.clearRect(0, 0, data.canv.width, data.canv.height);
        data.currentCtx.drawImage(image, 0, 0, data.canv.width, data.canv.height);

        saveFrameImageData(data.currentFrame, true);
        renderAllFrames(document.querySelector('.list-layer.selected'));
        frameToPNG(true);
      }
    }

    function manipulateCSS(instrument, operating) {
      const instrumentsIcons = document.querySelectorAll('.aside-panel__icon-wrapper .icon-background');
      for (const operating of operatingWrapper.children) {
        operating.style.display = 'none';
      }
      for (const icon of instrumentsIcons) {
        icon.style.background = 'rgba(33, 189, 85, 0.692)';
      }

      operating.style.display = 'grid';
      instrument.parentElement.style.background = 'rgba(245, 221, 7, 0.993)';
      operatingWrapper.style.width = '250px';
    }
  });

  function native(path) {
    let marginX = 0;
    let marginY = 0;
    let ratio;
    let w;
    let h;
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = path.value;
    path.value = '';
    console.log( image.src)
    image.onload = () => {
      if (image.width > image.height) {
        ratio = image.width / image.height;
        w = data.canv.width;
        h = data.canv.width / ratio;
        marginY = (data.canv.height - h) / 2;
      } else {
        ratio = image.height / image.width;
        w = data.canv.width / ratio;
        h = data.canv.height;
        marginX = (data.canv.width - w) / 2;
      }

      data.currentCtx.clearRect(0, 0, data.canv.width, data.canv.height);
      data.currentCtx.drawImage(image, marginX, marginY, w, h);

      saveFrameImageData(data.currentFrame, true);
      renderFrame();
      frameToPNG();
    };
  }
}

export default asidePanelManager;