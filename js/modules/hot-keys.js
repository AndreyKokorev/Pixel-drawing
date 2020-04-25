import {
  data
} from '../main.js';

function setHotKeys() {
  const tools = document.querySelectorAll('.upper-panel li');

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 'P'.charCodeAt()) {
      const tool = 'isPen';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }
    if (e.keyCode === 'V'.charCodeAt()) {
      const tool = 'isMirrorPen';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }
    if (e.keyCode === 'B'.charCodeAt()) {
      const tool = 'isPaintBucket';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }

    if (e.keyCode === 'A'.charCodeAt()) {
      const tool = 'isPaintAll';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }

    if (e.keyCode === 'E'.charCodeAt()) {
      const tool = 'isEraser';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }

    if (e.keyCode === 'L'.charCodeAt()) {
      const tool = 'isLine';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }

    if (e.keyCode === 'R'.charCodeAt()) {
      const tool = 'isRectangle';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }

    if (e.keyCode === 'C'.charCodeAt()) {
      const tool = 'isCircle';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }

    if (e.keyCode === 'O'.charCodeAt()) {
      const tool = 'isColorPicker';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }

    if (e.keyCode === 'M'.charCodeAt()) {
      const tool = 'isMove';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }

    if (e.keyCode === 'U'.charCodeAt()) {
      const tool = 'isLighten';
      data.offTools();
      data.tools[tool] = true;

      deleteClasses(tool)
    }

    function deleteClasses(tool) {
      for (const item of tools) {
        if (item.classList.contains('chosen')) {
          item.classList.remove('chosen', 'active')
        }
        if (item.id === tool) {
          item.classList.add('chosen', 'active');
        }
      }
    }
  });
}

export default setHotKeys;