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
      'background': '#423629',
      'light-text': '#DEE3F1',
      'dark-text': '#423629',
      'panel-background': '#7D7E75',
      'content-background': '#DEE3F1',
      'panel-buttons': '#4F5D2F',
      'button': '#4F5D2F',
      'button-hover': '#7D7E75',
      'footer': '#7D7E75'
    },
    extend: {},
  }
}
