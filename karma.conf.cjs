// =========================================================
// CONFIGURACIÓN DE KARMA (ejecutor de pruebas)
// ---------------------------------------------------------
// - Jasmine: framework con el que se escriben las pruebas
//   (describe / it / expect / spyOn).
// - Karma: abre un navegador real (Chrome sin ventana), carga
//   las pruebas y muestra los resultados en la terminal.
// - webpack + babel: compilan el JSX de React para el navegador.
// - karma-coverage: genera el reporte de cobertura en /coverage.
// =========================================================
process.env.BABEL_ENV = 'test'; // activa babel-plugin-istanbul (cobertura)

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    // Todas las pruebas están en src/tests y terminan en .spec.js / .spec.jsx
    files: [
      { pattern: 'src/tests/**/*.spec.js?(x)', watched: false },
      // Imágenes de /public, para que las <img> de los componentes no den error 404
      { pattern: 'public/**/*', watched: false, included: false, served: true },
    ],
    proxies: { '/img/': '/base/public/img/' },
    preprocessors: { 'src/tests/**/*.spec.js?(x)': ['webpack'] },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          // "type": "module" en package.json obliga a escribir las extensiones en
          // los import; esta regla permite importar './db' en vez de './db.js'
          { test: /\.m?jsx?$/, resolve: { fullySpecified: false } },
          { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
      },
      resolve: { extensions: ['.js', '.jsx'] },
    },

    reporters: ['spec', 'coverage'],
    specReporter: { suppressSkipped: true, showSpecTiming: true },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'text', subdir: '.', file: 'resumen.txt' },
      ],
    },

    // Chrome sin interfaz gráfica (también funciona en Windows/Mac con Chrome instalado)
    browsers: ['ChromeHeadlessSinSandbox'],
    customLaunchers: {
      ChromeHeadlessSinSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },

    client: { jasmine: { random: false } },
    singleRun: true,
  });
};
