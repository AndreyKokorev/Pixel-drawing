import {
  data
} from '../../main.js';

function layersManager() {
  const basicLayer = document.querySelector('.list-layer-1');
  const upperLayer = document.querySelector('.canvas-layer-upper');
  const layersList = document.querySelector('.layers-panel__layers-list');
  const layersListChildren = layersList.children;
  const buttonAddLayer = document.querySelector('.button-add-layer');
  const buttonChangeName = document.querySelector('.button-change-name');
  const buttonUpLayer = document.querySelector('.button-up-layer');
  const buttonDownLayer = document.querySelector('.button-down-layer');
  const buttonDelLayer = document.querySelector('.button-delete-layer');
  const buttonMergeLayer = document.querySelector('.button-merge-layer');
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  const layers = new Map();
  let layersAmount = 1;
  let zIndex = 2;

  layers.set(basicLayer, new LayerData(data.currentLayer));
  basicLayer.classList.add('selected');
  basicLayer.style.boxShadow = '0 0 0 2px black';

  buttonAddLayer.addEventListener('click', () => {
    const newLayer = document.createElement('canvas');
    const layerListItem = document.createElement('li');

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

  buttonChangeName.addEventListener('click', () => {
    const inputName = document.createElement('input');
    let layerListItem;

    for (let item of layersListChildren) {
      if (item.classList.contains('selected')) {
        layerListItem = item;
        item.replaceWith(inputName);
        break;
      }
    }

    inputName.addEventListener('keydown', function replace(e) {
      if (e.keyCode === 13) {
        layerListItem.textContent = inputName.value;
        inputName.replaceWith(layerListItem);
      }
    })
    inputName.removeEventListener('click', replace);
  })

  buttonDelLayer.addEventListener('click', () => {
    data.currentLayer = data.basicLayer;
    data.currentCtx = data.basicCtx;

    for (let layer of layersListChildren) {
      if (layer.classList.contains('selected')) {
        if (layer.nextElementSibling) {
          data.currentLayer = layers.get(layer.nextElementSibling).canv;
          data.currentCtx = layers.get(layer.nextElementSibling).ctx;

          layer.nextElementSibling.classList.add('selected');
          layer.nextElementSibling.style.boxShadow = '0 0 0 2px black';

          setOpacity(layer.nextElementSibling);

        } else if (layer.previousElementSibling) {
          data.currentLayer = layers.get(layer.previousElementSibling).canv;
          data.currentCtx = layers.get(layer.previousElementSibling).ctx;

          layer.previousElementSibling.classList.add('selected')
          layer.previousElementSibling.style.boxShadow = '0 0 0 2px black';

          setOpacity(layer.previousElementSibling);
        }

        layers.get(layer).canv.remove();
        layers.delete(layer)
        layer.remove();

        if (layersListChildren.length === 0) {
          layersAmount = 0;
          zIndex = 2;
        }
        break;
      }
    }
  });

  buttonUpLayer.addEventListener('click', () => {
    for (let item of layersListChildren) {
      if (item.classList.contains('selected') && item.previousElementSibling) {
        item.previousElementSibling.before(item);
        break;
      }
    }

    setZIndex();
  })

  buttonDownLayer.addEventListener('click', () => {
    let layerListItem;

    for (let item of layersListChildren) {
      if (item.classList.contains('selected') && item.nextElementSibling) {
        layerListItem = item;
        break;
      }
    }
    if (layerListItem) layerListItem.nextElementSibling.after(layerListItem);

    setZIndex();
  })

  buttonMergeLayer.addEventListener('click', () => {
    let layer_1, layer_2, dataLayer_1, dataLayer_2;

    for (let item of layersListChildren) {
      if (item.classList.contains('selected') && item.nextElementSibling) {
        const ctxLayer_1 = layers.get(item).ctx;
        const ctxLayer_2 = layers.get(item.nextElementSibling).ctx;

        layer_1 = ctxLayer_1.getImageData(0, 0, data.canvSize, data.canvSize);
        layer_2 = ctxLayer_2.getImageData(0, 0, data.canvSize, data.canvSize);
        let dt_1 = layer_1.data;
        let dt_2 = layer_2.data;


        for (let i = 0; i < dt_2.length; i += 4) {
          if (dt_1[i] !== 0 || dt_1[i + 1] !== 0 || dt_1[i + 2] !== 0 || dt_1[i + 3] !== 0) {
            dt_2[i] = dt_1[i];
            dt_2[i + 1] = dt_1[i + 1];
            dt_2[i + 2] = dt_1[i + 2];
            dt_2[i + 3] = dt_1[i + 3];
          }
        }

        layers.get(item).ctx.putImageData(layer_2, 0 ,0);

        layers.get(item.nextElementSibling).canv.remove();
        layers.delete(item.nextElementSibling);
        item.nextElementSibling.remove();
      }
    }
  })

  layersList.addEventListener('click', (e) => {
    if (e.target.nodeName == 'LI') {
      data.currentLayer = layers.get(e.target).canv;
      data.currentCtx = layers.get(e.target).ctx;

      setZIndex();
      deleteClass();
      setOpacity(e.target);

      e.target.classList.add('selected');
      e.target.style.boxShadow = '0 0 0 2px black';
    }
  })

  function setZIndex() {
    for (let i = 0; i <= layersListChildren.length - 1; i += 1) {
      layers.get(layersListChildren[i]).canv.style.zIndex = layersListChildren.length - i;
    }

    upperLayer.style.zIndex = layersListChildren.length + 3;
  }

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