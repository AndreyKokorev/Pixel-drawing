import {
  data
} from '../../main.js';
import pen from '../tools/pen.js';
import pickr from './color-picker-panel.js';

const colors = document.querySelectorAll('.lower-panel__item');
let colorCounter = 0;
let chosenColor;

function chooseColor() { 
  pickr.on('save', (color) => {
    chosenColor = color.toHEXA().toString()
    getColor();
    pickr.hide();
  })
 
  const apiPicker = document.querySelector('.pcr-button');
  const colorPicker = document.querySelector('.lower-panel__color-picker');
  const colorHistory = document.querySelector('.lower-panel__item-3');
  
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
    const currentColor = document.querySelector('.name-2');
    currentColor.style.color = `${data.colors.get(colors[0])}`;
    currentColor.style.filter = 'hue-rotate(180deg)';
    apiPicker.click();

    colorPicker.addEventListener('input', function func() {
      getColor();
      colorPicker.removeEventListener('input', func);
    });
  });
};

function getColor(pickColor) {
  const colorPanel = document.querySelector('.lower-panel__item-3');
  const newColor = document.createElement('div');
  
  newColor.classList.add('color', `color-${colorCounter += 1}`);
  newColor.style.background = pickColor ||chosenColor;
  colorPanel.appendChild(newColor);

  data.colorArray.set(newColor, pickColor || chosenColor);

  data.colors.set(colors[1], data.colors.get(colors[0]));
  colors[1].style.background = `linear-gradient(to right, ${data.colors.get(colors[1])} 14%, white 27%)`;
  data.colors.set(colors[0], pickColor || chosenColor);
  colors[0].style.background = `linear-gradient(to right, ${data.colors.get(colors[0])} 14%, white 27%)`;
  data.colors.currentColor = data.colors.get(colors[0]);
}

export {chooseColor};
export {getColor};