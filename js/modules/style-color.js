import {
  data
} from '../main.js';
import pen from './tools/pen.js';

function styleColor() {
  const colors = document.querySelectorAll('.lower-panel__item');
  let percent1 = 10;
  let percent2 = 20;
  let i = 20;
  const saveData = JSON.parse(localStorage.getItem('colors'));

  data.colors = new Map();

  try {
    data.colors.set(colors[0], saveData[0][1]);
  } catch (error) {
    data.colors.set(colors[0], 'rgb(72, 255, 0)');
  }
  try {
    data.colors.set(colors[1], saveData[1][1]);
  } catch (error) {
    data.colors.set(colors[1], 'rgb(98, 0, 255)');
  }

  colors[0].style.background = `linear-gradient(to right, ${data.colors.get(colors[0])} 14%, white 27%)`;
  colors[1].style.background = `linear-gradient(to right, ${data.colors.get(colors[1])} 14%, white 27%)`;

  data.colors.currentColor = localStorage.getItem('penColor') || data.colors.get(colors[0]);
 
  colors.forEach((item) => {
    const sameItem = item;
    sameItem.addEventListener('mouseover', () => {
      sameItem.addEventListener('mouseout', function out() {
        percent1 = 10;
        percent2 = 20;
        i = 20;
        sameItem.style.background = `linear-gradient(to right, ${data.colors.get(item)} ${percent1 += 4}%, white ${percent2 += 7}%)`;
        clearInterval(int);
        sameItem.removeEventListener('mouseout', out);
      });

      let int = setInterval(() => {
        sameItem.style.background = `linear-gradient(to right, ${data.colors.get(item)} ${percent1 += 4}%, white ${percent2 += 7}%)`;

        if (percent1 > 40) clearInterval(int);
      }, i -= 1);
    });
  });
}

export default styleColor;