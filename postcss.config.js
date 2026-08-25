export default {
  plugins: {
    // Tailwind v4 ya hace el prefijado de vendors vía Lightning CSS,
    // así que autoprefixer sale sobrando (y emitía warnings falsos
    // de "outdated gradient syntax" en gradientes multilínea).
    '@tailwindcss/postcss': {},
  },
}
