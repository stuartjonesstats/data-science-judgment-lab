# Core Case Map

Historical planning note: this document captures the original 10-case core
before the public library expanded to 25 cases. The current site uses the 25
published cases as the source of truth.

The MVP Core Lab should include 10 cases. Each case stands alone but contributes
to the final Judgment Record.

## Case Sets

| Set | Cases | Purpose |
|---|---|---|
| Evidence and Metrics | 1, 10 | Interpret metrics as constructed evidence, not objective facts |
| Experiments and Causality | 2, 5 | Separate causal evidence from tempting claims |
| Models in the Real World | 3, 7, 8, 9 | Evaluate models as operational decisions, not leaderboard scores |
| Uncertainty and Decisions | 4, 6 | Make defensible calls with incomplete or biased evidence |

## MVP Cases

### 1. The Dashboard Spike

**Premise:** Weekly active users jumped 38 percent after a new onboarding flow.
Leadership wants to call the redesign a win.

**Primary skill:** Distinguishing signal from artifact.

**Concepts:** Instrumentation, event logging, denominator shifts, time series
sanity checks.

**Evidence assets:**

- KPI dashboard screenshot
- event taxonomy note
- release timeline
- sample event logs
- metric definition card

**Interaction:** Evidence desk plus hypothesis ranker.

**Trap:** Assuming chart movement reflects real user behavior before checking
logging changes, duplicate events, bot traffic, or metric definitions.

### 2. The A/B Test That "Won"

**Premise:** A growth team finds a statistically significant conversion lift
after slicing the results by device and region.

**Primary skill:** Evaluating experimental claims.

**Concepts:** P-values, multiple comparisons, peeking, sample ratio mismatch,
subgroup analysis.

**Evidence assets:**

- experiment summary
- segment table
- randomization notes
- traffic allocation graph
- PM launch memo

**Interaction:** Decision with confidence plus red flag identification.

**Trap:** Treating any significant subgroup result as causal.

### 3. The Churn Model Pitch

**Premise:** A vendor claims its churn model identifies at-risk customers with
91 percent accuracy.

**Primary skill:** Asking whether a model is useful for action.

**Concepts:** Base rates, confusion matrices, precision, recall, calibration,
cost-sensitive decisions.

**Evidence assets:**

- vendor slide
- confusion matrix
- customer base-rate card
- cost matrix
- sample predictions

**Interaction:** Model review room.

**Trap:** Believing high accuracy means operational usefulness.

### 4. The Biased Training Set

**Premise:** A city wants to use historical inspection data to prioritize
restaurant health inspections.

**Primary skill:** Spotting bias in labels and sampling.

**Concepts:** Selection bias, label bias, feedback loops, historical data as
institutional record.

**Evidence assets:**

- map of past inspections
- complaint records
- demographic overlay
- data dictionary
- policy excerpt

**Interaction:** Evidence cards plus deployment judgment.

**Trap:** Treating historical enforcement data as neutral ground truth.

### 5. The Correlation Press Release

**Premise:** A nonprofit says students using a tutoring app have higher test
scores. A mayor wants to fund expansion.

**Primary skill:** Separating correlation from causation.

**Concepts:** Confounding, observational data, selection effects, causal
identification.

**Evidence assets:**

- press release
- scatterplot
- covariate table
- school participation criteria
- short stakeholder quotes

**Interaction:** Claim classification plus confidence.

**Trap:** Assuming users and non-users are comparable.

### 6. The Forecast Before Budget Season

**Premise:** A finance team needs a revenue forecast. The model fits historical
data but misses turning points during market changes.

**Primary skill:** Knowing when historical fit is not enough.

**Concepts:** Backtesting, concept drift, prediction intervals, scenario
planning.

**Evidence assets:**

- historical revenue chart
- forecast output
- macro event timeline
- backtest table
- scenario assumptions

**Interaction:** Estimate with range.

**Trap:** Trusting a precise point forecast because historical error looks
small.

### 7. The Fairness Review

**Premise:** An HR analytics tool ranks candidates. One group has lower
selection rates, but the model owner says the model is blind to protected
attributes.

**Primary skill:** Evaluating fairness claims.

**Concepts:** Proxy variables, disparate impact, fairness metrics, subgroup
performance.

**Evidence assets:**

- feature list
- selection-rate table
- anonymized candidate profiles
- model explanation cards
- policy memo

**Interaction:** Tradeoff decision plus reflection.

**Trap:** Believing protected-attribute removal eliminates bias.

### 8. The LLM Support Bot Evaluation

**Premise:** A company wants to deploy an LLM support assistant. Demos look
impressive, but test logs show occasional confident wrong answers.

**Primary skill:** Designing evidence for deployment readiness.

**Concepts:** Evaluation sets, severity scoring, hallucination risk, escalation,
human review.

**Evidence assets:**

- chat transcripts
- evaluation rubric
- error taxonomy
- golden-answer examples
- escalation policy draft

**Interaction:** Error taxonomy plus launch readiness decision.

**Trap:** Judging model quality from demos instead of task-specific failure
analysis.

### 9. The Fraud Alert Threshold

**Premise:** A payments team must set a fraud threshold. Lower thresholds catch
more fraud but block more legitimate customers.

**Primary skill:** Making tradeoffs explicit.

**Concepts:** Thresholding, false positives, false negatives, expected value,
operational capacity.

**Evidence assets:**

- ROC/PR chart
- transaction examples
- fraud-loss estimate
- support cost estimate
- threshold simulator

**Interaction:** Interactive threshold dial.

**Trap:** Looking for the best model score without deciding the cost tradeoff.

### 10. The Executive Metric Swap

**Premise:** A marketplace changes its north-star metric from total bookings to
completed bookings. Teams disagree about whether performance improved.

**Primary skill:** Interpreting metric definitions in context.

**Concepts:** Metric design, incentives, lagging indicators, leading indicators,
Goodhart-style behavior.

**Evidence assets:**

- old and new metric definitions
- funnel chart
- cancellation data
- Slack-style team excerpts
- KPI comparison table

**Interaction:** Metric critique plus recommendation.

**Trap:** Treating metrics as objective facts rather than designed abstractions
with incentives.
