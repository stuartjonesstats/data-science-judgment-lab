import { CORE_CASES } from '../src/lib/cases.js';

const SUPPORTED_RENDERERS = new Set([
  'artifact-table',
  'assignment-check',
  'calibration-panel',
  'capacity-panel',
  'cropped-chart-panel',
  'dose-response-panel',
  'drift-response-panel',
  'error-taxonomy-panel',
  'experiment-dashboard',
  'fairness-audit-panel',
  'forecast-fan-panel',
  'geo-market-panel',
  'inspection-coverage-map',
  'intervention-ledger',
  'label-benchmark-panel',
  'leakage-audit-panel',
  'lifecycle-lift-panel',
  'memo-artifact',
  'metric-swap-panel',
  'mini-dashboard',
  'missingness-heatmap-panel',
  'model-scorecard',
  'parallel-trends-panel',
  'power-audit-panel',
  'prompt-risk-panel',
  'rd-cutoff-inspector',
  'retraining-diff',
  'sample-composition-panel',
  'scenario-range-panel',
  'stockout-demand-panel',
  'subgroup-table',
  'threshold-tradeoff-panel',
  'trend-signal-panel',
]);

const CHART_RENDERERS = new Set([
  'calibration-panel',
  'capacity-panel',
  'cropped-chart-panel',
  'dose-response-panel',
  'drift-response-panel',
  'error-taxonomy-panel',
  'experiment-dashboard',
  'fairness-audit-panel',
  'forecast-fan-panel',
  'geo-market-panel',
  'inspection-coverage-map',
  'label-benchmark-panel',
  'leakage-audit-panel',
  'lifecycle-lift-panel',
  'metric-swap-panel',
  'mini-dashboard',
  'missingness-heatmap-panel',
  'model-scorecard',
  'parallel-trends-panel',
  'power-audit-panel',
  'prompt-risk-panel',
  'rd-cutoff-inspector',
  'retraining-diff',
  'sample-composition-panel',
  'scenario-range-panel',
  'stockout-demand-panel',
  'threshold-tradeoff-panel',
  'trend-signal-panel',
]);

const issues = [];

for (const labCase of CORE_CASES) {
  for (const item of labCase.evidence || []) {
    const label = `${labCase.id} ${item.id} "${item.title}"`;

    if (item.render && !SUPPORTED_RENDERERS.has(item.render)) {
      issues.push(`${label} uses unsupported renderer "${item.render}".`);
    }

    if (item.type === 'chart') {
      if (!item.render) {
        issues.push(`${label} is a chart without a tailor-made render component.`);
      } else if (!CHART_RENDERERS.has(item.render)) {
        issues.push(`${label} is a chart using non-chart renderer "${item.render}".`);
      }
    }
  }
}

if (issues.length) {
  console.error('Case validation failed:');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Validated ${CORE_CASES.length} cases: all chart artifacts use explicit renderers.`);
