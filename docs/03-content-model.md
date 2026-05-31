# Content Model

## Stack Fit

Astro plus MDX remains the right foundation.

Use:

- Astro content collections for typed case metadata
- MDX for narrative case pages
- React islands for interactive investigation activities
- localStorage for progress, notes, and scores
- static media under `public/evidence`

## Proposed Site Structure

```txt
site/
  src/
    content/
      cases/
        case-001-dashboard-spike.mdx
        case-002-ab-test-won.mdx
      case-sets/
        core-lab.yaml
      scoring/
        cbm-v1.yaml
    components/
      CaseCard.astro
      CaseHeader.astro
      EvidenceLocker.jsx
      HypothesisRanker.jsx
      JudgmentPanel.jsx
      CaseReplay.jsx
      CalibrationSnapshot.jsx
    lib/
      localProgress.js
      scoring.js
      caseDefinitions.js
    pages/
      index.astro
      cases/
        index.astro
        [slug].astro
      calibration.astro
      about.astro
  public/
    evidence/
      case-001-dashboard-spike/
        weekly-active-users.png
        event-taxonomy.pdf
        release-timeline.csv
```

## Case Frontmatter

Recommended case metadata:

```yaml
---
id: case-001
slug: dashboard-spike
title: The Dashboard Spike
shortTitle: Dashboard Spike
set: evidence-metrics
sequence: 1
status: active
difficulty: intro
domain: product analytics
estimatedMinutes: 8
caseType: evidence-desk
judgmentType: multi
skills:
  - metric interpretation
  - data quality
  - uncertainty calibration
concepts:
  - instrumentation
  - denominator shift
  - time series sanity checks
mediaTypes:
  - chart
  - log
  - memo
completionRequired: true
scoringProfile: cbm-v1
---
```

## Case Definition Object

For interactive components, define structured case data in frontmatter or a
sidecar JSON/YAML file.

```ts
type CaseDefinition = {
  id: string;
  slug: string;
  title: string;
  set: string;
  sequence: number;
  difficulty: 'intro' | 'standard' | 'advanced';
  domain: string;
  estimatedMinutes: number;
  caseType:
    | 'evidence-desk'
    | 'chart-cross-exam'
    | 'model-review'
    | 'assumption-reveal'
    | 'threshold-dial';
  judgmentType: 'binary' | 'multi' | 'rank' | 'numeric' | 'open';
  skills: string[];
  concepts: string[];
  evidence: EvidenceItem[];
  checkpoints: JudgmentCheckpoint[];
  replay: CaseReplay;
};
```

## Evidence Item

```ts
type EvidenceItem = {
  id: string;
  type:
    | 'chart'
    | 'table'
    | 'memo'
    | 'transcript'
    | 'audio'
    | 'video'
    | 'log'
    | 'model-output'
    | 'policy'
    | 'dataset';
  title: string;
  sourceLabel: string;
  src?: string;
  transcript?: string;
  alt?: string;
  reliability?: 'high' | 'medium' | 'low' | 'disputed';
  unlock: 'initial' | 'after-first-judgment' | 'optional';
  tags: string[];
};
```

## Judgment Checkpoint

```ts
type JudgmentCheckpoint = {
  id: string;
  prompt: string;
  responseType: 'choice' | 'rank' | 'range' | 'text';
  options?: Array<{
    id: string;
    label: string;
    scoreClass: 'correct' | 'partial' | 'incorrect';
  }>;
  confidenceRequired: boolean;
  dimensions: JudgmentDimension[];
};
```

## Case Page MDX Spine

Every case should follow this structure:

```mdx
---
id: case-001
slug: dashboard-spike
title: The Dashboard Spike
set: evidence-metrics
sequence: 1
status: active
difficulty: intro
domain: product analytics
estimatedMinutes: 8
caseType: evidence-desk
judgmentType: multi
skills:
  - metric interpretation
  - data quality
  - uncertainty calibration
concepts:
  - instrumentation
  - denominator shift
  - time series sanity checks
mediaTypes:
  - chart
  - log
  - memo
scoringProfile: cbm-v1
---

import EvidenceLocker from '../../components/EvidenceLocker.jsx';
import JudgmentPanel from '../../components/JudgmentPanel.jsx';
import CaseReplay from '../../components/CaseReplay.jsx';

## Case Briefing

## Decision Task

## Evidence Locker

<EvidenceLocker caseId="case-001" client:load />

## Judgment

<JudgmentPanel caseId="case-001" client:load />

## Case Replay

<CaseReplay caseId="case-001" client:load />
```

## Authoring Rule

Every case must identify:

- the real decision
- the tempting wrong inference
- the evidence that resolves or weakens the claim
- the confidence lesson
- the transfer principle
