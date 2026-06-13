import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.caiosorriso.com.br',
  integrations: [tailwind()],
  output: 'static',
});
