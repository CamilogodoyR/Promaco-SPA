import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite: servidor de desarrollo y build de producción
export default defineConfig({
  plugins: [react()],
});
