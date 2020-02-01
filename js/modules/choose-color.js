import {
  data
} from '../main.js';
import pen from './tools/pen.js';

function chooseColor() {
  const colors = document.querySelectorAll('.lower-panel__item');
  const colorPicker = document.querySelector('.lower-panel__color-picker');
  const colorHistory = document.querySelector('.lower-panel__item-3');
  let colorCounter = 0;
  data.colorArray = new Map();

  colorHistory.addEventListener('click', (e) => {
    const color = data.colorArray.get(e.target);

    data.colors.currentColor = color;
    data.colors.set(colors[1], data.colors.get(colors[0]));
    data.colors.set(colors[0], color);
    data.colors.currentColor = data.colorArray.get(e.target);

    colors[0].style.background = `linear-gradient(to right, ${color} 14%, white 27%)`;
    colors[1].style.background = `linear-gradient(to right, ${data.colors.get(colors[1])} 14%, white 27%)`;
  })

  colors[1].addEventListener('click', () => {
    const swap = data.colors.get(colors[1]);

    data.colors.currentColor = data.colors.get(colors[1]);
    data.colors.set(colors[1], data.colors.get(colors[0]));
    data.colors.set(colors[0], swap);

    colors[1].style.background = `linear-gradient(to right, ${data.colors.get(colors[1])} 42%, white 76%)`;
    colors[0].style.background = `linear-gradient(to right, ${data.colors.get(colors[0])} 14%, white 27%)`;
  });


  colors[0].addEventListener('click', () => {
    colorPicker.click();

    colorPicker.addEventListener('input', function func() {
      getColor();
      colorPicker.removeEventListener('input', func);
    });
  });

  function getColor() {
    const color = colorPicker.value;
    const colorPanel = document.querySelector('.lower-panel__item-3');

    const newColor = document.createElement('div');
    newColor.classList.add('color', `color-${colorCounter += 1}`);
    newColor.style.background = color;
    colorPanel.appendChild(newColor);
    data.colorArray.set(newColor, color);

    data.colors.set(colors[1], data.colors.get(colors[0]));
    colors[1].style.background = `linear-gradient(to right, ${data.colors.get(colors[1])} 14%, white 27%)`;
    data.colors.set(colors[0], color);
    colors[0].style.background = `linear-gradient(to right, ${data.colors.get(colors[0])} 14%, white 27%)`;
    data.colors.currentColor = data.colors.get(colors[0]);
    pen.setColFunc();
  }
};

export default chooseColor;