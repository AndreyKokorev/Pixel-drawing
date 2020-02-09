import {
  data
} from '../../main.js';

function layersManager() {
  const basicLayer = document.querySelector('.list-layer-1');
  const upperLayer = document.querySelector('.canvas-layer-upper');
  const layersList = document.querySelector('.layers-panel__layers-list');
  const layersListChildren = layersList.children;
  const buttonAddLayer = document.querySelector('.button-add-layer');
  const buttonDelLayer = document.querySelector('.button-delete-layer');
  const buttonUpLayer = document.querySelector('.button-up-layer');
  const buttonDownLayer = document.querySelector('.button-down-layer');
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  const layers = new Map();
  let layersAmount = 1;
  let zIndex = 2;

  layers.set(basicLayer, new LayerData(data.currentLayer));
  basicLayer.classList.add('selected');
  basicLayer.style.boxShadow = '0 0 0 2px black';

  buttonAddLayer.addEventListener('click', () => {
    const newLayer = document.createElement('canvas');
    const layerListItem = document.createElement('div');

    newLayer.width = data.canvSize;
    newLayer.height = data.canvSize;
    newLayer.classList.add(`canvas-layer-${layersAmount += 1}`, 'canvas-layer');
    newLayer.style.zIndex = `${zIndex += 1}`;
    upperLayer.style.zIndex = zIndex + 1;
    canvasWrapper.append(newLayer);

    deleteClass();

    layerListItem.classList.add(`list-layer`);
    layerListItem.textContent = `layer-${layersAmount}`;
    layerListItem.classList.add('selected');
    layerListItem.style.boxShadow = '0 0 0 2px black';
    layersList.prepend(layerListItem);

    layers.set(layerListItem, new LayerData(newLayer));
    data.currentLayer = layers.get(layerListItem).canvas;
    data.currentCtx = layers.get(layerListItem).ctx;

    setOpacity(layerListItem);
  })

  buttonDelLayer.addEventListener('click', () => {
    data.currentLayer = data.basicLayer;
    data.currentCtx = data.basicCtx;

    if (layersListChildren.length === 1) {
      data.currentLayer = data.basicLayer;
      data.currentCtx = data.basicCtx;
      layersAmount = 0;
      zIndex = 2;
    }

    for (let layer of layersListChildren) {
      if (layer.classList.contains('selected')) {
        if (layer.nextElementSibling) {
          data.currentLayer = layers.get(layer.nextElementSibling).canv;
          data.currentCtx = layers.get(layer.nextElementSibling).ctx;

          layer.nextElementSibling.classList.add('selected');
          layer.nextElementSibling.style.boxShadow = '0 0 0 2px black';

        } else if (layer.previousElementSibling) {
          data.currentLayer = layers.get(layer.previousElementSibling).canv;
          data.currentCtx = layers.get(layer.previousElementSibling).ctx;

          layer.previousElementSibling.classList.add('selected')
          layer.previousElementSibling.style.boxShadow = '0 0 0 2px black';
        }

        layers.get(layer).canv.remove();
        layers.delete(layer)
        layer.remove();
      }
    }
  });

  buttonUpLayer.addEventListener('click', () => {
    for (let layer of layersListChildren) {
      if (layer.classList.contains('selected') && layer.previousElementSibling) {
        layer.previousElementSibling.before(layer);
      }
    }
  })

  buttonDownLayer.addEventListener('click', () => {
    for (let layer of layersListChildren) {
      if (layer.classList.contains('selected') && layer.nextElementSibling) {
        layer.nextElementSibling.after(layer);
      }
    }
  })

  layersList.addEventListener('click', (e) => {
    data.currentLayer = layers.get(e.target).canv;
    data.currentCtx = layers.get(e.target).ctx;

    for (let i = 0 ; i <= layersListChildren.length - 1; i += 1) {
      layers.get(layersListChildren[i]).canv.style.zIndex = layersListChildren.length - i;
    }

    upperLayer.style.zIndex = layersListChildren.length + 3;
   
    deleteClass();
    setOpacity(e.target);
  
    e.target.classList.add('selected');
    e.target.style.boxShadow = '0 0 0 2px black';
  })

  function setOpacity(element) {
    const canvasArray = canvasWrapper.querySelectorAll('canvas');

    for (let layer of canvasArray) {
      layer.style.opacity = '0.2';
    }

    layers.get(element).canv.style.opacity = '1';
  }

  function deleteClass() {

    for (let layer of layersListChildren) {
      layer.classList.remove('selected');
      layer.style.boxShadow = 'none';
    }
  }
}

class LayerData {
  constructor(canv) {
    this.canv = canv;
    this.ctx = canv.getContext('2d');
  }
}

export default layersManager;