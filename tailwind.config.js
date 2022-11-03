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
      'sans': ['Roboto', 'sans-serif'],
    },
    colors: {
      'background': '#445687',
      'light-text': '#eeeeee',
      'dark-text': '#111111',
      'panel-background': '#eeeeee',
      'content-background': '#DEE3F1',
      'panel-buttons': '#4F5D2F',
      'button': '#F1B810',
      'button-hover': '#7a28cb',
      'footer': '#7a28cb'
    },
    extend: {},
  }
}
