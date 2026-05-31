# Scoring and Calibration

## Scoring Philosophy

The lab should measure judgment under uncertainty, not memorization.

A learner's answer has two parts:

1. the decision or diagnosis
2. the confidence attached to that decision

The key scoring question is not only "Were they right?" but:

> Did their confidence fit the strength of the evidence?

## Certainty-Based Marking

Use CBM for constrained decision points.

Current scoring table:

| Outcome | Low Confidence | Medium Confidence | High Confidence |
|---|---:|---:|---:|
| Correct | +1 | +2 | +3 |
| Partly correct | 0 | +1 | +1 |
| Incorrect | 0 | -1 | -3 |

This keeps the rule transparent:

- high-confidence correct calls are rewarded
- high-confidence wrong calls are treated as risk signals
- low-confidence wrong calls are less damaging
- low-confidence correct calls show underconfidence

## Confidence Language

Use plain labels in the UI:

- Low: "Plausible, but I am not certain"
- Medium: "Supported, but with meaningful caveats"
- High: "Strongly supported by the evidence"

Avoid rewarding bravado. The interface should make it clear that confidence
means evidence strength, not personality.

## Case Score

Each case can produce:

```ts
type CaseScore = {
  caseId: string;
  decisionScore: number;
  evidenceScore: number;
  calibrationScore: number;
  reflectionScore: number;
  processScore: number;
  totalScore: number;
};
```

Suggested weights:

- decision score: 30 percent
- evidence score: 25 percent
- calibration score: 25 percent
- process score: 10 percent
- reflection score: 10 percent

Do not overbuild automated grading for open writing. Keep written
responses short and use them mainly for reflection, replay, and optional
facilitator review.

## Judgment Record

The final report should produce a Judgment Record across six dimensions:

1. Calibration
   Measures whether confidence matches correctness.

2. Evidence Discipline
   Measures whether the learner prioritized relevant evidence over vivid or
   misleading evidence.

3. Uncertainty Handling
   Measures whether the learner named limits, assumptions, missing data, and
   ambiguity.

4. Decision Quality
   Measures whether the recommendation is defensible, actionable, and
   proportionate to the evidence.

5. Bias Resistance
   Measures vulnerability to anchoring, confirmation, base-rate neglect,
   metric fixation, and causal overreach.

6. Learning Agility
   Measures whether the learner updates appropriately when new evidence is
   revealed.

Possible dominant patterns:

- Well-calibrated under ambiguity
- Accurate but underconfident
- Evidence-light decision maker
- Strong technical eye, weak causal skeptic
- High-confidence misses in deployment cases
- Slow to update after contradictory evidence

## Completion Criteria

Minimum Core Lab completion:

- review at least 20 of 25 cases
- cover every major judgment area
- review at least three cases from each focused route
- submit all required decision and confidence checkpoints
- view the case replay for each submitted case

Full 25-Case Lab completion:

- review all 25 cases
- generate final Judgment Record
- review all high-confidence misses

## Local State Shape

```ts
type LabProgress = {
  version: 1;
  updatedAt: string;
  cases: Record<string, CaseProgress>;
};

type CaseProgress = {
  caseId: string;
  status: 'unopened' | 'in_progress' | 'submitted' | 'reviewed';
  viewedEvidenceIds: string[];
  pinnedEvidenceIds: string[];
  notes: string;
  judgments: JudgmentRecord[];
  score?: CaseScore;
};

type JudgmentRecord = {
  checkpointId: string;
  answer: string | string[] | number;
  confidence: 'low' | 'medium' | 'high';
  rationale?: string;
  submittedAt: string;
  outcome?: 'correct' | 'partial' | 'incorrect';
  cbmRaw?: number;
};
```

## Report Design

The report should show:

- overall Judgment Record
- calibration by confidence bucket
- high-confidence misses
- strongest judgment area
- watch area
- completed case sets
- recommended next cases

The report should avoid giving a false sense of psychometric precision in the
MVP. Treat it as a learning artifact and calibration profile.
