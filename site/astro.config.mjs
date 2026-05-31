import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const site = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';
const base = process.env.PUBLIC_BASE_PATH || undefined;

if (isGitHubActions && !process.env.PUBLIC_SITE_URL) {
  throw new Error('PUBLIC_SITE_URL is required for GitHub Pages builds.');
}

export default defineConfig({
  site,
  ...(base ? { base } : {}),
  devToolbar: {
    enabled: false,
  },
  integrations: [mdx(), react()],
});
