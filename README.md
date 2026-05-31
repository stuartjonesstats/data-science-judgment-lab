# Data Science Judgment Lab

Data Science Judgment Lab is a static, case-based web lab for practicing data
science judgment under uncertainty. Learners inspect messy evidence, form a
working theory, make a decision, assign confidence, and then compare their
reasoning with an expert replay.

The public version currently includes:

- 25 interactive cases
- a filterable Case Finder
- guided Pathways and a short Intake route
- local progress tracking in the browser
- certainty-based marking for confidence calibration
- a self-attested Judgment Record after enough reviewed replays
- instructor-facing answer maps and facilitation notes

## Purpose

The lab is built for the part of data science that is hard to assess with a
coding quiz: deciding what imperfect evidence can support, what it cannot
support, and how confident a responsible analyst should be when pressure is in
the room.

It is not a proctored credential, statistics refresher, or certification exam.
It is a practice environment for evidence discipline, causal caution, model
deployment judgment, fairness and governance review, and uncertainty
communication.

## Stack

- Astro static site
- MDX-authored case pages
- React islands for interactive case work
- browser-local progress and scoring
- GitHub Pages deployment

## Local Development

```bash
cd site
npm install
npm run dev
npm run build
```

## GitHub Pages

The repository includes a GitHub Actions workflow at
`.github/workflows/deploy.yml`. It builds the Astro app from the `site/`
subdirectory and deploys through GitHub Pages.

The current deployment target is the custom domain `https://dsjlab.org`. The
workflow sets `PUBLIC_SITE_URL=https://dsjlab.org`, and `site/public/CNAME`
contains the same domain so the Pages artifact carries the custom-domain marker.

## Analytics

Google Analytics is optional and controlled by the public build-time environment
variable `PUBLIC_GA_MEASUREMENT_ID`. In GitHub, set the repository variable
`GA_MEASUREMENT_ID` to the GA4 web stream Measurement ID for `dsjlab.org`. If the
variable is absent or not shaped like `G-XXXXXXXXXX`, the analytics tag is not
rendered.

## Documentation

- [Product Blueprint](docs/01-product-blueprint.md)
- [UX and Interaction Model](docs/02-ux-interaction-model.md)
- [Content Model](docs/03-content-model.md)
- [Scoring and Calibration](docs/04-scoring-calibration.md)
- [Core Case Map](docs/05-core-case-map.md)
- [Build Plan](docs/06-first-build-plan.md)
- [Future Case Library Plan](docs/07-expansion-roadmap.md)
- [GitHub Pages Deployment](docs/08-github-pages-deployment.md)
- [Case Authoring Template](docs/templates/case-authoring-template.mdx)

Some design docs preserve earlier planning language; the site itself is the
source of truth for the current 25-case release.
