import {
  data
} from '../main.js';

function frameManager() {
  const frameColumn = document.querySelector('.frame-column');
  const frameWrappersCollection = frameColumn.children;
  const addFrame = document.querySelector('.button-add-frame');
  const deleteFrame = document.querySelector('.frame-column__button-delete-frame');

  data.frameData = new Map();

  data.canv.addEventListener('mouseup', () => {
    renderFrame()
  });

  newFrame();

  addFrame.addEventListener('click', () => {
    newFrame();
  })

  frameColumn.addEventListener('click', (e) => {
    if (!e.target.closest('.frame-column__frame-wrapper').classList.contains('frame-column__frame-wrapper--active')) {
      const layersList = data.frameData.get(e.target.closest('.frame-column__frame-wrapper')).imageData.keys();
      const frame = e.target.closest('.frame-column__frame-wrapper');
      const layersData = data.frameData.get(frame).imageData;

      saveFrameImageData(data.currentFrame);

      for (const listItem of layersList) {
        const imageData = layersData.get(listItem);

        if (data.layers.get(listItem) === undefined) continue;

        data.layers.get(listItem).ctx.putImageData(imageData, 0, 0);
      }

      for (const frame of frameWrappersCollection) {
        frame.classList.remove('frame-column__frame-wrapper--active');
      }

      frame.classList.add('frame-column__frame-wrapper--active');
      data.currentFrame = frame;
      renderFrame();
    }
  })

  function newFrame() {
    const frameWrapper = document.createElement('div');
    const frame = document.createElement('canvas');
    const frameNumber = document.createElement('div');
    const deleteFrame = document.createElement('button');
    const dublicateFrame = document.createElement('button');

    for (const frame of frameWrappersCollection) {
      frame.classList.remove('frame-column__frame-wrapper--active');
    }

    frameWrapper.classList.add('frame-column__frame-wrapper', 'frame-column__frame-wrapper--active');
    frame.classList.add('frame-column__frame', `frame-wrapper__frame-${frameWrappersCollection.length + 1}`);
    frameNumber.classList.add('frame-column__frame-number');
    deleteFrame.classList.add('frame-column__button-delete-frame');
    dublicateFrame.classList.add('frame-column__button-duplicate-frame');

    deleteFrame.setAttribute('type', 'button');
    dublicateFrame.setAttribute('type', 'button');
    deleteFrame.textContent = 'Del';
    dublicateFrame.textContent = 'Dup';

    frameSize(frame);

    frameWrapper.append(frame);
    frameWrapper.append(frameNumber);
    frameWrapper.append(deleteFrame);
    frameWrapper.append(dublicateFrame);
    frameColumn.append(frameWrapper);

    setNumber();

    data.frameData.set(frameWrapper, new FrameData({
      canv: frame,
      ctx: frame.getContext('2d'),
    }, data.layers));

    if (data.currentFrame) {
      saveFrameImageData(data.currentFrame);
    }
    data.currentFrame = frameWrapper;
  }

  function setNumber() {
    let number = 1;

    for (const wrapper of frameWrappersCollection) {
      wrapper.querySelector('.frame-column__frame-number').textContent = number++;
    }
  }
}

function saveFrameImageData(frame, isLayerListItemClick) {
  const layersList = document.querySelectorAll('.list-layer');
  const imageData = new Map();
  const frameData = data.frameData.get(frame);

  for (const listItem of layersList) {
    const layerImageData = frameData.canvas.get(listItem).ctx.getImageData(0, 0, data.canv.width, data.canv.height);

    if (isLayerListItemClick !== true) {
      frameData.canvas.get(listItem).ctx.clearRect(0, 0, data.canv.width, data.canv.height);
    }
    imageData.set(listItem, layerImageData);
  }

  frameData.imageData = imageData;
}

function frameSize(frame) {
  frame.width = data.canv.width;
  frame.height = data.canv.height;
  if (frame.width > frame.height) {
    frame.style.width = '100%';
    frame.style.height = 100 / (frame.width / frame.height) + '%';
  } else {
    frame.style.height = '100%';
    frame.style.width = 100 / (frame.height / frame.width) + '%';
  }
}

function frameSizeAll() {
  for (const values of data.frameData.values()) {
    const canvas = values.frame.canv;
    canvas.width = data.canv.width;
    canvas.height = data.canv.height;
    if (canvas.width > canvas.height) {
      canvas.style.width = '100%';
      canvas.style.height = 100 / (canvas.width / canvas.height) + '%';
    } else {
      canvas.style.height = '100%';
      canvas.style.width = 100 / (canvas.height / canvas.width) + '%';
    }
  }
}

function renderFrame() {
  const canvasListItem = document.querySelector('.list-layer.selected');

  const imageData = data.layers.get(canvasListItem).ctx.getImageData(0, 0, data.canv.width, data.canv.height);
  data.frameData.get(data.currentFrame).frame.ctx.putImageData(imageData, 0, 0);
}

function renderAllFrames(layerListItem) {
  data.frameData.forEach(item => {
    console.log(item.imageData)
    if (item.imageData !== null) {
      item.frame.ctx.putImageData(item.imageData.get(layerListItem), 0, 0);
    }
  })
}

function renderMergeLayer(currentListItem, nextListItem) {
  for (const frame of data.frameData.keys()) {
    saveFrameImageData(frame, true);

    const dt_1 = data.frameData.get(frame).imageData.get(currentListItem).data;
    const dt_2 = data.frameData.get(frame).imageData.get(nextListItem).data

    for (let i = 0; i < dt_1.length; i += 4) {
      if (dt_1[i] === 0 && dt_1[i + 1] === 0 && dt_1[i + 2] === 0 && dt_1[i + 3] === 0) {
        dt_1[i] = dt_2[i];
        dt_1[i + 1] = dt_2[i + 1];
        dt_1[i + 2] = dt_2[i + 2];
        dt_1[i + 3] = dt_2[i + 3];
      }
    }
    data.frameData.get(frame).imageData.delete(nextListItem);
  }
}

class FrameData {
  constructor(frame, canvas) {
    this.frame = frame;
    this.canvas = canvas;
    this.imageData = null;
  }
}

export {
  saveFrameImageData
};
export {
  renderAllFrames
};
export {
  renderMergeLayer
};
export {
  frameSizeAll
};
export {
  renderFrame
};
export {
  frameManager
};