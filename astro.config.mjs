// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerMetaHighlight,
} from "@shikijs/transformers";

import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://derk-jan.com",
  markdown: {
    syntaxHighlight: {
      type: "shiki",
    },
    shikiConfig: {
      theme: "github-dark",
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerMetaHighlight(),
      ],
    },
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx({ syntaxHighlight: "shiki" }), sitemap()],
});
