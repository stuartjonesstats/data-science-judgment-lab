# First Build Plan

Historical planning note: this document captures the original build sequence.
The current public site now has 25 cases, Finder, Pathways, Intake, Profile, and
Instructor mode.

The first implementation should prove the product loop with one polished case,
then scale to the full 10-case Core Lab.

## Build Principle

Build a vertical slice before building the library.

The first slice should include:

- dashboard
- case route
- evidence locker
- hypothesis ranker
- judgment panel
- confidence scoring
- case replay
- local progress
- calibration snapshot

## Recommended First Case

Start with **The Dashboard Spike**.

Reasons:

- easy to understand without advanced math
- naturally supports charts, logs, memos, and timelines
- embodies the investigation metaphor
- tests a common judgment failure
- can be scored with constrained choices and confidence

## First Slice User Flow

1. User opens dashboard.
2. User selects The Dashboard Spike.
3. User reads a short briefing.
4. User opens evidence items:
   - KPI chart
   - release timeline
   - event taxonomy note
   - sample event log
   - metric definition card
5. User ranks likely explanations.
6. User submits final decision and confidence.
7. Site reveals expert replay.
8. Site updates local progress and calibration snapshot.

## Initial Component Scope

Build only the components needed for that first slice:

- `CaseCard`
- `CaseHeader`
- `EvidenceLocker`
- `EvidenceItem`
- `HypothesisRanker`
- `JudgmentPanel`
- `CaseReplay`
- `CalibrationSnapshot`

Defer these until after the first slice:

- threshold dial
- chart annotation
- video/audio player polish
- open library filters
- exportable result packet
- facilitator mode

## Milestone 1: Static Shell

Deliver:

- Astro site scaffold
- global layout
- dashboard route
- case index route
- case detail route
- content collection for cases
- placeholder case cards for all 10 Core Lab cases

Definition of done:

- `npm run build` passes
- all 10 cases appear on the dashboard
- individual case pages render from MDX

## Milestone 2: One Interactive Case

Deliver:

- The Dashboard Spike MDX case
- structured evidence data
- evidence locker interaction
- hypothesis ranking interaction
- final judgment submission
- local progress save
- case replay reveal

Definition of done:

- user can complete the case without a backend
- score appears after submission
- refresh preserves completion state

## Milestone 3: Core Lab Expansion

Deliver:

- remaining 9 case shells
- at least 3 additional complete cases
- case set grouping
- calibration dashboard
- completion rules for minimum Core Lab completion

Definition of done:

- user can complete at least 4 cases across 3 interaction patterns
- dashboard shows progress by case set and judgment dimension

## Milestone 4: Full MVP

Deliver:

- all 10 Core Lab cases
- final Judgment Record
- high-confidence misses review
- responsive polish
- GitHub Pages deploy configuration

Definition of done:

- user can complete 8 of 10 cases and receive a Judgment Record
- full 10-case completion works locally
- production build is static-host ready
