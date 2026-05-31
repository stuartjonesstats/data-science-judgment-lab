# GitHub Pages Deployment

The site is static Astro with React islands, so GitHub Pages is a good fit.

## Current Target

The current production target is:

```txt
https://dsjlab.org
```

The app uses clean root-style routes and local media paths, so a custom domain
at the domain root is the simplest deployment shape.

If deploying to a project URL such as:

```txt
https://username.github.io/data-science-judgment-lab/
```

then Astro needs `base: '/data-science-judgment-lab'`, and all internal links
and media URLs must be base-aware. The current app includes a `withBase()` helper
for site navigation, case links, favicon, and audio/video assets.

## Astro Config

For a custom domain:

```js
export default defineConfig({
  site: 'https://your-domain.org',
  integrations: [mdx(), react()],
});
```

For a project page:

```js
export default defineConfig({
  site: 'https://username.github.io',
  base: '/data-science-judgment-lab',
  integrations: [mdx(), react()],
});
```

## GitHub Actions

The repository should use the official Astro GitHub Action with `path: site`
because the Astro project lives in the `site/` subdirectory.

The Astro config reads optional deployment values:

- `PUBLIC_SITE_URL`
- `PUBLIC_BASE_PATH`

The included workflow sets the custom-domain value:

```yaml
env:
  PUBLIC_SITE_URL: https://dsjlab.org
```

`site/public/CNAME` also contains `dsjlab.org`. If the site is later moved to a
project Pages URL, add `PUBLIC_BASE_PATH` back to the workflow.

Steps:

1. Create the GitHub repository.
2. Commit the root docs and the `site/` project, including `site/package-lock.json`.
3. Add `.github/workflows/deploy.yml`.
4. In GitHub repository settings, open Pages and set Source to GitHub Actions.
5. Push to `main`.
6. Check the Actions run and open the generated Pages URL.
7. In Pages settings, set the custom domain to `dsjlab.org` and configure DNS.

## Local Verification

Before pushing:

```bash
cd site
npm run build
npm run preview
```

Then open the local preview and check:

- homepage
- case library
- Case Finder
- Pathways
- Case Intake
- at least one case audio artifact
- Profile and completion page
- calibration page
