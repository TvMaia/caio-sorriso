import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://TvMaia.github.io',
  base: '/caio-sorriso',
  integrations: [tailwind()],
  output: 'static',
});
