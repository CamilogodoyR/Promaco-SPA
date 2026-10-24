// Babel solo se usa para las pruebas (Karma + webpack).
// Vite usa su propio compilador para el desarrollo y el build.
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { chrome: '100' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  env: {
    test: {
      // Instrumenta el código para medir la cobertura de las pruebas
      plugins: [['istanbul', { exclude: ['**/*.spec.jsx', 'src/tests/**'] }]],
    },
  },
};
