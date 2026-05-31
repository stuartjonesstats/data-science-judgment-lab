# UX and Interaction Model

## Experience Metaphor

The product should feel like a restrained data investigation workspace.

Useful phrase:

> CSI for data judgment, without crime-show parody.

The user enters a case room, inspects evidence, builds hypotheses, makes a
calibrated decision, and reviews a forensic replay of what mattered.

## Primary User Loop

1. Open the lab dashboard.
2. Choose a case or continue the Core Lab.
3. Read the case briefing.
4. Inspect the evidence locker.
5. Use lightweight investigation tools.
6. Submit a decision with confidence.
7. Review the case replay.
8. See calibration and Judgment Record movement.

## Dashboard

The first screen should feel like a lab dashboard, not a landing page.

Primary sections:

- Continue Core Lab
- Recommended Next Case
- Judgment Areas
- Case Sets
- Open Library
- Local Calibration Snapshot

Each case card should include:

- title
- set
- domain
- difficulty
- estimated time
- media types
- status
- primary judgment skill

Status states:

- unopened
- in progress
- submitted
- reviewed

## Case Page Anatomy

Each case page should use a consistent spine.

### 1. Case Header

Includes:

- title
- one-line premise
- case set
- difficulty
- estimated time
- media types
- current status

### 2. Briefing

A short setup with role, stakes, and deadline.

Example:

> Weekly active users jumped 38 percent after a new onboarding release. The VP
> wants to announce that the redesign worked. You have 10 minutes before the
> exec meeting.

### 3. Evidence Locker

A browsable evidence workspace with 3-6 artifacts.

Evidence types:

- chart
- dashboard screenshot
- data table
- CSV excerpt
- event log
- data dictionary
- Slack/email-style thread
- short stakeholder video
- audio note
- transcript
- model card
- confusion matrix
- policy memo

Each evidence item should show:

- evidence ID
- source/type
- timestamp or version
- reliability status when appropriate
- open/inspect action
- pin as relevant action

### 4. Investigation Tools

Reusable interaction patterns:

- rank possible causes
- flag suspicious evidence
- toggle metric definitions
- compare segments
- inspect missingness
- adjust a model threshold
- build a small timeline
- classify claims as supported, overstated, unsupported, or unknowable
- estimate a value with an uncertainty range

### 5. Hypothesis Board

The learner should be able to track competing explanations.

Example hypotheses for a dashboard spike:

- real user growth
- logging change
- bot traffic
- duplicate events
- denominator change
- marketing campaign effect

The board should support:

- ranking hypotheses
- marking confidence
- naming what evidence would change the learner's mind

### 6. Judgment Panel

The decision panel should stay available on desktop and collapse into a bottom
drawer on mobile.

It should collect:

- final decision
- confidence level
- most important evidence
- short rationale

Confidence should usually be low, medium, high for MVP. Later versions can add
probability sliders or numeric ranges for specific case types.

### 7. Case Replay

The reveal should feel like a reconstruction, not an answer key.

It should show:

- what the learner chose
- their confidence
- the expert decision
- what evidence mattered most
- what evidence was misleading
- what trap the case tested
- how confidence affected the score
- how the case changed the Judgment Record

## Reusable Components

Initial component set:

- `CaseCard`
- `CaseHeader`
- `EvidenceLocker`
- `EvidenceItem`
- `InvestigationNotes`
- `HypothesisRanker`
- `ConfidenceCheckpoint`
- `JudgmentPanel`
- `CaseReplay`
- `CalibrationSnapshot`
- `JudgmentRecord`

Optional later components:

- `ChartForensics`
- `MetricInspector`
- `ThresholdDial`
- `AssumptionReveal`
- `ModelAutopsy`
- `StakeholderInterview`
- `TimelineBuilder`

## Visual Tone

The interface should be operational and evidence-led.

Guidelines:

- restrained forensic workspace, not theatrical
- dense but readable
- compact cards and tables
- meaningful color states
- clear evidence IDs
- monospace for timestamps, metrics, IDs, and logs
- no oversized marketing hero
- no decorative media

Color should communicate function:

- blue: information
- amber: uncertainty
- red: contradiction or risk
- green: resolved or supported
