import {
  data
} from '../../main.js';
import pen from '../tools/pen.js';
import pickr from './color-picker.js';

function chooseColor() {
  let chosenColor;

  pickr.on('save', (color) => {
    //console.log(color.toRGBA()[3].toFixed(2))
    // const r = color.toRGBA()[0].toFixed(0);
    // const g = color.toRGBA()[1].toFixed(0);
    // const b = color.toRGBA()[2].toFixed(0);
    // const alpha = color.toRGBA()[3].toFixed(2)
    // const rgba = `rgba(${[r, g, b, alpha]})`;
    chosenColor = color.toHEXA().toString()
    getColor();
    pickr.hide();
  })
  const colors = document.querySelectorAll('.lower-panel__item');
  const apiPicker = document.querySelector('.pcr-button');
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
    const currentColor = document.querySelector('.name');
    currentColor.style.color = `${data.colors.get(colors[0])}`;
    currentColor.style.filter = 'hue-rotate(180deg)';
    apiPicker.click();
    //colorPicker.click();

    colorPicker.addEventListener('input', function func() {
      getColor();
      colorPicker.removeEventListener('input', func);
    });
  });

  function getColor() {
    //const color = colorPicker.value;
    const colorPanel = document.querySelector('.lower-panel__item-3');
    const newColor = document.createElement('div');
    
    newColor.classList.add('color', `color-${colorCounter += 1}`);
    newColor.style.background = chosenColor;
    colorPanel.appendChild(newColor);

    data.colorArray.set(newColor, chosenColor);

    data.colors.set(colors[1], data.colors.get(colors[0]));
    colors[1].style.background = `linear-gradient(to right, ${data.colors.get(colors[1])} 14%, white 27%)`;
    data.colors.set(colors[0], chosenColor);
    colors[0].style.background = `linear-gradient(to right, ${data.colors.get(colors[0])} 14%, white 27%)`;
    data.colors.currentColor = data.colors.get(colors[0]);

    pen.setColFunc();
  }
};

export default chooseColor;