import {
  data
} from '../../main.js';

function toolsManager() {
  const toolsPanel = document.querySelector('.upper-panel');

  toolsManager.tools = document.querySelectorAll('.upper-panel li');
  toolsManager.tools[0].classList.add('active', 'chosen');

  toolsPanel.addEventListener('mouseover', (e) => {
    if (e.target.nodeName === 'LI') {
      e.target.classList.add('active');
    }
  });

  toolsPanel.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('chosen') === false) {
      e.target.classList.remove('active');
    }
  });

  toolsPanel.addEventListener('click', (e) => {
    if (e.target.nodeName === 'LI') {
      data.offTools();
      data.tools[e.target.id] = true;
      toolsManager.delCl(e.target);
    }
  });

  toolsManager.delCl = (node) => {
    toolsManager.tools.forEach((item) => {
      item.classList.remove('active');
      item.classList.remove('chosen');
    });
    node.classList.add('chosen');
    node.classList.add('active');
  };
}

export default toolsManager;