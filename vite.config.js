/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// =========================================================
// CONFIGURACIÓN DE VITE + VITEST
// ---------------------------------------------------------
// - plugins / server: el servidor de desarrollo (npm run dev).
// - test: las pruebas unitarias con Vitest.
//   · browser: las pruebas corren en un navegador real,
//     Chromium, controlado por Playwright y sin ventana.
//   · coverage: mide la cobertura con el motor v8 de Chromium
//     y genera el reporte en la carpeta /coverage.
// =========================================================
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true, // describe, it, expect y vi sin importarlos
    restoreMocks: true, // cada vi.spyOn se deshace al terminar su prueba
    include: ['src/tests/**/*.spec.{js,jsx}'],
    sequence: { shuffle: false }, // las pruebas corren siempre en el mismo orden

    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true, // Chromium sin ventana
      screenshotFailures: false,
      instances: [
        {
          browser: 'chromium',
          // Permite indicar otro Chromium con la variable CHROMIUM_PATH
          launch: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
        },
      ],
    },

    coverage: {
      provider: 'v8',
      all: false, // mide los archivos que cargan las pruebas
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/tests/**', 'src/main.jsx'],
      reporter: ['text-summary', 'html', ['text', { file: 'resumen.txt' }]],
      reportsDirectory: 'coverage',
    },
  },
});
