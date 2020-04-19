function tips() {
  const controlPanel = document.querySelector('.control-panel-right');

  document.body.addEventListener('mouseover', (e) => {
    if (e.target.dataset.originalTitle) {
      const tip = e.target.dataset.originalTitle;
      const wrapper = document.createElement('div');

      if (e.target.dataset.placement === 'top') {
        wrapper.classList.add('tip-wrapper', 'top-tip');
      } else if (e.target.dataset.placement === 'right') {
        wrapper.classList.add('tip-wrapper', 'right-tip');
      } else {
        wrapper.classList.add('tip-wrapper', 'left-tip');
      }

      wrapper.innerHTML = tip;
      document.body.append(wrapper);
      const tipWrapper = document.querySelector('.tip-wrapper');

      if (e.target.dataset.placement === 'top') {
        wrapper.style.left = `${e.target.getBoundingClientRect().left - (tipWrapper.offsetWidth / 2 - e.target.getBoundingClientRect().width / 2)}px`;
        wrapper.style.top = `${e.target.getBoundingClientRect().top - e.target.getBoundingClientRect().height - 20}px`;
      } else if (e.target.dataset.placement === 'right') {
        wrapper.style.left = `${e.target.getBoundingClientRect().right - 10}px`;
        wrapper.style.top = `${e.target.getBoundingClientRect().top - (tipWrapper.offsetHeight / 2 - e.target.getBoundingClientRect().height / 2)}px`;
      } else {
        const bodyW = document.body.offsetWidth;
        wrapper.style.right = `${bodyW - e.target.getBoundingClientRect().left + 8}px`;
        wrapper.style.top = `${e.target.getBoundingClientRect().top - (tipWrapper.offsetHeight / 2 - e.target.getBoundingClientRect().height / 2)}px`;
      }

      e.target.addEventListener('mouseout', function removeWrapper() {
        wrapper.remove();

        this.removeEventListener('mouseout', removeWrapper);
      });
    }
  });
}

export default tips;