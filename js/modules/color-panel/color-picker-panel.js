const pickr = Pickr.create({
  el: '.color-picker',
  theme: 'classic', 
  lockOpacity: true,
  default: 'fff',
  //parent: null,
  //autoReposition: true,
// or 'monolith', or 'nano'

  swatches: [
    'rgba(0, 0, 0, 1)',
    'rgba(244, 67, 54, 1)',
    'rgba(233, 30, 99, 0.1)',
    'rgba(156, 39, 176, 1)',
    'rgba(103, 58, 183, 1)',
    'rgba(63, 81, 181, 1)',
    'rgba(33, 150, 243, 1)',
    'rgba(3, 169, 244, 1)',
    'rgba(0, 188, 212, 1)',
    'rgba(0, 150, 136, 1)',
    'rgba(76, 175, 80, 1)',
    'rgba(139, 195, 74, 1)',
    'rgba(205, 220, 57, 1)',
    'rgba(255, 235, 59, 1)',
    'rgba(255, 193, 7, 1)',
    'rgba(255, 255, 255, 1)'
  ],

  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,
    // Input / output Options
    interaction: {
      rgba: true,
      hex: false,
      hsla: false,
      hsva: false,
      cmyk: false,
      input: true,
      clear: false,
      save: true
    }
  }  
});

export default pickr;