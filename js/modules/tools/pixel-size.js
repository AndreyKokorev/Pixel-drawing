import {
  data
} from '../../main.js';

function setPixelSize() {
  const pixelSizePanel = document.querySelector('.pixel-size-panel');
  const pixelsWrapper = document.querySelectorAll('.pixel-size-panel__wrapper');


  for (let wrapper of pixelsWrapper) {
    wrapper.classList.add('transition');
    if (wrapper.getAttribute('data') == data.pixelSize) {
      wrapper.classList.add('activePixelSize');
    }
  }

  pixelSizePanel.addEventListener('click', (e) => {
    if (e.target !== pixelSizePanel) {
      data.pixelSize = e.target.getAttribute('data');

      for (let wrapper of pixelsWrapper) {
        wrapper.classList.remove('activePixelSize');
        wrapper.classList.remove('chosen');
      }

      e.target.closest('.pixel-size-panel__wrapper').classList.add('activePixelSize');
      e.target.closest('.pixel-size-panel__wrapper').classList.add('chosen');
    }
  });

  pixelSizePanel.addEventListener('mouseover', (e) => {
    if (e.target !== pixelSizePanel) {
      e.target.closest('.pixel-size-panel__wrapper').classList.add('activePixelSize');
    }
  });

  pixelSizePanel.addEventListener('mouseout', (e) => {
    if (e.target !== pixelSizePanel) {
      if (!e.target.classList.contains('chosen')) {
        e.target.closest('.pixel-size-panel__wrapper').classList.remove('activePixelSize');
      }
    }
  });
}

export default setPixelSize;