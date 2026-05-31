# Data Science Judgment Lab Site

Astro app for the Data Science Judgment Lab.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Structure

- `src/content/cases/` contains MDX case pages.
- `src/lib/cases.js` contains structured case data for the interactive workspace.
- `src/lib/case-navigation.js` defines public filters, pathways, and intake routing.
- `src/components/` contains Astro and React UI components.
- `src/lib/progress.js` stores progress and scoring in browser local storage.
- `public/media/` contains published case audio assets.

## Optional Audio Generation

The optional case-audio script uses the OpenAI Python SDK:

```bash
python3 -m pip install -r requirements.txt
python3 scripts/generate_case_audio.py --case case-025
```

The script expects `OPENAI_API_KEY` to be available in the environment or in the
workspace `.env.rtf` used during local production. Do not commit `.env.rtf`.

## Deployment

The root repository workflow uses `withastro/action` with `path: site`. For
GitHub project Pages, set `PUBLIC_SITE_URL` and `PUBLIC_BASE_PATH`; for a custom
domain, set `PUBLIC_SITE_URL` and add `public/CNAME`.
