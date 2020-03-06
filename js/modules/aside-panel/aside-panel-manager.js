import {
  data
} from '../../main.js';

function asidePanelManager() {
  const instruments = document.querySelector('.aside-panel__icon-wrapper');
  const saveInstrument = document.querySelector('.icon-save');
  let state = 'close';

  instruments.addEventListener('click', (e) => {
    if (e.target.firstChild === saveInstrument || e.target === saveInstrument) {
      const saveOperating = document.querySelector('.aside-panel__save-operating');
      const range = saveOperating.querySelector('.range');
      const multiplier = saveOperating.querySelector('.multiplier');
      const widthInput = saveOperating.querySelector('.width');
      const heightInput = saveOperating.querySelector('.height');
      const filesName = saveOperating.querySelector('.files-name');
      const savePNG = saveOperating.querySelector('.image');

      if (state === 'close') {
        saveOperating.style.width = '250px';
        saveInstrument.parentElement.style.background = 'rgba(245, 221, 7, 0.993)';

        range.value = 1;
        multiplier.textContent = '1.0x'
        widthInput.placeholder = data.canv.width;
        heightInput.placeholder = data.canv.height;

        range.addEventListener('input', function setResolution(e) {
          const value = Number(range.value);

          multiplier.textContent = value.toFixed(1) + 'x';
          widthInput.placeholder = `${data.canv.width * value }`;
          heightInput.placeholder = `${data.canv.height * value }`;
        })

        savePNG.addEventListener('click', function () {
          save();
        })

        state = 'open';
      } else {
        saveOperating.style.width = '0';
        saveInstrument.parentElement.style.background = 'rgba(33, 189, 85, 0.692)';

        state = 'close'
      }

      function save() {
        const keys = document.querySelectorAll('.frame-column__frame-wrapper');
        const frame = data.frameData.get(keys[0]).animationImageData[0];
        const canvas_1 = document.createElement('canvas');
        const canvas_2 = document.createElement('canvas');
        const ctx_1 = canvas_1.getContext('2d');
        const ctx_2 = canvas_2.getContext('2d');
        let dataURL, image, link;


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

          canvas_2.width = 1000;
          canvas_2.height = 1000;
          ctx_2.imageSmoothingEnabled = false;
          ctx_2.drawImage(canvas_1, 0, 0, canvas_2.width, canvas_2.height);

          dataURL = canvas_2.toDataURL('image/png', 1.0);

          link = document.createElement('a');
          document.body.appendChild(link);
          link.href = dataURL;
          link.download = (filesName.value) ? `${filesName.value}.png` : 'image.png';
          link.click();
          document.body.removeChild(link);
        }
      }
    }
  });
}

export default asidePanelManager;