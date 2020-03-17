import {
  data
} from '../main.js';

function setHotKeys() {
  const tools = document.querySelectorAll('.upper-panel li');

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 80) {
      data.offTools();
      data.tools.isPen = true;
      for (const item of tools) {
        if (item.classList.contains('chosen')) {
          item.classList.remove('chosen', 'active')
        }
        if (item.id === 'isPen') {
          item.classList.add('chosen', 'active');
        }
      }
    }
  })
}

export default setHotKeys;