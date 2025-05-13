import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';

// 환경 변수 가져오기
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default mergeConfig(
  defineConfig({
    base: '/hanghae99-chap7/',
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
    define: {
      'process.env': {
        VITE_API_BASE_URL: API_BASE_URL,
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      coverage: {
        reportsDirectory: './.coverage',
        reporter: ['lcov', 'json', 'json-summary'],
      },
    },
  })
);
