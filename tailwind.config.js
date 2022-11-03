module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif']
    },
    colors: {
      'background': '#405673',
      'light-text': '#eeeeee',
      'dark-text': '#111111',
      'panel-background': '#eeeeee',
      'content-background': '#DEE3F1',
      'panel-buttons': '#4F5D2F',
      'panel-buttons-gradient-l': '#405673',
      'panel-buttons-gradient-mid': '#6093BF',
      'panel-buttons-gradient-2': '#F2E2CE', 
      'button': '#A6836F',
      'button-hover': '#7a28cb',
      'footer': '#F2E2CE'
    },
    extend: {},
  }
}