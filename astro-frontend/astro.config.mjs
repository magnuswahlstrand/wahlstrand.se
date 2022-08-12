import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://magnuswahlstrand.github.io",
  base: "wahlstrand.se",
  integrations: [tailwind()],
  vite: {
    ssr: {
      noExternal: ['@fontsource/inter'],
    }
  }
});
