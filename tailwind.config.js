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
    extend: {
      backgroundImage: {
        'mokosh': "url('/static/assets/bg.jpg')",
      }
    },
  }
}
