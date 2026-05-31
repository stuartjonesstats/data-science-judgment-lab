export const CASE_SETS = [
  {
    id: 'evidence-metrics',
    title: 'Evidence and Metrics',
    caseIds: ['case-001', 'case-010'],
    purpose: 'Interpret metrics as constructed evidence, not objective facts.',
  },
  {
    id: 'experiments-causality',
    title: 'Experiments and Causality',
    caseIds: ['case-002', 'case-005'],
    purpose: 'Separate causal evidence from tempting claims.',
  },
  {
    id: 'models-real-world',
    title: 'Models in the Real World',
    caseIds: ['case-003', 'case-007', 'case-008', 'case-009'],
    purpose: 'Evaluate models as operational decisions, not leaderboard scores.',
  },
  {
    id: 'uncertainty-decisions',
    title: 'Uncertainty and Decisions',
    caseIds: ['case-004', 'case-006'],
    purpose: 'Make defensible calls with incomplete or biased evidence.',
  },
  {
    id: 'evidence-integrity',
    title: 'Data Provenance and Measurement Integrity',
    caseIds: ['case-011', 'case-012', 'case-013', 'case-014', 'case-015'],
    purpose:
      'Check whether fields, samples, visual frames, and releases are trustworthy enough to reason from.',
  },
  {
    id: 'causal-designs',
    title: 'Causal Designs Beyond the A/B Test',
    caseIds: ['case-016', 'case-017', 'case-018', 'case-019', 'case-020'],
    purpose:
      'Judge causal claims under spillover, timing, power, threshold, and lifecycle complications.',
  },
  {
    id: 'operational-models',
    title: 'Operational Models and AI Risk',
    caseIds: ['case-021', 'case-022', 'case-023', 'case-024', 'case-025'],
    purpose:
      'Decide when model and AI performance claims survive contact with real workflows.',
  },
];

export const CASE_DEFINITIONS = {
  'case-001': {
    id: 'case-001',
    slug: 'dashboard-spike',
    title: 'The Dashboard Spike',
    set: 'evidence-metrics',
    sequence: 1,
    status: 'active',
    difficulty: 'intro',
    domain: 'Product analytics',
    estimatedMinutes: 8,
    caseType: 'evidence-desk',
    judgmentType: 'multi',
    summary:
      'A launch-week chart jumps, a deck is due, and several teams have reasons to claim the movement.',
    skills: ['metric interpretation', 'data quality', 'uncertainty calibration'],
    concepts: ['instrumentation', 'denominator shift', 'event logging'],
    mediaTypes: ['chart', 'log', 'audio', 'memo', 'table'],
    briefing:
      'Weekly active users jumped 38 percent after the new onboarding flow shipped. The early product feedback is genuinely encouraging, and the chart is already headed into tomorrow morning\'s executive deck.',
    role:
      'You are the analyst on call. Your job is to decide what the evidence supports before the claim leaves analytics.',
    briefingMedia: {
      type: 'source-audio',
      title: 'VP voicemail',
      speaker: 'VP Product',
      duration: '0:14',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-001-vp-voicemail.wav',
      },
      transcript:
        'The onboarding numbers look fantastic. If analytics is comfortable, I want to cite the 38 percent lift in tomorrow\'s executive deck. Please do not overcomplicate this unless there is a real problem.',
    },
    decisionPrompt:
      'What is the most defensible interpretation of the weekly active user spike?',
    evidence: [
      {
        id: 'ev-001',
        type: 'chart',
        title: 'Executive dashboard capture',
        sourceLabel: 'Analytics dashboard, Monday 9:12 AM',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['wau', 'trend', 'release'],
        body:
          'The headline chart shows weekly active users rising from 41.8k to 57.6k in the first full week after release. The annotation reads: "Onboarding v2 launch."',
        callout:
          'Source note: the dashboard shows the current metric only. It does not expose the counting rule behind the trend.',
      },
      {
        id: 'ev-002',
        type: 'audio',
        title: 'VP voicemail',
        sourceLabel: 'Audio note, Sunday 8:47 PM',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'claim'],
        speaker: 'VP Product',
        duration: '0:14',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-001-vp-voicemail.wav',
        },
        transcript:
          'The onboarding numbers look fantastic. If analytics is comfortable, I want to cite the 38 percent lift in tomorrow\'s executive deck. Please do not overcomplicate this unless there is a real problem.',
        body:
          'A short voicemail from the executive sponsor frames the metric as a likely launch win and asks analytics not to slow the announcement down unless there is a real issue.',
        callout:
          'Source note: useful for pressure and incentives, not for causal evidence.',
      },
      {
        id: 'ev-003',
        type: 'timeline',
        title: 'Campaign and release calendar',
        sourceLabel: 'Marketing operations calendar',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['campaign', 'release', 'false-lead'],
        body:
          'A paid social campaign, pricing page refresh, and onboarding v2 launch all occurred within the same four-day window.',
        callout:
          'Source note: several plausible business events happened near the spike.',
      },
      {
        id: 'ev-004',
        type: 'timeline',
        title: 'Release checklist excerpt',
        sourceLabel: 'Engineering release checklist',
        reliability: 'high',
        unlock: 'initial',
        tags: ['release', 'instrumentation'],
        body:
          'The onboarding UI shipped Tuesday at 10:20 AM. On Wednesday afternoon, a tracking patch connected onboarding-guide events to the activity reporting pipeline so the new flow would populate analytics.',
        callout:
          'Source note: one measurement change landed inside the spike window.',
        entries: [
          ['Tuesday 10:20', 'Onboarding v2 ships.'],
          ['Wednesday 14:14', 'guide_step_viewed is connected to the active-user event family.'],
          ['Next Monday 09:12', 'WAU dashboard shows +38% week over week.'],
        ],
      },
      {
        id: 'ev-005',
        type: 'segment',
        title: 'Activity split printout',
        sourceLabel: 'WAU by event source',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['segment', 'source', 'false-lead'],
        body:
          'The aggregate spike weakens when the chart is split by event source. Core product activity is mostly flat; onboarding-guide activity jumps sharply.',
        callout:
          'Source note: the aggregate view mixes event families with different meanings.',
      },
      {
        id: 'ev-006',
        type: 'log',
        title: 'Raw event sample',
        sourceLabel: 'Sample from activity_events',
        reliability: 'high',
        unlock: 'initial',
        tags: ['events', 'duplicates'],
        body:
          'Several records show guide_step_viewed events arriving in bursts. Some users have multiple onboarding events but no older core activity event in the same session.',
        callout:
          'Source note: raw rows show behavior the aggregate chart hides.',
      },
      {
        id: 'ev-007',
        type: 'definition',
        title: 'Registry change log',
        sourceLabel: 'Metrics registry',
        reliability: 'high',
        unlock: 'initial',
        tags: ['definition', 'denominator'],
        body:
          'The weekly active user rule now includes guide_step_viewed alongside older core actions. Prior weeks in the dashboard still reflect the earlier qualifying-event list.',
        callout:
          'Source note: old weeks and current week are not measured by the same event family.',
      },
      {
        id: 'ev-008',
        type: 'audio',
        title: 'Engineering standup clip',
        sourceLabel: 'Data engineering standup, Friday 9:06 AM',
        reliability: 'high',
        unlock: 'initial',
        tags: ['engineering', 'instrumentation'],
        speaker: 'Data Engineering Lead',
        duration: '0:16',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-001-engineering-standup.wav',
        },
        transcript:
          'Quick note from data engineering. The guide_step_viewed event was added to the active-user event family on Wednesday so onboarding analytics would populate. Same field name, but the event is not equivalent to the old core activity signal.',
        body:
          'An engineering standup excerpt mentions the tracking change and warns that the new event is not equivalent to the older activity signal.',
        callout:
          'Source note: corroborates the registry diff and explains why the change was made.',
      },
      {
        id: 'ev-009',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Support queue excerpts',
        sourceLabel: 'Customer support tags',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['qualitative', 'support', 'product signal'],
        body:
          'Several support tickets mention that the new guide helped users find setup steps faster. The comments are positive, but they are not attached to the WAU definition.',
        callout:
          'Source note: useful product context, not a measurement reconciliation.',
        memo: [
          '“The new checklist finally shows where the invite settings are.”',
          '“I finished setup without opening a help article.”',
          'Five tagged tickets mention easier onboarding during launch week.',
          'Support volume also fell for two older setup questions.',
        ],
      },
      {
        id: 'ev-010',
        type: 'table',
        render: 'artifact-table',
        title: 'QA traffic sampler',
        sourceLabel: 'Internal traffic filter check',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['qa', 'internal traffic', 'red herring'],
        body:
          'A small block of internal QA events appears during release week. The counts are visible but far too small to explain the aggregate movement.',
        callout:
          'Source note: a plausible distraction that should be sized before being blamed.',
        columns: ['Source', 'Events', 'Users', 'Filter status'],
        rows: [
          ['QA workspace', '2,140', '38', 'partially excluded'],
          ['Staging smoke test', '460', '11', 'excluded'],
          ['Employee dogfood', '1,920', '74', 'included'],
          ['Customer traffic', '184,300', '57,600', 'included'],
        ],
      },
      {
        id: 'ev-011',
        type: 'table',
        render: 'artifact-table',
        title: 'Legacy metric recompute',
        sourceLabel: 'Analytics scratch query',
        reliability: 'high',
        unlock: 'initial',
        tags: ['recompute', 'stable metric', 'definition'],
        body:
          'A scratch query reruns weekly active users using only the pre-existing core activity events. The lift remains positive, but most of the headline jump disappears.',
        callout:
          'Source note: directly tests whether the same behavior is being counted across weeks.',
        columns: ['Metric version', 'Prior week', 'Launch week', 'Change'],
        rows: [
          ['Current dashboard rule', '41.8k', '57.6k', '+38%'],
          ['Legacy core actions only', '40.9k', '43.5k', '+6%'],
          ['Legacy plus paid campaign arrivals', '41.2k', '44.1k', '+7%'],
          ['Guide-step events only', '1.6k', '15.4k', '+863%'],
        ],
      },
      {
        id: 'ev-012',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Activation cohort note',
        sourceLabel: 'Product analytics notebook',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['activation', 'cohort', 'product signal'],
        body:
          'New users who completed the onboarding guide returned the next day more often than recent cohorts, but the cohort denominator is separate from weekly active users.',
        callout:
          'Source note: evidence of possible product improvement, not support for the WAU headline as written.',
        memo: [
          'Guide completers: 41% next-day return.',
          'Matched recent new users: 34% next-day return.',
          'Sample excludes existing accounts already counted in WAU.',
          'Analyst note: report as activation signal, not total active-user lift.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'instrumentation-change',
        label: 'Metric instrumentation changed inside the reporting window',
        scoreClass: 'correct',
      },
      {
        id: 'real-adoption',
        label: 'The redesign likely improved early onboarding, but the WAU headline overstates what changed',
        scoreClass: 'partial',
      },
      {
        id: 'marketing-campaign',
        label: 'The paid social campaign drove the spike',
        scoreClass: 'partial',
      },
      {
        id: 'pricing-page',
        label: 'The pricing page refresh changed user behavior',
        scoreClass: 'incorrect',
      },
      {
        id: 'bot-traffic',
        label: 'Bot or test traffic is the primary cause',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'ship-claim',
        label: 'Approve the executive deck claim and cite the 38 percent lift',
        scoreClass: 'incorrect',
      },
      {
        id: 'instrumentation-first',
        label:
          'Pause the WAU headline; report onboarding evidence separately after a stable-event recompute',
        scoreClass: 'correct',
      },
      {
        id: 'collect-month',
        label:
          'Ask for another month of data before responding, without rerunning the current metric',
        scoreClass: 'partial',
      },
      {
        id: 'credit-campaign',
        label: 'Credit the campaign as the likely cause but add a caveat about tracking',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-004', 'ev-005', 'ev-006', 'ev-007', 'ev-008', 'ev-011'],
    replay: {
      expertDecision:
        'The evidence does not support the executive claim as written, but it also does not prove the launch failed. The WAU definition changed during the reporting window, and the new guide_step_viewed event captured onboarding-guide activity that was not equivalent to the old core activity signal. The team should freeze the 38 percent WAU claim, recompute WAU using stable pre-existing events, and separately report what the onboarding data does suggest.',
      whatMattered: [
        'The tracking deploy landed inside the spike window.',
        'The source split shows most of the aggregate movement is concentrated in onboarding-guide events rather than older core activity.',
        'The metric registry diff shows guide_step_viewed was added to the active-user event family.',
        'The raw event sample shows repeated guide_step_viewed events for users without older core activity signals.',
        'The engineering standup clip confirms the new event was not equivalent to the old core signal.',
        'The legacy metric recompute shows the headline lift mostly disappears under a stable event definition.',
      ],
      misleadingEvidence: [
        'The executive dashboard is visually persuasive but hides the measurement change.',
        'The paid campaign and pricing-page refresh are plausible coincident events, but the segment split points back to instrumentation.',
        'The pressure voicemail creates urgency and a clean story without adding evidence.',
        'Positive support comments and activation signals suggest the launch may help users without validating the WAU claim.',
        'Internal QA traffic is visible but too small to be the main explanation.',
      ],
      sequence: [
        'Baseline WAU is stable when measured by the older core activity events.',
        'Onboarding v2 ships on Tuesday.',
        'The tracking patch adds guide_step_viewed to the active-user family on Wednesday.',
        'Guide-step events begin entering the WAU numerator in bursts.',
        'The dashboard refresh aggregates the new event family into the weekly headline.',
        'A recompute using the older core activity events leaves only a small lift.',
        'Campaign timing makes a clean growth story feel plausible.',
        'A stable-event recomputation collapses most of the spike.',
      ],
      trap:
        'The case tests whether you can hold two ideas at once: the product may be improving, and the polished dashboard claim may still be unsupported.',
      transfer:
        'Before celebrating a metric jump, reconstruct what changed: product, population, pipeline, instrumentation, and metric definition.',
    },
  },
  'case-002': {
    id: 'case-002',
    slug: 'ab-test-won',
    title: 'The Checkout Readout',
    set: 'experiments-causality',
    sequence: 2,
    status: 'active',
    difficulty: 'standard',
    domain: 'Experimentation',
    estimatedMinutes: 10,
    caseType: 'red-flag',
    judgmentType: 'multi',
    summary:
      'A checkout readout lands just before planning closes, and different artifacts point toward different launch stories.',
    skills: ['experiment interpretation', 'causal caution', 'red flag detection'],
    concepts: ['multiple comparisons', 'peeking', 'sample ratio mismatch'],
    mediaTypes: ['chart', 'audio', 'table', 'memo', 'timeline'],
    briefing:
      'A checkout redesign missed its overall conversion target, but one strategically important segment now shows a statistically significant lift. The PM wants a launch call before planning closes.',
    role:
      'You are the experimentation reviewer. Your job is to decide what launch recommendation you would sign your name to.',
    briefingMedia: {
      type: 'source-audio',
      title: 'PM voice note',
      speaker: 'Product Manager',
      duration: '0:14',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-002-pm-voice-note.wav',
      },
      transcript:
        'The trial looks good in the US paid mobile segment. It is significant, and we need the launch call before planning locks. I know the overall number is flatter, but this is the audience we care about.',
    },
    decisionPrompt:
      'What is the most defensible launch recommendation for the checkout redesign?',
    evidence: [
      {
        id: 'ev-201',
        type: 'chart',
        render: 'experiment-dashboard',
        title: 'Experiment dashboard capture',
        sourceLabel: 'Experiment platform, Monday 8:40 AM',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['experiment', 'primary metric', 'subgroup'],
        body:
          'The dashboard headline highlights an 11 percent lift for US paid mobile visitors. The pre-registered primary metric for all visitors is flatter and not statistically significant.',
        callout:
          'Source note: the same dashboard mixes a planned primary readout with a later subgroup view.',
        metrics: [
          {
            label: 'Primary checkout starts',
            control: '18.9%',
            treatment: '19.3%',
            result: '+0.4 pp',
            pValue: '0.31',
            status: 'not significant',
          },
          {
            label: 'US paid mobile',
            control: '12.8%',
            treatment: '14.2%',
            result: '+11.0%',
            pValue: '0.042',
            status: 'segment view',
          },
          {
            label: 'Traffic split',
            control: '52.9%',
            treatment: '47.1%',
            result: 'off-plan',
            pValue: '<0.001',
            status: 'split check',
          },
        ],
      },
      {
        id: 'ev-202',
        type: 'audio',
        title: 'PM voice note',
        sourceLabel: 'Audio note, Monday 7:18 AM',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'launch', 'subgroup'],
        speaker: 'Product Manager',
        duration: '0:14',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-002-pm-voice-note.wav',
        },
        transcript:
          'The trial looks good in the US paid mobile segment. It is significant, and we need the launch call before planning locks. I know the overall number is flatter, but this is the audience we care about.',
        body:
          'A short PM note frames the subgroup as the audience that matters and asks for a launch call before planning locks.',
        callout:
          'Source note: useful for incentives and urgency, not for statistical validity.',
      },
      {
        id: 'ev-203',
        type: 'table',
        render: 'subgroup-table',
        title: 'Segments workbook tab',
        sourceLabel: 'Analyst workbook, Segments tab',
        reliability: 'high',
        unlock: 'initial',
        tags: ['multiple comparisons', 'segments'],
        body:
          'The highlighted subgroup sits inside a larger segment workbook. Several cuts are neutral, one is negative, and the positive row lines up with the market the launch team already cared about.',
        callout:
          'Source note: one low p-value is less impressive after many unplanned comparisons.',
        rows: [
          ['All visitors', '+0.4 pp', '0.31', 'Pre-registered primary'],
          ['US paid mobile', '+1.4 pp', '0.042', 'Only highlighted win'],
          ['US organic mobile', '+0.1 pp', '0.78', 'No effect'],
          ['US desktop', '-0.3 pp', '0.49', 'No effect'],
          ['Canada paid mobile', '+0.6 pp', '0.37', 'No effect'],
          ['Returning users', '-0.2 pp', '0.66', 'No effect'],
          ['New users', '+0.5 pp', '0.29', 'No effect'],
          ['Safari mobile', '-1.9 pp', '0.018', 'Negative subgroup'],
        ],
      },
      {
        id: 'ev-204',
        type: 'timeline',
        title: 'Analysis timeline',
        sourceLabel: 'Experiment review notes',
        reliability: 'high',
        unlock: 'initial',
        tags: ['peeking', 'timeline'],
        body:
          'The review thread shows the team checking the experiment midstream, adding market and device cuts later, and preparing a launch memo once the preferred audience looked favorable.',
        callout:
          'Source note: interim looks and post-hoc slices change how much confidence the p-value deserves.',
        entries: [
          ['Day 0', 'Primary metric and target sample size are registered.'],
          ['Day 4', 'First interim look: primary metric flat. Test continues.'],
          ['Day 7', 'Second interim look: PM asks for market and device cuts.'],
          ['Day 9', 'US paid mobile crosses p < .05. Launch memo is drafted.'],
          ['Day 10', 'No correction for repeated looks or segment scans is applied.'],
        ],
      },
      {
        id: 'ev-205',
        type: 'table',
        render: 'assignment-check',
        title: 'Traffic diagnostic export',
        sourceLabel: 'Experiment diagnostics',
        reliability: 'high',
        unlock: 'initial',
        tags: ['sample ratio mismatch', 'randomization'],
        body:
          'Treatment traffic is lower than expected, especially in Safari mobile. Engineering notes mention a client-side path that did not always enter visitors into the treatment experience.',
        callout:
          'Source note: a sample ratio mismatch can invalidate a clean causal interpretation before effect size is discussed.',
        rows: [
          ['Expected split', '50.0% / 50.0%', 'Design target'],
          ['Observed split', '52.9% / 47.1%', 'SRM p < .001'],
          ['Chrome mobile', '50.5% / 49.5%', 'near target'],
          ['Safari mobile', '59.8% / 40.2%', 'assignment failure'],
        ],
      },
      {
        id: 'ev-206',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Pre-analysis plan excerpt',
        sourceLabel: 'Experiment plan v1',
        reliability: 'high',
        unlock: 'initial',
        tags: ['pre-registration', 'metric'],
        body:
          'The plan names all-visitors checkout starts as the primary metric and lists platform/device checks as diagnostics, not decision criteria.',
        callout:
          'Source note: the claimed winning segment was not the registered decision rule.',
        memo: [
          'Primary decision metric: all-visitors checkout_start within 24 hours.',
          'Decision threshold: evaluate after 40,000 assigned visitors per arm.',
          'Segments: market, device, and channel may be reviewed for diagnosis only.',
          'Guardrail: investigate sample ratio mismatch before interpreting lift.',
        ],
      },
      {
        id: 'ev-207',
        type: 'audio',
        title: 'Experiment review clip',
        sourceLabel: 'Analytics standup, Monday 9:22 AM',
        reliability: 'high',
        unlock: 'initial',
        tags: ['analyst review', 'validity'],
        speaker: 'Experiment Analyst',
        duration: '0:16',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-002-analyst-review.wav',
        },
        transcript:
          'Quick flag on the checkout test. The primary metric missed, the winning segment was added after two interim looks, and assignment is off by browser. I would not call this a clean win without fixing randomization and rerunning the readout.',
        body:
          'The analyst explicitly connects the missed primary metric, post-hoc segmenting, interim looks, and browser assignment issue.',
        callout:
          'Source note: this corroborates the timeline, pre-analysis plan, and assignment diagnostics.',
      },
      {
        id: 'ev-208',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Design QA recording note',
        sourceLabel: 'UX research queue',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['ux', 'qualitative', 'subset'],
        body:
          'Session-review notes show some paid mobile visitors moving through the redesigned checkout with fewer visible hesitations.',
        callout:
          'Source note: useful as a product lead, not a replacement for experiment validity.',
        memo: [
          'Five reviewed paid-mobile sessions reached payment details faster.',
          'Two users corrected address errors before submit.',
          'One user abandoned after a browser autofill issue.',
          'Reviewer note: “Looks cleaner, but this is a small hand-picked set.”',
        ],
      },
      {
        id: 'ev-209',
        type: 'table',
        render: 'artifact-table',
        title: 'Exclusion rule diff',
        sourceLabel: 'Experiment pipeline change log',
        reliability: 'high',
        unlock: 'initial',
        tags: ['assignment', 'exclusion', 'pipeline'],
        body:
          'The analysis pipeline excluded several visitors after assignment when the treatment script failed to initialize, especially on Safari mobile.',
        callout:
          'Source note: post-assignment exclusions can break the interpretation before lift is discussed.',
        columns: ['Rule', 'Before', 'After', 'Affected visitors'],
        rows: [
          ['Assigned visitor required', 'yes', 'yes', '0'],
          ['Treatment script loaded', 'not required', 'required', '2,840'],
          ['Checkout event present', 'required', 'required', '0'],
          ['Safari mobile fallback', 'kept', 'excluded if blank', '1,970'],
        ],
      },
      {
        id: 'ev-210',
        type: 'table',
        render: 'artifact-table',
        title: 'Revenue guardrail tab',
        sourceLabel: 'Experiment workbook, Guardrails',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['guardrail', 'revenue', 'context'],
        body:
          'Average order value is flat overall and slightly down in the highlighted paid-mobile segment. The sample is noisy, but it complicates the launch story.',
        callout:
          'Source note: guardrails matter for launch decisions, though they do not solve the validity issue.',
        columns: ['View', 'AOV delta', 'Refund delta', 'Note'],
        rows: [
          ['All visitors', '-0.2%', '+0.1 pp', 'flat'],
          ['US paid mobile', '-1.8%', '+0.4 pp', 'wide interval'],
          ['US desktop', '+0.3%', '-0.1 pp', 'flat'],
          ['Safari mobile', '-2.1%', '+0.5 pp', 'missing treatment loads'],
        ],
      },
      {
        id: 'ev-211',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Support chat sample',
        sourceLabel: 'Customer support transcript tags',
        reliability: 'low',
        unlock: 'initial',
        tags: ['support', 'qualitative', 'red herring'],
        body:
          'A few support chats praise the cleaner checkout flow. The praise is real, but the chats were surfaced by the launch team after the subgroup result circulated.',
        callout:
          'Source note: qualitative context can identify friction, but it cannot validate the experiment claim.',
        memo: [
          '“The new page is easier to scan on my phone.”',
          '“Apple Pay finally showed up without refreshing.”',
          'Three positive chats came from paid mobile visitors.',
          'No systematic sample was collected before the readout.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'post-hoc-subgroup',
        label:
          'The launch story depends on a post-hoc subgroup after peeking and repeated slicing',
        scoreClass: 'correct',
      },
      {
        id: 'clean-subgroup-win',
        label:
          'The US paid mobile result is promising enough to treat as a clean targeted launch win',
        scoreClass: 'incorrect',
      },
      {
        id: 'no-effect-anywhere',
        label:
          'The primary miss should block the launch claim, but the paid-mobile signal may still justify a pre-specified follow-up test',
        scoreClass: 'partial',
      },
      {
        id: 'browser-randomization-only',
        label:
          'The only issue is browser randomization; the subgroup result is otherwise launch-ready',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'launch-subgroup',
        label:
          'Ship to US paid mobile and cite the significant subgroup lift',
        scoreClass: 'incorrect',
      },
      {
        id: 'hold-rerun',
        label:
          'Treat the subgroup as diagnostic; fix assignment and rerun or reanalyze with pre-specified rules',
        scoreClass: 'correct',
      },
      {
        id: 'extend-until-primary',
        label:
          'Keep the test running until the primary metric becomes significant',
        scoreClass: 'incorrect',
      },
      {
        id: 'ship-monitor',
        label:
          'Ship broadly but monitor the browser issue after launch',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-203', 'ev-204', 'ev-205', 'ev-206', 'ev-207', 'ev-209'],
    replay: {
      expertDecision:
        'This is not a clean experimental win, even though the subgroup may be worth following. The registered primary metric missed, the highlighted subgroup emerged after interim looks and segment scanning, and the assignment diagnostics show sample ratio mismatch by browser. The defensible recommendation is to hold the launch claim, fix the assignment issue, and rerun or reanalyze under pre-specified rules.',
      whatMattered: [
        'The pre-analysis plan identifies all-visitors checkout starts as the decision metric.',
        'The segment table shows one highlighted positive segment among many reviewed cuts.',
        'The analysis timeline shows interim looks and post-hoc segment additions.',
        'The assignment check shows sample ratio mismatch, especially in Safari mobile.',
        'The exclusion rule diff shows post-assignment exclusions tied to treatment-script loading.',
        'The analyst review clip connects the statistical and operational validity issues.',
      ],
      misleadingEvidence: [
        'The dashboard makes the subgroup result look like the main result.',
        'The PM voice note creates launch urgency and reframes the target audience after seeing the data.',
        'The p < .05 label is tempting when separated from peeking, segment scans, and assignment diagnostics.',
        'UX recordings and support praise point to a plausible product improvement without making the subgroup a launch-grade causal result.',
      ],
      sequence: [
        'The experiment starts with an all-visitors primary metric and a target sample size.',
        'The primary metric remains flat at interim checks.',
        'Additional segment cuts are requested after the overall result disappoints.',
        'One positive segment is elevated while other neutral and negative segments are de-emphasized.',
        'Assignment diagnostics reveal traffic imbalance by browser.',
        'The exclusion rule changed who remained in the treatment analysis after assignment.',
        'The subgroup p-value is not enough to support a launch claim.',
      ],
      trap:
        'The case tests whether you can treat a subgroup result as a lead without upgrading it into a launch-grade causal claim.',
      transfer:
        'For experiments, ask what was pre-specified, how often the data was checked, how many slices were tested, and whether randomization held.',
    },
  },
  'case-003': {
    id: 'case-003',
    slug: 'churn-model-pitch',
    title: 'The Churn Model Pitch',
    set: 'models-real-world',
    sequence: 3,
    status: 'active',
    difficulty: 'standard',
    domain: 'ML evaluation',
    estimatedMinutes: 12,
    caseType: 'model-review',
    judgmentType: 'multi',
    summary:
      'A polished retention model arrives with a renewal deadline, a crowded outreach queue, and a promise that the save team can act sooner.',
    skills: ['model evaluation', 'decision policy', 'calibration judgment'],
    concepts: ['selective labels', 'treatment effects', 'calibration', 'feedback loops'],
    mediaTypes: ['model-output', 'table', 'memo', 'visualization', 'audio'],
    briefing:
      'A vendor has finished a retrospective churn model for enterprise accounts. The pitch says the model can identify likely non-renewals early enough for the customer-success team to intervene before quarter close.',
    role:
      'You are reviewing the evidence before the company decides whether to buy the model, pilot it, or hold the decision.',
    briefingMedia: {
      type: 'source-note',
      title: 'Renewals desk note',
      speaker: 'VP Customer Success',
      duration: 'briefing note',
      asset: {
        type: 'note',
        status: 'available',
      },
      transcript:
        'If the model gets us to the right accounts two months earlier, it could change the renewal forecast. I need to know whether this is ready for the save desk or whether we need a cleaner test.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the churn model?',
    evidence: [
      {
        id: 'ev-301',
        type: 'chart',
        render: 'model-scorecard',
        title: 'Vendor validation slide',
        sourceLabel: 'Sales deck appendix',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['model', 'validation', 'ranking'],
        body:
          'The slide reports strong rank ordering in last year\'s accounts. The top risk bands contain many eventual non-renewals, and the deck frames this as enough to route the save team.',
        callout:
          'Source note: ranking performance can be real without proving the proposed intervention will work.',
        panelTitle: 'Retrospective account model',
        panelBadge: 'Backtest',
        metrics: [
          { label: 'AUC', value: '0.84', note: 'renewal-year holdout' },
          { label: 'Top decile non-renewal', value: '46%', note: 'observed outcome' },
          { label: 'Accounts flagged/month', value: '2,400', note: 'above action line' },
        ],
        bands: [
          { label: '0-20', value: '6%', height: 14 },
          { label: '20-40', value: '11%', height: 24 },
          { label: '40-60', value: '19%', height: 40 },
          { label: '60-80', value: '31%', height: 66 },
          { label: '80-100', value: '46%', height: 92 },
        ],
      },
      {
        id: 'ev-302',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Renewal forecast note',
        sourceLabel: 'Customer success planning doc',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['forecast', 'planning', 'workflow'],
        body:
          'The planning note ties the model to next quarter\'s renewal forecast and asks whether the save desk should replace its current queue with model-ranked accounts.',
        callout:
          'Source note: useful for understanding the operational decision, not a validation result.',
        memo: [
          'Renewals desk can absorb only one new routing rule this quarter.',
          'Current queue is based on CSM judgment plus late-stage contract signals.',
          'Leadership wants a forecast impact estimate before procurement closes.',
          'No decision has been made on discount authority for model-routed accounts.',
        ],
      },
      {
        id: 'ev-303',
        type: 'table',
        render: 'intervention-ledger',
        title: 'Outreach ledger extract',
        sourceLabel: 'Customer success activity log',
        reliability: 'high',
        unlock: 'initial',
        tags: ['intervention', 'labels', 'workflow'],
        body:
          'The historical outcomes used in validation include accounts that received save outreach after being flagged by existing customer-success processes.',
        callout:
          'Source note: outcomes after intervention are not the same thing as untreated churn labels.',
        columns: ['Account group', 'Risk route', 'Save touch', 'Observed non-renewal'],
        rows: [
          ['Enterprise, renewal <90d', 'CSM judgment', '64%', '18%'],
          ['Enterprise, renewal <90d', 'No CSM flag', '9%', '27%'],
          ['Mid-market expansion', 'CSM judgment', '41%', '13%'],
          ['Low-touch pooled', 'No CSM flag', '4%', '21%'],
        ],
      },
      {
        id: 'ev-304',
        type: 'chart',
        render: 'calibration-panel',
        title: 'Calibration slice printout',
        sourceLabel: 'Model review notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['calibration', 'segments', 'policy'],
        body:
          'The same score means different things across account states. Some slices are close to calibrated, while others separate after CSM touches and renewal timing are added.',
        callout:
          'Source note: calibration has to match the population and decision point where the model will be used.',
        groups: [
          {
            label: 'No recent CSM touch',
            predicted: '24%',
            observed: '26%',
            predictedWidth: '48%',
            observedWidth: '52%',
            note: 'mostly pooled accounts',
          },
          {
            label: 'Recent save touch',
            predicted: '37%',
            observed: '19%',
            predictedWidth: '74%',
            observedWidth: '38%',
            note: 'outcome follows intervention',
          },
          {
            label: 'Renewal under 45 days',
            predicted: '31%',
            observed: '42%',
            predictedWidth: '62%',
            observedWidth: '84%',
            note: 'late-stage accounts',
          },
        ],
      },
      {
        id: 'ev-305',
        type: 'table',
        render: 'intervention-ledger',
        title: 'Holdout drawer note',
        sourceLabel: 'Sales ops scratch file',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['holdout', 'capacity', 'comparison'],
        body:
          'A small group of high-risk accounts was not contacted during a capacity crunch, but the note says the skipped accounts were not selected at random.',
        callout:
          'Source note: a holdout-like group helps, but selection into it still matters.',
        columns: ['Month', 'Skipped reason', 'Accounts', 'Non-renewal'],
        rows: [
          ['May', 'Queue full', '118', '39%'],
          ['June', 'Contract owner unavailable', '74', '34%'],
          ['July', 'Low ARR below desk rule', '96', '29%'],
          ['August', 'Renewal already escalated', '41', '17%'],
        ],
      },
      {
        id: 'ev-306',
        type: 'table',
        render: 'capacity-panel',
        title: 'Save desk capacity ledger',
        sourceLabel: 'Operations planning sheet',
        reliability: 'high',
        unlock: 'initial',
        tags: ['capacity', 'cost', 'decision policy'],
        body:
          'The team cannot act on every flagged account. The review sheet combines monthly capacity, average offer cost, and the volume of accounts above the proposed action line.',
        callout:
          'Source note: a model score becomes useful only through a constrained policy.',
        rows: [
          ['Monthly save calls', '620', 'staffed capacity'],
          ['Accounts above action line', '2,400', 'vendor proposal'],
          ['Average save offer', '$4.8k', 'discount or service credit'],
          ['Current manual queue', '710', 'CSM-nominated'],
          ['Procurement ask', '$420k', 'annual license'],
        ],
      },
      {
        id: 'ev-307',
        type: 'definition',
        render: 'retraining-diff',
        title: 'Retraining dataset diff',
        sourceLabel: 'Data science handoff',
        reliability: 'high',
        unlock: 'initial',
        tags: ['feedback loop', 'labels', 'retraining'],
        body:
          'The proposed monthly retraining job would treat post-outreach renewals as ordinary outcomes unless the activity log is joined into the label table.',
        callout:
          'Source note: the next training set can absorb the effects of the policy being evaluated.',
        before: {
          title: 'Current backtest table',
          items: [
            'Account snapshot at renewal minus 120 days',
            'Contract usage and support features',
            'Renewed / did not renew outcome',
          ],
        },
        after: {
          title: 'Proposed monthly table',
          items: [
            'Model score and account snapshot',
            'Save touch not joined by default',
            'Post-touch renewal outcome reused as label',
          ],
        },
      },
      {
        id: 'ev-308',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Evaluation design scratchpad',
        sourceLabel: 'Analytics review doc',
        reliability: 'high',
        unlock: 'initial',
        tags: ['pilot', 'uplift', 'evaluation'],
        body:
          'The analytics reviewer lists evaluation questions that the vendor backtest does not answer: who gets contacted, what treatment they receive, and what would have happened without outreach.',
        callout:
          'Source note: useful constraints for a next test, not a finished launch protocol.',
        memo: [
          'Which high-risk accounts are actually reachable before renewal decisions are locked?',
          'Can outreach slots be assigned in a way that leaves a credible comparison group?',
          'Should renewal, discount cost, customer sentiment, or all three define success?',
          'How would the team report saves without crediting every contacted renewal to the model?',
        ],
      },
      {
        id: 'ev-309',
        type: 'audio',
        title: 'Save desk call clip',
        sourceLabel: 'Customer success standup, Tuesday 10:12 AM',
        reliability: 'high',
        unlock: 'initial',
        tags: ['workflow', 'intervention', 'capacity'],
        speaker: 'Senior CSM',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-003-save-desk-call.wav',
        },
        transcript:
          'Risk alone is not how we pick accounts. We call the ones where a conversation could still change the renewal, and we skip some scary accounts when procurement is already gone.',
        body:
          'A senior customer-success manager describes the save queue as an action policy, not just a list of risky accounts.',
        callout:
          'Source note: helps separate risk prediction from intervention opportunity.',
      },
      {
        id: 'ev-310',
        type: 'table',
        render: 'artifact-table',
        title: 'Discount approval log',
        sourceLabel: 'Renewal operations export',
        reliability: 'high',
        unlock: 'initial',
        tags: ['treatment', 'offers', 'outcomes'],
        body:
          'High-risk contacted accounts often received different discount authority, executive escalation, and service credits. Renewal outcomes reflect both risk and the response package.',
        callout:
          'Source note: contacted outcomes bundle model targeting with treatment intensity.',
        columns: ['Account group', 'Exec escalation', 'Offer authority', 'Renewed'],
        rows: [
          ['High risk, contacted', '44%', '$8.2k avg', '63%'],
          ['High risk, not contacted', '6%', '$0.9k avg', '41%'],
          ['Medium risk, contacted', '22%', '$4.1k avg', '76%'],
          ['Manual queue, no score', '38%', '$6.7k avg', '69%'],
        ],
      },
      {
        id: 'ev-311',
        type: 'table',
        render: 'artifact-table',
        title: 'Account health snapshot',
        sourceLabel: 'Product analytics extract',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['signal', 'usage', 'model context'],
        body:
          'Some product-usage declines precede non-renewal even in accounts without recent customer-success touches, suggesting the model is not merely learning the save team\'s behavior.',
        callout:
          'Source note: prevents overcorrecting into “the model is useless.”',
        columns: ['Signal', 'No recent touch', 'Recent save touch', 'Note'],
        rows: [
          ['Admin weekly logins down 40%', '31% non-renew', '18% non-renew', 'predictive'],
          ['Open support severity P1', '28% non-renew', '21% non-renew', 'mixed'],
          ['Seat expansion stalled', '34% non-renew', '24% non-renew', 'predictive'],
          ['QBR completed', '12% non-renew', '9% non-renew', 'protective'],
        ],
      },
      {
        id: 'ev-312',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Vendor reference note',
        sourceLabel: 'Procurement call notes',
        reliability: 'low',
        unlock: 'initial',
        tags: ['vendor', 'reference', 'context'],
        body:
          'A reference customer says the model paid for itself, but the notes also mention that they hired two additional renewal specialists during the same quarter.',
        callout:
          'Source note: a useful implementation anecdote, not clean evidence of model lift.',
        memo: [
          'Reference saw renewal forecast improve after adopting the score.',
          'Save-team headcount increased from four to six in the same quarter.',
          'Discount authority was expanded for strategic accounts.',
          'Reference did not keep a randomized holdout.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'prediction-not-policy',
        label:
          'The model may rank risk, but the evidence does not yet prove the proposed outreach policy creates incremental saves',
        scoreClass: 'correct',
      },
      {
        id: 'vendor-ready',
        label:
          'The retrospective top-decile results are strong enough to replace the current save queue',
        scoreClass: 'incorrect',
      },
      {
        id: 'manual-only',
        label:
          'The model should be rejected because customer-success judgment already touches many risky accounts',
        scoreClass: 'partial',
      },
      {
        id: 'capacity-only',
        label:
          'The main issue is capacity; if staffing increases, the validation evidence is sufficient',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'buy-and-route',
        label:
          'Buy the model and route the save desk by the vendor score next quarter',
        scoreClass: 'incorrect',
      },
      {
        id: 'policy-pilot',
        label:
          'Run a constrained policy pilot that tests incremental saves within risk bands before routing the queue',
        scoreClass: 'correct',
      },
      {
        id: 'analyst-flag-only',
        label:
          'Use the score only as a background flag for CSM review while making no ROI or forecast claims',
        scoreClass: 'partial',
      },
      {
        id: 'reject-model',
        label:
          'Reject the model outright because the historical labels are contaminated by save activity',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-303', 'ev-304', 'ev-306', 'ev-307', 'ev-308', 'ev-309', 'ev-310'],
    replay: {
      expertDecision:
        'The model appears to rank churn risk, but the business question is whether a constrained outreach policy creates incremental renewals at acceptable cost. Historical labels already include customer-success actions, the same score behaves differently across account states, and the proposed retraining loop would mix intervention effects back into future labels. The defensible recommendation is a limited policy pilot with randomized outreach within risk bands, joined intervention logs, and an incremental-save metric.',
      whatMattered: [
        'The outreach ledger shows historical outcomes were shaped by prior save touches.',
        'The calibration printout changes across account states and intervention history.',
        'The capacity ledger shows the score cannot simply route every flagged account.',
        'The retraining diff would reuse post-touch outcomes unless intervention logs are joined.',
        'The pilot notes define a test of action value rather than raw prediction quality.',
        'The save desk call and discount log show that outcomes depend on where outreach can still change the renewal.',
      ],
      misleadingEvidence: [
        'The vendor slide shows real-looking rank ordering, but rank ordering is not the same as incremental save value.',
        'Renewal wins among contacted accounts are tempting to count as model wins even when outreach caused or selected the outcome.',
        'The capacity-crunch skipped group resembles a holdout, but it was not randomly selected.',
        'The vendor reference sounds successful but mixes the model with staffing and discount changes.',
      ],
      sequence: [
        'Existing customer-success processes already identify and contact some risky accounts.',
        'The retrospective model learns from outcomes after those actions occurred.',
        'Leadership wants to use the score as a routing policy under limited save-desk capacity.',
        'Save-desk staff choose accounts partly by whether an intervention can still matter.',
        'The action policy would change renewal outcomes and the labels used for retraining.',
        'A valid pilot must estimate incremental saves under a specific capacity and cost constraint.',
      ],
      trap:
        'The case tests whether you separate prediction from intervention value when a model becomes part of the system it predicts.',
      transfer:
        'For operational ML, ask what decision the score will change, what outcome would have happened without that action, and how the policy will affect future data.',
    },
  },
  'case-004': {
    id: 'case-004',
    slug: 'biased-training-set',
    title: 'The Inspection Queue',
    set: 'uncertainty-decisions',
    sequence: 4,
    status: 'active',
    difficulty: 'standard',
    domain: 'Public policy analytics',
    estimatedMinutes: 12,
    caseType: 'evidence-desk',
    judgmentType: 'multi',
    summary:
      'A city inspection team has a new routing screen, a long backlog, and one week to decide how much authority the score should have.',
    skills: ['administrative data reasoning', 'sampling judgment', 'deployment caution'],
    concepts: ['selective labels', 'measurement opportunity', 'feedback loops'],
    mediaTypes: ['map', 'policy', 'table', 'visualization', 'audio'],
    briefing:
      'The health department has a backlog of licensed food venues and a proposed priority score for routine inspections. The pilot screen looks useful: the top-ranked venues have produced more critical findings in historical data.',
    role:
      'You are reviewing the evidence before the department decides whether the score should drive next month\'s inspection queue.',
    briefingMedia: {
      type: 'source-note',
      title: 'Dispatch desk note',
      speaker: 'Field Operations',
      duration: 'briefing note',
      asset: {
        type: 'note',
        status: 'available',
      },
      transcript:
        'The top of the queue looks familiar, and that is partly why the field team trusts it. If it helps clear the backlog without missing quiet trouble spots, we should know that before the next cycle starts.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the inspection score?',
    evidence: [
      {
        id: 'ev-401',
        type: 'chart',
        render: 'model-scorecard',
        title: 'Queue screen capture',
        sourceLabel: 'Inspection routing prototype',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['model', 'queue', 'validation'],
        body:
          'The screen ranks licensed venues by priority score. Historical critical findings rise sharply in the highest bands, and the pilot notes call the screen ready for a one-month routing trial.',
        callout:
          'Source note: backtest lift can be real while still reflecting where inspection labels were available.',
        panelTitle: 'Routine inspection priority',
        panelBadge: 'Pilot screen',
        metrics: [
          { label: 'Backtest AUC', value: '0.79', note: 'prior inspection labels' },
          { label: 'Top band critical findings', value: '34%', note: 'last 24 months' },
          { label: 'Backlog above line', value: '1,180', note: 'venues queued' },
        ],
        bands: [
          { label: '0-20', value: '7%', height: 16 },
          { label: '20-40', value: '11%', height: 26 },
          { label: '40-60', value: '17%', height: 42 },
          { label: '60-80', value: '24%', height: 62 },
          { label: '80-100', value: '34%', height: 90 },
        ],
      },
      {
        id: 'ev-402',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Field supervisor note',
        sourceLabel: 'Dispatch desk message',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['operations', 'trust', 'queue'],
        body:
          'The note says the proposed list mostly matches what inspectors expect, but it also mentions several corridors where staff rarely have time for routine visits unless a complaint comes in.',
        callout:
          'Source note: useful for understanding field workflow and trust in the score.',
        memo: [
          'Top venues look familiar to senior inspectors.',
          'Complaint response has crowded out routine visits in two districts.',
          'Evening and weekend venues are harder to reach with current staffing.',
          'The backlog is visible to council before the summer season.',
        ],
      },
      {
        id: 'ev-403',
        type: 'chart',
        render: 'inspection-coverage-map',
        title: 'Coverage board photo',
        sourceLabel: 'Planning room wall map',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['coverage', 'map', 'routing'],
        body:
          'The board overlays licensed venues, recent inspections, complaint clusters, and several thinly covered license corridors. The high-score cluster follows some heavily inspected routes, but not all dense venue areas.',
        callout:
          'Source note: the map makes inspection opportunity visible alongside possible risk.',
        mapLabel: 'Inspection coverage sketch',
        legend: [
          { kind: 'license', label: 'Licensed venue' },
          { kind: 'inspection', label: 'Prior inspection' },
          { kind: 'complaint', label: 'Complaint cluster' },
          { kind: 'thin', label: 'Thin coverage' },
        ],
        points: [
          { kind: 'inspection', label: 'D1', x: 22, y: 25 },
          { kind: 'inspection', label: 'D2', x: 29, y: 31 },
          { kind: 'complaint', label: 'C1', x: 35, y: 24 },
          { kind: 'inspection', label: 'D3', x: 42, y: 38 },
          { kind: 'complaint', label: 'C2', x: 51, y: 46 },
          { kind: 'license', label: 'L1', x: 61, y: 22 },
          { kind: 'license', label: 'L2', x: 67, y: 29 },
          { kind: 'thin', label: 'T1', x: 76, y: 34 },
          { kind: 'thin', label: 'T2', x: 80, y: 48 },
          { kind: 'license', label: 'L3', x: 24, y: 66 },
          { kind: 'inspection', label: 'D4', x: 38, y: 72 },
          { kind: 'complaint', label: 'C3', x: 45, y: 67 },
          { kind: 'thin', label: 'T3', x: 70, y: 76 },
          { kind: 'license', label: 'L4', x: 84, y: 72 },
        ],
      },
      {
        id: 'ev-404',
        type: 'table',
        render: 'artifact-table',
        title: 'Inspection ledger extract',
        sourceLabel: 'Program operations export',
        reliability: 'high',
        unlock: 'initial',
        tags: ['labels', 'inspection type', 'effort'],
        body:
          'Inspection type varies by route. Complaint response, routine visits, grant sweeps, and after-hours checks produce different finding rates and different inspection depth.',
        callout:
          'Source note: the label is produced by a workflow, not just by restaurant condition.',
        columns: ['Route type', 'Share of visits', 'Avg. minutes', 'Critical finding'],
        rows: [
          ['Complaint response', '42%', '31', '29%'],
          ['Routine daytime', '36%', '24', '14%'],
          ['Downtown grant sweep', '15%', '38', '32%'],
          ['After-hours check', '7%', '18', '21%'],
        ],
      },
      {
        id: 'ev-405',
        type: 'timeline',
        title: 'Program calendar clipping',
        sourceLabel: 'Health department calendar',
        reliability: 'high',
        unlock: 'initial',
        tags: ['programs', 'coverage', 'history'],
        body:
          'The training window includes a downtown food-safety grant, a complaint-hotline campaign, and a staff vacancy that changed which venues could be inspected.',
        callout:
          'Source note: program history explains why labels are denser in some routes.',
        entries: [
          ['March', 'Complaint hotline translated into two new languages.'],
          ['May', 'Downtown food-safety grant funds evening sweeps.'],
          ['July', 'Two routine inspectors are reassigned to complaint response.'],
          ['September', 'New license corridor opens near the river market.'],
          ['November', 'Priority model training snapshot is exported.'],
        ],
      },
      {
        id: 'ev-406',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Feature note',
        sourceLabel: 'Model handoff doc',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['features', 'proxies', 'model'],
        body:
          'The handoff note lists operational features that blend venue risk, complaint access, and prior department attention.',
        callout:
          'Source note: some features are legitimate risk clues and some encode prior attention.',
        memo: [
          'Prior critical findings and days since last routine inspection.',
          'Complaint count, complaint language, and hotline source.',
          'Permit age, late-night hours, service type, and seating capacity.',
          'Inspector route, grant-program flag, and neighborhood corridor.',
        ],
      },
      {
        id: 'ev-407',
        type: 'table',
        render: 'artifact-table',
        title: 'Audit sample drawer',
        sourceLabel: 'Quality review scratch sheet',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['audit', 'sample', 'coverage'],
        body:
          'A small review of venues with few prior routine visits found several serious issues, but the sample was assembled manually during a staffing gap.',
        callout:
          'Source note: the sample is useful pressure against overconfidence, not a clean population estimate.',
        columns: ['Group', 'Venues checked', 'Serious issues', 'Selection note'],
        rows: [
          ['Few prior visits, river market', '22', '7', 'new license corridor'],
          ['Few prior visits, late-night', '18', '5', 'weekend sweep'],
          ['Medium score, no complaints', '31', '6', 'manual review'],
          ['High score, complaint dense', '34', '12', 'routine validation'],
        ],
      },
      {
        id: 'ev-408',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Evaluation design notes',
        sourceLabel: 'Analytics margin notes',
        reliability: 'high',
        unlock: 'initial',
        tags: ['evaluation', 'pilot', 'policy'],
        body:
          'The analyst lists unresolved design questions for using the score without losing sight of places that historically received little routine inspection.',
        callout:
          'Source note: this frames the validation problem; it does not by itself select a deployment policy.',
        memo: [
          'Which venues get checked only because a complaint arrives?',
          'How much routine capacity can be preserved for thin-history corridors?',
          'Can complaint-response labels be separated from routine-routing evaluation?',
          'What effort denominator should appear beside any model lift claim?',
        ],
      },
      {
        id: 'ev-409',
        type: 'audio',
        title: 'Shift-change clip',
        sourceLabel: 'Inspector shift handoff, Thursday 6:18 PM',
        reliability: 'high',
        unlock: 'initial',
        tags: ['coverage', 'staffing', 'inspection opportunity'],
        speaker: 'Field Supervisor',
        duration: '0:12',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-004-shift-change.wav',
        },
        transcript:
          'Evening venues are the hard part. Unless a complaint comes in, we do not always get back there. The score is picking up some of that history, not just the kitchen risk.',
        body:
          'A shift handoff explains that evening coverage has depended on complaints and staffing, which affects which venues had a chance to receive findings.',
        callout:
          'Source note: connects route capacity with label opportunity.',
      },
      {
        id: 'ev-410',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Complaint intake flyer',
        sourceLabel: 'Community outreach archive',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['complaints', 'access', 'community reporting'],
        body:
          'The department promoted the complaint hotline in two languages during the training window. Complaint volume rose where outreach occurred, but license density did not change at the same pace.',
        callout:
          'Source note: complaint counts can reflect reporting access as well as underlying risk.',
        memo: [
          'Flyers distributed through libraries and neighborhood clinics.',
          'Hotline form translated into Spanish and Mandarin in March.',
          'Complaint volume rose 46% in outreach corridors.',
          'No equivalent campaign ran in the river-market corridor.',
        ],
      },
      {
        id: 'ev-411',
        type: 'table',
        render: 'artifact-table',
        title: 'Severity appendix',
        sourceLabel: 'Inspection quality review',
        reliability: 'high',
        unlock: 'initial',
        tags: ['severity', 'real signal', 'risk'],
        body:
          'Some high-score routes have repeated severe findings even after adjusting for inspection effort, which argues against dismissing the score entirely.',
        callout:
          'Source note: there is real risk signal mixed with attention history.',
        columns: ['Route group', 'Repeat severe findings', 'Reinspection failure', 'Effort note'],
        rows: [
          ['Downtown late-night', '18%', '31%', 'deep sweeps'],
          ['River market new licenses', '14%', '22%', 'thin history'],
          ['Complaint dense corridor', '21%', '29%', 'high complaint volume'],
          ['Low-score suburban strip', '5%', '8%', 'routine daytime'],
        ],
      },
      {
        id: 'ev-412',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Council backlog email',
        sourceLabel: 'Deputy commissioner inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['deadline', 'politics', 'pressure'],
        body:
          'A council office asks for a visible backlog reduction before the summer season. The email explains urgency but does not help validate the model.',
        callout:
          'Source note: pressure can shape deployment timing without resolving evidence quality.',
        memo: [
          'Council hearing scheduled before summer festival permits.',
          'Backlog count requested for public dashboard.',
          'Deputy asks whether the priority score can “move the line faster.”',
          'No sampling or validation details are discussed.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'signal-and-opportunity',
        label:
          'The score contains useful signal, but the backtest overstates readiness because labels reflect where and how the city inspected',
        scoreClass: 'correct',
      },
      {
        id: 'top-band-ready',
        label:
          'The high-score bands find more critical violations, so the city should route routine inspections by score',
        scoreClass: 'incorrect',
      },
      {
        id: 'reject-contaminated',
        label:
          'The model should be rejected because prior enforcement patterns contaminate the labels',
        scoreClass: 'partial',
      },
      {
        id: 'remove-location',
        label:
          'The main issue is neighborhood information, so removing route and geography fields solves the problem',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'adopt-score',
        label:
          'Adopt the score as the primary ranker for next month\'s routine inspection queue',
        scoreClass: 'incorrect',
      },
      {
        id: 'hybrid-pilot',
        label:
          'Pilot the score as one input with random routine checks, thin-corridor sampling, and prospective evaluation',
        scoreClass: 'correct',
      },
      {
        id: 'analyst-leads',
        label:
          'Use the score only to generate analyst leads, with no operational routing change yet',
        scoreClass: 'partial',
      },
      {
        id: 'pause-new-dataset',
        label:
          'Pause all model use until the city collects an entirely new inspection dataset',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-403', 'ev-404', 'ev-405', 'ev-407', 'ev-408', 'ev-409', 'ev-410'],
    replay: {
      expertDecision:
        'The model is not useless, but the current validation does not prove it ranks latent venue risk under the proposed policy. Historical critical findings were observed through uneven inspection opportunity, program history, and route capacity. The defensible move is a constrained policy pilot: use the score as one input, preserve randomized routine inspections, oversample thinly observed corridors, separate complaint-response labels, and evaluate prospectively.',
      whatMattered: [
        'The coverage board shows inspection opportunity alongside venue density and complaint clusters.',
        'The ledger shows that inspection type and effort changed the chance of finding a critical violation.',
        'The calendar explains why some routes generated denser labels during the training window.',
        'The audit sample raises concern about thinly observed areas without pretending to be a clean estimate.',
        'The evaluation sketch gives a way to learn from deployment instead of freezing a flawed backtest.',
        'The shift-change clip and complaint flyer show how staffing and outreach changed label opportunity.',
      ],
      misleadingEvidence: [
        'Backtest lift looks like clean predictive performance when the label process is hidden.',
        'Complaint counts feel objective but also depend on reporting access and hotline outreach.',
        'Removing geography can hide the policy problem rather than remove it.',
        'Council pressure explains urgency but does not make the score deployment-ready.',
      ],
      sequence: [
        'Historical findings enter the training set only when a venue is inspected.',
        'Inspection opportunity varies by complaint response, grant sweeps, staff routes, and time of day.',
        'Complaint reporting also changes when the city changes outreach and language access.',
        'The model learns from both venue risk and the department\'s historical attention pattern.',
        'A score-driven queue would change which venues receive future labels.',
        'A prospective hybrid pilot can test the policy while protecting coverage.',
      ],
      trap:
        'The case tests whether you reconstruct how administrative labels were produced before treating them as ground truth.',
      transfer:
        'For public-sector ML, ask who had the chance to receive a label, what workflow generated it, and how deployment will change the next dataset.',
    },
  },
  'case-005': {
    id: 'case-005',
    slug: 'correlation-press-release',
    title: 'The Spring Tutoring Brief',
    set: 'experiments-causality',
    sequence: 5,
    status: 'active',
    difficulty: 'standard',
    domain: 'Education analytics',
    estimatedMinutes: 11,
    caseType: 'claim-classification',
    judgmentType: 'multi',
    summary:
      'A district impact brief is headed to a funding vote after students who used a tutoring platform show stronger spring gains.',
    skills: ['claim evaluation', 'estimand reasoning', 'evidence design'],
    concepts: ['selection effects', 'treatment definition', 'measurement alignment'],
    mediaTypes: ['press-release', 'chart', 'table', 'memo', 'audio'],
    briefing:
      'A district partner wants to announce that a tutoring platform improved spring math outcomes. The brief is persuasive, the funding vote is close, and the implementation records are messy.',
    role:
      'You are reviewing the evidence before the district decides what it can say publicly and what it should fund next.',
    briefingMedia: {
      type: 'source-note',
      title: 'Comms draft note',
      speaker: 'District Communications',
      duration: 'briefing note',
      asset: {
        type: 'note',
        status: 'available',
      },
      transcript:
        'The board packet needs a clear result. If the data team signs off, the release will say students who completed tutoring sessions gained substantially more than students who did not use the platform.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the tutoring brief?',
    evidence: [
      {
        id: 'ev-501',
        type: 'memo',
        render: 'memo-artifact',
        title: 'District impact brief',
        sourceLabel: 'Board packet draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['public claim', 'impact', 'funding'],
        body:
          'The brief proposes a public statement about spring math gains among students with at least five tutoring sessions.',
        callout:
          'Source note: the claim is the decision object, not independent evidence.',
        memo: [
          'Students with 5+ sessions gained 11 percentile points more from fall to spring.',
          'Recommended headline: platform users made stronger growth.',
          'Board ask: continue licenses and expand to grades 6-8.',
          'Appendix notes that schools implemented the platform differently.',
        ],
      },
      {
        id: 'ev-502',
        type: 'chart',
        render: 'dose-response-panel',
        title: 'Usage and score chart',
        sourceLabel: 'Impact appendix figure',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['usage', 'dose response', 'outcomes'],
        body:
          'The chart shows larger gains for students with more tutoring sessions. The same appendix contrasts platform-aligned interim scores with independent state-test movement.',
        callout:
          'Source note: dose response is informative, but usage is not the same as assigned treatment.',
        panelTitle: 'Spring math gains by completed sessions',
        panelBadge: 'Observed users',
        doses: [
          { label: '0', value: '+3 pts', height: 22, note: '8,420 students' },
          { label: '1-2', value: '+6 pts', height: 42, note: '3,810 students' },
          { label: '3-4', value: '+9 pts', height: 62, note: '2,140 students' },
          { label: '5+', value: '+14 pts', height: 88, note: '1,360 students' },
        ],
        outcomes: [
          { label: 'Platform-aligned interim', value: '+11 pts', note: '5+ sessions versus no use' },
          { label: 'State test scale score', value: '+3 pts', note: 'smaller, noisy comparison' },
        ],
      },
      {
        id: 'ev-503',
        type: 'table',
        render: 'artifact-table',
        title: 'Roster assignment export',
        sourceLabel: 'School implementation file',
        reliability: 'high',
        unlock: 'initial',
        tags: ['assignment', 'implementation', 'selection'],
        body:
          'Students reached the platform through several routes: scheduled math block, teacher nomination, optional homework, and counselor referral.',
        callout:
          'Source note: the treatment is not one thing unless assignment and usage are separated.',
        columns: ['Route', 'Students', 'Typical trigger', 'Scheduled time'],
        rows: [
          ['Math block roster', '2,910', 'school schedule', 'yes'],
          ['Teacher nomination', '1,740', 'benchmark concern', 'varies'],
          ['Optional homework', '4,860', 'family portal', 'no'],
          ['Counselor referral', '620', 'attendance recovery', 'yes'],
        ],
      },
      {
        id: 'ev-504',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Teacher planning note',
        sourceLabel: 'Grade 7 team folder',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['implementation', 'classroom', 'usage'],
        body:
          'The note shows the platform being embedded in class time in some rooms and treated as optional practice in others.',
        callout:
          'Source note: implementation differences can change what usage means.',
        memo: [
          'Team A: two scheduled blocks per week during intervention period.',
          'Team B: optional homework after the weekly mini-lesson.',
          'Team C: assigned after benchmark topics are reviewed in class.',
          'Teachers asked for separate reporting by scheduled versus optional use.',
        ],
      },
      {
        id: 'ev-505',
        type: 'table',
        render: 'artifact-table',
        title: 'Baseline balance table',
        sourceLabel: 'Evaluation notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['baseline', 'comparison', 'confounding'],
        body:
          'Students with heavy use started lower on fall math, but had stronger attendance, more homework completion, and fewer midyear transfers than non-users.',
        callout:
          'Source note: baseline differences point in different directions, which makes the causal story harder.',
        columns: ['Measure', 'No use', '5+ sessions', 'Difference'],
        rows: [
          ['Fall math percentile', '44', '38', '-6'],
          ['Attendance rate', '88%', '94%', '+6 pp'],
          ['Homework completion', '61%', '79%', '+18 pp'],
          ['Midyear transfer', '11%', '4%', '-7 pp'],
          ['Prior tutoring enrollment', '18%', '37%', '+19 pp'],
        ],
      },
      {
        id: 'ev-506',
        type: 'timeline',
        title: 'Access log clipping',
        sourceLabel: 'SSO and rollout tracker',
        reliability: 'high',
        unlock: 'initial',
        tags: ['rollout', 'access', 'comparison'],
        body:
          'Two schools received delayed access after an SSO issue, creating a tempting comparison group. The tracker also notes device-cart shortages at the same schools.',
        callout:
          'Source note: a rollout delay can help analysis, but only if the delay is as-if random for the outcome.',
        entries: [
          ['January 8', 'Districtwide platform launch begins.'],
          ['January 12', 'Two schools report SSO roster mismatch.'],
          ['January 19', 'Device-cart shortage logged at the same schools.'],
          ['February 2', 'Delayed schools receive access.'],
          ['March 21', 'Interim assessment window opens.'],
        ],
      },
      {
        id: 'ev-507',
        type: 'table',
        render: 'artifact-table',
        title: 'Outcome definition note',
        sourceLabel: 'Assessment crosswalk',
        reliability: 'high',
        unlock: 'initial',
        tags: ['outcome', 'measurement', 'alignment'],
        body:
          'The headline gain uses an interim assessment aligned to platform skills. Independent state-test movement is smaller and has wider uncertainty.',
        callout:
          'Source note: outcome choice changes what claim can be defended.',
        columns: ['Outcome', 'Window', '5+ session contrast', 'Note'],
        rows: [
          ['Platform skill check', 'monthly', '+13 pts', 'closest content match'],
          ['District interim', 'fall-spring', '+11 pts', 'headline figure'],
          ['State math scale', 'annual', '+3 pts', 'wide interval'],
          ['Course pass rate', 'semester', '+2 pp', 'incomplete grades excluded'],
        ],
      },
      {
        id: 'ev-508',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Evaluation margin notes',
        sourceLabel: 'Data team review',
        reliability: 'high',
        unlock: 'initial',
        tags: ['evaluation', 'estimand', 'next test'],
        body:
          'The reviewer proposes separating availability, assignment, scheduled class use, and actual sessions in the next evaluation.',
        callout:
          'Source note: the next design should match the claim the district wants to make.',
        memo: [
          'Report current results as descriptive association, not causal impact.',
          'Next term: randomize encouragement or waitlist access within eligible classrooms.',
          'Track assignment, scheduled time, actual use, and independent outcomes separately.',
          'Pre-register state-test and district-interim outcomes before the vote cycle.',
        ],
      },
      {
        id: 'ev-509',
        type: 'audio',
        title: 'Teacher hallway clip',
        sourceLabel: 'Teacher planning voice memo',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['implementation', 'class time', 'usage'],
        speaker: 'Grade 7 Math Teacher',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-005-teacher-hallway.wav',
        },
        transcript:
          'The app worked best when we protected time in class. Optional homework was a different thing. The motivated students did it, but the scheduled block changed who actually got practice.',
        body:
          'A teacher distinguishes scheduled classroom use from optional homework, making the treatment definition less simple than “used the app.”',
        callout:
          'Source note: implementation detail that helps explain why usage bundles multiple mechanisms.',
      },
      {
        id: 'ev-510',
        type: 'table',
        render: 'artifact-table',
        title: 'Family access survey',
        sourceLabel: 'Student services survey',
        reliability: 'high',
        unlock: 'initial',
        tags: ['access', 'selection', 'home support'],
        body:
          'Students with heavy optional use were more likely to report stable device access, quiet homework time, and caregiver help.',
        callout:
          'Source note: access and support can affect both usage and gains.',
        columns: ['Survey item', 'No use', '5+ sessions', 'Difference'],
        rows: [
          ['Reliable home device', '58%', '82%', '+24 pp'],
          ['Quiet homework place', '49%', '71%', '+22 pp'],
          ['Caregiver can help with login', '43%', '68%', '+25 pp'],
          ['After-school job/care duties', '28%', '12%', '-16 pp'],
        ],
      },
      {
        id: 'ev-511',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Item alignment excerpt',
        sourceLabel: 'Assessment review notes',
        reliability: 'high',
        unlock: 'initial',
        tags: ['measurement', 'alignment', 'outcome'],
        body:
          'The platform practice sequence closely matches several district-interim skill strands, while the state assessment samples broader grade-level standards.',
        callout:
          'Source note: alignment can be useful for instruction and still narrow the claim.',
        memo: [
          'Platform module: integer operations, proportional relationships, equation fluency.',
          'District interim: same strands account for 62% of spring form points.',
          'State test: same strands account for roughly 31% of assessed points.',
          'Reviewer note: “Headline should say interim math growth, not broad achievement impact.”',
        ],
      },
      {
        id: 'ev-512',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Student focus group notes',
        sourceLabel: 'Research assistant notebook',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['student voice', 'confidence', 'context'],
        body:
          'Students describe the platform as helpful for practice routines and confidence. The comments make the program story more credible without proving the causal headline.',
        callout:
          'Source note: human context matters, but it does not identify the counterfactual.',
        memo: [
          '“It helped me know what to practice before the quiz.”',
          '“I did more when my teacher gave us time for it.”',
          '“At home I usually had to share the laptop.”',
          'Several students connected the app to confidence rather than test scores.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'promising-not-causal',
        label:
          'The evidence supports a promising association and implementation signal, not the public causal claim as written',
        scoreClass: 'correct',
      },
      {
        id: 'dose-proves-impact',
        label:
          'The session dose-response proves the tutoring platform caused the stronger spring gains',
        scoreClass: 'incorrect',
      },
      {
        id: 'class-time-possible',
        label:
          'The platform may help when embedded in scheduled class time, but this dataset cannot isolate that effect',
        scoreClass: 'partial',
      },
      {
        id: 'delay-natural-experiment',
        label:
          'The delayed rollout schools provide a clean natural experiment for the board claim',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'publish-causal',
        label:
          'Publish the causal impact claim and expand districtwide based on the 5+ session result',
        scoreClass: 'incorrect',
      },
      {
        id: 'revise-and-pilot',
        label:
          'Revise to descriptive language and fund continuation only with a cleaner evaluation design',
        scoreClass: 'correct',
      },
      {
        id: 'descriptive-only',
        label:
          'Publish only descriptive results and make no funding recommendation',
        scoreClass: 'partial',
      },
      {
        id: 'expand-descriptive',
        label:
          'Keep the public claim descriptive, but recommend districtwide expansion from the usage groups as-is',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-503', 'ev-505', 'ev-506', 'ev-507', 'ev-508', 'ev-510', 'ev-511'],
    replay: {
      expertDecision:
        'The current evidence supports a promising association and an implementation story, not the causal claim in the draft release. Usage bundles several mechanisms: eligibility, teacher assignment, scheduled class time, student follow-through, access constraints, and outcome alignment. The defensible recommendation is to revise the public claim, continue only with a limited evaluation plan, and define the next test around assignment, usage, and independent outcomes.',
      whatMattered: [
        'The roster export shows that students entered the platform through different assignment routes.',
        'The baseline table shows heavy users differed from non-users before spring outcomes were measured.',
        'The rollout log offers a possible comparison but also flags device-access differences.',
        'The outcome note shows the headline depends on a platform-aligned measure.',
        'The evaluation notes define a cleaner next design that matches the district claim.',
        'The family access survey and item alignment notes show why usage and the headline outcome are not neutral.',
      ],
      misleadingEvidence: [
        'A dose-response curve can look causal even when usage is selected and structured by schools.',
        'The delayed rollout resembles a natural experiment until access constraints are noticed.',
        'A real program story can be mistaken for proof of the exact public claim.',
        'Student and teacher accounts make the program feel valuable without identifying the counterfactual effect.',
      ],
      sequence: [
        'Schools implemented the platform through multiple assignment routes.',
        'Students with high usage differed from non-users before spring measurement.',
        'Some usage happened inside scheduled intervention blocks while other usage was optional.',
        'Home access and support also shaped who could accumulate optional sessions.',
        'The headline outcome is more closely aligned to platform content than the independent state test.',
        'A stronger evaluation must define whether the treatment is access, assignment, scheduled use, or completed sessions.',
      ],
      trap:
        'The case tests whether you define the treatment before judging the causal claim.',
      transfer:
        'For impact reports, ask what treatment is being claimed, who selected into it, which outcome carries the headline, and what next design could actually estimate the effect.',
    },
  },
  'case-006': {
    id: 'case-006',
    slug: 'forecast-before-budget-season',
    title: 'The Winter Shelter Forecast',
    set: 'uncertainty-decisions',
    sequence: 6,
    status: 'active',
    difficulty: 'standard',
    domain: 'Public service forecasting',
    estimatedMinutes: 12,
    caseType: 'range-estimate',
    judgmentType: 'multi',
    summary:
      'A city housing office must set winter overflow capacity from a forecast that fits ordinary nights better than pressure weeks.',
    skills: ['uncertainty ranges', 'forecast evaluation', 'scenario thinking'],
    concepts: ['backtesting', 'concept drift', 'prediction intervals', 'censored demand'],
    mediaTypes: ['chart', 'timeline', 'table', 'memo', 'audio'],
    briefing:
      'The city housing office is preparing the winter shelter plan. A model trained on five years of nightly shelter records says 82 overflow beds should cover the expected peak. The council packet, staffing request, and nonprofit partner contracts are due Friday.',
    role:
      'You are the public service data scientist reviewing the forecast before the number becomes an operating plan.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Council packet voicemail',
      speaker: 'Deputy Director, Housing Services',
      duration: '0:12',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-006-council-packet-voicemail.wav',
      },
      transcript:
        'The model says eighty-two overflow beds at peak. I need a number for the council packet by Friday, and I would rather not ask for a larger line unless the evidence really supports it.',
    },
    decisionPrompt:
      'What winter overflow-capacity recommendation would you stand behind?',
    evidence: [
      {
        id: 'ev-601',
        type: 'chart',
        render: 'forecast-fan-panel',
        title: 'Forecast board printout',
        sourceLabel: 'Housing analytics dashboard, Tuesday 7:30 AM',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['forecast', 'point estimate', 'interval'],
        body:
          'The dashboard projects a winter peak of 82 overflow beds. The displayed interval is narrow because it is based on ordinary-night residual error from prior winters.',
        panelTitle: 'Nightly overflow demand',
        panelBadge: 'Peak point: 82 beds',
        chartLabel: 'Shelter overflow forecast with projected interval',
        weeks: [
          { label: 'W-6', value: '54', actual: 48 },
          { label: 'W-5', value: '58', actual: 52 },
          { label: 'W-4', value: '61', actual: 55 },
          { label: 'W-3', value: '64', actual: 58 },
          { label: 'W-2', value: '69', actual: 63 },
          { label: 'W-1', value: '76', actual: 69 },
          { label: 'Peak', value: '82', point: 82, low: 74, high: 90, projected: true },
        ],
        stats: [
          { label: 'Backtest MAE', value: '4.8', note: 'ordinary nights' },
          { label: 'Displayed 90%', value: '74-90', note: 'model interval' },
          { label: 'Capacity ask', value: '82', note: 'draft packet' },
        ],
      },
      {
        id: 'ev-602',
        type: 'audio',
        title: 'Council packet voicemail',
        sourceLabel: 'Audio note, Tuesday 8:11 AM',
        reliability: 'low',
        unlock: 'initial',
        tags: ['deadline', 'budget', 'pressure'],
        speaker: 'Deputy Director, Housing Services',
        duration: '0:12',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-006-council-packet-voicemail.wav',
        },
        transcript:
          'The model says eighty-two overflow beds at peak. I need a number for the council packet by Friday, and I would rather not ask for a larger line unless the evidence really supports it.',
        body:
          'The deputy director frames the forecast as a budget number that must be justified publicly before partner contracts are signed.',
      },
      {
        id: 'ev-603',
        type: 'table',
        render: 'artifact-table',
        title: 'Five-winter backtest tab',
        sourceLabel: 'Forecast notebook, validation sheet',
        reliability: 'high',
        unlock: 'initial',
        tags: ['backtest', 'coverage', 'ordinary nights'],
        body:
          'The model performed well on typical nights. Its largest misses occurred during weeks with policy disruptions, unusual cold, or temporary bed closures.',
        columns: ['Period', 'Median error', 'Peak-week miss', 'Condition'],
        rows: [
          ['Winter 1', '3.9 beds', '+7 beds', 'stable capacity'],
          ['Winter 2', '4.6 beds', '+9 beds', 'stable capacity'],
          ['Winter 3', '5.1 beds', '+22 beds', 'cold snap plus motel pause'],
          ['Winter 4', '4.4 beds', '+8 beds', 'stable capacity'],
          ['Winter 5', '5.8 beds', '+28 beds', 'eligibility rule changed midwinter'],
        ],
      },
      {
        id: 'ev-604',
        type: 'timeline',
        title: 'Winter operations calendar',
        sourceLabel: 'Housing services planning wall',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['timeline', 'operations', 'policy'],
        body:
          'Several operational changes fall between the model training window and the winter being budgeted.',
        entries: [
          ['Sep 30', 'Rental assistance bridge funds close to new applicants.'],
          ['Oct 12', 'Downtown warming center lease ends; replacement site not signed.'],
          ['Oct 27', 'River corridor cleanup moves outreach teams for two weeks.'],
          ['Nov 6', 'Nonprofit partner says overnight staffing is short by six positions.'],
          ['Dec 1', 'Winter overflow contracts must begin or beds will not be staffed.'],
        ],
      },
      {
        id: 'ev-605',
        type: 'table',
        render: 'artifact-table',
        title: 'Bed inventory reconciliation',
        sourceLabel: 'HMIS capacity export plus provider calls',
        reliability: 'high',
        unlock: 'initial',
        tags: ['capacity', 'inventory', 'censored demand'],
        body:
          'The official inventory overstates flexible overnight capacity. Some listed beds are offline, family-specific, or unavailable without additional staffing.',
        columns: ['Category', 'Listed beds', 'Usable for single-adult overflow', 'Note'],
        rows: [
          ['Core shelter beds', '612', '589', '23 offline for repairs or staffing'],
          ['Family units', '74', '12', 'not substitutable most nights'],
          ['Medical respite', '28', '0', 'referral-only'],
          ['Church overflow mats', '65', '41', 'requires volunteer staffing'],
          ['Motel vouchers', '30', 'variable', 'grant approval pending'],
        ],
      },
      {
        id: 'ev-606',
        type: 'table',
        render: 'artifact-table',
        title: 'Housing court leading indicators',
        sourceLabel: 'County civil court weekly extract',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['leading indicators', 'eviction filings', 'demand'],
        body:
          'Court filings and lockout notices do not translate one-to-one into shelter demand, but the recent pattern is outside the range used by the model.',
        columns: ['Measure', 'Last winter avg', 'Current 4-week avg', 'Direction'],
        rows: [
          ['Eviction filings', '186/week', '263/week', '+41%'],
          ['Lockout notices', '31/week', '47/week', '+52%'],
          ['Emergency rental referrals', '420/week', '286/week', '-32%'],
          ['First-time shelter hotline calls', '74/week', '103/week', '+39%'],
        ],
      },
      {
        id: 'ev-607',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Outreach notebook scan',
        sourceLabel: 'Street outreach team notes',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['qualitative', 'outreach', 'unmet need'],
        body:
          'Outreach teams report more first-time requests for shelter navigation, especially near transit stops and library branches.',
        memo: [
          'Three teams report more people asking where intake opens after 7 PM.',
          'Several contacts say they were couch-surfing until a recent lockout.',
          'The old viaduct camp count is lower, but contacts are dispersed across smaller sites.',
          'Team note: "The count looks quieter in the old place; the routes do not feel quieter."',
        ],
      },
      {
        id: 'ev-608',
        type: 'table',
        render: 'artifact-table',
        title: 'Cold-night residuals',
        sourceLabel: 'Forecast diagnostics appendix',
        reliability: 'high',
        unlock: 'initial',
        tags: ['residuals', 'tail risk', 'weather'],
        body:
          'The model underpredicted peak demand on nights when cold weather interacted with an operational disruption. These cases are rare but central to overflow planning.',
        columns: ['Night type', 'Count in backtest', 'Median miss', 'Largest miss'],
        rows: [
          ['Ordinary winter night', '518', '+3 beds', '+11 beds'],
          ['Below 25F', '47', '+12 beds', '+26 beds'],
          ['Below 25F plus site disruption', '11', '+24 beds', '+38 beds'],
          ['Transit interruption', '8', '+17 beds', '+31 beds'],
        ],
      },
      {
        id: 'ev-609',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Donor bridge email',
        sourceLabel: 'Nonprofit partner fundraising thread',
        reliability: 'low',
        unlock: 'initial',
        tags: ['funding', 'uncertain support', 'red herring'],
        body:
          'A donor may cover limited motel vouchers if the city names a partner by December. The offer could help, but it is not committed capacity.',
        memo: [
          'Potential bridge: up to $90k for motel vouchers.',
          'Requires named fiscal sponsor and weekly reporting.',
          'No signed award letter yet.',
          'Partner finance note: "Do not count this as beds in the council packet."',
        ],
      },
      {
        id: 'ev-610',
        type: 'audio',
        title: 'Outreach van radio clip',
        sourceLabel: 'Field dispatch recording, Wednesday 6:42 AM',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['outreach', 'observed demand', 'field report'],
        speaker: 'Outreach Van Lead',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-006-outreach-van-radio.wav',
        },
        transcript:
          'We are not seeing one big camp anymore. It is smaller groups by the bus depot and library, and a few families in cars. The old count route misses some of them unless we add the early loop.',
        body:
          'A field dispatch clip describes dispersed unsheltered locations that are not fully covered by the old morning count route.',
      },
      {
        id: 'ev-611',
        type: 'chart',
        render: 'scenario-range-panel',
        title: 'Scenario worksheet',
        sourceLabel: 'Analyst scratch sheet, revised range',
        reliability: 'high',
        unlock: 'initial',
        tags: ['scenario', 'range estimate', 'planning'],
        body:
          'A revised scenario worksheet separates the model point forecast from an operating range that accounts for capacity constraints, leading indicators, and cold-night residuals.',
        panelTitle: 'Overflow planning range',
        panelBadge: 'Revised scenario',
        rangeLabel: 'Low base and high planning markers',
        markers: [
          { label: 'model point', value: '82', left: '20%', kind: 'low' },
          { label: 'base plan', value: '104', left: '55%', kind: 'base' },
          { label: 'stress trigger', value: '118', left: '78%', kind: 'high' },
        ],
        scenarios: [
          { label: 'Low', value: '88-96 beds', note: 'mild weather, no site disruption', kind: 'low' },
          { label: 'Base', value: '96-108 beds', note: 'current indicators persist', kind: 'base' },
          { label: 'Stress', value: '108-122 beds', note: 'cold snap plus staffing gap', kind: 'high' },
        ],
      },
      {
        id: 'ev-612',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Long-range weather outlook',
        sourceLabel: 'Regional climate center note',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['weather', 'context', 'red herring'],
        body:
          'The seasonal outlook leans warmer than average, but the note does not rule out short cold snaps. It is weak evidence for reducing overflow capacity.',
        memo: [
          'Seasonal mean temperature: 54% chance above normal.',
          'Cold-snap probability: near historical range.',
          'No reliable forecast for individual nights beyond two weeks.',
          'Operations note: staffing decisions need four-week lead time.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'observed-use-understates-need',
        label:
          'The model fits ordinary observed shelter use, but the planning target needs a wider range for unmet demand and disruption',
        scoreClass: 'correct',
      },
      {
        id: 'point-forecast-ready',
        label:
          'The five-year backtest is strong enough to use the 82-bed point forecast as the operating plan',
        scoreClass: 'incorrect',
      },
      {
        id: 'weather-only',
        label:
          'The main uncertainty is winter temperature, so the warmer seasonal outlook should lower the capacity ask',
        scoreClass: 'incorrect',
      },
      {
        id: 'inventory-only',
        label:
          'The issue is mostly a bed-inventory bookkeeping problem; demand itself is probably stable',
        scoreClass: 'partial',
      },
      {
        id: 'demand-spike-certain',
        label:
          'Leading indicators justify planning above the model interval, while still using the model to anchor the lower end of the range',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'adopt-point',
        label:
          'Budget to the model point estimate: 82 overflow beds, with no additional staffing trigger',
        scoreClass: 'incorrect',
      },
      {
        id: 'scenario-range',
        label:
          'Plan a 96-108 bed base range, pre-authorize a stress trigger, and update weekly from leading signals',
        scoreClass: 'correct',
      },
      {
        id: 'delay-plan',
        label:
          'Do not set a winter capacity number until January demand is observed',
        scoreClass: 'partial',
      },
      {
        id: 'open-max',
        label:
          'Open 150 overflow beds immediately because the historical model cannot be trusted',
        scoreClass: 'partial',
      },
      {
        id: 'weather-reduction',
        label:
          'Reduce the request below 82 beds because the seasonal outlook is warmer than average',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: ['ev-603', 'ev-605', 'ev-606', 'ev-608', 'ev-610', 'ev-611'],
    replay: {
      expertDecision:
        'The forecast is useful, but the 82-bed point estimate is too narrow for an operating decision. The model was strongest on ordinary observed shelter-use nights, while this decision is about capacity under unmet demand, staffing limits, policy changes, leading indicators, and cold-night tail risk. The defensible recommendation is a base planning range around 96-108 beds with a pre-authorized stress trigger near 118 beds and weekly updates from operational signals.',
      whatMattered: [
        'The backtest shows good ordinary-night fit but large peak misses during disruption weeks.',
        'The bed inventory reconciliation shows listed capacity is not the same as usable overflow capacity.',
        'Court, hotline, and rental-assistance indicators point to pressure outside the model training regime.',
        'Cold-night residuals show the model underpredicts the nights that matter most for overflow planning.',
        'The outreach van clip flags dispersed demand that can be missed by older count routes.',
        'The scenario worksheet converts the model into a defensible planning range instead of a single number.',
      ],
      misleadingEvidence: [
        'The dashboard point estimate looks precise because ordinary nights dominate the backtest.',
        'A warmer seasonal outlook is tempting but does not remove short cold-snap planning risk.',
        'The donor bridge email sounds like capacity but is not committed operating supply.',
        'The old viaduct count falling could be mistaken for lower need when routes have shifted.',
      ],
      sequence: [
        'The model learns from five years of observed shelter use, not full unmet need.',
        'Ordinary-night backtests look accurate, which makes the point estimate feel budget-ready.',
        'Several conditions change before winter: assistance funds close, a warming center lease ends, staffing gaps persist, and outreach routes shift.',
        'Leading indicators rise outside the model range used for recent winters.',
        'Official bed inventory overstates usable flexible capacity.',
        'Cold-night diagnostics show rare peak misses larger than the displayed interval.',
        'A scenario range preserves the model signal while planning for the consequences of undercapacity.',
      ],
      trap:
        'The case tests whether you can distinguish a forecast of observed use from a public-service planning range for actual need.',
      transfer:
        'For service-demand forecasts, ask what target was measured, whether capacity censored demand, which regime the backtest covered, and how costly the tails are.',
    },
  },
  'case-007': {
    id: 'case-007',
    slug: 'fairness-review',
    title: 'The Benefits Queue Score',
    set: 'models-real-world',
    sequence: 7,
    status: 'active',
    difficulty: 'advanced',
    domain: 'Government benefits analytics',
    estimatedMinutes: 12,
    caseType: 'model-review',
    judgmentType: 'multi',
    summary:
      'A state benefits agency wants to use a verification score to cut backlog, but the burden may land unevenly on applicants with messier administrative records.',
    skills: ['fairness reasoning', 'proxy detection', 'tradeoff communication'],
    concepts: ['proxy variables', 'disparate impact', 'subgroup performance', 'label bias'],
    mediaTypes: ['model-output', 'policy', 'table', 'memo', 'audio'],
    briefing:
      'A state benefits agency is preparing to route new unemployment claims through a verification score. Claims above the action line would go to manual review before first payment. The pilot dashboard says the score could reduce improper payments and shorten the general queue, but the civil rights office has asked for a fairness review before statewide launch.',
    role:
      'You are the government data science reviewer. Your job is to decide whether this score is ready for a live routing policy and what safeguards the evidence supports.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Launch memo voicemail',
      speaker: 'Deputy Commissioner',
      duration: '0:14',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-007-launch-memo-voicemail.wav',
      },
      transcript:
        'The backlog is finally moving. The score does not use race, ethnicity, or language, and the pilot caught more bad claims. I need to know whether fairness has a real blocker or just a communications issue.',
    },
    decisionPrompt:
      'What recommendation should go into the benefits agency fairness review?',
    evidence: [
      {
        id: 'ev-701',
        type: 'chart',
        render: 'model-scorecard',
        title: 'Pilot launch dashboard',
        sourceLabel: 'Program integrity dashboard, Monday 8:05 AM',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['model', 'pilot', 'dashboard'],
        body:
          'The pilot dashboard shows solid aggregate performance and frames the score as a way to move clean claims faster while routing risky applications to review.',
        panelTitle: 'Verification triage model',
        panelBadge: 'Pilot readout',
        metrics: [
          { label: 'AUC', value: '0.79', note: 'prior-quarter holdout; n=42,600; 95% CI 0.77-0.81' },
          { label: 'Top band issue rate', value: '38%', note: '2,640/6,940 reviewed; all-claim base issue rate 11%' },
          { label: 'Queue reduction', value: '8 days', note: 'pilot county average; county range 3-12 days; not subgroup-adjusted' },
        ],
        bands: [
          { label: '0-20', value: '3%', height: 12 },
          { label: '20-40', value: '8%', height: 24 },
          { label: '40-60', value: '15%', height: 40 },
          { label: '60-80', value: '24%', height: 64 },
          { label: '80-100', value: '38%', height: 92 },
        ],
      },
      {
        id: 'ev-702',
        type: 'audio',
        title: 'Launch memo voicemail',
        sourceLabel: 'Audio note, Monday 8:23 AM',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'launch', 'protected attributes'],
        speaker: 'Deputy Commissioner',
        duration: '0:14',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-007-launch-memo-voicemail.wav',
        },
        transcript:
          'The backlog is finally moving. The score does not use race, ethnicity, or language, and the pilot caught more bad claims. I need to know whether fairness has a real blocker or just a communications issue.',
        body:
          'The launch sponsor emphasizes that protected attributes were excluded and asks whether the fairness concern is substantive or mostly about messaging.',
      },
      {
        id: 'ev-703',
        type: 'chart',
        render: 'fairness-audit-panel',
        title: 'Burden audit printout',
        sourceLabel: 'Civil rights office review table',
        reliability: 'high',
        unlock: 'initial',
        tags: ['fairness', 'burden', 'subgroups'],
        body:
          'The audit compares who is routed to manual review and how often those reviews clear without a benefits issue. Several groups face both higher review rates and higher clearance rates.',
        panelTitle: 'Manual review burden',
        panelBadge: 'Subgroup audit',
        groups: [
          {
            label: 'All claims',
            note: 'n=38,400; base issue rate 11%',
            reviewRate: '18% (CI 17-19)',
            clearedRate: '63% (CI 61-65)',
            reviewWidth: '42%',
            clearedWidth: '68%',
            delay: 'median delay: 6 days (80% interval 4-9)',
          },
          {
            label: 'Spanish language preference',
            note: 'n=3,120; base issue rate 9%; language not used directly',
            reviewRate: '34% (CI 32-36)',
            clearedRate: '72% (CI 69-75)',
            reviewWidth: '76%',
            clearedWidth: '78%',
            delay: 'median delay: 13 days (80% interval 10-17)',
          },
          {
            label: 'Shared or shelter address',
            note: 'n=1,460; base issue rate 8%; address-stability feature active',
            reviewRate: '41% (CI 38-44)',
            clearedRate: '78% (CI 75-81)',
            reviewWidth: '90%',
            clearedWidth: '84%',
            delay: 'median delay: 16 days (80% interval 12-22)',
          },
          {
            label: 'Rural route or PO box',
            note: 'n=2,080; base issue rate 10%; mailing match quality lower',
            reviewRate: '29% (CI 27-31)',
            clearedRate: '70% (CI 67-73)',
            reviewWidth: '66%',
            clearedWidth: '76%',
            delay: 'median delay: 11 days (80% interval 8-15)',
          },
        ],
      },
      {
        id: 'ev-704',
        type: 'table',
        render: 'artifact-table',
        title: 'Feature explanation export',
        sourceLabel: 'Model explanation notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['proxy', 'features', 'model behavior'],
        body:
          'The model omits protected attributes, but several influential features capture administrative stability and document friction that are unevenly distributed.',
        columns: ['Feature', 'Contribution', 'Possible proxy path', 'Reviewer note'],
        rows: [
          ['Address tenure under 90 days', 'high', 'housing instability', 'strong burden signal'],
          ['Employer wage match missing', 'high', 'new/gig/seasonal work', 'data lag varies by sector'],
          ['Device or IP mismatch', 'medium', 'shared devices, libraries', 'weak alone'],
          ['Document upload after phone call', 'medium', 'language and access friction', 'workflow artifact'],
          ['Prior overpayment record', 'high', 'program integrity history', 'policy-relevant but needs appeal path'],
        ],
      },
      {
        id: 'ev-705',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Rights and access memo',
        sourceLabel: 'Agency counsel draft',
        reliability: 'high',
        unlock: 'initial',
        tags: ['policy', 'rights', 'notice'],
        body:
          'Counsel does not ban predictive triage, but warns that delayed first payment is a material burden that requires notice, reviewability, language access, and disparate-impact monitoring.',
        memo: [
          'Applicants must receive a clear reason for manual verification and a path to submit alternative documents.',
          'Language assistance cannot depend on the claimant first clearing identity review.',
          'The agency must monitor burden, not only fraud capture or queue speed.',
          'A facially neutral rule can still create compliance risk if proxies shift delays onto protected groups.',
        ],
      },
      {
        id: 'ev-706',
        type: 'table',
        render: 'artifact-table',
        title: 'Training label lineage',
        sourceLabel: 'Data warehouse audit',
        reliability: 'high',
        unlock: 'initial',
        tags: ['labels', 'historical enforcement', 'sampling'],
        body:
          'The outcome label comes from prior manual review results. Those reviews were not randomly assigned and were influenced by hotline tips, document availability, and local office practice.',
        columns: ['Historical route', 'Share of training labels', 'Issue found', 'Concern'],
        rows: [
          ['Hotline referral', '31%', '44%', 'not representative of all claims'],
          ['Local office staff flag', '24%', '27%', 'practice varies by county'],
          ['Automated wage mismatch', '28%', '22%', 'employer reporting lag'],
          ['Random quality sample', '5%', '9%', 'too small for calibration'],
          ['Applicant self-correction', '12%', '6%', 'often benign document fix'],
        ],
      },
      {
        id: 'ev-707',
        type: 'chart',
        render: 'calibration-panel',
        title: 'Subgroup calibration slice',
        sourceLabel: 'Fairness notebook, calibration tab',
        reliability: 'high',
        unlock: 'initial',
        tags: ['calibration', 'subgroup performance', 'fairness'],
        body:
          'At the same action score, observed issue rates differ across applicant groups. Some groups are over-scored relative to their eventual issue rate.',
        groups: [
          {
            label: 'All claims above action line',
            predicted: '31%',
            observed: '29%',
            predictedWidth: '62%',
            observedWidth: '58%',
            note: 'n=6,900 above line; observed 80% CI 28-31',
          },
          {
            label: 'Spanish language preference',
            predicted: '34%',
            observed: '18%',
            predictedWidth: '68%',
            observedWidth: '36%',
            note: 'n=1,060 above line; observed 80% CI 15-21',
          },
          {
            label: 'Shared or shelter address',
            predicted: '39%',
            observed: '17%',
            predictedWidth: '78%',
            observedWidth: '34%',
            note: 'n=600 above line; observed 80% CI 13-22; sparse slice',
          },
          {
            label: 'Prior overpayment record',
            predicted: '42%',
            observed: '40%',
            predictedWidth: '84%',
            observedWidth: '80%',
            note: 'n=1,380 above line; observed 80% CI 37-43',
          },
        ],
      },
      {
        id: 'ev-708',
        type: 'audio',
        title: 'Benefits navigator call',
        sourceLabel: 'Community partner call, Tuesday 2:14 PM',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['field report', 'access burden', 'qualitative'],
        speaker: 'Benefits Navigator',
        duration: '0:12',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-007-benefits-navigator-call.wav',
        },
        transcript:
          'The people getting stuck are not all suspicious. Some are using a cousin\'s address, a library computer, or a translated form. They clear eventually, but the first check is late.',
        body:
          'A community benefits navigator describes cases that appear risky to the model because of access patterns rather than a substantive eligibility issue.',
      },
      {
        id: 'ev-709',
        type: 'table',
        render: 'capacity-panel',
        title: 'Manual review capacity ledger',
        sourceLabel: 'Operations staffing sheet',
        reliability: 'high',
        unlock: 'initial',
        tags: ['capacity', 'delay', 'operations'],
        body:
          'The proposed threshold creates more manual reviews than the trained unit can handle in several weeks. Delay is therefore part of the model policy, not a side effect.',
        rows: [
          ['Weekly review capacity', '4,800', 'trained adjudicators'],
          ['Claims above action line', '6,900', 'pilot threshold'],
          ['Language-line supported slots', '740', 'weekly appointments'],
          ['Median first-payment delay', '6 days', 'all reviewed claims'],
          ['Shared-address delay', '16 days', 'subgroup median'],
        ],
      },
      {
        id: 'ev-710',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Cleared-case sample',
        sourceLabel: 'Manual review QA notes',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['false positives', 'appeals', 'burden'],
        body:
          'QA reviewers sampled cleared manual reviews and found many were administrative mismatches that could have been resolved with a narrower document request.',
        memo: [
          '14 of 25 cleared shared-address cases used a shelter, family member, or transitional housing address.',
          '9 of 18 language-preference cases uploaded a valid document after a translated notice.',
          'Several wage mismatches resolved after employer batch files arrived.',
          'QA note: "The score often finds friction before it finds fraud."',
        ],
      },
      {
        id: 'ev-711',
        type: 'table',
        render: 'artifact-table',
        title: 'Threshold stress test',
        sourceLabel: 'Policy simulation sheet',
        reliability: 'high',
        unlock: 'initial',
        tags: ['threshold', 'tradeoff', 'guardrails'],
        body:
          'A threshold simulation shows ranges, not certainties. Moving the action line five score points changes review volume by roughly 1,300 claims/week, and subgroup delay gaps persist unless the policy changes the review path.',
        columns: ['Policy', 'Reviews/week (80% interval)', 'Issues caught (80% interval)', 'Shared-address delay gap', 'Spanish-pref delay gap'],
        rows: [
          ['Current threshold', '6,400-7,400', '1,830-2,210', '+10 days', '+7 days'],
          ['Higher threshold', '4,300-5,100', '1,520-1,900', '+5 days', '+4 days'],
          ['Two-step document request', '4,850-5,700', '1,650-2,020', '+3 days', '+2 days'],
          ['Shadow only', '0 routed', 'unknown', '0 days', '0 days'],
        ],
      },
      {
        id: 'ev-712',
        type: 'definition',
        render: 'retraining-diff',
        title: 'Feature revision note',
        sourceLabel: 'Data science remediation draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['mitigation', 'features', 'monitoring'],
        body:
          'A remediation draft removes the address-tenure feature, changes wage-match handling, and adds a random audit sample to collect less biased labels. The revised version is not yet validated live.',
        before: {
          title: 'Pilot score',
          items: [
            'Address tenure and document upload path included',
            'Prior manual review outcomes reused as labels',
            'Single statewide threshold',
          ],
        },
        after: {
          title: 'Remediation draft',
          items: [
            'Address tenure removed from action score',
            'Employer-match lag handled as pending data',
            'Random quality sample added for calibration',
            'Subgroup burden dashboard required weekly',
          ],
        },
      },
    ],
    hypotheses: [
      {
        id: 'neutral-features-not-enough',
        label:
          'Removing protected attributes is not enough; proxy features and biased labels create uneven review burden',
        scoreClass: 'correct',
      },
      {
        id: 'aggregate-performance-sufficient',
        label:
          'The aggregate pilot is strong enough for a limited statewide launch if protected-class fields stay excluded and subgroup monitoring is public',
        scoreClass: 'incorrect',
      },
      {
        id: 'model-always-illegal',
        label:
          'Predictive triage may be legally usable only after the agency proves applicants can contest holds before first payment is delayed',
        scoreClass: 'partial',
      },
      {
        id: 'communications-only',
        label:
          'The main issue is explaining the model better to applicants and advocates',
        scoreClass: 'incorrect',
      },
      {
        id: 'capacity-only',
        label:
          'The model is acceptable if the agency simply hires enough manual reviewers',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'launch-current',
        label:
          'Launch the current statewide routing policy because the model excludes protected attributes and improves aggregate queue speed',
        scoreClass: 'incorrect',
      },
      {
        id: 'guarded-pilot',
        label:
          'Defer statewide launch and test a remediated score under binding burden triggers and independent audit sampling',
        scoreClass: 'correct',
      },
      {
        id: 'shadow-only',
        label:
          'Keep the score in shadow mode until subgroup gaps have confidence intervals, documented causes, and a mitigation plan',
        scoreClass: 'partial',
      },
      {
        id: 'reject-all',
        label:
          'Stop this model and use rules-based triage until the agency has unbiased review labels and notice workflows',
        scoreClass: 'partial',
      },
      {
        id: 'launch-with-appeals',
        label:
          'Launch only the higher threshold with translated notices and appeals, but without random-audit labels or burden caps',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-703', 'ev-704', 'ev-705', 'ev-706', 'ev-707', 'ev-709', 'ev-710', 'ev-711'],
    replay: {
      expertDecision:
        'The score is not ready for statewide routing as currently designed. Aggregate performance and omission of protected attributes do not answer the fairness question. Proxy features, nonrandom enforcement labels, subgroup miscalibration, and manual review capacity combine to shift delays onto applicants with less stable administrative records. The defensible recommendation is a guarded pilot with feature remediation, random audit labels, subgroup burden limits, clear notices, language-access review paths, and weekly monitoring before any statewide launch.',
      whatMattered: [
        'The burden audit shows higher review rates and higher clearance rates for several applicant groups.',
        'The feature explanation export identifies administrative-stability proxies that can shift burden without explicit protected attributes.',
        'The rights memo makes delay, notice, reviewability, and language access part of the decision surface.',
        'The training label lineage shows historical reviews were not randomly assigned.',
        'The calibration slice shows aggregate calibration hides subgroup over-scoring.',
        'The capacity ledger and threshold stress test show delay gaps are produced by the routing policy.',
      ],
      misleadingEvidence: [
        'The pilot dashboard makes the model look ready by summarizing aggregate performance.',
        'The launch voicemail frames fairness as a protected-attribute checklist rather than a burden and access question.',
        'Improper-payment capture is real but incomplete if cleared applicants wait longer for first payment.',
        'A later appeal form does not solve preventable front-end delay or language-access barriers.',
      ],
      sequence: [
        'The agency trains a score on prior manual review outcomes.',
        'Those historical reviews were shaped by referrals, local office practice, and document friction.',
        'The pilot action line routes high-scored claims to manual review before first payment.',
        'Several neutral features proxy for unstable housing, shared access, language friction, and employer reporting lag.',
        'Subgroup audits show more manual reviews, more cleared cases, and longer delays for affected applicants.',
        'Manual review capacity turns the score threshold into a waiting-time policy.',
        'A valid next step must test remediation and monitor burden, not only aggregate precision.',
      ],
      trap:
        'The case tests whether you recognize fairness as a deployed burden question, not just a protected-column question.',
      transfer:
        'For public-sector models, ask whose burden changes, which historical labels shaped the target, what due-process rights apply, and how the deployment policy will be monitored.',
    },
  },
  'case-008': {
    id: 'case-008',
    slug: 'llm-support-bot-evaluation',
    title: 'The Claimant Chatbot',
    set: 'models-real-world',
    sequence: 8,
    status: 'active',
    difficulty: 'standard',
    domain: 'Public sector AI evaluation',
    estimatedMinutes: 12,
    caseType: 'error-taxonomy',
    judgmentType: 'multi',
    summary:
      'A benefits agency chatbot handles routine questions well, but evaluation logs show confident wrong answers on high-stakes claim situations.',
    skills: ['AI evaluation', 'severity scoring', 'launch readiness'],
    concepts: ['evaluation sets', 'hallucination risk', 'escalation policy', 'retrieval coverage'],
    mediaTypes: ['transcript', 'rubric', 'memo', 'audio', 'table'],
    briefing:
      'After the verification-score pilot, the state benefits agency wants to launch an LLM chatbot to reduce call-center volume. The demo is smooth: the bot answers common unemployment questions, summarizes document requests, and points claimants to forms. The launch team wants to go live on the homepage next month.',
    role:
      'You are reviewing the evaluation packet before the chatbot is allowed to answer live claimant questions.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Demo week voicemail',
      speaker: 'Digital Services Director',
      duration: '0:14',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-008-demo-week-voicemail.wav',
      },
      transcript:
        'The demo landed really well. The bot handled the top questions and could take pressure off the phones before the next filing wave. I need a launch recommendation that is practical, not theoretical.',
    },
    decisionPrompt:
      'What launch recommendation should you make for the claimant chatbot?',
    evidence: [
      {
        id: 'ev-801',
        type: 'chart',
        render: 'error-taxonomy-panel',
        title: 'Demo evaluation card',
        sourceLabel: 'AI evaluation dashboard',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['evaluation', 'severity', 'demo'],
        body:
          'The headline evaluation card reports high answer acceptance, but the severe-error slice is small enough to disappear in the overall score.',
        panelTitle: 'Claimant bot eval',
        panelBadge: 'Headline pass',
        errors: [
          { label: 'Accepted answers', value: '91%', note: 'all prompts', kind: 'minor' },
          { label: 'Material errors', value: '7%', note: 'wrong or incomplete guidance', kind: 'material' },
          { label: 'Critical errors', value: '2%', note: 'could delay or deny benefits', kind: 'critical' },
        ],
      },
      {
        id: 'ev-802',
        type: 'audio',
        title: 'Demo week voicemail',
        sourceLabel: 'Audio note, Thursday 6:34 PM',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'launch', 'demo'],
        speaker: 'Digital Services Director',
        duration: '0:14',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-008-demo-week-voicemail.wav',
        },
        transcript:
          'The demo landed really well. The bot handled the top questions and could take pressure off the phones before the next filing wave. I need a launch recommendation that is practical, not theoretical.',
        body:
          'The launch sponsor frames the chatbot as immediate call-center relief and asks for a practical recommendation before the next filing wave.',
      },
      {
        id: 'ev-803',
        type: 'table',
        render: 'artifact-table',
        title: 'Golden-answer mismatch log',
        sourceLabel: 'Eval set review, high-risk prompts',
        reliability: 'high',
        unlock: 'initial',
        tags: ['golden set', 'severity', 'wrong answer'],
        body:
          'The bot is strongest on routine status questions and weakest where policy exceptions, deadlines, or appeal rights matter.',
        columns: ['Prompt area', 'Bot response issue', 'Correct handling', 'Severity'],
        rows: [
          ['Identity hold with no photo ID', 'says passport or license required', 'alternate documents allowed', 'critical'],
          ['Appeal deadline after mail delay', 'states deadline already passed', 'good-cause extension possible', 'critical'],
          ['Shared address verification', 'treats address as fraud signal', 'manual review with alternate proof', 'material'],
          ['Weekly certification missed', 'gives generic reopen link', 'specific back-certification workflow', 'material'],
          ['Payment status', 'accurate queue estimate', 'no issue', 'minor'],
        ],
      },
      {
        id: 'ev-804',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Severity rubric draft',
        sourceLabel: 'AI governance working doc',
        reliability: 'high',
        unlock: 'initial',
        tags: ['rubric', 'severity', 'governance'],
        body:
          'The governance draft separates harmless wording errors from errors that could change claimant behavior, delay payment, or waive rights.',
        memo: [
          'Critical: wrong appeal deadline, wrong eligibility barrier, or instruction that could cause missed payment.',
          'Material: incomplete document path, wrong office referral, or missing language-access instruction.',
          'Minor: tone, formatting, or generic answer with no claimant-harm pathway.',
          'Launch criterion: critical-error rate must be near zero on high-risk prompt set.',
        ],
      },
      {
        id: 'ev-805',
        type: 'table',
        render: 'artifact-table',
        title: 'Retrieval coverage report',
        sourceLabel: 'RAG index audit',
        reliability: 'high',
        unlock: 'initial',
        tags: ['retrieval', 'policy coverage', 'stale docs'],
        body:
          'Several severe errors map to policy pages that were missing, stale, or chunked without exception language.',
        columns: ['Policy area', 'Index status', 'Exception text', 'Risk'],
        rows: [
          ['Alternative identity documents', 'missing FAQ page', 'not retrieved', 'critical'],
          ['Appeal good-cause extensions', 'old handbook version', 'partially retrieved', 'critical'],
          ['Language assistance', 'current', 'buried after page break', 'material'],
          ['Payment status messages', 'current', 'retrieved', 'low'],
          ['Fraud hold notices', 'draft policy only', 'not approved', 'high'],
        ],
      },
      {
        id: 'ev-806',
        type: 'table',
        render: 'artifact-table',
        title: 'Prompt mix audit',
        sourceLabel: 'Evaluation sample manifest',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['eval set', 'coverage', 'sampling'],
        body:
          'The launch score is dominated by routine prompts. High-stakes cases are present but underweighted relative to their consequence.',
        columns: ['Prompt class', 'Share of eval set', 'Criticality', 'Pass rate'],
        rows: [
          ['Payment status', '34%', 'low', '96%'],
          ['Login and password', '21%', 'low', '98%'],
          ['Document upload', '18%', 'medium', '88%'],
          ['Appeals and deadlines', '7%', 'high', '71%'],
          ['Identity/fraud holds', '6%', 'high', '69%'],
          ['Language access', '4%', 'high', '76%'],
        ],
      },
      {
        id: 'ev-807',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Escalation policy draft',
        sourceLabel: 'Contact-center operations memo',
        reliability: 'high',
        unlock: 'initial',
        tags: ['escalation', 'policy', 'human review'],
        body:
          'The current launch draft lets the bot answer most topics directly. The escalation list does not yet include appeal deadlines, identity holds, or language-access failures.',
        memo: [
          'Escalate: threats of self-harm, account compromise, suspected fraud ring reports.',
          'Bot may answer: document requirements, appeal timing, eligibility clarification, payment holds.',
          'No hard block on giving deadline or documentation advice.',
          'Operations note: live handoff queue can absorb about 900 extra chats per week.',
        ],
      },
      {
        id: 'ev-808',
        type: 'audio',
        title: 'Navigator review clip',
        sourceLabel: 'Community partner review call, Friday 11:02 AM',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['field report', 'claimant harm', 'language access'],
        speaker: 'Legal Aid Navigator',
        duration: '0:14',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-008-navigator-review.wav',
        },
        transcript:
          'The scary part is how confident it sounds on deadlines. A claimant may not know to challenge it. If the bot is unsure, it has to get them to a person, not invent a clean rule.',
        body:
          'A legal aid navigator focuses on claimant behavior after a confident wrong answer, especially when the question involves deadlines.',
      },
      {
        id: 'ev-809',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Red-team transcript excerpt',
        sourceLabel: 'Internal adversarial test notes',
        reliability: 'high',
        unlock: 'initial',
        tags: ['red team', 'guardrails', 'transcript'],
        body:
          'Red-team prompts show the bot sometimes gives policy-like answers even when the source documents do not contain a clear answer.',
        memo: [
          'Prompt: "My notice says ten days, but I got it after twelve. Am I done?"',
          'Bot: "Yes, the appeal period has passed. You can reapply when eligible."',
          'Golden answer: explain appeal rights, good-cause extension, and live handoff.',
          'Reviewer note: confident tone increases risk.',
        ],
      },
      {
        id: 'ev-810',
        type: 'table',
        render: 'capacity-panel',
        title: 'Live handoff capacity',
        sourceLabel: 'Contact-center staffing plan',
        reliability: 'high',
        unlock: 'initial',
        tags: ['capacity', 'handoff', 'operations'],
        body:
          'A safer launch would escalate more topics to staff, but the handoff queue has a hard staffing limit during filing waves.',
        rows: [
          ['Weekly claimant chats', '38,000', 'projected launch volume'],
          ['Current staff handoffs', '3,200', 'routine chat support'],
          ['Available extra handoffs', '900', 'before wait grows'],
          ['High-risk prompt estimate', '2,600', 'appeals, holds, language access'],
          ['After-hours coverage', 'none', 'bot-only in launch draft'],
        ],
      },
      {
        id: 'ev-811',
        type: 'table',
        render: 'artifact-table',
        title: 'Language sample spot check',
        sourceLabel: 'Spanish-language eval review',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['language access', 'translation', 'subgroup'],
        body:
          'Spanish-language prompts have lower pass rates, partly because translated notices use terms not represented in the English retrieval index.',
        columns: ['Topic', 'English pass', 'Spanish pass', 'Failure mode'],
        rows: [
          ['Appeal deadline', '74%', '58%', 'deadline phrasing mistranslated'],
          ['Identity documents', '72%', '61%', 'alternate proof omitted'],
          ['Payment status', '96%', '92%', 'mostly correct'],
          ['Weekly certification', '88%', '79%', 'workflow link missing'],
        ],
      },
      {
        id: 'ev-812',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Remediation worksheet',
        sourceLabel: 'Evaluation remediation plan',
        reliability: 'high',
        unlock: 'initial',
        tags: ['mitigation', 'launch plan', 'monitoring'],
        body:
          'The remediation worksheet separates low-risk intents from rights-sensitive topics, but it leaves launch scope, handoff rules, and monitoring thresholds for the review team to decide.',
        memo: [
          'Low-risk candidates: payment status, password reset, form location.',
          'High-stakes topics: appeals, identity holds, fraud holds, eligibility exceptions.',
          'Open issue: whether citations are enough for rights-sensitive answers.',
          'Open issue: how many severe errors or handoff failures should trigger rollback.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'severity-not-average',
        label:
          'The average demo score hides high-severity failures; launch readiness depends on critical-error and escalation performance',
        scoreClass: 'correct',
      },
      {
        id: 'demo-ready',
        label:
          'The chatbot is ready for full homepage launch because the overall answer acceptance rate is above 90 percent',
        scoreClass: 'incorrect',
      },
      {
        id: 'retrieval-only',
        label:
          'Fixing the retrieval index is enough to launch the current answer policy',
        scoreClass: 'partial',
      },
      {
        id: 'human-only',
        label:
          'Restrict the bot to internal navigator assist until high-stakes handoff behavior is validated under live monitoring',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'full-launch',
        label:
          'Launch the chatbot broadly on the homepage with the current escalation draft',
        scoreClass: 'incorrect',
      },
      {
        id: 'limited-launch',
        label:
          'Limit launch to low-risk intents; block or hand off high-stakes policy situations and monitor severe errors',
        scoreClass: 'correct',
      },
      {
        id: 'low-risk-no-monitoring',
        label:
          'Limit launch to low-risk intents, but skip live severe-error monitoring because the scope is narrow',
        scoreClass: 'partial',
      },
      {
        id: 'cited-high-stakes',
        label:
          'Allow high-stakes answers when the bot displays citations and offers a handoff link',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-803', 'ev-804', 'ev-805', 'ev-806', 'ev-807', 'ev-808', 'ev-809', 'ev-812'],
    replay: {
      expertDecision:
        'The chatbot is not ready for broad claimant-facing launch, even though it can help with low-risk questions. The evidence shows the overall pass rate is dominated by routine prompts, while critical failures cluster around appeals, identity holds, language access, and policy exceptions. The defensible recommendation is a limited launch: low-risk intents only, high-stakes topics blocked or escalated, retrieval coverage repaired, and live severe-error monitoring.',
      whatMattered: [
        'The golden-answer log shows critical wrong answers on appeal rights and identity documents.',
        'The severity rubric makes claimant harm more important than average answer acceptance.',
        'The retrieval coverage report ties severe errors to missing or stale policy sources.',
        'The prompt mix audit shows high-risk cases are underweighted in the headline score.',
        'The escalation draft currently allows the bot to answer high-stakes topics directly.',
        'The navigator clip and red-team transcript show why confident wrong guidance can change claimant behavior.',
      ],
      misleadingEvidence: [
        'The demo score looks strong because routine prompts dominate the sample.',
        'A disclaimer does not undo a confident wrong answer about deadlines or documentation.',
        'Call-center pressure is real but does not justify shifting rights-sensitive guidance to an unguarded bot.',
        'Fixing retrieval coverage helps but does not replace escalation and severity monitoring.',
      ],
      sequence: [
        'The benefits agency faces call-center pressure after the verification-score pilot.',
        'The chatbot performs well on common low-risk questions.',
        'High-stakes prompts are a small share of the evaluation set but carry severe claimant consequences.',
        'Missing retrieval coverage and weak escalation rules produce confident wrong answers.',
        'Language-access and deadline questions reveal larger risk than the demo suggests.',
        'A limited launch preserves useful automation while keeping rights-sensitive topics out of free-form answers.',
      ],
      trap:
        'The case tests whether you evaluate AI by severity and use context, not by polished demos or average pass rates.',
      transfer:
        'For LLM deployments, weight errors by consequence, test the policy edge cases, and define what the system must refuse or escalate.',
    },
  },
  'case-009': {
    id: 'case-009',
    slug: 'fraud-alert-threshold',
    title: 'The Payment Hold Dial',
    set: 'models-real-world',
    sequence: 9,
    status: 'active',
    difficulty: 'standard',
    domain: 'Government risk operations',
    estimatedMinutes: 12,
    caseType: 'threshold-dial',
    judgmentType: 'multi',
    summary:
      'The same benefits agency must choose a payment-hold threshold that catches fraud without turning suspicion into broad payment delay.',
    skills: ['tradeoff reasoning', 'threshold selection', 'operational capacity'],
    concepts: ['false positives', 'false negatives', 'expected value', 'human review capacity'],
    mediaTypes: ['chart', 'simulator', 'table', 'memo', 'audio'],
    briefing:
      'After the chatbot review, program integrity wants to tighten the payment-hold threshold before the next filing wave. A fraud score can catch more organized false claims, but every held payment creates hardship and manual review work.',
    role:
      'You are reviewing the threshold packet before the commissioner signs the payment-hold policy.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Fraud unit voicemail',
      speaker: 'Program Integrity Director',
      duration: '0:14',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-009-fraud-unit-voicemail.wav',
      },
      transcript:
        'If we move the hold line down, we catch more organized claims before money leaves. But adjudication is already stretched, so I need a threshold we can defend when legitimate payments wait.',
    },
    decisionPrompt:
      'Which payment-hold threshold policy is most defensible?',
    evidence: [
      {
        id: 'ev-901',
        type: 'chart',
        render: 'threshold-tradeoff-panel',
        title: 'Threshold dial simulation',
        sourceLabel: 'Risk operations simulator',
        reliability: 'high',
        unlock: 'initial',
        tags: ['threshold', 'tradeoff', 'simulation'],
        body:
          'The simulation shows that lowering the threshold catches more suspect claims, but the manual review burden grows faster than confirmed fraud capture.',
        panelTitle: 'Payment-hold threshold',
        panelBadge: 'Simulation',
        options: [
          { label: 'Tight line', threshold: 'score >= 62', capture: '84%', burden: '9.4k/week', captureWidth: '84%', burdenWidth: '92%', note: 'highest capture, review queue breaks' },
          { label: 'Middle line', threshold: 'score >= 74', capture: '71%', burden: '5.1k/week', captureWidth: '71%', burdenWidth: '55%', note: 'inside weekly capacity before subgroup checks' },
          { label: 'High line', threshold: 'score >= 86', capture: '49%', burden: '1.9k/week', captureWidth: '49%', burdenWidth: '28%', note: 'low burden, misses known fraud clusters' },
        ],
      },
      {
        id: 'ev-902',
        type: 'audio',
        title: 'Fraud unit voicemail',
        sourceLabel: 'Audio note, Monday 7:48 AM',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'fraud capture', 'threshold'],
        speaker: 'Program Integrity Director',
        duration: '0:14',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-009-fraud-unit-voicemail.wav',
        },
        transcript:
          'If we move the hold line down, we catch more organized claims before money leaves. But adjudication is already stretched, so I need a threshold we can defend when legitimate payments wait.',
        body:
          'The program integrity lead frames the decision as a defensible operating threshold, not just a model-performance target.',
      },
      {
        id: 'ev-903',
        type: 'table',
        render: 'artifact-table',
        title: 'Historical outcomes by score band',
        sourceLabel: 'Prior quarter payment-hold audit',
        reliability: 'high',
        unlock: 'initial',
        tags: ['confusion matrix', 'score bands', 'false positives'],
        body:
          'Confirmed issue rates rise with score, but most held claims below the highest band are eventually released.',
        columns: ['Score band', 'Claims', 'Confirmed issue', 'Released after review', 'Median delay'],
        rows: [
          ['90-100', '1,120', '61%', '31%', '5 days'],
          ['80-89', '2,840', '42%', '49%', '7 days'],
          ['70-79', '6,980', '24%', '67%', '10 days'],
          ['60-69', '10,400', '13%', '78%', '15 days'],
          ['50-59', '18,600', '6%', '86%', '18 days'],
        ],
      },
      {
        id: 'ev-904',
        type: 'table',
        render: 'capacity-panel',
        title: 'Adjudication capacity ledger',
        sourceLabel: 'Operations staffing plan',
        reliability: 'high',
        unlock: 'initial',
        tags: ['capacity', 'manual review', 'queue'],
        body:
          'A threshold only works if the review unit can clear holds quickly enough to prevent avoidable hardship.',
        rows: [
          ['Weekly review capacity', '5,600', 'current staffing'],
          ['Emergency hardship slots', '720', 'specialist review'],
          ['Tight-line volume', '9,400/week', 'score >= 62'],
          ['Middle-line volume', '5,100/week', 'score >= 74'],
          ['High-line volume', '1,900/week', 'score >= 86'],
        ],
      },
      {
        id: 'ev-905',
        type: 'chart',
        render: 'fairness-audit-panel',
        title: 'Payment-hold burden audit',
        sourceLabel: 'Civil rights monitoring dashboard',
        reliability: 'high',
        unlock: 'initial',
        tags: ['fairness', 'burden', 'subgroups'],
        body:
          'At the tighter threshold, several groups experience higher hold rates and higher release-after-review rates, suggesting preventable burden.',
        panelTitle: 'Hold burden by claimant group',
        panelBadge: 'Score >= 62',
        groups: [
          { label: 'All claims', note: 'pilot average', reviewRate: '12%', clearedRate: '68%', reviewWidth: '44%', clearedWidth: '70%', delay: 'median hold: 9 days' },
          { label: 'Shared address', note: 'same proxy from Case 7', reviewRate: '28%', clearedRate: '81%', reviewWidth: '80%', clearedWidth: '86%', delay: 'median hold: 17 days' },
          { label: 'Seasonal employer', note: 'wage-match lag', reviewRate: '24%', clearedRate: '76%', reviewWidth: '72%', clearedWidth: '80%', delay: 'median hold: 14 days' },
          { label: 'Spanish language preference', note: 'notice response lag', reviewRate: '21%', clearedRate: '79%', reviewWidth: '66%', clearedWidth: '84%', delay: 'median hold: 15 days' },
        ],
      },
      {
        id: 'ev-906',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Hardship policy memo',
        sourceLabel: 'Agency counsel and operations joint memo',
        reliability: 'high',
        unlock: 'initial',
        tags: ['policy', 'hardship', 'due process'],
        body:
          'The memo says a payment hold can be justified for high-risk claims, but the agency needs fast release criteria, notice, and hardship escalation.',
        memo: [
          'Holds must include a reason code and document path.',
          'Claimants need an emergency review path when rent, food, or medicine is at risk.',
          'The agency should not use a threshold that exceeds review capacity.',
          'Weekly monitoring must include released-after-review counts and subgroup delay.',
        ],
      },
      {
        id: 'ev-907',
        type: 'audio',
        title: 'Hotline escalation clip',
        sourceLabel: 'Supervisor training call, Tuesday 4:18 PM',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['field report', 'hardship', 'false positive'],
        speaker: 'Hotline Supervisor',
        duration: '0:14',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-009-hotline-escalation.wav',
        },
        transcript:
          'The angry calls are not all fraud misses. Some are people who submitted the same document twice because the portal lagged. When we release them two weeks later, the rent damage is already done.',
        body:
          'A hotline supervisor describes how false positives become real hardship even when the claim is eventually cleared.',
      },
      {
        id: 'ev-908',
        type: 'table',
        render: 'artifact-table',
        title: 'Loss and hardship estimate',
        sourceLabel: 'Policy simulation appendix',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['expected value', 'costs', 'harm'],
        body:
          'The expected-value sheet includes fraud losses, administrative costs, and an estimated hardship penalty for delayed legitimate payments.',
        columns: ['Policy', 'Fraud loss avoided', 'Review cost', 'Legit claims delayed >10d', 'Net note'],
        rows: [
          ['Score >= 62', '$8.6M', '$2.9M', '7,800', 'high capture, high burden'],
          ['Score >= 74', '$7.1M', '$1.5M', '2,900', 'balanced under capacity'],
          ['Score >= 86', '$4.6M', '$0.6M', '640', 'misses emerging cluster'],
          ['Pay then investigate', '$1.9M', '$0.8M', '0', 'losses paid out first'],
        ],
      },
      {
        id: 'ev-909',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Appeals reversal sample',
        sourceLabel: 'Quality assurance review',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['appeals', 'false positives', 'workflow'],
        body:
          'The QA sample finds many holds caused by employer reporting lags or duplicate uploads rather than claimant misrepresentation.',
        memo: [
          '42 sampled holds were reversed after employer wage batch update.',
          '31 sampled holds were duplicate-document uploads from portal retries.',
          '19 sampled holds involved shared mailing addresses with valid identity documents.',
          'QA note: faster evidence checks would have released most within three days.',
        ],
      },
      {
        id: 'ev-910',
        type: 'table',
        render: 'artifact-table',
        title: 'Cluster alert bulletin',
        sourceLabel: 'Fraud analytics weekly brief',
        reliability: 'high',
        unlock: 'initial',
        tags: ['fraud pattern', 'emerging risk', 'context'],
        body:
          'There is a real fraud pattern: a new cluster uses repeated bank accounts and synthetic employer records. A very high threshold misses many of these cases.',
        columns: ['Signal', 'Cluster prevalence', 'Confirmed issue', 'Notes'],
        rows: [
          ['Repeated bank account', '1,840 claims', '58%', 'strong signal'],
          ['Synthetic employer ID', '910 claims', '71%', 'strong signal'],
          ['IP mismatch alone', '6,300 claims', '9%', 'weak alone'],
          ['Shared device plus wage lag', '4,200 claims', '14%', 'often benign'],
        ],
      },
      {
        id: 'ev-911',
        type: 'chart',
        render: 'calibration-panel',
        title: 'Score calibration check',
        sourceLabel: 'Risk model validation notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['calibration', 'score', 'subgroups'],
        body:
          'The score is reasonably calibrated for organized-cluster signals and less calibrated when document or access friction drives the score.',
        groups: [
          { label: 'Repeated bank account', predicted: '58%', observed: '56%', predictedWidth: '76%', observedWidth: '74%', note: 'close' },
          { label: 'Synthetic employer ID', predicted: '64%', observed: '67%', predictedWidth: '82%', observedWidth: '86%', note: 'close' },
          { label: 'Shared device only', predicted: '29%', observed: '12%', predictedWidth: '48%', observedWidth: '24%', note: 'over-scored' },
          { label: 'Wage-match lag only', predicted: '24%', observed: '10%', predictedWidth: '42%', observedWidth: '20%', note: 'over-scored' },
        ],
      },
      {
        id: 'ev-912',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Staged threshold protocol',
        sourceLabel: 'Final policy option draft',
        reliability: 'high',
        unlock: 'initial',
        tags: ['policy', 'monitoring', 'guardrails'],
        body:
          'The policy option combines a middle threshold with automatic fast-lane release rules, cluster-specific overrides, and weekly burden review.',
        memo: [
          'Set action line at score >= 74 for general holds.',
          'Use higher-confidence cluster rules for repeated bank account and synthetic employer patterns.',
          'Route shared-device-only and wage-lag-only claims to document request, not payment hold.',
          'Add hardship fast lane and release SLA; pause threshold if backlog exceeds capacity.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'threshold-is-policy',
        label:
          'The threshold should be chosen as an operating policy that balances fraud capture, review capacity, hardship, and subgroup burden',
        scoreClass: 'correct',
      },
      {
        id: 'maximize-capture',
        label:
          'The agency should lower the threshold to maximize fraud capture before payments leave',
        scoreClass: 'incorrect',
      },
      {
        id: 'avoid-all-holds',
        label:
          'The agency should pay all claims first and investigate later because false positives cause hardship',
        scoreClass: 'partial',
      },
      {
        id: 'model-score-only',
        label:
          'The best policy is the threshold with the highest model precision, regardless of review capacity',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'tight-threshold',
        label:
          'Set the hold line at score >= 62 to catch the most suspicious claims before payment',
        scoreClass: 'incorrect',
      },
      {
        id: 'middle-with-guardrails',
        label:
          'Use the middle hold line only with cluster rules, hardship fast lane, and backlog/subgroup guardrails',
        scoreClass: 'correct',
      },
      {
        id: 'high-threshold',
        label:
          'Set the hold line at score >= 86 to minimize claimant burden',
        scoreClass: 'partial',
      },
      {
        id: 'pay-then-investigate',
        label:
          'Stop pre-payment holds and investigate suspicious claims only after payment',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-901', 'ev-903', 'ev-904', 'ev-905', 'ev-906', 'ev-907', 'ev-911', 'ev-912'],
    replay: {
      expertDecision:
        'The defensible policy is not the lowest threshold or the cleanest score cutoff. The threshold becomes a payment-delay policy once it exceeds review capacity. A middle action line with cluster-specific rules, weak-signal document requests, hardship fast-lane review, and backlog guardrails preserves much of the fraud capture while reducing avoidable harm.',
      whatMattered: [
        'The threshold simulation shows burden grows faster than capture at the tight line.',
        'The historical score-band table shows many lower-band holds are released after review.',
        'The capacity ledger shows the tight threshold exceeds adjudication capacity.',
        'The burden audit shows specific claimant groups absorb higher holds and higher release-after-review rates.',
        'The calibration check separates strong fraud-cluster signals from over-scored friction signals.',
        'The staged protocol turns the score into a reviewable operating policy.',
      ],
      misleadingEvidence: [
        'Fraud loss avoided sounds decisive until review cost and legitimate-payment delay are included.',
        'A high threshold minimizes visible burden but misses an emerging fraud cluster.',
        'A single score cutoff hides different signal quality inside the same score range.',
        'Eventual release after review can look harmless if rent and food timing are ignored.',
      ],
      sequence: [
        'The agency faces a real organized-claim cluster.',
        'Lowering the payment-hold threshold catches more suspicious claims.',
        'Lower thresholds also hold many legitimate claims and exceed review capacity.',
        'Some high scores are driven by strong fraud signals, while others are driven by document or access friction.',
        'Delays fall unevenly across claimant groups already flagged in the benefits queue review.',
        'A staged threshold policy handles strong signals differently from weak friction signals.',
      ],
      trap:
        'The case tests whether you treat a model threshold as a human operating policy, not a pure model setting.',
      transfer:
        'For thresholds, put precision/recall beside capacity, delay, appeal outcomes, subgroup burden, and the policy action attached to the score.',
    },
  },
  'case-010': {
    id: 'case-010',
    slug: 'executive-metric-swap',
    title: 'The Clearance Rate Metric',
    set: 'evidence-metrics',
    sequence: 10,
    status: 'active',
    difficulty: 'standard',
    domain: 'Public administration analytics',
    estimatedMinutes: 11,
    caseType: 'metric-critique',
    judgmentType: 'multi',
    summary:
      'The benefits modernization program changes its executive metric, and the new dashboard may reward faster closure while hiding reopened cases and payment delay.',
    skills: ['metric design', 'incentive reasoning', 'executive communication'],
    concepts: ['Goodhart-style behavior', 'leading indicators', 'metric definitions', 'balanced scorecards'],
    mediaTypes: ['table', 'memo', 'chart', 'audio'],
    briefing:
      'After the chatbot and payment-hold reviews, the benefits agency executive team wants a simpler modernization scorecard. The proposed headline metric is "digital clearance rate": the share of claims resolved through automated or digital channels within seven days. The dashboard looks dramatically better than the old claimant-time metric.',
    role:
      'You are reviewing the metric swap before it becomes the public modernization headline.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Dashboard prep voicemail',
      speaker: 'Chief Performance Officer',
      duration: '0:13',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-010-dashboard-prep-voicemail.wav',
      },
      transcript:
        'The clearance metric finally tells a clean story: more claims handled digitally, fewer old backlogs. I need to know whether analytics is comfortable using it as the modernization headline.',
    },
    decisionPrompt:
      'What should analytics recommend for the executive modernization metric?',
    evidence: [
      {
        id: 'ev-1001',
        type: 'chart',
        render: 'metric-swap-panel',
        title: 'Executive metric swap card',
        sourceLabel: 'Modernization dashboard draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['metric', 'dashboard', 'headline'],
        body:
          'The new dashboard headline improves sharply, but the claimant-centered measures move less favorably.',
        panelTitle: 'Modernization headline',
        panelBadge: 'Draft swap',
        metrics: [
          { label: 'Digital clearance rate', value: '72%', note: '+24 points under new definition', kind: 'better' },
          { label: 'Time to first eligible payment', value: '13.4d', note: 'up from 11.8d', kind: 'worse' },
          { label: 'Reopened within 30 days', value: '18%', note: 'up from 9%', kind: 'mixed' },
        ],
      },
      {
        id: 'ev-1002',
        type: 'audio',
        title: 'Dashboard prep voicemail',
        sourceLabel: 'Audio note, Wednesday 7:10 PM',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'metric', 'public report'],
        speaker: 'Chief Performance Officer',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-010-dashboard-prep-voicemail.wav',
        },
        transcript:
          'The clearance metric finally tells a clean story: more claims handled digitally, fewer old backlogs. I need to know whether analytics is comfortable using it as the modernization headline.',
        body:
          'The performance office wants a clean modernization headline for the public dashboard.',
      },
      {
        id: 'ev-1003',
        type: 'table',
        render: 'artifact-table',
        title: 'Metric definition diff',
        sourceLabel: 'Performance analytics change log',
        reliability: 'high',
        unlock: 'initial',
        tags: ['definition', 'metric design', 'denominator'],
        body:
          'The old and new metrics answer different questions. The new metric counts digital closure, not whether the claimant was paid correctly and durably.',
        columns: ['Metric', 'Numerator', 'Denominator', 'Exclusions'],
        rows: [
          ['Old: time to first eligible payment', 'claims paid correctly', 'eligible claims', 'none for reopened claims'],
          ['New: digital clearance rate', 'digitally closed within 7 days', 'digital-channel claims', 'paper claims, reopened after 7 days'],
          ['Supplement: reopened rate', 'reopened within 30 days', 'closed claims', 'not in headline'],
          ['Supplement: hardship delay', 'held >10 days then released', 'held claims', 'not in headline'],
        ],
      },
      {
        id: 'ev-1004',
        type: 'table',
        render: 'artifact-table',
        title: 'Funnel drift extract',
        sourceLabel: 'Claims journey analytics',
        reliability: 'high',
        unlock: 'initial',
        tags: ['funnel', 'claimant journey', 'metric'],
        body:
          'More claims are closed digitally, but a growing share reenters through appeals, hotline escalation, or document correction.',
        columns: ['Step', 'Before modernization', 'After modernization', 'Note'],
        rows: [
          ['Digital submission', '58%', '81%', 'improved access for many'],
          ['Auto or bot-assisted closure', '31%', '67%', 'headline improvement'],
          ['Reopened within 30 days', '9%', '18%', 'definition hides this'],
          ['Hotline escalation after closure', '12%', '24%', 'support burden shifted'],
          ['First eligible payment within 14d', '74%', '69%', 'worse claimant outcome'],
        ],
      },
      {
        id: 'ev-1005',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Reopened case audit',
        sourceLabel: 'Quality assurance sample',
        reliability: 'high',
        unlock: 'initial',
        tags: ['quality', 'reopened cases', 'measurement'],
        body:
          'QA reviewers find that many fast digital closures were not durable resolutions.',
        memo: [
          '38 of 100 sampled digital closures reopened within 30 days.',
          'Common causes: chatbot wrong document path, payment hold missing notice, employer wage file lag.',
          'Several reopened cases were counted as successful digital clearances in the launch dashboard.',
          'QA note: "Closure is not the same as resolution."',
        ],
      },
      {
        id: 'ev-1006',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Team incentive chat',
        sourceLabel: 'Operations channel excerpts',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['incentives', 'Goodhart', 'workflow'],
        body:
          'Team messages show staff learning how the new metric rewards quick digital closure even when follow-up work is likely.',
        memo: [
          'Supervisor: "If the bot gives the form link, close as digital resolved unless they come back."',
          'Lead: "Payment hold notice sent counts as actioned. Do not leave it open waiting for documents."',
          'Analyst: "Reopens are tracked in QA, not in the exec tile."',
          'Caseworker: "The tile looks great; my callback list doubled."',
        ],
      },
      {
        id: 'ev-1007',
        type: 'table',
        render: 'artifact-table',
        title: 'Claimant journey sample',
        sourceLabel: 'Linked case traces',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['journey', 'qualitative', 'burden'],
        body:
          'Sample journeys show how the same claim can count as digitally cleared while the claimant still waits for payment or reopens the case.',
        columns: ['Trace', 'Dashboard outcome', 'Later event', 'Claimant result'],
        rows: [
          ['A-104', 'closed by chatbot form link', 'appeal reopened', 'payment delayed 19d'],
          ['B-229', 'hold notice sent digitally', 'hardship call', 'released after 13d'],
          ['C-711', 'auto-cleared', 'no later contact', 'paid in 6d'],
          ['D-318', 'document request closed', 'Spanish notice correction', 'paid in 24d'],
        ],
      },
      {
        id: 'ev-1008',
        type: 'audio',
        title: 'Caseworker callback clip',
        sourceLabel: 'Operations retro, Thursday 3:42 PM',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['workflow', 'frontline', 'metric'],
        speaker: 'Senior Claims Caseworker',
        duration: '0:12',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-010-caseworker-callback.wav',
        },
        transcript:
          'The dashboard says cleared, but my callback queue says not really. People come back after the bot link or the hold notice, and then we fix it manually under a different code.',
        body:
          'A caseworker describes work moving out of the headline metric and into callbacks or later correction codes.',
      },
      {
        id: 'ev-1009',
        type: 'chart',
        render: 'fairness-audit-panel',
        title: 'Metric burden slice',
        sourceLabel: 'Equity monitoring appendix',
        reliability: 'high',
        unlock: 'initial',
        tags: ['equity', 'subgroup', 'metric'],
        body:
          'The new metric improves most for groups already comfortable with digital channels, while reopened and delayed cases concentrate elsewhere.',
        panelTitle: 'Digital clearance vs durable resolution',
        panelBadge: 'Subgroup slice',
        primaryLabel: 'digital',
        secondaryLabel: 'durable',
        groups: [
          { label: 'All claims', note: 'post-launch', reviewRate: '72%', clearedRate: '61%', reviewWidth: '76%', clearedWidth: '66%', delay: 'durable resolution gap: 11 pts' },
          { label: 'Spanish language preference', note: 'translated notices', reviewRate: '64%', clearedRate: '43%', reviewWidth: '68%', clearedWidth: '48%', delay: 'gap: 21 pts' },
          { label: 'Paper-to-digital switchers', note: 'assisted filing', reviewRate: '58%', clearedRate: '39%', reviewWidth: '62%', clearedWidth: '44%', delay: 'gap: 19 pts' },
          { label: 'Portal-only claimants', note: 'stable digital access', reviewRate: '83%', clearedRate: '79%', reviewWidth: '88%', clearedWidth: '84%', delay: 'gap: 4 pts' },
        ],
      },
      {
        id: 'ev-1010',
        type: 'table',
        render: 'artifact-table',
        title: 'Dashboard drilldown',
        sourceLabel: 'BI workbook hidden tabs',
        reliability: 'high',
        unlock: 'initial',
        tags: ['dashboard', 'definitions', 'hidden metric'],
        body:
          'The workbook already contains stronger claimant-centered metrics, but they are hidden below the executive headline.',
        columns: ['Measure', 'Post-launch value', 'Trend', 'Visible on headline?'],
        rows: [
          ['Digital clearance rate', '72%', '+24 pts', 'yes'],
          ['Time to first eligible payment', '13.4 days', 'worse', 'no'],
          ['Reopened within 30 days', '18%', 'worse', 'no'],
          ['Critical chatbot correction rate', '2.4%', 'flat', 'no'],
          ['Released-after-hold delay', '11.2 days', 'worse', 'no'],
        ],
      },
      {
        id: 'ev-1011',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Metric options scratchpad',
        sourceLabel: 'Analytics recommendation draft',
        reliability: 'high',
        unlock: 'initial',
        tags: ['balanced scorecard', 'recommendation', 'metric design'],
        body:
          'The analytics draft keeps digital clearance as an operational indicator but pairs it with claimant outcome, quality, burden, and equity measures.',
        memo: [
          'Headline: eligible claimant time to correct first payment.',
          'Guardrails: reopened rate, released-after-hold delay, critical bot corrections, subgroup burden gaps.',
          'Operational metric: digital clearance rate, reported only with reopen adjustment.',
          'Public note: modernization success requires faster digital service and durable claimant resolution.',
        ],
      },
      {
        id: 'ev-1012',
        type: 'definition',
        render: 'retraining-diff',
        title: 'Metric lineage note',
        sourceLabel: 'Data governance review',
        reliability: 'high',
        unlock: 'initial',
        tags: ['lineage', 'definitions', 'data quality'],
        body:
          'The governance note shows that the new metric excludes paper claims and late reopens, which makes it sensitive to channel shift and closure coding.',
        before: {
          title: 'Old public measure',
          items: [
            'All eligible claims in denominator',
            'First correct payment as outcome',
            'Reopens attached to original claim',
          ],
        },
        after: {
          title: 'Proposed headline',
          items: [
            'Digital-channel claims only',
            'Closure event counted within seven days',
            'Reopens tracked separately after seven days',
            'Callback corrections coded as support work',
          ],
        },
      },
    ],
    hypotheses: [
      {
        id: 'metric-hides-burden',
        label:
          'The new metric captures digital throughput but hides reopened cases, delayed payments, and shifted claimant burden',
        scoreClass: 'correct',
      },
      {
        id: 'metric-proves-success',
        label:
          'The digital clearance rate proves modernization improved because it rose sharply',
        scoreClass: 'incorrect',
      },
      {
        id: 'old-metric-only',
        label:
          'The metric can remain in the dashboard if the headline also includes reopened cases, payment delay, and paper-channel burden',
        scoreClass: 'partial',
      },
      {
        id: 'communications-fix',
        label:
          'The metric is acceptable if the dashboard footnote explains its definition',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'approve-swap',
        label:
          'Approve digital clearance rate as the headline modernization metric',
        scoreClass: 'incorrect',
      },
      {
        id: 'balanced-headline',
        label:
          'Make first-payment time the headline and report digital clearance only with reopen, delay, hold, and subgroup guardrails',
        scoreClass: 'correct',
      },
      {
        id: 'delay-dashboard',
        label:
          'Publish a balanced dashboard now, but mark conflicting guardrails as unresolved',
        scoreClass: 'partial',
      },
      {
        id: 'publish-footnote',
        label:
          'Publish the digital clearance headline with a definition footnote and keep other measures internal',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: ['ev-1003', 'ev-1004', 'ev-1005', 'ev-1006', 'ev-1008', 'ev-1009', 'ev-1010', 'ev-1011', 'ev-1012'],
    replay: {
      expertDecision:
        'Digital clearance rate is useful as an operational indicator, but it should not become the modernization headline by itself. The definition excludes paper claims, misses late reopens, and rewards closure coding that can shift work to callbacks or later corrections. The defensible recommendation is a balanced public scorecard centered on correct first payment, with digital clearance reported alongside reopened cases, delay after holds, critical bot corrections, and subgroup burden gaps.',
      whatMattered: [
        'The definition diff shows the old and new metrics answer different questions.',
        'The funnel drift extract shows digital closure rises while reopened cases and hotline escalations increase.',
        'The reopened case audit shows fast closure is often not durable resolution.',
        'The incentive chat shows teams adapting behavior to the new executive tile.',
        'The caseworker clip confirms work is moving outside the headline metric.',
        'The burden slice shows the metric performs differently across claimant groups.',
        'The balanced scorecard keeps the useful operational signal without letting it dominate claimant outcomes.',
      ],
      misleadingEvidence: [
        'A large improvement in one clean dashboard tile feels like modernization success.',
        'A definition footnote does not prevent incentives from shifting around the metric.',
        'Digital channel growth is genuinely useful but can hide who is left out or sent back through the system.',
        'Internal hidden tabs are easy to ignore once a public headline is chosen.',
      ],
      sequence: [
        'The agency deploys model and AI tools to reduce backlog pressure.',
        'Leadership looks for a simple modernization headline.',
        'Digital clearance rate rises because more claims are closed through automated channels.',
        'Some closures are not durable: claims reopen, calls increase, and payments are delayed.',
        'Teams learn that quick closure improves the executive tile even if later correction work grows.',
        'A balanced scorecard is needed to keep throughput, quality, fairness, and claimant outcomes visible together.',
      ],
      trap:
        'The case tests whether you see metrics as designed instruments that create incentives, not neutral mirrors of performance.',
      transfer:
        'For executive metrics, inspect the denominator, exclusions, timing window, incentive effects, and hidden guardrails before accepting the headline.',
    },
  },
  'case-011': {
    id: 'case-011',
    slug: 'survey-sample-mirage',
    title: 'The Survey Sample Mirage',
    set: 'evidence-integrity',
    sequence: 11,
    status: 'active',
    difficulty: 'standard',
    domain: 'Survey analytics',
    estimatedMinutes: 12,
    caseType: 'sample-composition-check',
    judgmentType: 'multi',
    summary:
      'A customer research survey appears decisive until response patterns reveal who never had a real chance to answer.',
    skills: ['sampling judgment', 'representativeness', 'uncertainty communication'],
    concepts: ['nonresponse bias', 'sampling frames', 'weighting limits'],
    mediaTypes: ['table', 'chart', 'memo', 'audio'],
    briefing:
      'A customer research team has a clean slide for tomorrow: 64 percent of surveyed members say the new self-service portal should replace phone support for routine billing questions. The finding is already being described as "what customers want."',
    role:
      'You are the data science reviewer. Decide whether the survey can support the product recommendation, and how strongly the team should state the result.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Research lead voice note',
      speaker: 'Research Lead',
      duration: '0:11',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-011-research-lead-voice-note.wav',
      },
      transcript:
        'The headline is strong, but I am nervous that we mostly heard from portal users. If we slow this down, product will say we are ignoring customer voice.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the survey readout?',
    evidence: [
      {
        id: 'ev-1101',
        type: 'chart',
        render: 'sample-composition-panel',
        title: 'Response composition board',
        sourceLabel: 'Survey ops dashboard',
        reliability: 'high',
        unlock: 'initial',
        tags: ['sample', 'composition', 'response'],
        body:
          'The response dashboard compares the customer base with the people who completed the survey. Portal-active customers are heavily overrepresented among responses.',
        panelTitle: 'Customer base versus survey responses',
        panelBadge: 'N=4,812',
        groups: [
          { label: 'Portal-active', population: '38%', responses: '71%', populationWidth: '38%', responseWidth: '71%', note: 'logged into portal in last 30 days' },
          { label: 'Phone-first', population: '34%', responses: '11%', populationWidth: '34%', responseWidth: '11%', note: 'most recent resolved contact by phone' },
          { label: 'Paper billing', population: '18%', responses: '5%', populationWidth: '18%', responseWidth: '5%', note: 'receives mailed statements' },
          { label: 'Mixed channel', population: '10%', responses: '13%', populationWidth: '10%', responseWidth: '13%', note: 'uses both portal and phone' },
        ],
      },
      {
        id: 'ev-1102',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Launch slide excerpt',
        sourceLabel: 'Product readout draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['claim', 'narrative', 'launch'],
        body:
          'The draft slide says customers prefer self-service and recommends reducing routine phone staffing after the portal launch.',
        memo: [
          'Headline: "Customers want digital-first billing support."',
          'Main number: 64% prefer portal for routine billing.',
          'Recommendation: shift 20% routine call capacity to portal chat.',
          'Footnote: online survey, 4,812 responses, fielded for five days.',
        ],
      },
      {
        id: 'ev-1103',
        type: 'table',
        render: 'artifact-table',
        title: 'Survey invite path',
        sourceLabel: 'Research operations export',
        reliability: 'high',
        unlock: 'initial',
        tags: ['sampling frame', 'invite', 'coverage'],
        body:
          'Invitations were sent through channels that favored customers already using digital touchpoints.',
        columns: ['Invite source', 'Invited', 'Completed', 'Completion rate'],
        rows: [
          ['Portal banner', '21,400', '3,050', '14.3%'],
          ['Email with portal link', '48,200', '1,322', '2.7%'],
          ['SMS after phone call', '13,600', '352', '2.6%'],
          ['IVR callback prompt', '9,800', '88', '0.9%'],
          ['Paper bill insert', '0', '0', 'not fielded'],
        ],
      },
      {
        id: 'ev-1104',
        type: 'table',
        render: 'artifact-table',
        title: 'Preference by service history',
        sourceLabel: 'Cross-tab from survey warehouse',
        reliability: 'high',
        unlock: 'initial',
        tags: ['subgroup', 'preference', 'heterogeneity'],
        body:
          'Portal-active respondents strongly prefer self-service, while phone-first respondents are much less supportive and cite unresolved billing cases.',
        columns: ['Respondent group', 'Portal preference', 'Phone preference', 'Top reason'],
        rows: [
          ['Portal-active', '74%', '14%', 'fastest for simple questions'],
          ['Mixed channel', '51%', '31%', 'depends on issue'],
          ['Phone-first', '29%', '56%', 'needs explanation or exception'],
          ['Paper billing', '22%', '61%', 'low digital access or trust'],
        ],
      },
      {
        id: 'ev-1105',
        type: 'audio',
        title: 'Call-center callback notes',
        sourceLabel: 'CX supervisor sample',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['qualitative', 'nonresponse', 'phone-first'],
        speaker: 'CX Supervisor',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-011-call-center-callbacks.wav',
        },
        transcript:
          'A few callers told us they did not trust the survey link or could not answer it in the portal. They still want self-service for simple things, but exceptions are when they need a person.',
        body:
          'A supervisor collected a small convenience sample from customers who called after survey invitations were sent. The sample is not representative, but it reveals why some groups did not complete the survey.',
      },
      {
        id: 'ev-1106',
        type: 'table',
        render: 'artifact-table',
        title: 'Nonresponse check',
        sourceLabel: 'CRM join, invited customers',
        reliability: 'high',
        unlock: 'initial',
        tags: ['nonresponse', 'crm', 'bias'],
        body:
          'Nonrespondents are more likely to have recent unresolved billing exceptions and lower portal use. These same factors plausibly affect support-channel preference.',
        columns: ['Characteristic', 'Respondents', 'Nonrespondents', 'Why it matters'],
        rows: [
          ['Portal login last 30d', '82%', '41%', 'related to portal preference'],
          ['Open billing exception', '7%', '19%', 'raises need for human support'],
          ['Prior failed portal payment', '3%', '14%', 'digital experience differs'],
          ['Paper statement only', '5%', '21%', 'low coverage in survey mode'],
        ],
      },
      {
        id: 'ev-1107',
        type: 'definition',
        title: 'Question wording card',
        sourceLabel: 'Survey instrument',
        reliability: 'high',
        unlock: 'initial',
        tags: ['wording', 'construct', 'measurement'],
        body:
          'The key item asked: "For routine billing questions, which channel would you prefer if both options resolved your issue quickly?" It did not ask about exceptions, failed payments, accessibility, or situations where the portal cannot resolve the issue.',
      },
      {
        id: 'ev-1108',
        type: 'table',
        render: 'artifact-table',
        title: 'Weighting sensitivity',
        sourceLabel: 'Analytics scratch reweight',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['weighting', 'sensitivity', 'uncertainty'],
        body:
          'Weighting responses to known customer-channel mix lowers the portal preference estimate, but it cannot fix unmeasured differences inside the nonresponding groups.',
        columns: ['Estimate', 'Portal preference', 'Phone preference', 'Caveat'],
        rows: [
          ['Raw responses', '64%', '24%', 'portal users overrepresented'],
          ['Weighted by channel history', '49%', '36%', 'uses known channel mix'],
          ['Weighted plus open-exception flag', '45%', '39%', 'wider uncertainty'],
          ['Phone-first only', '29%', '56%', 'small response base'],
        ],
      },
      {
        id: 'ev-1109',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Product director message',
        sourceLabel: 'Slack export',
        reliability: 'low',
        unlock: 'initial',
        tags: ['narrative', 'deadline', 'staffing'],
        body:
          'A product director frames the result as a staffing decision ahead of budget planning.',
        memo: [
          'Budget packet closes Friday.',
          'Portal deflection target needs a customer-voice slide.',
          'Director note: "Do not turn a clear majority into an academic caveat."',
          'Support ops has not yet reviewed subgroup results.',
        ],
      },
      {
        id: 'ev-1110',
        type: 'table',
        render: 'artifact-table',
        title: 'Respondent open-text coding',
        sourceLabel: 'Research coding pass',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['qualitative', 'context', 'limits'],
        body:
          'Open-text responses suggest strong support for self-service for simple routine questions, but many positive comments explicitly exclude complex billing situations.',
        columns: ['Theme', 'Share of coded comments', 'Example boundary'],
        rows: [
          ['Faster than waiting on hold', '31%', 'only for balance checks'],
          ['Good for receipts or due dates', '26%', 'not payment disputes'],
          ['Need person for exceptions', '19%', 'refunds, hardship, credits'],
          ['Distrust links or portal', '12%', 'security and access concerns'],
        ],
      },
      {
        id: 'ev-1111',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Follow-up design sketch',
        sourceLabel: 'Research methods margin note',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['evaluation design', 'follow-up', 'open-thread'],
        body:
          'A researcher proposes a mixed-mode follow-up that would sample phone-first and paper-billing customers directly before using the survey as a staffing argument.',
        memo: [
          'Draw stratified sample from account base, not only digital touchpoints.',
          'Offer phone callback, SMS, mail, and portal response modes.',
          'Oversample open-exception and paper-statement customers.',
          'Report routine-question preference separately from exception handling.',
        ],
      },
      {
        id: 'ev-1112',
        type: 'chart',
        title: 'Support cost trend',
        sourceLabel: 'Finance dashboard',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['cost', 'context', 'red herring'],
        body:
          'Routine billing call volume fell 9 percent after the portal refresh, but exception calls became longer. Cost pressure is real, yet it does not determine whether the survey represents all customers.',
      },
    ],
    hypotheses: [
      {
        id: 'nonresponse-and-frame',
        label:
          'The survey captures a real portal-user signal, but the sampling frame and nonresponse make the broad customer-preference claim unsafe',
        scoreClass: 'correct',
      },
      {
        id: 'clear-majority',
        label:
          'The large response count and 64 percent majority are enough to represent customer preference',
        scoreClass: 'incorrect',
      },
      {
        id: 'weighting-solves',
        label:
          'Weighting by channel history fully fixes the sample problem',
        scoreClass: 'partial',
      },
      {
        id: 'survey-useless',
        label:
          'The survey should be discarded because online respondents are biased',
        scoreClass: 'partial',
      },
      {
        id: 'cost-pressure-main',
        label:
          'The staffing decision should be based mainly on the falling routine-call cost trend',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'publish-broad-claim',
        label:
          'Publish the 64 percent result as evidence that customers prefer digital-first support',
        scoreClass: 'incorrect',
      },
      {
        id: 'qualified-readout',
        label:
          'Report strong portal-user support for routine questions, remove the broad customer claim, and run a mixed-mode follow-up before staffing cuts',
        scoreClass: 'correct',
      },
      {
        id: 'weighted-broad-claim',
        label:
          'Use the weighted 49 percent estimate as the official customer-preference result and proceed with the staffing shift',
        scoreClass: 'partial',
      },
      {
        id: 'pause-all',
        label:
          'Report the portal-user result, but postpone staffing cuts until a mixed-mode nonresponse check is complete',
        scoreClass: 'partial',
      },
      {
        id: 'phone-only-response',
        label:
          'Reject the portal recommendation and expand phone staffing because phone-first respondents prefer phone support',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-1101', 'ev-1103', 'ev-1104', 'ev-1106', 'ev-1107', 'ev-1108', 'ev-1111'],
    replay: {
      expertDecision:
        'The survey is useful, but not for the broad claim in the launch slide. It shows strong support among portal-active respondents for routine billing self-service, while phone-first and paper-billing customers were under-covered and less likely to respond. Known-channel weighting moves the estimate substantially, and nonrespondents differ on open exceptions and prior portal failures. The defensible readout is a qualified finding: portal users like self-service for routine questions, but the team should not use this survey alone to justify broad staffing cuts without a mixed-mode follow-up.',
      whatMattered: [
        'The composition board shows portal-active customers are overrepresented among responses.',
        'The invite-path export shows the survey was mostly fielded through digital touchpoints.',
        'The preference cross-tab shows support differs sharply by service history.',
        'The nonresponse check shows nonrespondents differ on variables related to channel preference.',
        'The question wording limits the claim to routine questions under an ideal quick-resolution assumption.',
        'The weighting sensitivity shows the headline changes when known channel mix and exceptions are considered.',
        'The follow-up design sketch identifies the evidence needed before using the result for staffing.',
      ],
      misleadingEvidence: [
        'A large response count can still be a biased response count.',
        'The 64 percent headline is real for the respondents, but respondent composition is not neutral.',
        'Cost pressure and falling routine-call volume make the staffing story feel urgent without making the survey representative.',
        'Weighting helps with known imbalances, but it cannot fully recover missing voices from people who were barely reachable by the survey mode.',
      ],
      sequence: [
        'Product needs a customer-voice slide for a staffing decision.',
        'The survey is fielded mostly through portal and email channels.',
        'Portal-active customers respond at much higher rates.',
        'The raw survey shows a strong portal preference among respondents.',
        'Phone-first, paper-billing, and open-exception customers are underrepresented.',
        'Subgroup and weighting checks weaken the broad customer-preference claim.',
        'A narrower readout and mixed-mode follow-up preserve the useful signal without overclaiming.',
      ],
      trap:
        'The case tests whether you can separate a true respondent finding from an unsupported population claim.',
      transfer:
        'Before using survey results for a decision, inspect the sampling frame, response mode, nonresponse pattern, construct wording, and weighting sensitivity.',
    },
  },
  'case-012': {
    id: 'case-012',
    slug: 'data-dictionary-drift',
    title: 'The Bed-Ready Field',
    set: 'evidence-integrity',
    sequence: 12,
    status: 'active',
    difficulty: 'standard',
    domain: 'Healthcare operations',
    estimatedMinutes: 12,
    caseType: 'dictionary-diff',
    judgmentType: 'multi',
    summary:
      'A familiar hospital operations field powers a clean improvement story while source systems leave conflicting traces.',
    skills: ['data provenance', 'measurement validity', 'cross-site comparison'],
    concepts: ['semantic drift', 'data lineage', 'metric comparability'],
    mediaTypes: ['table', 'timeline', 'memo', 'diagram', 'audio'],
    briefing:
      'A three-hospital network is preparing a board packet on discharge flow. The access dashboard says median discharge-order-to-bed-ready time fell 22 percent after a new discharge coordination workflow. Operations wants to call it a network improvement and expand the workflow next month.',
    role:
      'You are the data science reviewer. Decide whether the dashboard can support the network-wide claim, and what evidence would make the metric trustworthy enough to use.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Board packet voice note',
      speaker: 'VP Operations',
      duration: '0:10',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-012-board-packet-voice-note.wav',
      },
      transcript:
        'The discharge number is finally moving. If analytics agrees, I want to tell the board the workflow cut bed-ready delay by 22 percent across the network.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the discharge-flow readout?',
    evidence: [
      {
        id: 'ev-1201',
        type: 'table',
        render: 'artifact-table',
        title: 'Executive access dashboard',
        sourceLabel: 'Board packet draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['headline', 'operations', 'trend'],
        body:
          'The dashboard pools all three hospitals and shows a sharp drop after the discharge coordination workflow began.',
        columns: ['Metric', 'Baseline', 'Current', 'Change'],
        rows: [
          ['Network median discharge-order-to-bed-ready time', '5.8 hours', '4.5 hours', '-22%'],
          ['Cases included', '6,420', '6,780', '+6%'],
          ['Target threshold met', '41%', '56%', '+15 pts'],
          ['Board note', 'workflow launched', 'sustained improvement', 'scale recommended'],
        ],
      },
      {
        id: 'ev-1202',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Board packet excerpt',
        sourceLabel: 'Operations draft slide',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['claim', 'narrative', 'scale'],
        body:
          'The draft turns the pooled trend into a causal and network-wide claim.',
        memo: [
          'Headline: "Discharge coordination reduced bed-ready delay by 22%."',
          'Recommended action: standardize the workflow at all sites next quarter.',
          'Slide note: "same operational metric used in monthly access reviews."',
          'No site-by-site table appears in the executive deck.',
        ],
      },
      {
        id: 'ev-1203',
        type: 'diagram',
        render: 'retraining-diff',
        title: 'Data dictionary diff',
        sourceLabel: 'Metric registry compare',
        reliability: 'high',
        unlock: 'initial',
        tags: ['definition', 'dictionary', 'semantic drift'],
        body:
          'The field name stayed constant, but one hospital changed what event writes to the field.',
        before: {
          title: 'Prior network definition',
          items: [
            'bed_ready_at = attending discharge order signed',
            'nurse readiness documented in discharge flowsheet',
            'transport request can occur after this timestamp',
            'used by North, West, and East through March',
          ],
        },
        after: {
          title: 'East template after April release',
          items: [
            'bed_ready_at = discharge navigator checklist opened',
            'case manager can start checklist before final med reconciliation',
            'nurse readiness documentation writes to a separate note field',
            'North and West did not adopt the template',
          ],
        },
      },
      {
        id: 'ev-1204',
        type: 'timeline',
        title: 'Release and metric timeline',
        sourceLabel: 'EHR change calendar',
        reliability: 'high',
        unlock: 'initial',
        tags: ['timing', 'ehr', 'definition'],
        body:
          'The largest movement starts at East immediately after an EHR discharge navigator template went live.',
        entries: [
          ['Mar 24', 'Network discharge workflow training begins.'],
          ['Apr 01', 'East goes live with discharge navigator template.'],
          ['Apr 04', 'East median bed-ready-to-departure time drops below 4 hours.'],
          ['Apr 08', 'North and West continue using legacy flowsheet timestamps.'],
          ['Apr 15', 'Executive dashboard pools all sites without a metric version flag.'],
        ],
      },
      {
        id: 'ev-1205',
        type: 'table',
        render: 'artifact-table',
        title: 'Site split printout',
        sourceLabel: 'Analytics scratch table',
        reliability: 'high',
        unlock: 'initial',
        tags: ['site split', 'heterogeneity', 'aggregate'],
        body:
          'The pooled network improvement is concentrated at East, the highest-volume site and the only site with the new template.',
        columns: ['Hospital', 'Share of cases', 'Baseline median', 'Current median', 'Change'],
        rows: [
          ['East', '52%', '6.1h', '3.8h', '-38%'],
          ['North', '28%', '5.4h', '5.3h', '-2%'],
          ['West', '20%', '5.6h', '5.9h', '+5%'],
          ['Network pooled', '100%', '5.8h', '4.5h', '-22%'],
        ],
      },
      {
        id: 'ev-1206',
        type: 'table',
        render: 'artifact-table',
        title: 'Raw timestamp sample',
        sourceLabel: 'East chart extract',
        reliability: 'high',
        unlock: 'initial',
        tags: ['raw rows', 'timestamp', 'validation'],
        body:
          'Several East records show the bed-ready timestamp occurring before events that used to be prerequisites for bed readiness.',
        columns: ['Encounter', 'bed_ready_at', 'Discharge order', 'Med reconciliation', 'Transport requested'],
        rows: [
          ['E-2041', '10:18', '10:46', '11:02', '11:11'],
          ['E-2187', '13:05', '13:00', '13:41', '14:10'],
          ['E-2259', '08:32', '09:14', '09:22', '09:40'],
          ['E-2318', '15:11', '15:18', '15:43', '16:02'],
        ],
      },
      {
        id: 'ev-1207',
        type: 'audio',
        title: 'Nurse supervisor handoff',
        sourceLabel: 'East discharge huddle note',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['workflow', 'qualitative', 'meaning'],
        speaker: 'East Unit Supervisor',
        duration: '0:10',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-012-nurse-supervisor-handoff.wav',
        },
        transcript:
          'The navigator checklist is helping us start earlier, but families still wait on pharmacy and transport. Ready on that screen does not always mean the patient can leave.',
        body:
          'A unit supervisor flags that staff are using the new checklist earlier than the old readiness event.',
      },
      {
        id: 'ev-1208',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Warehouse mapping note',
        sourceLabel: 'Data engineering ticket',
        reliability: 'high',
        unlock: 'initial',
        tags: ['lineage', 'mapping', 'versioning'],
        body:
          'The warehouse kept the downstream column name for compatibility after East changed the upstream source.',
        memo: [
          'Field: fact_discharge.bed_ready_at',
          'Legacy source: NURSE_DISCHARGE_FLOWSHEET.ready_time',
          'East source after template release: DISCHARGE_NAVIGATOR.checklist_start_time',
          'Metric version flag: not populated for historical access dashboard.',
        ],
      },
      {
        id: 'ev-1209',
        type: 'table',
        render: 'artifact-table',
        title: 'Manual chart audit',
        sourceLabel: 'Quality analyst spot check',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['audit', 'validation', 'ground truth'],
        body:
          'A small manual audit suggests the East field often fires before the old clinical readiness concept.',
        columns: ['Audit sample', 'Aligned with old readiness definition', 'Early timestamp', 'Before discharge order'],
        rows: [
          ['East, post-template, n=40', '19', '18', '3'],
          ['East, pre-template, n=30', '27', '3', '0'],
          ['North, current, n=25', '23', '2', '0'],
          ['West, current, n=25', '22', '3', '0'],
        ],
      },
      {
        id: 'ev-1210',
        type: 'table',
        render: 'artifact-table',
        title: 'Throughput context',
        sourceLabel: 'Capacity command center',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['context', 'confounder', 'red herring'],
        body:
          'ED boarding eased during the same period. This matters for operations, but it does not explain why the same field means different things across sites.',
        columns: ['Week', 'ED boarding hours', 'Discharge volume', 'Comment'],
        rows: [
          ['Mar 18', '1,240', '1,012', 'late flu pressure'],
          ['Mar 25', '1,110', '1,048', 'workflow training starts'],
          ['Apr 01', '930', '1,066', 'East template live'],
          ['Apr 08', '905', '1,081', 'dashboard inflection continues'],
        ],
      },
      {
        id: 'ev-1211',
        type: 'diagram',
        render: 'retraining-diff',
        title: 'Lineage route sketch',
        sourceLabel: 'BI lineage export',
        reliability: 'high',
        unlock: 'initial',
        tags: ['lineage', 'pipeline', 'comparability'],
        body:
          'The dashboard still reads one column, but the upstream event path forks by site and time.',
        before: {
          title: 'North and West route',
          items: [
            'nursing flowsheet readiness event',
            'fact_discharge.bed_ready_at',
            'monthly access dashboard',
            'board packet trend',
          ],
        },
        after: {
          title: 'East post-template route',
          items: [
            'discharge navigator checklist opened',
            'fact_discharge.bed_ready_at',
            'monthly access dashboard',
            'board packet trend',
          ],
        },
      },
      {
        id: 'ev-1212',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Metric reconciliation scratchpad',
        sourceLabel: 'Analytics review margin note',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['next step', 'measurement', 'decision'],
        body:
          'A reviewer sketches a way to keep the useful operational signal while preventing an unsupported network claim.',
        memo: [
          'Freeze the network-wide improvement claim until field semantics are reconciled.',
          'Create metric versions by site and EHR template era.',
          'Validate candidate timestamps against manual chart review and process milestones.',
          'Report workflow outcomes separately from measurement-change artifacts.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'definition-drift',
        label:
          'The pooled dashboard mixes incompatible field meanings; a local signal may exist, but the network claim is not supportable as written',
        scoreClass: 'correct',
      },
      {
        id: 'workflow-success',
        label:
          'The 22 percent network drop proves the discharge coordination workflow improved flow across hospitals',
        scoreClass: 'incorrect',
      },
      {
        id: 'east-real-scale',
        label:
          'East probably improved, so the workflow can be scaled if the board packet adds a definition footnote',
        scoreClass: 'partial',
      },
      {
        id: 'metrics-useless',
        label:
          'Network reporting should pause until site-specific field definitions are versioned and bridge-tested across eras',
        scoreClass: 'partial',
      },
      {
        id: 'ed-volume-main',
        label:
          'The easing ED boarding trend is the main explanation, so the field definition issue is secondary',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'approve-board-claim',
        label:
          'Approve the board claim that the workflow cut bed-ready delay by 22 percent across the network',
        scoreClass: 'incorrect',
      },
      {
        id: 'freeze-and-reconcile',
        label:
          'Freeze the network claim, version and reconcile the bed-ready definition, audit timestamps, and report site/era results separately',
        scoreClass: 'correct',
      },
      {
        id: 'east-only-caveat',
        label:
          'Publish an East-only improvement with a caveat and scale to sites that can adopt the same template',
        scoreClass: 'partial',
      },
      {
        id: 'start-over',
        label:
          'Delay all discharge reporting until analytics can build a brand-new metric from scratch',
        scoreClass: 'partial',
      },
      {
        id: 'attribute-to-volume',
        label:
          'Attribute the improvement to lower ED boarding and ignore the dictionary change for this packet',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: ['ev-1203', 'ev-1204', 'ev-1205', 'ev-1206', 'ev-1208', 'ev-1209', 'ev-1211', 'ev-1212'],
    replay: {
      expertDecision:
        'Do not approve the network-wide improvement claim as written. The dashboard is measuring different operational events under the same column name after East adopted a new EHR template. East may have a real workflow signal, and lower ED boarding may have helped, but the pooled trend is not comparable across sites or eras until the metric definition and lineage are versioned and validated.',
      whatMattered: [
        'The dictionary diff shows the same field name now points to different operational events.',
        'The release timeline places the East template change at the start of the dashboard inflection.',
        'The site split shows the pooled improvement is concentrated at the site with the changed source event.',
        'The raw timestamp sample shows bed_ready_at can occur before milestones that used to define readiness.',
        'The warehouse mapping note shows the downstream column name masked an upstream source change.',
        'The manual audit estimates how often the field diverges from the old readiness concept.',
        'The reconciliation plan preserves useful measurement while blocking an overclaim.',
      ],
      misleadingEvidence: [
        'A familiar metric name creates false continuity when the source event changes.',
        'The network aggregate looks persuasive because East has high volume and a large apparent gain.',
        'ED boarding context is operationally relevant but does not solve metric comparability.',
        'A board packet footnote is not enough when old and new values answer different questions.',
      ],
      sequence: [
        'Operations launches a discharge coordination workflow and prepares a board update.',
        'East also adopts a new discharge navigator template.',
        'The warehouse keeps the same bed_ready_at column name while East changes the source event.',
        'The pooled dashboard shows a large network improvement.',
        'Site splits, raw rows, lineage, and manual audit reveal semantic drift.',
        'Analytics freezes the broad claim and rebuilds the metric as site and era specific evidence.',
      ],
      trap:
        'The case tests whether you inspect data meaning and lineage instead of trusting a stable field name and a clean aggregate trend.',
      transfer:
        'When a metric travels across sites or time, check the data dictionary, upstream source events, version flags, workflow changes, and raw-row plausibility before comparing values.',
    },
  },
  'case-013': {
    id: 'case-013',
    slug: 'missingness-report',
    title: 'The Missingness Report',
    set: 'evidence-integrity',
    sequence: 13,
    status: 'active',
    difficulty: 'standard',
    domain: 'Clinical analytics',
    estimatedMinutes: 12,
    caseType: 'missingness-inspector',
    judgmentType: 'multi',
    summary:
      'A clinical risk report looks stable after dropping incomplete records, but missingness follows staffing, language access, and acuity.',
    skills: ['missing data reasoning', 'bias detection', 'evidence qualification'],
    concepts: ['complete-case analysis', 'missing not at random', 'measurement opportunity'],
    mediaTypes: ['heatmap', 'table', 'memo', 'chart', 'audio'],
    briefing:
      'A hospital quality committee is reviewing an emergency department sepsis-risk report. The headline says the risk profile stayed stable after the new triage workflow, and the analyst notes that incomplete charts were dropped before modeling. The committee wants to use the report to shift attention away from intake documentation and toward treatment timing.',
    role:
      'You are the data science reviewer. Decide whether the complete-case report can support the committee claim, and what should happen before clinical action is based on it.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Quality committee voicemail',
      speaker: 'Quality Director',
      duration: '0:12',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-013-quality-committee-voicemail.wav',
      },
      transcript:
        'The report says risk is stable once incomplete charts are dropped. If that is solid, I want the committee to focus on treatment timing and not reopen intake documentation again.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the clinical risk report?',
    evidence: [
      {
        id: 'ev-1301',
        type: 'table',
        render: 'artifact-table',
        title: 'Complete-case dashboard',
        sourceLabel: 'Quality analytics report',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['headline', 'complete case', 'risk'],
        body:
          'The dashboard is internally consistent for the records that remain after filtering. It does not show who was removed.',
        columns: ['Measure', 'Before workflow', 'After workflow', 'Analyst note'],
        rows: [
          ['ED encounters in raw cohort', '12,940', '13,180', 'all adult arrivals'],
          ['Complete records retained', '8,890', '9,080', 'missing key fields dropped'],
          ['Mean predicted sepsis risk', '13.4%', '13.2%', 'stable'],
          ['Observed ICU transfer within 24h', '4.7%', '4.8%', 'stable in retained records'],
        ],
      },
      {
        id: 'ev-1302',
        type: 'heatmap',
        render: 'missingness-heatmap-panel',
        title: 'Missingness pattern board',
        sourceLabel: 'EHR completeness scan',
        reliability: 'high',
        unlock: 'initial',
        tags: ['missingness', 'workflow', 'measurement opportunity'],
        body:
          'Missing fields cluster by location, shift, language workflow, and fast admission path rather than appearing evenly across the cohort.',
        panelTitle: 'Percent missing by encounter group',
        panelBadge: 'post-workflow',
        chartLabel: 'Missing clinical fields by encounter group',
        columns: ['Vitals', 'Lactate', 'Acuity', 'Language'],
        rows: [
          {
            label: 'Day monitored bed',
            cells: [
              { label: 'vitals', value: '4%', level: 'low', note: 'low missingness' },
              { label: 'lactate', value: '8%', level: 'low', note: 'often not ordered for low-risk patients' },
              { label: 'acuity', value: '2%', level: 'low', note: 'triage screen usually complete' },
              { label: 'language', value: '6%', level: 'low', note: 'registration usually complete' },
            ],
          },
          {
            label: 'Night monitored bed',
            cells: [
              { label: 'vitals', value: '9%', level: 'low', note: 'moderate overnight gap' },
              { label: 'lactate', value: '18%', level: 'medium', note: 'delayed lab draw or not ordered' },
              { label: 'acuity', value: '7%', level: 'low', note: 'screen mostly complete' },
              { label: 'language', value: '11%', level: 'medium', note: 'registration lag' },
            ],
          },
          {
            label: 'Hallway bed',
            cells: [
              { label: 'vitals', value: '21%', level: 'high', note: 'measurement opportunity differs' },
              { label: 'lactate', value: '38%', level: 'critical', note: 'lab often delayed or missed' },
              { label: 'acuity', value: '16%', level: 'medium', note: 'triage screen interrupted' },
              { label: 'language', value: '24%', level: 'high', note: 'registration often incomplete' },
            ],
          },
          {
            label: 'Interpreter needed',
            cells: [
              { label: 'vitals', value: '18%', level: 'medium', note: 'delays during intake' },
              { label: 'lactate', value: '29%', level: 'high', note: 'orders lag when history is incomplete' },
              { label: 'acuity', value: '12%', level: 'medium', note: 'screen may wait for interpreter' },
              { label: 'language', value: '43%', level: 'critical', note: 'preferred language missing in registration field' },
            ],
          },
          {
            label: 'Fast admit or transfer',
            cells: [
              { label: 'vitals', value: '14%', level: 'medium', note: 'record closes quickly' },
              { label: 'lactate', value: '34%', level: 'high', note: 'lab result arrives after ED record handoff' },
              { label: 'acuity', value: '11%', level: 'medium', note: 'screen sometimes bypassed' },
              { label: 'language', value: '19%', level: 'high', note: 'registration completed later upstream' },
            ],
          },
        ],
        stats: [
          { label: 'Dropped rows', value: '31%', note: 'after complete-case filter' },
          { label: 'Hallway representation', value: '22% -> 7%', note: 'raw cohort to retained records' },
          { label: 'Interpreter flag gap', value: '43%', note: 'preferred language missing when interpreter needed' },
        ],
      },
      {
        id: 'ev-1303',
        type: 'chart',
        render: 'sample-composition-panel',
        title: 'Full cohort versus retained records',
        sourceLabel: 'Cohort composition check',
        reliability: 'high',
        unlock: 'initial',
        tags: ['composition', 'complete case', 'selection'],
        body:
          'The complete-case dataset overrepresents easier-to-document encounters and underrepresents groups where measurement is harder.',
        panelTitle: 'Raw cohort compared with complete-case dataset',
        panelBadge: 'N=13,180',
        groups: [
          { label: 'English documented at registration', population: '71%', responses: '84%', populationWidth: '71%', responseWidth: '84%', note: 'preferred language field present' },
          { label: 'Hallway bed at triage', population: '22%', responses: '7%', populationWidth: '22%', responseWidth: '7%', note: 'temporary location before monitored room' },
          { label: 'Night shift arrival', population: '39%', responses: '24%', populationWidth: '39%', responseWidth: '24%', note: '7 PM to 7 AM arrivals' },
          { label: 'EMS or high-acuity arrival', population: '28%', responses: '16%', populationWidth: '28%', responseWidth: '16%', note: 'fast workup or transfer path' },
        ],
      },
      {
        id: 'ev-1304',
        type: 'table',
        render: 'artifact-table',
        title: 'Excluded-record outcome check',
        sourceLabel: 'Outcome join after filtering',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['excluded records', 'outcomes', 'selection'],
        body:
          'Outcomes available after the fact suggest incomplete records are not simply low-information, low-risk encounters.',
        columns: ['Outcome', 'Complete records', 'Incomplete records', 'Interpretation'],
        rows: [
          ['Admitted to hospital', '38%', '57%', 'excluded group is sicker or harder to route'],
          ['ICU transfer within 24h', '4.8%', '8.9%', 'risk differs after filter'],
          ['Return ED visit within 7d', '6.4%', '11.8%', 'follow-up burden differs'],
          ['Sepsis alert later in stay', '7.6%', '13.2%', 'risk can emerge after missing intake fields'],
        ],
      },
      {
        id: 'ev-1305',
        type: 'audio',
        title: 'Triage nurse handoff',
        sourceLabel: 'Night-shift huddle recording',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['workflow', 'measurement opportunity', 'clinical context'],
        speaker: 'ED Triage Nurse',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-013-triage-nurse-handoff.wav',
        },
        transcript:
          'Overnight, we get vitals first and labs later if the hallway is full. A quiet chart is not always low-risk. Sometimes nobody had a clean moment to finish the screen.',
        body:
          'The handoff explains why missing fields can reflect workflow pressure and measurement opportunity, not just random clerical noise.',
      },
      {
        id: 'ev-1306',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Analyst notebook excerpt',
        sourceLabel: 'Modeling notebook comment',
        reliability: 'high',
        unlock: 'initial',
        tags: ['pipeline', 'filtering', 'assumption'],
        body:
          'The code drops incomplete records before cohort counts, subgroup checks, or outcome comparisons are computed.',
        memo: [
          'Step 02: select adult ED arrivals.',
          'Step 03: drop rows missing lactate, first full vitals set, acuity score, or preferred language.',
          'Step 04: run pre/post risk comparison on retained rows.',
          'Comment: "complete-case cohort avoids imputation complexity."',
        ],
      },
      {
        id: 'ev-1307',
        type: 'table',
        render: 'artifact-table',
        title: 'Language access slice',
        sourceLabel: 'Registration and interpreter log join',
        reliability: 'high',
        unlock: 'initial',
        tags: ['language access', 'subgroup', 'missingness'],
        body:
          'Preferred-language missingness is concentrated among encounters with interpreter workflow markers, so the missing field is related to the very subgroup question the committee wants to close.',
        columns: ['Encounter group', 'Preferred language missing', 'Complete risk screen', 'Committee relevance'],
        rows: [
          ['No interpreter marker', '7%', '76%', 'baseline documentation pattern'],
          ['Interpreter requested', '43%', '39%', 'subgroup largely filtered out'],
          ['Interpreter delayed >30m', '51%', '31%', 'workflow gap overlaps risk-screen gap'],
          ['Family interpreted before staff interpreter', '47%', '34%', 'field often completed after triage'],
        ],
      },
      {
        id: 'ev-1308',
        type: 'table',
        render: 'artifact-table',
        title: 'Lab operations context',
        sourceLabel: 'ED lab operations log',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['context', 'red herring', 'workflow'],
        body:
          'A lactate analyzer delay explains some missing labs, but the missingness pattern remains after the outage window is removed.',
        columns: ['Period', 'Analyzer status', 'Lactate missing', 'Note'],
        rows: [
          ['Week 1', 'normal', '17%', 'routine baseline'],
          ['Week 2', 'maintenance delay', '31%', 'visible lab disruption'],
          ['Week 3', 'normal', '20%', 'hallway and night gaps continue'],
          ['Week 4', 'normal', '22%', 'interpreter-needed gap persists'],
        ],
      },
      {
        id: 'ev-1309',
        type: 'table',
        render: 'artifact-table',
        title: 'Sensitivity check',
        sourceLabel: 'Analytics scratch analysis',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['sensitivity', 'uncertainty', 'assumptions'],
        body:
          'Reasonable assumptions about excluded records change the readout. Imputation helps only after the missingness mechanism is made explicit.',
        columns: ['Analysis', 'Post-workflow mean risk', 'Risk gap flag', 'Caveat'],
        rows: [
          ['Complete cases only', '13.2%', 'none', 'excludes 31% of records'],
          ['Assume excluded same as retained', '13.3%', 'none', 'strong assumption'],
          ['Weight by shift, bed location, language marker', '15.6%', 'possible', 'uses observed missingness drivers'],
          ['Audit-informed bounds', '14.4% to 17.8%', 'cannot close', 'wide but clinically important'],
        ],
      },
      {
        id: 'ev-1310',
        type: 'table',
        render: 'artifact-table',
        title: 'Manual chart audit',
        sourceLabel: 'Quality nurse spot check',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['audit', 'ground truth', 'workflow'],
        body:
          'A small chart audit gives concrete reasons that fields are missing and shows why missingness is connected to care context.',
        columns: ['Audit finding among 60 incomplete charts', 'Count', 'Common path', 'Reviewer note'],
        rows: [
          ['Vitals documented later than model window', '18', 'hallway bed', 'not absent clinically, absent in extract window'],
          ['Lactate resulted after inpatient handoff', '14', 'fast admit', 'ED record incomplete before transfer'],
          ['Acuity screen interrupted', '11', 'night surge', 'triage resumed after treatment started'],
          ['Preferred language completed after triage', '16', 'interpreter workflow', 'subgroup field arrives late'],
        ],
      },
      {
        id: 'ev-1311',
        type: 'table',
        render: 'artifact-table',
        title: 'Risk bucket calibration note',
        sourceLabel: 'Model validation appendix',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['model validation', 'calibration', 'limits'],
        body:
          'The model calibrates reasonably inside complete cases, but the excluded group is not validated because it is not scored.',
        columns: ['Risk bucket', 'Complete-case observed event rate', 'Incomplete record count', 'Validation issue'],
        rows: [
          ['0-5%', '2.1%', '1,020', 'not scored'],
          ['5-15%', '8.8%', '1,780', 'not scored'],
          ['15-30%', '18.9%', '940', 'not scored'],
          ['30%+', '36.4%', '360', 'not scored, high acuity often incomplete'],
        ],
      },
      {
        id: 'ev-1312',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Claim revision draft',
        sourceLabel: 'Reviewer margin note',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['next step', 'reporting', 'decision'],
        body:
          'The reviewer sketches a report revision that keeps the useful complete-case signal but prevents an unsupported clinical claim.',
        memo: [
          'Report raw cohort, retained cohort, and excluded cohort side by side.',
          'Model missingness as an outcome by shift, location, language marker, acuity, and fast-transfer path.',
          'Run audit-informed sensitivity bounds before saying risk is stable.',
          'Treat intake documentation as a workflow signal, not merely a data cleaning nuisance.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'structured-missingness',
        label:
          'The complete-case report is useful but narrow; structured missingness makes the broad stable-risk claim unsafe',
        scoreClass: 'correct',
      },
      {
        id: 'stable-risk',
        label:
          'Stable risk among complete records proves the workflow did not change the clinical risk profile',
        scoreClass: 'incorrect',
      },
      {
        id: 'impute-and-move',
        label:
          'Multiple imputation should settle the issue as long as the final risk estimate remains stable',
        scoreClass: 'partial',
      },
      {
        id: 'discard-report',
        label:
          'The report should be discarded because missing clinical fields invalidate the entire analysis',
        scoreClass: 'partial',
      },
      {
        id: 'documentation-only',
        label:
          'The missing fields are mainly documentation quality problems and should be separated from clinical judgment',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'approve-committee-claim',
        label:
          'Approve the committee claim that risk stayed stable and intake documentation can be deprioritized',
        scoreClass: 'incorrect',
      },
      {
        id: 'qualify-and-audit',
        label:
          'Qualify the complete-case result, characterize missingness, audit excluded charts, and run sensitivity checks before clinical action',
        scoreClass: 'correct',
      },
      {
        id: 'impute-only',
        label:
          'Run imputation, publish the revised estimate if it stays close, and keep the committee narrative',
        scoreClass: 'partial',
      },
      {
        id: 'stop-all-reporting',
        label:
          'Stop all sepsis-risk reporting until intake documentation is nearly complete',
        scoreClass: 'partial',
      },
      {
        id: 'exclude-high-missingness-sites',
        label:
          'Exclude hallway and interpreter-needed encounters from the quality report so the metric stays comparable',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: ['ev-1302', 'ev-1303', 'ev-1304', 'ev-1306', 'ev-1307', 'ev-1309', 'ev-1310', 'ev-1312'],
    replay: {
      expertDecision:
        'Do not approve the broad committee claim. The complete-case report can describe retained records, but the missingness pattern is structured by bed location, shift, language workflow, and acuity. Those same factors plausibly relate to risk and care process. The defensible path is to report the complete-case finding as limited evidence, characterize and audit the excluded records, and use sensitivity analysis before deciding that intake documentation no longer needs attention.',
      whatMattered: [
        'The missingness heatmap shows absence is patterned, not random.',
        'The composition panel shows complete cases overrepresent easier-to-document encounters.',
        'The excluded-record outcome check shows dropped records have different downstream outcomes.',
        'The notebook excerpt reveals the filter happened before subgroup and cohort checks.',
        'The language access slice ties missingness to a clinically relevant access workflow.',
        'The sensitivity check shows the conclusion changes under reasonable assumptions.',
        'The chart audit explains missingness through workflow and measurement opportunity.',
      ],
      misleadingEvidence: [
        'A stable complete-case dashboard feels reassuring because the retained records are internally consistent.',
        'A lab outage explains part of the gap, but it does not explain the broader structured pattern.',
        'Imputation is tempting, but it cannot substitute for understanding why measurements are absent.',
        'Treating missingness as clerical noise hides the connection between documentation opportunity and clinical context.',
      ],
      sequence: [
        'The quality committee asks whether sepsis risk changed after a triage workflow update.',
        'The analyst drops incomplete records to avoid imputation complexity.',
        'The retained cohort shows stable risk and stable observed outcomes.',
        'Missingness checks reveal excluded records cluster by hallway beds, nights, interpreter workflows, and fast transfers.',
        'Outcome joins and chart audits show the excluded group is clinically different.',
        'The report is revised to separate observed complete-case evidence from unmeasured risk in excluded records.',
      ],
      trap:
        'The case tests whether you treat missing data as a signal about the data-generating process instead of a cleanup detail.',
      transfer:
        'For missing data, compare raw and retained cohorts, inspect missingness drivers, audit excluded records, state assumptions, and avoid using complete-case stability as population stability.',
    },
  },
  'case-014': {
    id: 'case-014',
    slug: 'privacy-safe-export',
    title: 'The Privacy-Safe Export',
    set: 'evidence-integrity',
    sequence: 14,
    status: 'active',
    difficulty: 'advanced',
    domain: 'Data governance',
    estimatedMinutes: 12,
    caseType: 'governance-review',
    judgmentType: 'multi',
    summary:
      'A de-identified public health export clears a checklist, but linkage, consent scope, and lifecycle controls make the release less simple.',
    skills: ['privacy risk review', 'governance judgment', 'stakeholder communication'],
    concepts: ['re-identification risk', 'consent boundaries', 'data minimization'],
    mediaTypes: ['policy', 'memo', 'table', 'diagram', 'audio'],
    briefing:
      'A county public health office is preparing to share a de-identified overdose outreach dataset with a university research team and a technical vendor. Names, addresses, and direct identifiers have been removed. The grant milestone depends on releasing the file this week, and the project sponsor describes it as privacy-safe.',
    role:
      'You are the data governance reviewer. Decide whether the proposed export is ready to release, what risks still matter, and what controls or redesign would make sharing defensible.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Grant deadline voicemail',
      speaker: 'Program Director',
      duration: '0:13',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-014-grant-deadline-voicemail.wav',
      },
      transcript:
        'The university team says the file has no names, no addresses, and only shifted dates. If privacy is comfortable, I need to release it this week so the grant milestone does not slip.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the proposed data export?',
    evidence: [
      {
        id: 'ev-1401',
        type: 'table',
        render: 'artifact-table',
        title: 'De-identification clearance sheet',
        sourceLabel: 'Privacy office checklist',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['clearance', 'de-identification', 'checklist'],
        body:
          'The export passed the standard direct-identifier checklist. The sheet does not evaluate recipient linkage, consent scope, or retention.',
        columns: ['Element', 'Proposed handling', 'Checklist result', 'Open issue'],
        rows: [
          ['Name and client ID', 'removed', 'pass', 'no direct identifiers'],
          ['Street address', 'converted to census tract', 'pass', 'small tracts remain identifying'],
          ['Encounter date', 'shifted by +/- 14 days', 'pass', 'month and sequence preserved'],
          ['Provider and program codes', 'retained', 'not reviewed', 'rare combinations remain visible'],
        ],
      },
      {
        id: 'ev-1402',
        type: 'audio',
        title: 'Grant deadline voicemail',
        sourceLabel: 'Program office note',
        reliability: 'low',
        unlock: 'initial',
        tags: ['deadline', 'pressure', 'claim'],
        speaker: 'Program Director',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-014-grant-deadline-voicemail.wav',
        },
        transcript:
          'The university team says the file has no names, no addresses, and only shifted dates. If privacy is comfortable, I need to release it this week so the grant milestone does not slip.',
        body:
          'The sponsor frames the release as administratively safe because obvious identifiers have been removed and the grant timeline is tight.',
      },
      {
        id: 'ev-1403',
        type: 'table',
        render: 'artifact-table',
        title: 'Export field inventory',
        sourceLabel: 'Data steward extract preview',
        reliability: 'high',
        unlock: 'initial',
        tags: ['fields', 'quasi-identifiers', 'data minimization'],
        body:
          'The file contains no names, but it retains granular context about place, service pathway, timing, and rare client circumstances.',
        columns: ['Field group', 'Examples retained', 'Analysis value', 'Privacy concern'],
        rows: [
          ['Location', 'census tract, provider site code', 'neighborhood outreach pattern', 'small tract plus site can identify clients'],
          ['Timing', 'shifted encounter date, release month', 'sequence of outreach episodes', 'public events can still align by month'],
          ['Service path', 'shelter referral, jail-release flag, naloxone visit', 'program evaluation', 'rare combinations are linkable'],
          ['Notes-derived codes', 'pregnancy flag, encampment closure, family contact', 'needs profile', 'sensitive even without names'],
        ],
      },
      {
        id: 'ev-1404',
        type: 'heatmap',
        render: 'missingness-heatmap-panel',
        title: 'Linkage risk surface',
        sourceLabel: 'Privacy threat model worksheet',
        reliability: 'high',
        unlock: 'initial',
        tags: ['linkage', 'risk surface', 'threat model'],
        body:
          'Risk is uneven: rare pathways and small-place records become more identifiable when combined with public or partner-held datasets.',
        panelTitle: 'Risk by record pattern',
        panelBadge: 'name-free file',
        chartLabel: 'Privacy risk surface for proposed export',
        columns: ['Uniqueness', 'Outside link', 'Sensitivity', 'Control gap'],
        rows: [
          {
            label: 'Rural tract + one provider',
            cells: [
              { label: 'uniqueness', value: 'high', level: 'high', note: 'few clients per month' },
              { label: 'outside link', value: 'medium', level: 'medium', note: 'provider schedule and public geography' },
              { label: 'sensitivity', value: 'high', level: 'high', note: 'substance use outreach' },
              { label: 'control gap', value: 'medium', level: 'medium', note: 'recipient can retain row-level data' },
            ],
          },
          {
            label: 'Jail release + overdose visit',
            cells: [
              { label: 'uniqueness', value: 'high', level: 'high', note: 'small monthly counts' },
              { label: 'outside link', value: 'high', level: 'high', note: 'public court and release records' },
              { label: 'sensitivity', value: 'critical', level: 'critical', note: 'criminal legal and health status' },
              { label: 'control gap', value: 'high', level: 'high', note: 'vendor training use not barred' },
            ],
          },
          {
            label: 'Youth housing referral',
            cells: [
              { label: 'uniqueness', value: 'medium', level: 'medium', note: 'few youth referrals by tract' },
              { label: 'outside link', value: 'medium', level: 'medium', note: 'school and shelter networks overlap' },
              { label: 'sensitivity', value: 'critical', level: 'critical', note: 'minor or transitional-age youth data' },
              { label: 'control gap', value: 'high', level: 'high', note: 'consent language excludes broad partner reuse' },
            ],
          },
          {
            label: 'Common naloxone training',
            cells: [
              { label: 'uniqueness', value: 'low', level: 'low', note: 'many records' },
              { label: 'outside link', value: 'low', level: 'low', note: 'limited individual linkage' },
              { label: 'sensitivity', value: 'medium', level: 'medium', note: 'program participation still sensitive' },
              { label: 'control gap', value: 'medium', level: 'medium', note: 'retention still undefined' },
            ],
          },
        ],
        stats: [
          { label: 'High-risk rows', value: '18%', note: 'rare pathway or small-place combinations' },
          { label: 'Consent mismatch', value: '3 fields', note: 'partner reuse not clearly covered' },
          { label: 'Retention term', value: 'open', note: 'no destruction date in draft DUA' },
        ],
      },
      {
        id: 'ev-1405',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Consent language excerpt',
        sourceLabel: 'Client intake form',
        reliability: 'high',
        unlock: 'initial',
        tags: ['consent', 'scope', 'purpose'],
        body:
          'The form permits care coordination and program evaluation, but it does not clearly authorize broad external reuse or vendor model training.',
        memo: [
          'Clients authorize sharing for care coordination among named local service partners.',
          'Program evaluation may use de-identified information to improve county services.',
          'The form does not mention university data linkage, vendor-hosted analysis, or indefinite retention.',
          'The form promises that participation will not affect housing or treatment eligibility.',
        ],
      },
      {
        id: 'ev-1406',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Partner analysis plan',
        sourceLabel: 'University and vendor request',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['recipient', 'purpose', 'onward use'],
        body:
          'The request asks for row-level detail and preserves flexibility for future predictive modeling.',
        memo: [
          'Primary goal: evaluate outreach timing after overdose events.',
          'Secondary goal: prototype a model to prioritize future outreach.',
          'Vendor will host the working file and may create reusable feature pipelines.',
          'The request asks to keep row-level data for "future related public health projects."',
        ],
      },
      {
        id: 'ev-1407',
        type: 'table',
        render: 'artifact-table',
        title: 'External linkage scan',
        sourceLabel: 'Privacy analyst scratch table',
        reliability: 'high',
        unlock: 'initial',
        tags: ['linkage', 'outside data', 're-identification'],
        body:
          'Several outside datasets can narrow identity when combined with the export, especially for rare pathways and small geographies.',
        columns: ['Outside source', 'Fields that line up', 'Who could access it', 'Risk note'],
        rows: [
          ['EMS incident log', 'month, tract, overdose response', 'public records request', 'date shift weakens but does not remove sequence matching'],
          ['Jail release roster', 'release month, age band, gender', 'public or partner-held', 'sensitive combination with outreach visit'],
          ['Shelter bed dashboard', 'site, month, referral path', 'local service network', 'small counts in rural tracts'],
          ['News or encampment notices', 'closure event, tract, month', 'public web', 'rare notes-derived code can align to event'],
        ],
      },
      {
        id: 'ev-1408',
        type: 'diagram',
        render: 'retraining-diff',
        title: 'Agreement gap compare',
        sourceLabel: 'Draft data use agreement',
        reliability: 'high',
        unlock: 'initial',
        tags: ['dua', 'governance', 'controls'],
        body:
          'The draft agreement has purpose language, but it lacks several controls needed for sensitive row-level sharing.',
        before: {
          title: 'Current draft',
          items: [
            'broad public health research purpose',
            'recipient may use approved subcontractor',
            'row-level file retained until project completion',
            'no explicit linkage, audit, or destruction clause',
          ],
        },
        after: {
          title: 'Controls needed',
          items: [
            'specific analysis purpose and no unrelated reuse',
            'named users, access tier, and audit logs',
            'bar onward sharing and model training without review',
            'destruction date, incident owner, and linkage limits',
          ],
        },
      },
      {
        id: 'ev-1409',
        type: 'chart',
        render: 'sample-composition-panel',
        title: 'Risk is not evenly distributed',
        sourceLabel: 'Subgroup identifiability check',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['uneven risk', 'subgroup', 'harm'],
        body:
          'The release risk falls disproportionately on small subgroups, even when the global file looks adequately masked.',
        panelTitle: 'Share of full file versus high-linkage rows',
        panelBadge: 'n=18,420 rows',
        groups: [
          { label: 'Common urban outreach', population: '58%', responses: '21%', populationWidth: '58%', responseWidth: '21%', note: 'many records, lower uniqueness' },
          { label: 'Rural single-provider tracts', population: '9%', responses: '28%', populationWidth: '9%', responseWidth: '28%', note: 'small counts and visible provider patterns' },
          { label: 'Post-release outreach', population: '7%', responses: '24%', populationWidth: '7%', responseWidth: '24%', note: 'linkable to legal-system records' },
          { label: 'Youth housing referrals', population: '4%', responses: '13%', populationWidth: '4%', responseWidth: '13%', note: 'small, sensitive subgroup' },
        ],
      },
      {
        id: 'ev-1410',
        type: 'audio',
        title: 'Community partner warning',
        sourceLabel: 'Service partner call',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['community risk', 'linkage', 'harm'],
        speaker: 'Community Services Director',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-014-community-partner-warning.wav',
        },
        transcript:
          'In a small tract, shelter, release month, and outreach visit is enough for people to guess who it is. The file may be name-free, but the story is not anonymous here.',
        body:
          'A partner who knows the service ecosystem explains how local context can turn quasi-identifiers into recognizable stories.',
      },
      {
        id: 'ev-1411',
        type: 'table',
        render: 'artifact-table',
        title: 'Minimization redesign table',
        sourceLabel: 'Data governance working note',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['minimization', 'utility', 'redesign'],
        body:
          'The analysis goals can be supported with less precise and more controlled data than the original export request asks for.',
        columns: ['Original field', 'Stated analytic value', 'Safer replacement', 'Residual tradeoff'],
        rows: [
          ['census tract', 'neighborhood pattern', 'tract clusters or county planning zone', 'less local detail'],
          ['shifted encounter date', 'timing after overdose', 'week number or month relative to event', 'less sequence precision'],
          ['jail-release flag', 'risk factor modeling', 'separate restricted enclave variable', 'requires tiered access'],
          ['notes-derived sensitive flags', 'needs segmentation', 'aggregate service categories', 'less granular subgrouping'],
        ],
      },
      {
        id: 'ev-1412',
        type: 'timeline',
        title: 'Lifecycle control timeline',
        sourceLabel: 'Governance review calendar',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['retention', 'lifecycle', 'review'],
        body:
          'The release can be redesigned as a staged access decision with review gates instead of a one-time file handoff.',
        entries: [
          ['Before release', 'Approve minimum necessary fields and tiered access plan.'],
          ['Week 1', 'Recipient receives aggregate file; enclave review required for restricted fields.'],
          ['Month 2', 'Linkage request reviewed against consent, purpose, and community risk.'],
          ['Month 6', 'Audit logs and outputs reviewed before any model prototype leaves enclave.'],
          ['Month 9', 'Destroy row-level working file or renew with documented public-health need.'],
        ],
      },
    ],
    hypotheses: [
      {
        id: 'qualified-controlled-release',
        label:
          'The file is not ready as proposed, but a minimized, purpose-limited, access-controlled release could be defensible',
        scoreClass: 'correct',
      },
      {
        id: 'safe-because-deidentified',
        label:
          'The file is safe to release because direct identifiers are removed and dates are shifted',
        scoreClass: 'incorrect',
      },
      {
        id: 'good-purpose-overrides',
        label:
          'The public health purpose is strong enough to accept residual privacy risk under the current draft',
        scoreClass: 'incorrect',
      },
      {
        id: 'never-share-sensitive',
        label:
          'Sensitive outreach data should never be shared outside the county, even with stronger controls',
        scoreClass: 'partial',
      },
      {
        id: 'aggregate-only',
        label:
          'Only aggregate tables should be shared; row-level access is never justified for this project',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'release-now',
        label:
          'Release the proposed row-level export this week because it passed the direct-identifier checklist',
        scoreClass: 'incorrect',
      },
      {
        id: 'minimize-and-control',
        label:
          'Share only the needed fields through tiered access, consent alignment, linkage review, and retention controls',
        scoreClass: 'correct',
      },
      {
        id: 'legal-signoff-only',
        label:
          'Seek legal signoff on the current file and release if counsel agrees it is de-identified',
        scoreClass: 'partial',
      },
      {
        id: 'aggregate-public-file',
        label:
          'Replace the export with public aggregate tables and deny all row-level partner access',
        scoreClass: 'partial',
      },
      {
        id: 'vendor-hosted-safe',
        label:
          'Allow the vendor to host and reuse the file because the university partner is accountable for the project',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: ['ev-1403', 'ev-1404', 'ev-1405', 'ev-1407', 'ev-1408', 'ev-1409', 'ev-1411', 'ev-1412'],
    replay: {
      expertDecision:
        'Do not release the proposed file as-is. Removing names and addresses is not enough when the file retains small-place, rare-pathway, timing, and sensitive service information that can be linked to outside datasets. The right move is a constrained release: minimize fields, separate aggregate and restricted access tiers, align use with consent, prohibit unrelated reuse and onward sharing, define retention and destruction, and document residual risk before sharing.',
      whatMattered: [
        'The field inventory shows quasi-identifiers and sensitive derived fields remain in the file.',
        'The linkage risk surface shows risk varies by record pattern, not just by the global checklist.',
        'The consent excerpt limits purpose and does not clearly authorize broad partner reuse.',
        'The external linkage scan shows plausible identity narrowing from public and partner-held datasets.',
        'The agreement comparison exposes missing lifecycle and recipient controls.',
        'The subgroup check shows high-linkage risk is concentrated among vulnerable groups.',
        'The minimization table shows the analysis can be supported with safer replacements.',
      ],
      misleadingEvidence: [
        'A name-free file can still be recognizable in a small local service ecosystem.',
        'Date shifting helps, but it does not erase month-level sequences or rare program paths.',
        'A good public health purpose does not remove the need for consent alignment and governance controls.',
        'Global masking metrics can hide concentrated risk for small, sensitive subgroups.',
      ],
      sequence: [
        'The program office prepares a de-identified outreach export for a grant partner.',
        'The checklist removes direct identifiers and clears basic transformations.',
        'The retained fields preserve location, sequence, service path, and sensitive rare combinations.',
        'Threat modeling reveals linkage paths through public and partner-held data.',
        'Consent and draft agreement language do not cover all proposed uses or lifecycle risks.',
        'The release is redesigned as a minimized, tiered, purpose-limited data-sharing plan.',
      ],
      trap:
        'The case tests whether you treat privacy as a contextual release decision rather than a mechanical masking checklist.',
      transfer:
        'For sensitive exports, inspect quasi-identifiers, outside linkage, subgroup risk, consent scope, data minimization, recipient incentives, onward sharing, retention, and incident ownership.',
    },
  },
  'case-015': {
    id: 'case-015',
    slug: 'cropped-chart-readout',
    title: 'The Board Slide',
    set: 'evidence-integrity',
    sequence: 15,
    status: 'active',
    difficulty: 'intro',
    domain: 'Executive reporting',
    estimatedMinutes: 9,
    caseType: 'visualization-cross-exam',
    judgmentType: 'multi',
    summary:
      'A board packet turns an early operational shift into a dramatic story, and the chart frame is doing more work than it first appears.',
    skills: ['visualization critique', 'scale interpretation', 'claim wording'],
    concepts: ['axis truncation', 'visual rhetoric', 'practical significance'],
    mediaTypes: ['chart', 'memo', 'table', 'audio'],
    briefing:
      'A community legal-aid nonprofit is preparing a board deck about a new eviction-prevention intake model. One chart shows the share of opened cases resolved without eviction rising from 92.1 percent to 94.0 percent over six months. The proposed headline says the model "cut failures nearly in half."',
    role:
      'You are the analytics reviewer. Decide whether the chart and headline are defensible, what the evidence actually supports, and how the board view should be revised.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Board deck voicemail',
      speaker: 'Executive Director',
      duration: '0:11',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-015-board-deck-voicemail.wav',
      },
      transcript:
        'The chart finally shows the intake model bending the line. If analytics is comfortable, I want the board slide to say failures were cut nearly in half.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the board chart and headline?',
    evidence: [
      {
        id: 'ev-1501',
        type: 'chart',
        render: 'cropped-chart-panel',
        title: 'Board slide chart',
        sourceLabel: 'Executive deck draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['chart frame', 'axis', 'claim'],
        body:
          'The chart is labeled correctly, but the cropped scale makes a modest rate change look like a steep operational break.',
        panelTitle: 'Same series, two visual frames',
        panelBadge: 'resolution rate',
        points: [
          { label: 'Jan', value: 92.1, display: '92.1%' },
          { label: 'Feb', value: 92.3, display: '92.3%' },
          { label: 'Mar', value: 92.8, display: '92.8%' },
          { label: 'Apr', value: 93.1, display: '93.1%' },
          { label: 'May', value: 93.6, display: '93.6%' },
          { label: 'Jun', value: 94.0, display: '94.0%' },
        ],
        views: [
          { title: 'Board crop', min: 91, max: 95, axisLabel: 'Axis 91-95%' },
          { title: 'Context scale', min: 0, max: 100, axisLabel: 'Axis 0-100%' },
        ],
        notes: [
          { label: 'Rate change', value: '+1.9 pts', note: 'January to June' },
          { label: 'Failure-rate change', value: '-24%', note: '7.9% to 6.0%, not half' },
          { label: 'Target', value: '95%', note: 'board threshold not yet reached' },
        ],
      },
      {
        id: 'ev-1502',
        type: 'audio',
        title: 'Board deck voicemail',
        sourceLabel: 'Executive director note',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'headline', 'board'],
        speaker: 'Executive Director',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-015-board-deck-voicemail.wav',
        },
        transcript:
          'The chart finally shows the intake model bending the line. If analytics is comfortable, I want the board slide to say failures were cut nearly in half.',
        body:
          'The sponsor turns a visually steep movement into a stronger narrative claim about failures nearly being cut in half.',
      },
      {
        id: 'ev-1503',
        type: 'table',
        render: 'artifact-table',
        title: 'Raw monthly table',
        sourceLabel: 'Case management export',
        reliability: 'high',
        unlock: 'initial',
        tags: ['raw values', 'counts', 'base rate'],
        body:
          'Counts show a real but modest movement. The number of eviction outcomes does not fall as dramatically as the cropped chart suggests.',
        columns: ['Month', 'Opened cases', 'Resolved without eviction', 'Eviction outcomes', 'Resolution rate'],
        rows: [
          ['Jan', '986', '908', '78', '92.1%'],
          ['Feb', '1,012', '934', '78', '92.3%'],
          ['Mar', '1,044', '969', '75', '92.8%'],
          ['Apr', '1,030', '959', '71', '93.1%'],
          ['May', '1,085', '1,016', '69', '93.6%'],
          ['Jun', '1,226', '1,152', '74', '94.0%'],
        ],
      },
      {
        id: 'ev-1504',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Slide copy excerpt',
        sourceLabel: 'Board deck draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['claim wording', 'rhetoric', 'deck'],
        body:
          'The proposed copy makes the visual movement sound larger and more certain than the underlying data supports.',
        memo: [
          'Draft headline: "Intake redesign nearly halves eviction failures."',
          'Subhead: "Resolution rate accelerates after the new triage model."',
          'Footnote: y-axis begins at 91% to show month-to-month movement.',
          'No absolute counts or board target appear on the slide.',
        ],
      },
      {
        id: 'ev-1505',
        type: 'table',
        render: 'artifact-table',
        title: 'Denominator note',
        sourceLabel: 'Reporting rules change log',
        reliability: 'high',
        unlock: 'initial',
        tags: ['denominator', 'inclusion rule', 'comparability'],
        body:
          'A small denominator change starts in April. It does not erase the improvement, but it weakens the clean before/after story.',
        columns: ['Rule', 'Before April', 'After April', 'Effect'],
        rows: [
          ['Opened case counted when', 'intake form submitted', 'attorney accepts case', 'some hard-to-place intakes excluded'],
          ['Same-day court referrals', 'included if intake began', 'included only after attorney assignment', 'late urgent cases less visible'],
          ['Unable to reach after intake', 'included as unresolved', 'excluded after 14 days', 'raises apparent success rate'],
          ['Backfill applied', 'no', 'no', 'old and new months are not perfectly comparable'],
        ],
      },
      {
        id: 'ev-1506',
        type: 'table',
        render: 'artifact-table',
        title: 'Practical threshold card',
        sourceLabel: 'Board KPI policy',
        reliability: 'high',
        unlock: 'initial',
        tags: ['materiality', 'threshold', 'decision use'],
        body:
          'The board previously defined what size of movement should trigger resource changes.',
        columns: ['KPI rule', 'Threshold', 'Current evidence', 'Implication'],
        rows: [
          ['Board target', '95% resolution rate for 3 months', 'June is 94.0%', 'target not met'],
          ['Operationally material shift', '+3 percentage points sustained', '+1.9 points over 6 months', 'promising but below threshold'],
          ['Resource trigger', 'fewer than 60 monthly eviction outcomes', 'June has 74', 'not yet reached'],
          ['Equity guardrail', 'no subgroup deterioration', 'same-day court referrals worsened', 'guardrail unresolved'],
        ],
      },
      {
        id: 'ev-1507',
        type: 'table',
        render: 'artifact-table',
        title: 'Longer baseline pull',
        sourceLabel: 'Analytics historical extract',
        reliability: 'high',
        unlock: 'initial',
        tags: ['baseline', 'volatility', 'time window'],
        body:
          'The six-month upward trend is encouraging, but similar month-to-month movement appears in the prior year without the new model.',
        columns: ['Period', 'Low month', 'High month', 'Range', 'Comment'],
        rows: [
          ['Prior Jan-Jun', '91.7%', '93.5%', '1.8 pts', 'normal seasonal movement'],
          ['Prior Jul-Dec', '92.0%', '94.2%', '2.2 pts', 'court calendar effect'],
          ['Current Jan-Jun', '92.1%', '94.0%', '1.9 pts', 'new model period'],
          ['Post-policy target band', '95.0%+', 'not reached', 'board threshold remains above trend'],
        ],
      },
      {
        id: 'ev-1508',
        type: 'table',
        render: 'artifact-table',
        title: 'Subgroup guardrail',
        sourceLabel: 'Equity review appendix',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['subgroup', 'guardrail', 'hidden harm'],
        body:
          'Aggregate improvement hides deterioration in urgent same-day court referrals, which the denominator change also makes less visible.',
        columns: ['Client pathway', 'Jan-Feb resolution', 'May-Jun resolution', 'Change', 'Note'],
        rows: [
          ['Routine rent arrears', '93.4%', '95.2%', '+1.8 pts', 'largest volume'],
          ['Mediation-ready cases', '94.1%', '96.0%', '+1.9 pts', 'fits triage model'],
          ['Same-day court referrals', '88.6%', '86.9%', '-1.7 pts', 'urgent cases harder to place'],
          ['Spanish-language intake', '90.2%', '90.4%', '+0.2 pts', 'little movement'],
        ],
      },
      {
        id: 'ev-1509',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Analyst caveat note',
        sourceLabel: 'Deck review comment',
        reliability: 'high',
        unlock: 'initial',
        tags: ['analyst', 'revision', 'claim wording'],
        body:
          'The analyst recommends preserving the signal while changing the visual and the claim.',
        memo: [
          'The cropped chart is not unlabeled, but it is carrying too much rhetorical weight.',
          'Show rate, absolute eviction outcomes, and board target together.',
          'Use "modest improvement" or "early positive movement," not "nearly halves failures."',
          'Separate the April reporting-rule change before making a before/after claim.',
        ],
      },
      {
        id: 'ev-1510',
        type: 'audio',
        title: 'Analyst caveat voice note',
        sourceLabel: 'Deck review huddle',
        reliability: 'high',
        unlock: 'initial',
        tags: ['analyst', 'audio', 'revision'],
        speaker: 'Data Analyst',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-015-analyst-caveat-note.wav',
        },
        transcript:
          'The crop makes the month-to-month movement look bigger than it is. I would still show the improvement, but pair it with counts, the denominator change, and the threshold we said would matter.',
        body:
          'The analyst separates visual truth from decision truth: the increase is real, but the presentation and headline need context.',
      },
      {
        id: 'ev-1511',
        type: 'table',
        render: 'artifact-table',
        title: 'Alternative view spec',
        sourceLabel: 'Revised analytics slide outline',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['redesign', 'communication', 'decision support'],
        body:
          'A revised board view makes the same evidence easier to judge without hiding the early positive signal.',
        columns: ['Panel', 'What it shows', 'Why it matters', 'Proposed wording'],
        rows: [
          ['Resolution rate line', '91-95% monitoring scale, clearly labeled', 'useful for operations', 'early upward movement'],
          ['Absolute outcomes', 'monthly eviction outcomes and volume', 'prevents base-rate exaggeration', '74 outcomes in June'],
          ['Target band', '95% for 3 months', 'ties visual to board decision', 'not yet at target'],
          ['Guardrails', 'same-day court and language intake slices', 'protects subgroup performance', 'needs follow-up'],
        ],
      },
      {
        id: 'ev-1512',
        type: 'timeline',
        title: 'Decision timeline',
        sourceLabel: 'Board preparation calendar',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['timeline', 'pressure', 'decision'],
        body:
          'The chart is being used for two different decisions: celebrating progress and approving a resource shift.',
        entries: [
          ['Monday', 'Analytics sends monitoring chart to program leadership.'],
          ['Tuesday', 'Deck draft turns the chart into a "nearly halves failures" headline.'],
          ['Wednesday', 'Board packet closes; resource shift is added as a discussion item.'],
          ['Thursday', 'Equity appendix flags same-day court referrals.'],
          ['Friday', 'Analytics must approve, revise, or block the chart claim.'],
        ],
      },
    ],
    hypotheses: [
      {
        id: 'real-but-overframed',
        label:
          'The chart contains a real early improvement signal, but the cropped frame and headline overstate practical impact and certainty',
        scoreClass: 'correct',
      },
      {
        id: 'chart-proves-success',
        label:
          'The chart proves the intake model dramatically improved eviction-prevention outcomes',
        scoreClass: 'incorrect',
      },
      {
        id: 'axis-invalidates',
        label:
          'The chart shows a board-ready improvement if the cropped axis is labeled and absolute eviction counts are shown beside it',
        scoreClass: 'partial',
      },
      {
        id: 'counts-only',
        label:
          'The board should ignore rates and use only absolute eviction outcome counts',
        scoreClass: 'partial',
      },
      {
        id: 'denominator-only',
        label:
          'The denominator change fully explains the improvement, so the model has no positive signal',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'approve-headline',
        label:
          'Approve the cropped chart and headline saying the model nearly cut failures in half',
        scoreClass: 'incorrect',
      },
      {
        id: 'revise-board-view',
        label:
          'Revise the board slide to show the modest rate gain with counts, targets, denominator notes, and subgroup guardrails; use qualified wording',
        scoreClass: 'correct',
      },
      {
        id: 'remove-chart',
        label:
          'Remove the chart entirely because the axis crop makes it unusable',
        scoreClass: 'partial',
      },
      {
        id: 'full-axis-only',
        label:
          'Use only the 0-100 axis chart and keep the same "nearly halves failures" headline',
        scoreClass: 'incorrect',
      },
      {
        id: 'delay-all-claims',
        label:
          'Delay all board reporting until a full year of post-model data is available',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-1501', 'ev-1503', 'ev-1505', 'ev-1506', 'ev-1507', 'ev-1508', 'ev-1509', 'ev-1511'],
    replay: {
      expertDecision:
        'Do not approve the current board headline. The resolution rate has improved, and a cropped monitoring scale can be legitimate for operational review if it is clearly labeled. But the deck turns a 1.9-point gain into a dramatic causal and practical claim. The board should see the rate movement alongside absolute eviction outcomes, the 95 percent target, the April denominator change, historical volatility, and subgroup guardrails. A defensible headline is early positive movement, not failures nearly cut in half.',
      whatMattered: [
        'The chart comparison shows how the same data changes visually under different scale choices.',
        'The raw monthly table translates the rate movement into counts.',
        'The denominator note shows old and new months are not perfectly comparable.',
        'The KPI card defines what size movement should trigger board action.',
        'The longer baseline shows similar volatility happened before the new model.',
        'The subgroup guardrail shows aggregate improvement can hide deterioration.',
        'The analyst note and revised view spec preserve the useful signal while fixing the claim.',
      ],
      misleadingEvidence: [
        'A correctly labeled cropped axis can still carry an overstated narrative.',
        'Failure-rate relative change sounds dramatic when the base failure rate is already small.',
        'A smooth six-month deck view hides historical volatility and denominator shifts.',
        'A good-looking aggregate trend can distract from target thresholds and subgroup guardrails.',
      ],
      sequence: [
        'A monitoring chart shows resolution rates rising from 92.1 percent to 94.0 percent.',
        'Leadership turns the visual into a board headline about nearly halving failures.',
        'Raw counts, thresholds, and historical pulls show a modest but not decisive improvement.',
        'A reporting-rule change and subgroup guardrail complicate the before/after story.',
        'Analytics revises the board view to show rate, counts, target, denominator, and subgroup context.',
      ],
      trap:
        'The case tests whether you evaluate what a visualization is being used to claim, not just whether the chart is technically labeled.',
      transfer:
        'For executive charts, compare visual scale to claim strength, inspect raw units, denominators, baseline volatility, practical thresholds, uncertainty, and subgroup guardrails.',
    },
  },
  'case-016': {
    id: 'case-016',
    slug: 'geo-test-winner',
    title: 'The Geo Test Winner',
    set: 'causal-designs',
    sequence: 16,
    status: 'active',
    difficulty: 'standard',
    domain: 'Retail media',
    estimatedMinutes: 12,
    caseType: 'geo-test-review',
    judgmentType: 'multi',
    summary:
      'A regional media test appears to win, but market matching, spillover, seasonality, and operational changes keep the counterfactual unsettled.',
    skills: ['causal design critique', 'geo experiment interpretation', 'claim qualification'],
    concepts: ['matched markets', 'interference', 'seasonality', 'counterfactual uncertainty'],
    mediaTypes: ['chart', 'table', 'timeline', 'memo', 'audio'],
    briefing:
      'A home goods retailer tested a retail media package for patio furniture in selected metro areas. The agency readout says treated markets grew 11 percent more than controls during the four-week flight, and the growth team wants to scale the campaign nationally before the summer media window closes.',
    role:
      'You are the causal reviewer. Decide whether the geo test supports a national rollout claim, what alternative explanations remain alive, and what wording or follow-up design would be defensible.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Agency winner voicemail',
      speaker: 'Growth Director',
      duration: '0:13',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-016-agency-winner-voicemail.wav',
      },
      transcript:
        'The treated markets beat control by eleven percent, and the agency wants approval to scale nationally. Unless there is a design blocker, I need a yes or no before media buys lock.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the geo test readout?',
    evidence: [
      {
        id: 'ev-1601',
        type: 'chart',
        render: 'geo-market-panel',
        title: 'Matched market board',
        sourceLabel: 'Agency readout workbook',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['geo test', 'matched markets', 'pre-trend'],
        body:
          'The agency matched treated and control regions on recent sales volume, but several pairs show pre-trend, seasonal, or spillover flags.',
        panelTitle: 'Treated versus control market pairs',
        panelBadge: 'naive lift +11.2%',
        trendMin: 70,
        trendMax: 120,
        pairs: [
          {
            label: 'Mountain pair',
            treated: 'Denver',
            control: 'Columbus',
            lift: '+6.1%',
            risk: 'medium',
            treatedTrend: [82, 86, 91, 96, 101],
            controlTrend: [83, 84, 86, 87, 88],
            flags: ['treated pre-trend steeper', 'control weather lag'],
          },
          {
            label: 'Sunbelt pair',
            treated: 'Phoenix',
            control: 'San Antonio',
            lift: '+18.4%',
            risk: 'high',
            treatedTrend: [91, 96, 103, 111, 118],
            controlTrend: [92, 94, 96, 99, 100],
            flags: ['early patio season', 'inventory boost in treated stores'],
          },
          {
            label: 'Lake pair',
            treated: 'Minneapolis',
            control: 'Kansas City',
            lift: '+3.2%',
            risk: 'medium',
            treatedTrend: [76, 77, 80, 83, 86],
            controlTrend: [78, 81, 84, 88, 90],
            flags: ['control local home show', 'regional TV overlap'],
          },
          {
            label: 'Carolinas pair',
            treated: 'Raleigh',
            control: 'Nashville',
            lift: '+15.0%',
            risk: 'high',
            treatedTrend: [85, 90, 96, 103, 110],
            controlTrend: [86, 87, 89, 91, 92],
            flags: ['commuter spillover', 'competitor closure in treated market'],
          },
        ],
        notes: [
          { label: 'Test clusters', value: '8 + 8', note: 'four pairs shown from the full file' },
          { label: 'Flagged shown pairs', value: '3/4', note: 'visible balance or spillover issue' },
          { label: 'Primary claim', value: '+11.2%', note: 'unadjusted market difference' },
        ],
      },
      {
        id: 'ev-1602',
        type: 'audio',
        title: 'Agency winner voicemail',
        sourceLabel: 'Growth team inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'scale', 'claim'],
        speaker: 'Growth Director',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-016-agency-winner-voicemail.wav',
        },
        transcript:
          'The treated markets beat control by eleven percent, and the agency wants approval to scale nationally. Unless there is a design blocker, I need a yes or no before media buys lock.',
        body:
          'The stakeholder frames the result as a binary scale decision before the test design issues have been resolved.',
      },
      {
        id: 'ev-1603',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Agency readout slide',
        sourceLabel: 'Campaign performance deck',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['claim', 'readout', 'lift'],
        body:
          'The agency converts a treated-versus-control difference into a national causal claim.',
        memo: [
          'Headline: "Geo test proves retail media drives +11.2% incremental sales."',
          'Recommendation: scale nationally for the full patio season.',
          'Analysis: aggregate treated markets versus aggregate control markets.',
          'Footnote: markets selected with sales and media-team input.',
        ],
      },
      {
        id: 'ev-1604',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Pre-analysis plan excerpt',
        sourceLabel: 'Experiment planning doc',
        reliability: 'high',
        unlock: 'initial',
        tags: ['design', 'pre-analysis', 'estimand'],
        body:
          'The planned estimand is local market lift, but the plan does not lock several design details before market selection.',
        memo: [
          'Primary outcome: patio category same-store sales in test geos versus matched control geos.',
          'Unit of assignment: metro area; unit of analysis should be metro area, not store-day.',
          'Markets selected after confirming inventory and local media availability.',
          'No written rule for excluding spillover stores or national promotion weeks.',
        ],
      },
      {
        id: 'ev-1605',
        type: 'table',
        render: 'artifact-table',
        title: 'Pre-period balance table',
        sourceLabel: 'Analytics validation pull',
        reliability: 'high',
        unlock: 'initial',
        tags: ['balance', 'pre-trend', 'matching'],
        body:
          'Treated and control markets look similar on recent sales volume, but not on trend, weather timing, or patio category mix.',
        columns: ['Balance check', 'Treated markets', 'Control markets', 'Concern'],
        rows: [
          ['Four-week pre sales', '$8.8M', '$8.6M', 'volume close'],
          ['Eight-week pre trend', '+7.4%', '+2.1%', 'treated already rising faster'],
          ['Patio share of basket', '18%', '12%', 'treated more seasonal'],
          ['Warm-weather days in flight', '19', '11', 'seasonal demand mismatch'],
        ],
      },
      {
        id: 'ev-1606',
        type: 'timeline',
        title: 'Campaign and seasonality calendar',
        sourceLabel: 'Media operations calendar',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['calendar', 'seasonality', 'coincident events'],
        body:
          'The flight overlaps with weather, local events, and merchandising changes that are not evenly distributed across markets.',
        entries: [
          ['Week -2', 'Treated markets receive patio inventory priority for the media launch.'],
          ['Week 1', 'Retail media CTV and paid social begin in treated markets.'],
          ['Week 2', 'Early warm weekend hits Phoenix, Raleigh, and Denver.'],
          ['Week 3', 'Regional home shows run in Denver and Kansas City.'],
          ['Week 4', 'National email promotion reaches both treated and control loyalty members.'],
        ],
      },
      {
        id: 'ev-1607',
        type: 'table',
        render: 'artifact-table',
        title: 'Market-pair sales readout',
        sourceLabel: 'Finance sales cube',
        reliability: 'high',
        unlock: 'initial',
        tags: ['matched pairs', 'sales', 'heterogeneity'],
        body:
          'The positive result is concentrated in pairs with the strongest design concerns.',
        columns: ['Pair', 'Treated sales change', 'Control sales change', 'Difference', 'Design note'],
        rows: [
          ['Denver-Columbus', '+12.4%', '+6.3%', '+6.1 pts', 'treated pre-trend stronger'],
          ['Phoenix-San Antonio', '+24.2%', '+5.8%', '+18.4 pts', 'weather and inventory mismatch'],
          ['Minneapolis-Kansas City', '+8.5%', '+5.3%', '+3.2 pts', 'regional TV overlap'],
          ['Raleigh-Nashville', '+21.1%', '+6.1%', '+15.0 pts', 'competitor closure and commuter spillover'],
        ],
      },
      {
        id: 'ev-1608',
        type: 'audio',
        title: 'Field sales spillover note',
        sourceLabel: 'Regional operations huddle',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['spillover', 'operations', 'interference'],
        speaker: 'Sales Operations Lead',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-016-field-sales-spillover-note.wav',
        },
        transcript:
          'The border stores are messy. Shoppers saw the test ads on regional TV, some control stores got the same endcap, and our reps moved inventory between territories when demand spiked.',
        body:
          'The field note describes interference between treated and control geos through media exposure, merchandising, and inventory movement.',
      },
      {
        id: 'ev-1609',
        type: 'table',
        render: 'artifact-table',
        title: 'Spillover diagnostic',
        sourceLabel: 'Media and store operations join',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['interference', 'spillover', 'exposure'],
        body:
          'Several control stores had partial campaign exposure or operational changes linked to nearby treated geos.',
        columns: ['Diagnostic', 'Affected controls', 'Observed pattern', 'Why it matters'],
        rows: [
          ['Regional CTV overlap', '23 stores', 'control households reached by treated-market buy', 'control is contaminated'],
          ['Commuter shopping flow', '17 stores', 'loyalty IDs buy in both territories', 'treatment crosses borders'],
          ['Endcap merchandising', '12 stores', 'control stores receive similar display', 'non-media treatment differs'],
          ['Inventory transfer', '9 stores', 'stock moved from controls to treated stores', 'sales capacity changes'],
        ],
      },
      {
        id: 'ev-1610',
        type: 'chart',
        render: 'scenario-range-panel',
        title: 'Counterfactual sensitivity strip',
        sourceLabel: 'Causal review scratch model',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['counterfactual', 'sensitivity', 'causal lift'],
        body:
          'The estimated lift shrinks and becomes uncertain once matching, pre-trends, and spillover are considered.',
        panelTitle: 'Estimated incremental lift under design assumptions',
        panelBadge: 'not a single answer',
        rangeLabel: 'Geo test lift sensitivity',
        markers: [
          { kind: 'high', label: 'agency aggregate', value: '+11.2%', left: '82%' },
          { kind: 'base', label: 'matched/pretrend adjusted', value: '+4.8%', left: '58%' },
          { kind: 'low', label: 'spillover-aware low', value: '-1.0%', left: '36%' },
        ],
        scenarios: [
          { kind: 'high', label: 'Naive readout', value: '+11.2%', note: 'aggregate treated versus control' },
          { kind: 'base', label: 'Adjusted readout', value: '+2% to +7%', note: 'pair and pre-trend sensitivity' },
          { kind: 'low', label: 'Contaminated-control range', value: '-1% to +8%', note: 'spillover and inventory uncertainty' },
        ],
      },
      {
        id: 'ev-1611',
        type: 'table',
        render: 'artifact-table',
        title: 'Inventory and merchandising ledger',
        sourceLabel: 'Retail operations report',
        reliability: 'high',
        unlock: 'initial',
        tags: ['operations', 'co-intervention', 'inventory'],
        body:
          'Treated markets received operational support that was not part of the media treatment as originally defined.',
        columns: ['Operational factor', 'Treated markets', 'Control markets', 'Causal issue'],
        rows: [
          ['Patio set in-stock rate', '94%', '82%', 'availability changes sales response'],
          ['Feature endcap share', '71%', '38%', 'merchandising treatment bundled with media'],
          ['Local sales rep visits', '2.8/store', '1.1/store', 'field execution differs'],
          ['Out-of-stock substitutions', 'lower', 'higher', 'control demand may be censored'],
        ],
      },
      {
        id: 'ev-1612',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Causal review memo',
        sourceLabel: 'Analytics margin note',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['recommendation', 'claim wording', 'follow-up design'],
        body:
          'The reviewer sketches a way to use the evidence without overclaiming and identifies the next design needed.',
        memo: [
          'Do not claim the campaign caused an 11% national sales lift.',
          'Say treated markets outperformed controls, but causal lift is uncertain under matching, seasonality, and spillover concerns.',
          'For scale: run a cleaner geo holdout with locked matched pairs, exposure buffers, inventory controls, and a pre-registered analysis.',
          'If media must proceed, scale as a monitored rollout with reserved holdout markets and narrower claim wording.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'promising-not-decision-grade',
        label:
          'The geo test is directionally promising, but matching, seasonality, spillover, and bundled operations prevent the +11% national causal claim',
        scoreClass: 'correct',
      },
      {
        id: 'geo-test-proves-lift',
        label:
          'The treated markets beat controls by enough to prove the media campaign caused an 11% lift',
        scoreClass: 'incorrect',
      },
      {
        id: 'small-n-only',
        label:
          'The main issue is that the test has too few markets; a larger sample would solve the design concerns',
        scoreClass: 'partial',
      },
      {
        id: 'spillover-means-useless',
        label:
          'Because there is some spillover, the test provides no useful evidence at all',
        scoreClass: 'partial',
      },
      {
        id: 'operations-not-media',
        label:
          'The lift is entirely caused by inventory and merchandising, so media had no effect',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'approve-national-scale',
        label:
          'Approve national rollout and report that the geo test proved an 11% incremental sales lift',
        scoreClass: 'incorrect',
      },
      {
        id: 'qualified-rollout-or-rerun',
        label:
          'Qualify the result as promising but not decision-grade, fix the claim wording, and either rerun with cleaner holdouts or scale with reserved test markets',
        scoreClass: 'correct',
      },
      {
        id: 'cancel-media',
        label:
          'Approve a limited regional scale-up while reserving two clean holdout markets and dropping the national +11% claim',
        scoreClass: 'partial',
      },
      {
        id: 'scale-with-footnote',
        label:
          'Scale to similar warm-weather markets using the adjusted estimate, but do not reserve a holdout',
        scoreClass: 'incorrect',
      },
      {
        id: 'use-adjusted-point',
        label:
          'Replace the headline with the +4.8% adjusted estimate and approve national scale',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-1601', 'ev-1604', 'ev-1605', 'ev-1606', 'ev-1607', 'ev-1608', 'ev-1609', 'ev-1610', 'ev-1611', 'ev-1612'],
    replay: {
      expertDecision:
        'Do not approve the +11% national causal claim. The test is directionally encouraging, but the counterfactual is fragile: treated markets were already trending differently, patio season arrived unevenly, spillover contaminated some controls, and inventory and merchandising support were bundled with media. The defensible readout is that treated markets outperformed controls under a noisy design. To support scale, rerun or preserve holdout markets with locked matching, exposure buffers, inventory controls, and pre-registered analysis.',
      whatMattered: [
        'The market-pair board shows the largest wins come from pairs with balance or spillover flags.',
        'The pre-analysis plan shows market selection and exclusion rules were not fully locked.',
        'The balance table shows treated markets differ on pre-trend, weather, and category mix.',
        'The calendar shows campaign timing overlaps with seasonal and national promotion events.',
        'The spillover note and diagnostic show treated and control geos are not isolated.',
        'The sensitivity strip shows the lift estimate changes under plausible counterfactual assumptions.',
        'The operations ledger shows media is bundled with inventory and merchandising changes.',
      ],
      misleadingEvidence: [
        'Aggregating treated and control markets hides pair-level design problems.',
        'A positive treated-control difference is not automatically a causal effect when the counterfactual is unmatched.',
        'Control contamination can bias estimates in either direction depending on exposure and inventory movement.',
        'A deadline for summer media does not make a noisy geo test decision-grade.',
      ],
      sequence: [
        'The retailer launches a patio media package in selected markets.',
        'The agency compares aggregate treated markets to aggregate controls.',
        'Treated markets outperform controls during the flight.',
        'Design checks reveal pre-trend mismatch, seasonality, spillover, and operational co-interventions.',
        'The causal estimate becomes a range rather than a clean +11% answer.',
        'Analytics recommends qualified wording and a cleaner rollout or rerun design.',
      ],
      trap:
        'The case tests whether you can reconstruct the missing counterfactual in a market-level experiment instead of treating a regional win as proof of national causal lift.',
      transfer:
        'For geo tests, inspect assignment unit, analysis unit, market count, pre-period balance, matched-pair behavior, seasonality, spillover, co-interventions, and whether the claim matches the design.',
    },
  },
  'case-017': {
    id: 'case-017',
    slug: 'parallel-trends-slide',
    title: 'The Parallel Trends Slide',
    set: 'causal-designs',
    sequence: 17,
    status: 'active',
    difficulty: 'standard',
    domain: 'Labor policy',
    estimatedMinutes: 12,
    caseType: 'difference-in-differences-review',
    judgmentType: 'multi',
    summary:
      'A policy brief claims a workforce pilot raised employment, but the comparison group was already drifting away before launch.',
    skills: ['difference-in-differences judgment', 'comparison-group critique', 'causal claim wording'],
    concepts: ['parallel trends', 'event timing', 'placebo checks', 'comparison validity'],
    mediaTypes: ['chart', 'table', 'timeline', 'memo', 'audio'],
    briefing:
      'A state workforce agency piloted a wage-subsidy and coaching program in eight counties with high manufacturing displacement. A legislative briefing slide says employment rose five points more in pilot counties than in comparison counties after launch, proving the program worked. The budget office wants to expand the policy statewide.',
    role:
      'You are the causal reviewer. Decide whether the difference-in-differences slide supports the policy claim, which assumptions are weak, and what wording or follow-up analysis would be defensible.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Policy brief voicemail',
      speaker: 'Workforce Policy Director',
      duration: '0:11',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-017-policy-brief-voicemail.wav',
      },
      transcript:
        'The pilot counties improved five points more than the comparison counties after launch. If analytics is comfortable, we want to say the program caused the employment gain.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the policy brief?',
    evidence: [
      {
        id: 'ev-1701',
        type: 'chart',
        render: 'parallel-trends-panel',
        title: 'Parallel trends slide',
        sourceLabel: 'Legislative briefing chart',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['parallel trends', 'did', 'executive slide'],
        body:
          'The post-launch gap is visible, but the pilot counties were already improving faster before the official launch date.',
        panelTitle: 'Employment rate among eligible displaced workers',
        panelBadge: 'briefing DiD +5.1 pts',
        chartLabel: 'Pilot and comparison county employment rates',
        valueSuffix: '%',
        trendMin: 46,
        trendMax: 62,
        periods: [
          { label: 'Jan', phase: 'pre' },
          { label: 'Feb', phase: 'pre' },
          { label: 'Mar', phase: 'pre' },
          { label: 'Apr', phase: 'pre' },
          { label: 'May', phase: 'post' },
          { label: 'Jun', phase: 'post' },
          { label: 'Jul', phase: 'post' },
        ],
        series: [
          {
            label: 'Pilot counties',
            kind: 'treated',
            note: 'official launch in May',
            values: [48.2, 49.1, 50.7, 52.5, 55.0, 57.7, 59.4],
          },
          {
            label: 'Comparison counties',
            kind: 'comparison',
            note: 'selected for similar January employment',
            values: [48.4, 48.9, 49.3, 49.8, 51.0, 52.1, 52.7],
          },
        ],
        stats: [
          { label: 'Pre slope gap', value: '+2.9 pts', note: 'Jan-Apr pilot minus comparison change' },
          { label: 'Post gap', value: '+6.7 pts', note: 'July pilot minus comparison level' },
          { label: 'Brief claim', value: '+5.1 pts', note: 'simple post-period DiD' },
        ],
      },
      {
        id: 'ev-1702',
        type: 'audio',
        title: 'Policy brief voicemail',
        sourceLabel: 'Budget office inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'claim', 'briefing'],
        speaker: 'Workforce Policy Director',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-017-policy-brief-voicemail.wav',
        },
        transcript:
          'The pilot counties improved five points more than the comparison counties after launch. If analytics is comfortable, we want to say the program caused the employment gain.',
        body:
          'The policy sponsor turns a post-period divergence into a direct causal claim for expansion.',
      },
      {
        id: 'ev-1703',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Briefing slide copy',
        sourceLabel: 'Legislative deck draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['claim wording', 'policy brief', 'overclaim'],
        body:
          'The slide presents a simple difference-in-differences estimate as proof that the pilot caused the employment gain.',
        memo: [
          'Headline: "Pilot counties gained 5.1 points because of Pathways Back."',
          'Method line: employment in pilot counties compared with matched comparison counties before and after launch.',
          'Recommendation: expand program statewide for the next fiscal year.',
          'Appendix chart uses January as the baseline month.',
        ],
      },
      {
        id: 'ev-1704',
        type: 'table',
        render: 'artifact-table',
        title: 'Comparison selection note',
        sourceLabel: 'Evaluation design file',
        reliability: 'high',
        unlock: 'initial',
        tags: ['comparison group', 'selection', 'design'],
        body:
          'Comparison counties were matched mainly on January unemployment and population size, not on pre-period employment trend or industry recovery.',
        columns: ['Selection factor', 'Used in match', 'Pilot counties', 'Comparison counties'],
        rows: [
          ['January eligible-worker employment', 'yes', '48.2%', '48.4%'],
          ['Population size', 'yes', 'similar', 'similar'],
          ['Jan-Apr employment trend', 'no', '+4.3 pts', '+1.4 pts'],
          ['Manufacturing vacancy growth', 'no', '+18%', '+5%'],
          ['Employer network readiness', 'no', 'high', 'mixed'],
        ],
      },
      {
        id: 'ev-1705',
        type: 'timeline',
        title: 'Policy timing ledger',
        sourceLabel: 'Implementation calendar',
        reliability: 'high',
        unlock: 'initial',
        tags: ['timing', 'announcement', 'implementation'],
        body:
          'The official launch date is not the first moment treatment-related behavior changed.',
        entries: [
          ['Feb 10', 'Governor announces pilot counties and employer subsidy pool.'],
          ['Mar 01', 'Pilot counties begin employer outreach and pre-screening referrals.'],
          ['Apr 15', 'First coaching appointments occur under temporary local funds.'],
          ['May 01', 'Official launch date used as the post-period boundary on the slide.'],
          ['Jun 15', 'First subsidized hires recorded in the state system.'],
        ],
      },
      {
        id: 'ev-1706',
        type: 'table',
        render: 'artifact-table',
        title: 'Pre-trend slope check',
        sourceLabel: 'Event-study scratch table',
        reliability: 'high',
        unlock: 'initial',
        tags: ['pre-trend', 'event study', 'assumption'],
        body:
          'A month-by-month pre-period check shows the pilot-comparison gap widening before the policy date used in the deck.',
        columns: ['Month', 'Pilot employment', 'Comparison employment', 'Pilot-comparison gap', 'Note'],
        rows: [
          ['Jan', '48.2%', '48.4%', '-0.2 pts', 'baseline levels nearly identical'],
          ['Feb', '49.1%', '48.9%', '+0.2 pts', 'announcement month'],
          ['Mar', '50.7%', '49.3%', '+1.4 pts', 'pre-screening begins'],
          ['Apr', '52.5%', '49.8%', '+2.7 pts', 'temporary local coaching starts'],
          ['May', '55.0%', '51.0%', '+4.0 pts', 'official launch'],
        ],
      },
      {
        id: 'ev-1707',
        type: 'table',
        render: 'artifact-table',
        title: 'Industry recovery table',
        sourceLabel: 'Labor market context pull',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['context', 'labor market', 'confounding'],
        body:
          'Pilot counties had stronger manufacturing recovery before launch, which affects the untreated employment path.',
        columns: ['Labor market factor', 'Pilot counties', 'Comparison counties', 'Causal concern'],
        rows: [
          ['Manufacturing job postings Jan-Apr', '+18%', '+5%', 'pilot recovery already stronger'],
          ['Major plant reopenings', '3', '0', 'external demand shock'],
          ['Average commute to new vacancies', '18 min', '34 min', 'access differs'],
          ['Temporary agency hiring index', '+12%', '+3%', 'parallel trends less plausible'],
        ],
      },
      {
        id: 'ev-1708',
        type: 'audio',
        title: 'Local workforce note',
        sourceLabel: 'County board call',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['implementation', 'anticipation', 'local context'],
        speaker: 'Local Workforce Board Director',
        duration: '0:10',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-017-local-workforce-note.wav',
        },
        transcript:
          'The employer network was already warming up before the official launch. A few manufacturers started hiring again in March, and some counties started referrals before the policy date on the slide.',
        body:
          'The local note makes the timing problem concrete: the treatment pathway started before the official post-period boundary.',
      },
      {
        id: 'ev-1709',
        type: 'table',
        render: 'artifact-table',
        title: 'Placebo outcome check',
        sourceLabel: 'Robustness appendix draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['placebo', 'robustness', 'alternative explanation'],
        body:
          'Outcomes not targeted by the program also improve more in pilot counties, suggesting broader labor-market recovery may be driving part of the divergence.',
        columns: ['Outcome group', 'Expected direct program effect', 'Pilot-comparison change', 'Interpretation'],
        rows: [
          ['Eligible displaced workers', 'yes', '+5.1 pts', 'headline estimate'],
          ['Recently employed workers not eligible', 'no', '+2.4 pts', 'local demand shock possible'],
          ['Retail job seekers', 'weak', '+1.9 pts', 'regional recovery signal'],
          ['Disability claimants', 'no clear effect', '+0.2 pts', 'little movement'],
        ],
      },
      {
        id: 'ev-1710',
        type: 'chart',
        render: 'scenario-range-panel',
        title: 'Estimate sensitivity card',
        sourceLabel: 'Causal review scratch model',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['sensitivity', 'estimate', 'claim strength'],
        body:
          'The estimated effect changes meaningfully under alternate post boundaries and pre-trend adjustments.',
        panelTitle: 'Policy effect estimate under assumptions',
        panelBadge: 'DiD sensitivity',
        rangeLabel: 'Employment-rate effect sensitivity',
        markers: [
          { kind: 'high', label: 'briefing DiD', value: '+5.1 pts', left: '78%' },
          { kind: 'base', label: 'event-study adjusted', value: '+1.8 pts', left: '52%' },
          { kind: 'low', label: 'early-referral boundary', value: '+0.6 pts', left: '40%' },
        ],
        scenarios: [
          { kind: 'high', label: 'Slide estimate', value: '+5.1 pts', note: 'May boundary, January baseline' },
          { kind: 'base', label: 'Pre-trend adjusted', value: '+1 to +3 pts', note: 'accounts for Jan-Apr divergence' },
          { kind: 'low', label: 'Announcement boundary', value: '0 to +2 pts', note: 'treats March referrals as post' },
        ],
      },
      {
        id: 'ev-1711',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Robustness check note',
        sourceLabel: 'Evaluation team comment',
        reliability: 'high',
        unlock: 'initial',
        tags: ['review', 'robustness', 'next step'],
        body:
          'The evaluation team recommends treating the evidence as suggestive until pre-trend and timing checks are shown.',
        memo: [
          'Add event-study plot with monthly coefficients and confidence intervals.',
          'Run alternate control groups matched on pre-trend and industry mix.',
          'Use February or March as an alternate post boundary because announcement and referrals began early.',
          'Report association or "consistent with an effect" unless robustness checks support the stronger causal claim.',
        ],
      },
      {
        id: 'ev-1712',
        type: 'table',
        render: 'artifact-table',
        title: 'Alternative control comparison',
        sourceLabel: 'Matched-control sensitivity table',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['alternate controls', 'comparison validity', 'sensitivity'],
        body:
          'When controls are re-matched on pre-period trend and industry mix, the estimated effect is smaller and less certain.',
        columns: ['Comparison design', 'Matching factors', 'Estimated effect', 'Claim support'],
        rows: [
          ['Briefing controls', 'January level, population', '+5.1 pts', 'too strong without pre-trend check'],
          ['Trend-matched controls', 'Jan-Apr slope and baseline level', '+2.2 pts', 'suggestive'],
          ['Industry-matched controls', 'manufacturing share and vacancy growth', '+1.5 pts', 'weak to moderate'],
          ['Synthetic comparison', 'weighted pre-period employment path', '+0.8 to +2.6 pts', 'uncertain'],
        ],
      },
    ],
    hypotheses: [
      {
        id: 'suggestive-not-proven',
        label:
          'The pilot evidence is suggestive, but pre-trend and timing problems make the strong causal claim unsafe',
        scoreClass: 'correct',
      },
      {
        id: 'did-proves-effect',
        label:
          'The five-point post-policy divergence proves the workforce pilot caused the employment gain',
        scoreClass: 'incorrect',
      },
      {
        id: 'levels-close-enough',
        label:
          'Because baseline levels were nearly identical in January, the comparison group is credible',
        scoreClass: 'incorrect',
      },
      {
        id: 'pretrend-invalidates-all',
        label:
          'Any pre-trend difference invalidates the analysis completely and the pilot should be ignored',
        scoreClass: 'partial',
      },
      {
        id: 'plant-reopenings-explain-all',
        label:
          'Manufacturing reopenings fully explain the gains, so the program had no effect',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'approve-causal-brief',
        label:
          'Approve the slide saying the pilot caused a five-point employment gain and recommend statewide expansion',
        scoreClass: 'incorrect',
      },
      {
        id: 'qualify-and-test',
        label:
          'Revise the claim as suggestive, add event-study and robustness checks, and avoid expansion claims until comparison validity is stronger',
        scoreClass: 'correct',
      },
      {
        id: 'expand-with-caveat',
        label:
          'Recommend statewide expansion using the five-point estimate but add a caveat about pre-trends',
        scoreClass: 'partial',
      },
      {
        id: 'reject-program',
        label:
          'The pre-trend weakens the expansion claim, but the pilot may still justify a smaller evidence-building extension',
        scoreClass: 'partial',
      },
      {
        id: 'change-post-only',
        label:
          'Keep the causal claim but move the post-period boundary to March',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: ['ev-1701', 'ev-1704', 'ev-1705', 'ev-1706', 'ev-1707', 'ev-1708', 'ev-1709', 'ev-1710', 'ev-1711', 'ev-1712'],
    replay: {
      expertDecision:
        'Do not approve the strong causal claim. The pilot counties improved more after the official launch, but they were already improving faster before May, and the treatment pathway began with announcement, employer outreach, and early referrals before the slide\'s post-period boundary. The evidence is consistent with a positive program contribution, but it needs event-study checks, alternate controls matched on trend and industry mix, placebo outcomes, and narrower wording before it can support statewide expansion.',
      whatMattered: [
        'The parallel-trends panel shows the pilot-comparison gap widening before the official launch.',
        'The comparison selection note shows matching used baseline levels but not pre-period slope or industry recovery.',
        'The timing ledger shows announcement and referrals began before the stated post period.',
        'The pre-trend table makes the divergence visible before treatment is supposed to start.',
        'The industry recovery table identifies a plausible untreated trend difference.',
        'The placebo outcome check shows broader regional labor recovery in pilot counties.',
        'The sensitivity card and alternate controls shrink the effect estimate under stronger assumptions.',
      ],
      misleadingEvidence: [
        'Near-identical baseline levels can mask diverging pre-period slopes.',
        'A simple DiD number looks causal only if the comparison group tracks the untreated path.',
        'The official launch date may not be the right treatment boundary when announcement and referrals start early.',
        'A policy can be promising without the current slide proving the full causal claim.',
      ],
      sequence: [
        'The state selects pilot counties with ready employer networks.',
        'Announcement and early implementation activity begin before the official launch.',
        'Employment improves faster in pilot counties before and after the launch date.',
        'The briefing slide uses January and May boundaries to claim a five-point causal effect.',
        'Pre-trend, timing, placebo, and alternate-control checks weaken the strong claim.',
        'Analytics revises the brief to describe suggestive evidence and requests robustness checks before expansion.',
      ],
      trap:
        'The case tests whether you treat difference-in-differences as a counterfactual argument, not a formula that converts any post-period divergence into causation.',
      transfer:
        'For DiD-style claims, inspect pre-period slopes, treatment timing, announcement effects, comparison selection, placebo outcomes, alternate controls, and whether the wording matches the assumption strength.',
    },
  },
  'case-018': {
    id: 'case-018',
    slug: 'cutoff-policy-claim',
    title: 'The Cutoff Policy Claim',
    set: 'causal-designs',
    sequence: 18,
    status: 'active',
    difficulty: 'advanced',
    domain: 'Benefits eligibility',
    estimatedMinutes: 13,
    caseType: 'regression-discontinuity-review',
    judgmentType: 'multi',
    summary:
      'An eligibility cutoff seems to prove a rental-assistance navigator prevented evictions, until sorting around the threshold weakens the design.',
    skills: ['regression-discontinuity judgment', 'manipulation diagnostics', 'causal claim qualification'],
    concepts: ['running variable', 'cutoff sorting', 'fuzzy compliance', 'bandwidth sensitivity'],
    mediaTypes: ['chart', 'table', 'timeline', 'memo', 'audio'],
    briefing:
      'A county housing agency piloted Stay Housed, a rental-assistance navigator for applicants with a housing-instability score of 70 or higher. The evaluation slide compares households just above and just below the cutoff and says navigator access reduced eviction filings by 9.4 percentage points. The agency wants to use the finding in a state budget request.',
    role:
      'You are the causal reviewer. Decide whether the cutoff analysis supports the policy claim, which assumptions are vulnerable, and what wording or follow-up analysis would be defensible.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Budget request voicemail',
      speaker: 'Housing Program Director',
      duration: '0:11',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-018-program-director-voicemail.wav',
      },
      transcript:
        'The cutoff analysis is exactly what budget staff asked for. Households above seventy did much better, so I want to say the navigator prevented evictions.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the cutoff analysis?',
    evidence: [
      {
        id: 'ev-1801',
        type: 'chart',
        render: 'rd-cutoff-inspector',
        title: 'Cutoff inspector',
        sourceLabel: 'Evaluation slide appendix',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['cutoff', 'rd', 'running variable'],
        body:
          'The outcome changes near the threshold, but the score distribution also bunches where eligibility begins.',
        panelTitle: 'Housing-instability score near navigator cutoff',
        panelBadge: 'naive RD -9.4 pts',
        chartLabel: 'Applications and eviction filing rates by score',
        leftLabel: 'below navigator threshold',
        cutoffLabel: 'cutoff: 70+',
        rightLabel: 'navigator eligible',
        views: [
          {
            id: 'briefing',
            label: 'Briefing view',
            badge: 'naive RD -9.4 pts',
            note:
              'The slide view makes the cutoff look decisive, but the pileup at 70 and 71 is already a warning that applicants near the threshold may not be locally comparable.',
            stats: [
              { label: 'Reported effect', value: '-9.4 pts', note: 'eviction filing gap at cutoff' },
              { label: 'Cutoff mass', value: '+46%', note: 'applications at 70-71 versus nearby bins' },
              { label: 'Design question', value: 'sorting', note: 'running variable may be movable' },
            ],
            bins: [
              { score: '64', count: 42, outcome: '28%', side: 'below' },
              { score: '65', count: 45, outcome: '27%', side: 'below' },
              { score: '66', count: 48, outcome: '26%', side: 'below' },
              { score: '67', count: 51, outcome: '25%', side: 'below' },
              { score: '68', count: 53, outcome: '24%', side: 'below' },
              { score: '69', count: 39, outcome: '23%', side: 'below' },
              { score: '70', count: 94, outcome: '15%', side: 'above', cutoff: true },
              { score: '71', count: 87, outcome: '15%', side: 'above' },
              { score: '72', count: 74, outcome: '17%', side: 'above' },
              { score: '73', count: 59, outcome: '18%', side: 'above' },
              { score: '74', count: 55, outcome: '19%', side: 'above' },
              { score: '75', count: 52, outcome: '20%', side: 'above' },
              { score: '76', count: 49, outcome: '20%', side: 'above' },
            ],
          },
          {
            id: 'donut',
            label: 'Window check',
            badge: 'alternate window',
            note:
              'When the most manipulable scores around the cutoff are excluded, the visible outcome break shrinks and the claim becomes much less stable.',
            stats: [
              { label: 'Excluded band', value: '69-71', note: 'records most exposed to sorting' },
              { label: 'Effect range', value: '-2 to -5 pts', note: 'depends on bandwidth and compliance model' },
              { label: 'Review status', value: 'open', note: 'requires manipulation and balance checks' },
            ],
            bins: [
              { score: '64', count: 42, outcome: '28%', side: 'below' },
              { score: '65', count: 45, outcome: '27%', side: 'below' },
              { score: '66', count: 48, outcome: '26%', side: 'below' },
              { score: '67', count: 51, outcome: '25%', side: 'below' },
              { score: '68', count: 53, outcome: '24%', side: 'below' },
              { score: '69', count: 39, outcome: '23%', side: 'excluded' },
              { score: '70', count: 94, outcome: '15%', side: 'excluded', cutoff: true },
              { score: '71', count: 87, outcome: '15%', side: 'excluded' },
              { score: '72', count: 74, outcome: '17%', side: 'above' },
              { score: '73', count: 59, outcome: '18%', side: 'above' },
              { score: '74', count: 55, outcome: '19%', side: 'above' },
              { score: '75', count: 52, outcome: '20%', side: 'above' },
              { score: '76', count: 49, outcome: '20%', side: 'above' },
            ],
          },
        ],
      },
      {
        id: 'ev-1802',
        type: 'audio',
        title: 'Budget request voicemail',
        sourceLabel: 'Director inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'claim', 'budget'],
        speaker: 'Housing Program Director',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-018-program-director-voicemail.wav',
        },
        transcript:
          'The cutoff analysis is exactly what budget staff asked for. Households above seventy did much better, so I want to say the navigator prevented evictions.',
        body:
          'The stakeholder frames a sharp threshold comparison as direct causal proof for a budget request.',
      },
      {
        id: 'ev-1803',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Budget slide copy',
        sourceLabel: 'State budget request draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['claim wording', 'rd', 'policy brief'],
        body:
          'The slide treats the cutoff as if it automatically creates a clean local experiment.',
        memo: [
          'Headline: "Navigator access prevented evictions for high-risk renters."',
          'Main number: 9.4 percentage-point reduction in court eviction filings near score 70.',
          'Method line: applicants just above the cutoff compared with applicants just below.',
          'Recommendation: fund countywide expansion for the next fiscal year.',
        ],
      },
      {
        id: 'ev-1804',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Eligibility rule excerpt',
        sourceLabel: 'Stay Housed intake manual',
        reliability: 'high',
        unlock: 'initial',
        tags: ['running variable', 'eligibility', 'manual entry'],
        body:
          'Several pieces of the score can change during intake, and staff can see the provisional score before submission.',
        memo: [
          'Navigator assignment begins at housing-instability score 70.',
          'Score components include rent burden, arrears amount, court notice status, household vulnerability, and recent income volatility.',
          'Intake staff may update documents before final submission if the first score appears incomplete.',
          'The case-management screen displays provisional score and eligibility status before the application is locked.',
        ],
      },
      {
        id: 'ev-1805',
        type: 'table',
        render: 'artifact-table',
        title: 'Density diagnostic',
        sourceLabel: 'Evaluation manipulation check',
        reliability: 'high',
        unlock: 'initial',
        tags: ['density', 'manipulation', 'cutoff'],
        body:
          'Scores do not flow smoothly through the cutoff. There is missing mass just below 70 and excess mass at 70 and 71.',
        columns: ['Score band', 'Applications', 'Expected from local trend', 'Diagnostic note'],
        rows: [
          ['66-68', '152', '150', 'smooth lower band'],
          ['69', '39', '55', 'missing mass just below cutoff'],
          ['70-71', '181', '124', 'excess mass at eligibility edge'],
          ['72-74', '188', '186', 'smooth upper band'],
          ['Formal test', 'p = 0.01', 'density break', 'sorting concern'],
        ],
      },
      {
        id: 'ev-1806',
        type: 'table',
        render: 'artifact-table',
        title: 'Revision audit log',
        sourceLabel: 'Application system events',
        reliability: 'high',
        unlock: 'initial',
        tags: ['audit log', 'recoding', 'running variable'],
        body:
          'Near-cutoff applications are often edited after a provisional score is shown, and most revisions move applicants upward.',
        columns: ['Initial score', 'Final score band', 'Applications revised', 'Common edit'],
        rows: [
          ['66-68', '69 or lower', '18%', 'added arrears note or vulnerability detail'],
          ['66-68', '70 or higher', '31%', 'income volatility or court notice updated'],
          ['69', '70 or higher', '44%', 'rent burden denominator changed'],
          ['70-72', '70 or higher', '9%', 'minor document cleanup'],
        ],
      },
      {
        id: 'ev-1807',
        type: 'table',
        render: 'artifact-table',
        title: 'Near-cutoff balance check',
        sourceLabel: 'Evaluator scratch table',
        reliability: 'high',
        unlock: 'initial',
        tags: ['covariate balance', 'local comparability', 'selection'],
        body:
          'Applicants just above the cutoff differ from applicants just below on prior contact and document support, which should not jump in a clean RD.',
        columns: ['Characteristic within score 66-74', 'Below 70', '70 and above', 'Concern'],
        rows: [
          ['Prior navigator contact', '22%', '49%', 'assistance differs before assignment'],
          ['Variable-hours employment', '37%', '61%', 'income averaging can move score'],
          ['Legal aid referral before application', '9%', '27%', 'pre-treatment support imbalance'],
          ['Court notice uploaded', '44%', '68%', 'score component and outcome risk differ'],
        ],
      },
      {
        id: 'ev-1808',
        type: 'table',
        render: 'artifact-table',
        title: 'Assignment compliance ledger',
        sourceLabel: 'Program operations export',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['fuzzy compliance', 'eligibility', 'measurement'],
        body:
          'Eligibility is not the same as treatment. Some below-cutoff households get discretionary help, and some above-cutoff households never receive navigation.',
        columns: ['Group', 'Navigator assigned', 'Received rent payment', 'Court follow-up matched'],
        rows: [
          ['Score 66-69', '18%', '11%', '62%'],
          ['Score 70-73', '74%', '57%', '83%'],
          ['Score 74-78', '79%', '64%', '85%'],
          ['Reason for mismatch', 'discretion, missing documents, caseload', 'not a sharp treatment edge', 'outcome capture differs'],
        ],
      },
      {
        id: 'ev-1809',
        type: 'audio',
        title: 'Navigator intake note',
        sourceLabel: 'Frontline huddle recording',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['frontline', 'sorting', 'documentation'],
        speaker: 'Intake Navigator',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-018-intake-navigator-note.wav',
        },
        transcript:
          'Around the cutoff, we ask people to bring the missing pay stub or court notice before we lock the file. The first score is not always the real situation, but yes, staff know seventy is the line.',
        body:
          'The frontline note explains why the score is partly a documentation process near the cutoff, not only a pre-existing risk measure.',
      },
      {
        id: 'ev-1810',
        type: 'timeline',
        title: 'Outreach and scoring timeline',
        sourceLabel: 'Program implementation calendar',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['timing', 'announcement', 'score behavior'],
        body:
          'The threshold became visible to community partners before the evaluation window, increasing the chance of sorting near the cutoff.',
        entries: [
          ['Jan 08', 'Partner webinar explains that navigator slots begin at score 70.'],
          ['Jan 16', 'Intake screen updated to show provisional score before lock.'],
          ['Feb 01', 'Evaluation window starts.'],
          ['Feb 12', 'Legal-aid partners begin pre-application document clinics.'],
          ['Mar 05', 'Applications at scores 70 and 71 rise above prior-month pattern.'],
        ],
      },
      {
        id: 'ev-1811',
        type: 'chart',
        render: 'scenario-range-panel',
        title: 'Bandwidth sensitivity card',
        sourceLabel: 'Causal review scratch model',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['sensitivity', 'donut rd', 'effect estimate'],
        body:
          'The estimated effect depends strongly on how much of the manipulable near-cutoff band is included.',
        panelTitle: 'Eviction filing effect under RD assumptions',
        panelBadge: 'bandwidth-sensitive',
        rangeLabel: 'Estimated filing reduction near cutoff',
        markers: [
          { kind: 'high', label: 'briefing RD', value: '-9.4 pts', left: '79%' },
          { kind: 'base', label: 'fuzzy RD', value: '-5.1 pts', left: '58%' },
          { kind: 'low', label: 'donut RD', value: '-2.4 pts', left: '43%' },
        ],
        scenarios: [
          { kind: 'high', label: 'Slide estimate', value: '-9.4 pts', note: 'uses all records within 10 score points' },
          { kind: 'base', label: 'Fuzzy compliance model', value: '-3 to -7 pts', note: 'uses eligibility as instrument for treatment' },
          { kind: 'low', label: 'Donut sensitivity', value: '-1 to -5 pts', note: 'excludes scores 69-71' },
        ],
      },
      {
        id: 'ev-1812',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Evaluator recommendation',
        sourceLabel: 'Causal review margin note',
        reliability: 'high',
        unlock: 'initial',
        tags: ['recommendation', 'claim wording', 'follow-up'],
        body:
          'The reviewer preserves the useful signal but refuses the clean causal proof claim.',
        memo: [
          'Do not state that the navigator prevented evictions based on this RD alone.',
          'Report the cutoff evidence as suggestive and vulnerable to score sorting and fuzzy assignment.',
          'Add density, covariate-balance, donut, fuzzy RD, and pre-period checks to the appendix.',
          'For the next cycle, lock scoring before staff see eligibility or randomize scarce navigator slots within a narrow near-cutoff band.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'suggestive-sorted-cutoff',
        label:
          'The cutoff evidence is suggestive, but score sorting, revisions, and fuzzy compliance make the clean causal claim unsafe',
        scoreClass: 'correct',
      },
      {
        id: 'rd-proves-navigator',
        label:
          'Because the treatment starts at score 70, the below-versus-above comparison proves the navigator prevented evictions',
        scoreClass: 'incorrect',
      },
      {
        id: 'bunching-is-good-targeting',
        label:
          'Bunching near 70 may reflect legitimate caseworker discretion, so the fuzzy estimate should be reported as the main sensitivity check',
        scoreClass: 'incorrect',
      },
      {
        id: 'reject-all-rd',
        label:
          'The sorting concern should narrow the claim to a monitored extension rather than a causal proof claim',
        scoreClass: 'partial',
      },
      {
        id: 'use-fuzzy-only',
        label:
          'A fuzzy RD estimate alone is enough to keep the causal claim if the point estimate remains negative',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'approve-budget-claim',
        label:
          'Approve the budget slide saying navigator access prevented evictions by 9.4 percentage points',
        scoreClass: 'incorrect',
      },
      {
        id: 'qualify-and-redesign',
        label:
          'Revise the claim as suggestive, add manipulation and sensitivity checks, and redesign assignment or scoring before making a causal expansion claim',
        scoreClass: 'correct',
      },
      {
        id: 'use-smaller-estimate',
        label:
          'Replace the headline with the fuzzy RD estimate and recommend expansion as proven effective',
        scoreClass: 'partial',
      },
      {
        id: 'cancel-program',
        label:
          'Recommend canceling the navigator because the cutoff study has sorting concerns',
        scoreClass: 'partial',
      },
      {
        id: 'hide-cutoff-band',
        label:
          'Exclude scores 69-71 and present the remaining estimate without discussing the sorting issue',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: ['ev-1801', 'ev-1804', 'ev-1805', 'ev-1806', 'ev-1807', 'ev-1808', 'ev-1809', 'ev-1810', 'ev-1811', 'ev-1812'],
    replay: {
      expertDecision:
        'Do not approve the clean causal claim. A cutoff can support a strong regression-discontinuity design only when applicants cannot precisely sort around the running variable and when treatment changes sharply at the threshold. Here, staff see the provisional score, applications are revised upward near 70, covariates jump at the cutoff, compliance is fuzzy, and the effect shrinks under donut and fuzzy sensitivity checks. The evidence may still support a promising program story, but not a proof claim for the budget slide.',
      whatMattered: [
        'The cutoff inspector shows both an outcome jump and suspicious bunching at the eligibility edge.',
        'The eligibility rule excerpt shows the running variable is partly documentable and visible before lock.',
        'The density diagnostic shows missing mass below the cutoff and excess mass above it.',
        'The revision audit log shows upward edits after provisional scoring.',
        'The covariate balance table shows near-cutoff applicants are not locally exchangeable.',
        'The compliance ledger shows eligibility is a fuzzy proxy for actual navigation.',
        'The sensitivity card shows the effect estimate is not stable when the manipulable band is handled differently.',
      ],
      misleadingEvidence: [
        'A visible threshold does not by itself create a clean local experiment.',
        'The sharpest-looking outcome jump can be produced by who crosses the cutoff, not only by treatment.',
        'Helping applicants document true need may be good practice while still compromising the evaluation design.',
        'A budget deadline does not remove the need for manipulation and balance checks.',
      ],
      sequence: [
        'The county defines navigator eligibility at score 70.',
        'Partners and staff learn the cutoff and see provisional scores before files lock.',
        'Near-cutoff applications are revised and bunch at 70 and 71.',
        'The briefing slide compares just above and just below the cutoff and reports a large eviction filing gap.',
        'Density, balance, compliance, and donut checks show the RD assumptions are weak.',
        'Analytics revises the claim and recommends a cleaner future design.',
      ],
      trap:
        'The case tests whether you treat regression discontinuity as an assumption-driven design, not a magic property of any threshold rule.',
      transfer:
        'For cutoff-based causal claims, inspect whether the running variable can be manipulated, whether density and covariates are continuous at the cutoff, whether assignment is sharp or fuzzy, whether bandwidth choices matter, and whether the wording matches the design strength.',
    },
  },
  'case-019': {
    id: 'case-019',
    slug: 'underpowered-null',
    title: 'The QuickStart Readout',
    set: 'causal-designs',
    sequence: 19,
    status: 'active',
    difficulty: 'standard',
    domain: 'Product experimentation',
    estimatedMinutes: 12,
    caseType: 'power-review',
    judgmentType: 'multi',
    summary:
      'A product experiment gets a fast no-go recommendation, but the exposure record and interval width leave more than one interpretation alive.',
    skills: ['statistical power judgment', 'experiment interpretation', 'decision under uncertainty'],
    concepts: ['minimum detectable effect', 'confidence intervals', 'equivalence testing', 'exposure dilution'],
    mediaTypes: ['chart', 'table', 'timeline', 'memo', 'audio'],
    briefing:
      'A learning-platform team tested QuickStart Coach, a guided setup panel for first-time users who have not created their first study plan. The readout says the activation lift was not statistically significant, and product leadership wants to declare that the coach has no impact and remove it from the roadmap.',
    role:
      'You are the experimentation reviewer. Decide whether the test supports a no-effect conclusion, what uncertainty remains, and what recommendation should go into the launch review.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Null result voicemail',
      speaker: 'Product Lead',
      duration: '0:10',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-019-product-lead-voicemail.wav',
      },
      transcript:
        'The p-value missed, so I think we can say QuickStart has no measurable impact and move on. I need that written cleanly for launch review.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the QuickStart Coach experiment?',
    evidence: [
      {
        id: 'ev-1901',
        type: 'chart',
        render: 'power-audit-panel',
        title: 'Power audit board',
        sourceLabel: 'Experiment readout workbook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['power', 'confidence interval', 'null result'],
        body:
          'The observed estimate is positive but imprecise. The experiment can rule out a large effect, not the smaller effect the team originally cared about.',
        panelTitle: 'QuickStart Coach activation experiment',
        panelBadge: 'p = 0.18',
        chartLabel: 'Estimate uncertainty and analyzable sample',
        views: [
          {
            id: 'readout',
            label: 'Readout view',
            badge: 'not significant',
            note:
              'The executive slide centers the p-value, but the confidence interval still includes effects large enough to matter for the launch decision.',
            stats: [
              { label: 'Observed lift', value: '+2.1 pts', note: 'primary activation metric' },
              { label: 'p-value', value: '0.18', note: 'not below 0.05' },
              { label: '95% interval', value: '-0.8 to +5.0', note: 'not evidence of exactly zero' },
            ],
            samples: [
              { label: 'Planned sample', value: '38,000 users', width: '100%', note: 'from pre-analysis plan' },
              { label: 'Assigned sample', value: '19,420 users', width: '51%', note: 'traffic freeze reduced enrollment' },
              { label: 'Actually exposed', value: '7,860 users', width: '21%', note: 'panel shown after setup screen' },
              { label: 'Analyzable primary', value: '6,940 users', width: '18%', note: 'event logging exclusions' },
            ],
            intervals: [
              { label: 'Activation', value: '+2.1 pts [-0.8, +5.0]', left: '42%', width: '30%', markerLeft: '59%', zeroLeft: '50%' },
              { label: 'Week-2 return', value: '+1.4 pts [-1.9, +4.7]', left: '38%', width: '34%', markerLeft: '56%', zeroLeft: '50%' },
              { label: 'Support tickets', value: '-0.7 pts [-3.4, +2.0]', left: '32%', width: '28%', markerLeft: '46%', zeroLeft: '50%' },
            ],
          },
          {
            id: 'audit',
            label: 'Power audit',
            badge: 'actual MDE 4.3 pts',
            note:
              'The shipped test was much less sensitive than the planned test. Calling it no effect confuses absence of evidence with evidence of absence.',
            stats: [
              { label: 'Planned MDE', value: '1.4 pts', note: 'effect worth detecting' },
              { label: 'Actual MDE', value: '4.3 pts', note: 'after exposure and logging loss' },
              { label: 'Practical bar', value: '1.5 pts', note: 'launch-review threshold' },
            ],
            samples: [
              { label: 'Planned duration', value: '21 days', width: '100%', note: 'normal traffic weeks' },
              { label: 'Actual duration', value: '9 days', width: '43%', note: 'stopped before semester rush' },
              { label: 'Mobile exposed', value: '28%', width: '28%', note: 'iOS placement bug' },
              { label: 'New-user subgroup', value: '2,180 users', width: '6%', note: 'highest expected benefit' },
            ],
            intervals: [
              { label: 'All users', value: '+2.1 pts [-0.8, +5.0]', left: '42%', width: '30%', markerLeft: '59%', zeroLeft: '50%' },
              { label: 'New planners', value: '+4.8 pts [-0.6, +10.2]', left: '44%', width: '54%', markerLeft: '75%', zeroLeft: '50%' },
              { label: 'Mobile users', value: '+0.5 pts [-4.6, +5.5]', left: '28%', width: '52%', markerLeft: '52%', zeroLeft: '50%' },
            ],
          },
        ],
      },
      {
        id: 'ev-1902',
        type: 'audio',
        title: 'Null result voicemail',
        sourceLabel: 'Launch review inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'claim', 'p-value'],
        speaker: 'Product Lead',
        duration: '0:10',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-019-product-lead-voicemail.wav',
        },
        transcript:
          'The p-value missed, so I think we can say QuickStart has no measurable impact and move on. I need that written cleanly for launch review.',
        body:
          'The sponsor compresses a nonsignificant result into a no-effect conclusion before checking whether the test could detect the relevant effect size.',
      },
      {
        id: 'ev-1903',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Launch readout slide',
        sourceLabel: 'Product experiment deck',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['readout', 'claim wording', 'null'],
        body:
          'The slide turns non-significance into a product conclusion that is stronger than the test supports.',
        memo: [
          'Headline: "QuickStart Coach did not improve activation."',
          'Primary result: +2.1 percentage points, p = 0.18.',
          'Recommendation: do not ship; remove from Q3 roadmap.',
          'Speaker note: "No measurable impact in controlled test."',
        ],
      },
      {
        id: 'ev-1904',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Pre-analysis power note',
        sourceLabel: 'Experiment design doc',
        reliability: 'high',
        unlock: 'initial',
        tags: ['power plan', 'mde', 'design'],
        body:
          'The planned experiment was designed to detect a small practical lift, but only if the exposure and duration assumptions held.',
        memo: [
          'Primary outcome: first study plan created within seven days.',
          'Decision threshold: ship if lift is plausibly at least +1.5 percentage points and does not increase support burden.',
          'Planned sample: 38,000 assigned users over 21 days.',
          'Planned minimum detectable effect: 1.4 percentage points at 80% power.',
        ],
      },
      {
        id: 'ev-1905',
        type: 'table',
        render: 'artifact-table',
        title: 'Exposure funnel ledger',
        sourceLabel: 'Experiment assignment and UI logs',
        reliability: 'high',
        unlock: 'initial',
        tags: ['exposure', 'instrumentation', 'dilution'],
        body:
          'Assignment was much larger than actual treatment exposure, especially on mobile.',
        columns: ['Funnel step', 'Control', 'Treatment', 'Concern'],
        rows: [
          ['Assigned users', '19,360', '19,420', 'balanced assignment'],
          ['Reached setup screen', '12,480', '12,560', 'early drop-off before exposure'],
          ['Saw QuickStart panel', '0', '7,860', 'only 40% of treatment assigned'],
          ['Mobile saw panel', '0', '28%', 'iOS placement bug suppressed exposure'],
          ['Primary outcome logged', '18,920', '18,870', 'balanced outcome capture'],
          ['Panel interaction logged', '0', '6,940', 'actual treatment exposure'],
        ],
      },
      {
        id: 'ev-1906',
        type: 'timeline',
        title: 'Experiment operations timeline',
        sourceLabel: 'Release calendar',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['timing', 'early stop', 'operations'],
        body:
          'The test ended before the traffic pattern it was designed around and before planned enrollment completed.',
        entries: [
          ['Day -3', 'Power note approved for 21-day run through semester-start traffic.'],
          ['Day 1', 'Experiment opens to 50% of new accounts.'],
          ['Day 4', 'iOS placement bug reported; treatment panel appears below the fold.'],
          ['Day 7', 'Platform release freeze announced for semester-start launch.'],
          ['Day 9', 'Experiment stopped and readout prepared with 18% of planned analyzable sample.'],
        ],
      },
      {
        id: 'ev-1907',
        type: 'table',
        render: 'artifact-table',
        title: 'Estimate interpretation table',
        sourceLabel: 'Stats review notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['confidence interval', 'equivalence', 'uncertainty'],
        body:
          'The interval rules out only a large negative effect and a very large positive effect. It does not rule out the launch-relevant lift.',
        columns: ['Quantity', 'Value', 'Interpretation'],
        rows: [
          ['Point estimate', '+2.1 pts', 'directionally positive but noisy'],
          ['95% confidence interval', '-0.8 to +5.0 pts', 'compatible with no effect, small benefit, or large benefit'],
          ['Practical shipping threshold', '+1.5 pts', 'inside the interval'],
          ['Equivalence margin tested', 'none', 'no formal support for "no meaningful effect"'],
          ['Actual MDE', '4.3 pts', 'test can detect only larger effects than decision threshold'],
        ],
      },
      {
        id: 'ev-1908',
        type: 'table',
        render: 'artifact-table',
        title: 'Subgroup signal check',
        sourceLabel: 'Exploratory slice report',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['heterogeneity', 'subgroup', 'exploratory'],
        body:
          'The subgroup most expected to benefit has a larger positive estimate, but the slice is too small for a separate claim.',
        columns: ['Segment', 'Observed lift', '95% interval', 'Reason for caution'],
        rows: [
          ['All eligible users', '+2.1 pts', '-0.8 to +5.0', 'primary result imprecise'],
          ['No prior study plan', '+4.8 pts', '-0.6 to +10.2', 'theory-aligned but underpowered'],
          ['Mobile iOS', '+0.5 pts', '-4.6 to +5.5', 'exposure bug diluted effect'],
          ['Returning users', '+0.2 pts', '-3.1 to +3.4', 'lower expected need'],
        ],
      },
      {
        id: 'ev-1909',
        type: 'audio',
        title: 'Experiment analyst caveat',
        sourceLabel: 'Analytics review call',
        reliability: 'high',
        unlock: 'initial',
        tags: ['analysis', 'power', 'claim wording'],
        speaker: 'Experimentation Analyst',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-019-analyst-caveat.wav',
        },
        transcript:
          'I would call this inconclusive, not flat. The exposed sample was a fraction of plan, and the interval still includes the lift product said would matter.',
        body:
          'The analyst separates a nonsignificant test from a test that can establish no meaningful effect.',
      },
      {
        id: 'ev-1910',
        type: 'chart',
        render: 'scenario-range-panel',
        title: 'Decision sensitivity card',
        sourceLabel: 'Launch review scratch model',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['decision', 'sensitivity', 'expected value'],
        body:
          'Different plausible effects produce different product decisions because the implementation cost is modest and the upside threshold is small.',
        panelTitle: 'Decision value under plausible activation effects',
        panelBadge: 'not settled by p-value',
        rangeLabel: 'Activation lift compatible with experiment',
        markers: [
          { kind: 'high', label: 'upper interval', value: '+5.0 pts', left: '78%' },
          { kind: 'base', label: 'point estimate', value: '+2.1 pts', left: '58%' },
          { kind: 'low', label: 'lower interval', value: '-0.8 pts', left: '42%' },
        ],
        scenarios: [
          { kind: 'high', label: 'Meaningful benefit', value: '+3 to +5 pts', note: 'worth shipping if support burden stays low' },
          { kind: 'base', label: 'Decision-relevant benefit', value: '+1.5 to +3 pts', note: 'inside current interval' },
          { kind: 'low', label: 'No or small harm', value: '-1 to +1 pts', note: 'also inside current interval' },
        ],
      },
      {
        id: 'ev-1911',
        type: 'table',
        render: 'artifact-table',
        title: 'Support burden check',
        sourceLabel: 'CX operations join',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['guardrail', 'cost', 'decision'],
        body:
          'Guardrail metrics do not show a clear support burden, but they are also imprecise.',
        columns: ['Metric', 'Observed change', '95% interval', 'Decision note'],
        rows: [
          ['Setup-related tickets', '-0.7 pts', '-3.4 to +2.0', 'not evidence of increased burden'],
          ['Time to first plan', '-4.1 min', '-11.0 to +2.8', 'directionally faster'],
          ['Panel dismissals', '18%', 'n/a', 'some friction but not tied to harm'],
          ['Reported confusion tags', '-3%', '-18% to +12%', 'sample too small for certainty'],
        ],
      },
      {
        id: 'ev-1912',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Experiment review recommendation',
        sourceLabel: 'Causal review margin note',
        reliability: 'high',
        unlock: 'initial',
        tags: ['recommendation', 'rerun', 'claim wording'],
        body:
          'The reviewer recommends using the evidence, but not as proof that the feature has no impact.',
        memo: [
          'Do not write that QuickStart has no measurable impact.',
          'Write that this run was inconclusive because actual power was below the design target.',
          'Fix exposure and logging, continue through the planned traffic window, and report confidence intervals with the decision threshold.',
          'If the decision must be made now, use a limited rollout or holdout-preserving ship decision rather than treating p > .05 as proof of no effect.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'inconclusive-not-null',
        label:
          'The experiment is inconclusive: it failed to reach significance, but it was underpowered for the effect size the team cared about',
        scoreClass: 'correct',
      },
      {
        id: 'no-effect-proven',
        label:
          'Because p = 0.18, the experiment proves QuickStart Coach has no meaningful effect on activation',
        scoreClass: 'incorrect',
      },
      {
        id: 'positive-so-ship',
        label:
          'Because the point estimate is positive, the feature should ship as a proven activation win',
        scoreClass: 'partial',
      },
      {
        id: 'subgroup-proves-win',
        label:
          'The new-planner subgroup proves the feature works for the intended audience',
        scoreClass: 'partial',
      },
      {
        id: 'rerun-only',
        label:
          'No decision can be made until the experiment is rerun from scratch',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'declare-no-impact',
        label:
          'Declare no measurable impact and remove QuickStart Coach from the roadmap',
        scoreClass: 'incorrect',
      },
      {
        id: 'call-inconclusive',
        label:
          'Revise the readout as inconclusive, fix exposure/logging, and continue or rerun against the original decision threshold',
        scoreClass: 'correct',
      },
      {
        id: 'ship-as-win',
        label:
          'Ship broadly because the point estimate is positive and the support-burden signal is not worse',
        scoreClass: 'partial',
      },
      {
        id: 'equivalence-after-fact',
        label:
          'Call it equivalent to no effect because the p-value missed and the confidence interval crosses zero',
        scoreClass: 'incorrect',
      },
      {
        id: 'limited-rollout',
        label:
          'If a decision is unavoidable, use a limited rollout with a preserved holdout and explicit uncertainty language',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: ['ev-1901', 'ev-1904', 'ev-1905', 'ev-1906', 'ev-1907', 'ev-1908', 'ev-1909', 'ev-1910', 'ev-1911', 'ev-1912'],
    replay: {
      expertDecision:
        'Do not approve the no-effect readout. The experiment did not reach statistical significance, but it also did not have the power needed to rule out the effect size product said would matter. Actual exposure and analyzable sample were far below plan, the actual MDE was much larger than the decision threshold, and the confidence interval still includes meaningful benefit. The right conclusion is inconclusive, with a recommendation to fix exposure and logging, continue or rerun the experiment, and use uncertainty-aware launch language if a decision must be made now.',
      whatMattered: [
        'The power audit board shows the positive estimate, wide interval, and severe loss from planned to analyzable sample.',
        'The pre-analysis note defines the practical effect threshold and planned MDE.',
        'The exposure funnel shows most assigned treatment users did not actually see the panel.',
        'The operations timeline shows the run stopped before the planned traffic window.',
        'The estimate interpretation table shows why p > .05 is not an equivalence test.',
        'The subgroup check suggests possible theory-aligned benefit without proving it.',
        'The analyst caveat and recommendation memo give defensible wording and next steps.',
      ],
      misleadingEvidence: [
        'A nonsignificant p-value is not proof of no meaningful effect.',
        'A positive point estimate is not proof of a win when uncertainty is wide.',
        'Assignment balance does not solve exposure dilution or missing outcome logging.',
        'Subgroup patterns can guide a rerun without becoming a separate proof claim.',
      ],
      sequence: [
        'The team designs a 21-day experiment to detect a modest activation lift.',
        'The run is shortened and the treatment panel is not consistently exposed.',
        'The final readout shows a positive but nonsignificant estimate.',
        'Product interprets p = 0.18 as no measurable impact.',
        'Power, exposure, interval, and equivalence checks show the test is inconclusive.',
        'Analytics revises the claim and recommends a cleaner continuation or rerun.',
      ],
      trap:
        'The case tests whether you distinguish a failed significance test from evidence that an effect is absent.',
      transfer:
        'For null-looking experiments, inspect the original decision threshold, planned versus actual sample, exposure, missingness, MDE, confidence intervals, equivalence margins, subgroup multiplicity, and whether the decision wording matches the uncertainty.',
    },
  },
  'case-020': {
    id: 'case-020',
    slug: 'short-term-lift',
    title: 'The Short-Term Lift',
    set: 'causal-designs',
    sequence: 20,
    status: 'active',
    difficulty: 'standard',
    domain: 'Subscription growth',
    estimatedMinutes: 12,
    caseType: 'lifecycle-metric-review',
    judgmentType: 'multi',
    summary:
      'A subscription checkout test lifts paid starts, but refunds, retention, and support burden make the growth claim less settled.',
    skills: ['metric horizon judgment', 'experiment guardrail review', 'business outcome reasoning'],
    concepts: ['surrogate metrics', 'retention cohorts', 'refund bias', 'long-term value'],
    mediaTypes: ['chart', 'table', 'timeline', 'memo', 'audio'],
    briefing:
      'A language-learning subscription app tested FastStart Pass, a new checkout that offers a discounted annual plan immediately after a learner finishes the first lesson. The launch deck says paid starts rose 10.8 percent and recommends global rollout before the quarterly growth review.',
    role:
      'You are the experiment reviewer. Decide whether the test supports a growth-quality launch claim, what downstream risks remain, and how the result should be reported.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Growth launch voicemail',
      speaker: 'Growth Lead',
      duration: '0:11',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-020-growth-lead-voicemail.wav',
      },
      transcript:
        'FastStart is the first checkout test this quarter with a clean paid-start lift. If analytics is comfortable, I want to call it a growth win and roll it out globally.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the FastStart Pass readout?',
    evidence: [
      {
        id: 'ev-2001',
        type: 'chart',
        render: 'lifecycle-lift-panel',
        title: 'Lifecycle lift board',
        sourceLabel: 'Experiment readout workbook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['lifecycle', 'conversion', 'retention'],
        body:
          'The treatment raises paid starts, but the same cohort looks worse on retention, refunds, and net contribution once downstream outcomes are added.',
        panelTitle: 'FastStart Pass cohort readout',
        panelBadge: 'paid starts +10.8%',
        chartLabel: 'Short-term conversion versus lifecycle quality',
        views: [
          {
            id: 'launch',
            label: 'Launch view',
            badge: 'paid starts +10.8%',
            note:
              'The launch view is not fake: the checkout did increase paid starts. The open question is whether paid start is enough for the rollout claim.',
            metrics: [
              { label: 'Paid starts', value: '+10.8%', note: 'primary metric', kind: 'good' },
              { label: 'Annual mix', value: '+18 pts', note: 'more annual starts booked', kind: 'good' },
              { label: 'Guardrails', value: 'immature', note: 'refund and D45 still maturing', kind: 'neutral' },
            ],
            stages: [
              { label: 'Checkout visitors', value: '100%', width: '100%', note: 'randomized eligible users', kind: 'neutral' },
              { label: 'Paid starts', value: '18.4%', width: '74%', note: 'control 16.6%', kind: 'good' },
              { label: 'Annual starts', value: '11.2%', width: '56%', note: 'control 7.5%', kind: 'good' },
              { label: 'Day-7 active', value: '42.0%', width: '60%', note: 'early activity similar', kind: 'neutral' },
            ],
            ledger: [
              { label: 'Booked ARR', value: '+$418k', note: 'recognized at checkout in readout' },
              { label: 'Refund window', value: '14 days', note: 'not fully observed at readout' },
              { label: 'Decision date', value: 'day 10', note: 'before lifecycle maturity' },
            ],
          },
          {
            id: 'lifecycle',
            label: 'Lifecycle view',
            badge: 'net contribution -$1.10/user',
            note:
              'The lifecycle view changes the decision frame: a conversion win can still be a weak growth bet if it creates lower-quality paid starts.',
            metrics: [
              { label: 'D45 retained', value: 'pending', note: 'not mature at day-10 readout', kind: 'neutral' },
              { label: 'Refunds', value: 'early +2.1 pts', note: 'annual-plan refund requests', kind: 'bad' },
              { label: 'Net contribution', value: 'not mature', note: 'per assigned user', kind: 'neutral' },
            ],
            stages: [
              { label: 'Paid starts', value: '+10.8%', width: '74%', note: 'short-term lift holds', kind: 'good' },
              { label: 'D30 lesson-active', value: '-4.4 pts', width: '48%', note: 'fewer keep using product', kind: 'bad' },
              { label: 'D45 retained', value: 'pending', width: '39%', note: 'quality signal not mature', kind: 'neutral' },
              { label: 'Refund/support', value: '+5.1 pts', width: '66%', note: 'more buyer-remorse contacts', kind: 'bad' },
            ],
            ledger: [
              { label: 'Booked revenue', value: '+$418k', note: 'before refund adjustment' },
              { label: 'Refund exposure', value: 'pending', note: 'observed plus unresolved queue' },
              { label: 'Support cost', value: '+$74k', note: 'billing contacts and credits' },
            ],
          },
          {
            id: 'net-value',
            label: 'Net value',
            badge: 'booked ARR is not LTV',
            note:
              'The net-value view separates what the checkout booked from what the cohort appears likely to keep after refunds, support, and retention quality.',
            metrics: [
              { label: 'Booked lift', value: '+$1.45', note: 'per assigned user', kind: 'good' },
              { label: 'Refund/support drag', value: '-$1.55', note: 'refunds plus billing contacts', kind: 'bad' },
              { label: 'Retained value drag', value: '-$1.00', note: 'D45 retention adjustment', kind: 'bad' },
            ],
            stages: [
              { label: 'Booked revenue', value: '+$1.45', width: '78%', note: 'visible in launch deck', kind: 'good' },
              { label: 'Refund adjustment', value: '-$1.17', width: '62%', note: 'annual refunds and credits', kind: 'bad' },
              { label: 'Support cost', value: '-$0.38', width: '34%', note: 'billing contacts', kind: 'bad' },
              { label: 'Retention value', value: '-$1.00', width: '55%', note: 'lower D45 retained value', kind: 'bad' },
            ],
            ledger: [
              { label: 'Launch claim', value: 'positive', note: 'if paid starts are the only outcome' },
              { label: 'Lifecycle claim', value: 'unsettled', note: 'guardrails conflict with rollout' },
              { label: 'Next readout', value: 'D45+', note: 'mature holdout before global call' },
            ],
          },
        ],
      },
      {
        id: 'ev-2002',
        type: 'audio',
        title: 'Growth launch voicemail',
        sourceLabel: 'Launch review inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'growth claim', 'launch'],
        speaker: 'Growth Lead',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-020-growth-lead-voicemail.wav',
        },
        transcript:
          'FastStart is the first checkout test this quarter with a clean paid-start lift. If analytics is comfortable, I want to call it a growth win and roll it out globally.',
        body:
          'The stakeholder correctly sees the short-term lift, but asks analytics to turn it into a broader growth-quality claim.',
      },
      {
        id: 'ev-2003',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Launch deck copy',
        sourceLabel: 'Growth review draft',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['claim wording', 'launch deck', 'primary metric'],
        body:
          'The deck headline expands a short-term paid-start result into a global growth recommendation.',
        memo: [
          'Headline: "FastStart Pass drives efficient subscription growth."',
          'Primary metric: paid starts within 24 hours, +10.8%, p < .01.',
          'Recommendation: roll out globally before quarterly growth review.',
          'Appendix note: D30 retention and refund guardrails still maturing.',
        ],
      },
      {
        id: 'ev-2004',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Experiment contract excerpt',
        sourceLabel: 'Pre-analysis and launch criteria',
        reliability: 'high',
        unlock: 'initial',
        tags: ['guardrails', 'estimand', 'decision rule'],
        body:
          'The pre-analysis plan treats paid starts as a short-term primary metric, not as the full launch criterion.',
        memo: [
          'Primary metric: paid starts within 24 hours among eligible checkout visitors.',
          'Guardrails: D30 lesson-active rate, D45 paid retention, refund rate, billing support contacts.',
          'Launch criterion: paid-start lift is useful only if lifecycle guardrails do not materially deteriorate.',
          'Readout rule: do not call a growth-quality win before refund window and D45 retention are mostly observed.',
        ],
      },
      {
        id: 'ev-2005',
        type: 'timeline',
        title: 'Cohort maturity timeline',
        sourceLabel: 'Experiment calendar',
        reliability: 'high',
        unlock: 'initial',
        tags: ['timing', 'maturity', 'guardrails'],
        body:
          'The global launch decision is scheduled before the outcomes that define subscription quality are mature.',
        entries: [
          ['Day 0', 'FastStart experiment begins for new learners after first lesson.'],
          ['Day 7', 'Paid-start readout becomes statistically significant.'],
          ['Day 10', 'Growth review deck drafted for global rollout.'],
          ['Day 14', 'Annual-plan refund window closes for earliest treatment cohort.'],
          ['Day 30', 'Lesson-active guardrail matures for first full cohort.'],
          ['Day 45', 'Paid-retention guardrail matures.'],
        ],
      },
      {
        id: 'ev-2006',
        type: 'table',
        render: 'artifact-table',
        title: 'Retention and refund table',
        sourceLabel: 'Lifecycle metrics join',
        reliability: 'high',
        unlock: 'initial',
        tags: ['retention', 'refunds', 'cohort quality'],
        body:
          'Downstream guardrails move against the treatment once enough of the cohort is observed.',
        columns: ['Metric', 'Control', 'FastStart', 'Treatment effect'],
        rows: [
          ['Paid starts within 24h', '16.6%', '18.4%', '+1.8 pts'],
          ['D30 lesson-active among starts', '61.2%', '56.8%', '-4.4 pts'],
          ['D45 retained paid starts', '74.5%', '68.3%', '-6.2 pts'],
          ['Refund requests', '6.1%', '10.9%', '+4.8 pts'],
          ['Billing support contacts', '8.4%', '13.5%', '+5.1 pts'],
        ],
      },
      {
        id: 'ev-2007',
        type: 'audio',
        title: 'Support queue note',
        sourceLabel: 'Billing support huddle',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['support', 'refunds', 'customer quality'],
        speaker: 'Billing Support Manager',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-020-support-queue-note.wav',
        },
        transcript:
          'A lot of the FastStart contacts are not confused about the app. They say the annual offer felt urgent, then they regret it once the renewal email lands.',
        body:
          'The support note explains a plausible mechanism for why paid starts increased while customer quality worsened.',
      },
      {
        id: 'ev-2008',
        type: 'table',
        render: 'artifact-table',
        title: 'Revenue quality ledger',
        sourceLabel: 'Finance cohort model',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['revenue', 'ltv', 'refund adjustment'],
        body:
          'Booked revenue looks positive before refunds and support costs are applied. Contribution per assigned user turns negative under current assumptions.',
        columns: ['Ledger item per assigned user', 'Control', 'FastStart', 'Difference'],
        rows: [
          ['Booked subscription revenue', '$8.90', '$10.35', '+$1.45'],
          ['Expected refunds and credits', '-$0.74', '-$1.91', '-$1.17'],
          ['Billing support cost', '-$0.31', '-$0.69', '-$0.38'],
          ['D45 retained value adjustment', '$5.20', '$4.20', '-$1.00'],
          ['Net contribution estimate', '$13.05', '$11.95', '-$1.10'],
        ],
      },
      {
        id: 'ev-2009',
        type: 'table',
        render: 'artifact-table',
        title: 'Acquisition mix check',
        sourceLabel: 'Attribution and coupon join',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['mix shift', 'heterogeneity', 'channel quality'],
        body:
          'The treatment pulls in more discount-sensitive traffic and annual-plan starts from lower-retention channels.',
        columns: ['Segment', 'Share of FastStart lift', 'D45 retained', 'Interpretation'],
        rows: [
          ['Organic first-lesson completers', '31%', '72%', 'some durable lift'],
          ['Coupon-site referrals', '29%', '48%', 'low-retention starts'],
          ['Paid social trial seekers', '24%', '52%', 'high refund contact rate'],
          ['Returning learners', '16%', '77%', 'smaller but higher-quality lift'],
        ],
      },
      {
        id: 'ev-2010',
        type: 'table',
        render: 'artifact-table',
        title: 'Cancel reason sample',
        sourceLabel: 'Refund and cancellation tags',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['qualitative', 'cancel reason', 'mechanism'],
        body:
          'The reason tags are not a representative survey, but they align with the refund and support pattern.',
        columns: ['Cancel or refund tag', 'Control', 'FastStart', 'Why it matters'],
        rows: [
          ['Price surprise', '14%', '31%', 'offer comprehension issue'],
          ['Not enough lesson time', '28%', '24%', 'normal product fit reason'],
          ['Meant to choose monthly', '6%', '19%', 'plan-selection concern'],
          ['Technical issue', '11%', '10%', 'not the main driver'],
          ['Finished short-term goal', '18%', '9%', 'control churn more expected'],
        ],
      },
      {
        id: 'ev-2011',
        type: 'chart',
        render: 'scenario-range-panel',
        title: 'LTV sensitivity card',
        sourceLabel: 'Analytics lifecycle model',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['sensitivity', 'ltv', 'decision'],
        body:
          'The launch decision is sensitive to retention and refund assumptions that are not yet fully mature.',
        panelTitle: 'FastStart value under lifecycle assumptions',
        panelBadge: 'decision-sensitive',
        rangeLabel: 'Net contribution per assigned user',
        markers: [
          { kind: 'high', label: 'paid-start-only', value: '+$1.45', left: '72%' },
          { kind: 'base', label: 'current lifecycle', value: '-$1.10', left: '42%' },
          { kind: 'low', label: 'refund queue high', value: '-$2.30', left: '28%' },
        ],
        scenarios: [
          { kind: 'high', label: 'Booked-revenue view', value: '+$1 to +$2', note: 'ignores refunds and retention quality' },
          { kind: 'base', label: 'Current lifecycle view', value: '-$1.10', note: 'uses observed D45 and refund queue' },
          { kind: 'low', label: 'High-refund case', value: '-$2 to -$3', note: 'pending refund tickets clear at recent rate' },
        ],
      },
      {
        id: 'ev-2012',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Launch review memo',
        sourceLabel: 'Experiment review margin note',
        reliability: 'high',
        unlock: 'initial',
        tags: ['recommendation', 'claim wording', 'rollout'],
        body:
          'The reviewer recommends keeping the useful conversion evidence while rejecting the global growth-win conclusion.',
        memo: [
          'Do not call FastStart an efficient subscription-growth win yet.',
          'Report that it increased paid starts, but lifecycle guardrails raise retention, refund, and support concerns.',
          'Hold global rollout until D45 retention and refund queues mature for the full cohort.',
          'If leadership must proceed, use a smaller monitored rollout with preserved holdout, clearer plan selection, and a lifecycle-based launch criterion.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'conversion-real-quality-uncertain',
        label:
          'The paid-start lift is real, but the global growth-quality claim is unsafe because downstream guardrails are worse or immature',
        scoreClass: 'correct',
      },
      {
        id: 'conversion-proves-growth',
        label:
          'Because paid starts rose significantly, FastStart is proven to drive efficient subscription growth',
        scoreClass: 'incorrect',
      },
      {
        id: 'refunds-prove-harm',
        label:
          'Refund and support guardrails are concerning enough to pause expansion while preserving the paid-start lift as a real short-term result',
        scoreClass: 'partial',
      },
      {
        id: 'booked-arr-enough',
        label:
          'Booked annual revenue is the best decision metric because subscription revenue is recognized at checkout',
        scoreClass: 'incorrect',
      },
      {
        id: 'segment-win-only',
        label:
          'FastStart should ship only to the organic segment because that segment has higher retained starts',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'global-rollout',
        label:
          'Approve global rollout and report FastStart as a subscription-growth win',
        scoreClass: 'incorrect',
      },
      {
        id: 'hold-and-mature',
        label:
          'Report the conversion lift, hold the global claim, wait for mature retention/refund outcomes, and use lifecycle guardrails for rollout',
        scoreClass: 'correct',
      },
      {
        id: 'ship-with-warning',
        label:
          'Ship globally with a warning that refunds should be watched after launch',
        scoreClass: 'partial',
      },
      {
        id: 'cancel-faststart',
        label:
          'Keep FastStart in paid search only, where retained starts look better, while waiting for mature refund outcomes',
        scoreClass: 'partial',
      },
      {
        id: 'rewrite-primary',
        label:
          'Replace the primary metric with net contribution after seeing the result and declare the test failed',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: ['ev-2001', 'ev-2004', 'ev-2005', 'ev-2006', 'ev-2007', 'ev-2008', 'ev-2009', 'ev-2010', 'ev-2011', 'ev-2012'],
    replay: {
      expertDecision:
        'Do not approve the global growth-win claim. FastStart did increase paid starts, so the short-term result should not be dismissed. But the launch criterion was not paid starts alone: D45 retention, refunds, support burden, and net contribution were part of the decision. Those downstream signals are worse or not fully mature, and the paid-start lift appears concentrated in lower-retention, discount-sensitive segments. The defensible readout is a real conversion lift with unresolved lifecycle quality. Hold the global rollout, mature the cohort, and if action is unavoidable use a monitored rollout with preserved holdout and clearer plan-selection design.',
      whatMattered: [
        'The lifecycle lift board shows the same treatment changes meaning when viewed through retention, refunds, support, and contribution.',
        'The experiment contract says paid starts were not the full launch criterion.',
        'The maturity timeline shows the rollout decision precedes refund and D45 retention maturity.',
        'The retention and refund table shows downstream guardrails moving against treatment.',
        'The support note and cancel reason sample provide a plausible mechanism for lower-quality starts.',
        'The revenue ledger and LTV sensitivity card show booked revenue is not the same as lifecycle value.',
        'The acquisition mix check shows the lift is concentrated in lower-retention segments.',
      ],
      misleadingEvidence: [
        'A significant primary metric can be true and still be insufficient for the business claim.',
        'Booked annual revenue overstates value when refund and retention effects are delayed.',
        'Refund and support signals do not erase the conversion lift, but they change the launch decision.',
        'Changing the primary metric after the fact is not the answer; honoring the pre-specified guardrails is.',
      ],
      sequence: [
        'Growth tests FastStart after the first lesson.',
        'Paid starts rise quickly and significantly.',
        'The launch deck frames the result as efficient subscription growth.',
        'Refund, retention, support, and segment evidence mature after the short-term readout.',
        'Lifecycle analysis shows the conversion lift may be lower-quality than the primary metric suggests.',
        'Analytics revises the recommendation to hold global rollout and preserve a lifecycle-based evaluation.',
      ],
      trap:
        'The case tests whether you can preserve a valid short-term experimental result while refusing to overextend it into a long-term business outcome.',
      transfer:
        'For short-term wins, inspect the metric horizon, pre-specified guardrails, cohort maturity, refund or return windows, retention, support burden, segment mix, and whether the decision claim matches the outcome actually measured.',
    },
  },
  'case-021': {
    id: 'case-021',
    slug: 'leakage-perfect-model',
    title: 'The Discharge Score',
    set: 'operational-models',
    sequence: 21,
    status: 'active',
    difficulty: 'advanced',
    domain: 'Hospital readmission',
    estimatedMinutes: 13,
    caseType: 'leakage-audit',
    judgmentType: 'multi',
    summary:
      'A hospital readmission score looks unusually strong in validation, and the launch team wants it in the discharge workflow next month.',
    skills: ['model leakage detection', 'deployment readiness judgment', 'feature availability audit'],
    concepts: ['target leakage', 'temporal validation', 'decision-time features', 'prospective validation'],
    mediaTypes: ['chart', 'table', 'timeline', 'memo', 'audio'],
    briefing:
      'A hospital network has a new 30-day readmission model for medical-surgical discharges. The validation deck reports an AUC of 0.92 and recommends putting the score into the discharge workflow next month so nurse calls, pharmacy review, and home-health referrals can be prioritized before patients leave.',
    role:
      'You are the deployment reviewer. Decide whether the model is ready for discharge-time operational use, which evidence should carry the most weight, and what validation work is still required.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Launch review voicemail',
      speaker: 'Population Health Director',
      duration: '0:10',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-021-pop-health-voicemail.wav',
      },
      transcript:
        'The readmission model is the best one we have ever seen. If the AUC is really above ninety, I want it in the discharge workflow next month.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for the readmission model?',
    evidence: [
      {
        id: 'ev-2101',
        type: 'chart',
        render: 'leakage-audit-panel',
        title: 'Feature-time audit',
        sourceLabel: 'Model validation workbook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['leakage', 'feature timing', 'deployment'],
        body:
          'The same model looks different when features are checked against the discharge decision moment rather than a retrospective warehouse snapshot.',
        panelTitle: 'Readmission model feature availability',
        panelBadge: 'AUC 0.92',
        axis: [
          { label: 'Admission', left: '6%' },
          { label: 'Discharge decision', left: '48%' },
          { label: 'Post-discharge', left: '72%' },
          { label: '30-day outcome', left: '94%' },
        ],
        views: [
          {
            id: 'validation',
            label: 'Validation file',
            badge: 'AUC 0.92',
            note:
              'The validation file uses a clean retrospective snapshot. Several highly ranked predictors are not known when the score would be used.',
            stats: [
              { label: 'Reported AUC', value: '0.92', note: 'holdout workbook', kind: 'good' },
              { label: 'Late features', value: '9/15', note: 'among top predictors', kind: 'bad' },
              { label: 'Score snapshot', value: 'day +7', note: 'after discharge workflow', kind: 'bad' },
            ],
            features: [
              { label: 'Prior admissions', source: 'EHR history', left: '18%', note: 'available on admission', kind: 'good' },
              { label: 'Discharge disposition final', source: 'Case-management note', left: '51%', note: 'near decision boundary', kind: 'neutral' },
              { label: 'Medication reconciliation closed', source: 'Pharmacy task', left: '57%', note: 'often after patient leaves', kind: 'bad' },
              { label: 'Follow-up completed', source: 'Ambulatory feed', left: '74%', note: 'post-discharge behavior', kind: 'bad' },
              { label: 'Outreach call outcome', source: 'Care-management CRM', left: '80%', note: 'intervention happens after score use', kind: 'bad' },
              { label: 'Unplanned encounter created', source: 'Encounter table', left: '91%', note: 'near-target proxy', kind: 'bad' },
            ],
          },
          {
            id: 'decision-time',
            label: 'Availability check',
            badge: 'restricted feature set',
            note:
              'When the score is rebuilt using only information available at discharge, performance falls and the high-risk queue becomes less precise.',
            stats: [
              { label: 'Replay AUC', value: '0.67', note: 'decision-time features only', kind: 'neutral' },
              { label: 'Usable features', value: '14/38', note: 'scoreable at discharge', kind: 'bad' },
              { label: 'High-risk PPV', value: '18%', note: 'top decile in replay', kind: 'neutral' },
            ],
            features: [
              { label: 'Prior admissions', source: 'EHR history', left: '18%', note: 'usable', kind: 'good' },
              { label: 'Comorbidity count', source: 'Problem list', left: '28%', note: 'usable but sometimes stale', kind: 'good' },
              { label: 'Length of stay', source: 'Encounter feed', left: '45%', note: 'known near discharge', kind: 'good' },
              { label: 'Discharge meds pending', source: 'Pharmacy queue', left: '49%', note: 'available but unstable', kind: 'neutral' },
              { label: 'Follow-up completed', source: 'Ambulatory feed', left: '74%', note: 'removed from replay', kind: 'bad' },
              { label: 'Unplanned encounter', source: 'Encounter table', left: '91%', note: 'removed from replay', kind: 'bad' },
            ],
          },
        ],
      },
      {
        id: 'ev-2102',
        type: 'audio',
        title: 'Launch review voicemail',
        sourceLabel: 'Population health inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['launch pressure', 'performance claim', 'workflow'],
        speaker: 'Population Health Director',
        duration: '0:10',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-021-pop-health-voicemail.wav',
        },
        transcript:
          'The readmission model is the best one we have ever seen. If the AUC is really above ninety, I want it in the discharge workflow next month.',
        body:
          'The voicemail captures the operational pressure: a very high validation number is being translated into a launch timeline.',
      },
      {
        id: 'ev-2103',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Validation deck excerpt',
        sourceLabel: 'ReadmitWatch v3 launch deck',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['validation', 'scorecard', 'workflow'],
        body:
          'The deck is polished and the headline metric is impressive, but the extract rule is easy to miss.',
        memo: [
          'Model: ReadmitWatch v3, 30-day unplanned readmission risk.',
          'Holdout AUC: 0.92; top decile captures 61 percent of observed readmissions.',
          'Recommended use: discharge-time prioritization for nurse call, pharmacy review, and home-health referral.',
          'Feature extract: latest warehouse snapshot after encounter close and follow-up feeds refresh.',
        ],
      },
      {
        id: 'ev-2104',
        type: 'table',
        render: 'artifact-table',
        title: 'Top feature importance',
        sourceLabel: 'Model explainability appendix',
        reliability: 'high',
        unlock: 'initial',
        tags: ['features', 'importance', 'availability'],
        body:
          'The strongest predictors are not necessarily the strongest deployable predictors.',
        columns: ['Feature', 'Importance rank', 'Earliest reliable time', 'Deployment concern'],
        rows: [
          ['followup_visit_completed_7d', '1', 'Day 7', 'Post-discharge behavior'],
          ['outreach_call_result', '2', 'After nurse call', 'Intervention leakage'],
          ['unplanned_encounter_created', '3', 'When new encounter opens', 'Near-target proxy'],
          ['discharge_disposition_final', '4', 'After chart close for 38 percent', 'Late administrative finalization'],
          ['prior_admits_12mo', '5', 'Before discharge', 'Usable'],
        ],
      },
      {
        id: 'ev-2105',
        type: 'timeline',
        title: 'Discharge workflow timeline',
        sourceLabel: 'Clinical operations map',
        reliability: 'high',
        unlock: 'initial',
        tags: ['workflow', 'decision moment', 'timing'],
        body:
          'The requested decision moment is before several feeds used by the validation model become stable.',
        entries: [
          ['T-24h', 'Case-management huddle starts discharge planning for likely next-day discharges.'],
          ['T-4h', 'Nurse-call and pharmacy-review capacity is assigned for the day.'],
          ['T+0', 'Patient leaves; model score is requested for discharge workflow use.'],
          ['T+1 to T+3', 'Pharmacy, home-health, and case-management tasks are closed in source systems.'],
          ['T+7', 'Follow-up attendance and outreach outcomes refresh in the warehouse.'],
          ['T+30', 'Readmission outcome window closes.'],
        ],
      },
      {
        id: 'ev-2106',
        type: 'table',
        render: 'artifact-table',
        title: 'Snapshot timing audit',
        sourceLabel: 'Feature-store review',
        reliability: 'high',
        unlock: 'initial',
        tags: ['feature store', 'snapshot', 'deployment'],
        body:
          'The audit separates fields that are scoreable at discharge from fields that become available only after the operational decision.',
        columns: ['Field group', 'Snapshot rule', 'Share available at discharge', 'Issue'],
        rows: [
          ['EHR history and demographics', 'Latest before encounter close', '96%', 'Mostly usable'],
          ['Discharge admin fields', 'Latest after chart close', '62%', 'Late finalization'],
          ['Care-management CRM', 'Weekly sync after outreach', '0%', 'Post-decision intervention data'],
          ['Ambulatory follow-up feed', 'Day 7 sync', '0%', 'Post-discharge behavior'],
          ['Encounter status flags', 'Latest warehouse state', '0%', 'Can encode outcome path'],
        ],
      },
      {
        id: 'ev-2107',
        type: 'audio',
        title: 'Data engineering caveat',
        sourceLabel: 'Feature-store review recording',
        reliability: 'high',
        unlock: 'initial',
        tags: ['feature store', 'retrospective data', 'scoreability'],
        speaker: 'Data Engineering Lead',
        duration: '0:12',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-021-data-engineering-caveat.wav',
        },
        transcript:
          'The validation table is a retrospective snapshot. It has the cleanest version of the encounter, plus follow-up fields. That is not the same table we can score from at discharge.',
        body:
          'This caveat directly challenges whether the validation evidence matches the proposed deployment moment.',
      },
      {
        id: 'ev-2108',
        type: 'table',
        render: 'artifact-table',
        title: 'Decision-time replay',
        sourceLabel: 'Model risk review notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['replay', 'temporal validation', 'calibration'],
        body:
          'Performance drops as the validation setting gets closer to the real scoring workflow.',
        columns: ['Validation mode', 'AUC', 'Calibration slope', 'High-risk decile readmission rate'],
        rows: [
          ['Retrospective latest snapshot', '0.92', '0.98', '42%'],
          ['Encounter-close only', '0.74', '0.71', '25%'],
          ['Discharge decision-time replay', '0.67', '0.58', '18%'],
          ['First-week prospective shadow', '0.65', '0.54', '17%'],
        ],
      },
      {
        id: 'ev-2109',
        type: 'table',
        render: 'artifact-table',
        title: 'Care queue capacity check',
        sourceLabel: 'Population health staffing model',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['capacity', 'workflow', 'threshold'],
        body:
          'A lower-precision score changes the queue size and staffing implications.',
        columns: ['Queue rule', 'Daily patients flagged', 'Daily calls available', 'Operational read'],
        rows: [
          ['Current discharge checklist', '46', '52', 'Capacity roughly aligned'],
          ['Retrospective model top decile', '41', '52', 'Looks manageable but is not scoreable'],
          ['Decision-time replay top decile', '64', '52', 'More false positives and unstable ordering'],
          ['Combined rule without recalibration', '83', '52', 'Queue overload'],
        ],
      },
      {
        id: 'ev-2110',
        type: 'table',
        render: 'artifact-table',
        title: 'Site split performance',
        sourceLabel: 'Hospital-level validation appendix',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['site variation', 'generalization', 'operations'],
        body:
          'Retrospective performance is high everywhere, but deployment-like performance is weaker and varies with feed timing.',
        columns: ['Site', 'Retrospective AUC', 'Decision-time AUC', 'Follow-up feed lag'],
        rows: [
          ['North', '0.91', '0.68', '2 days'],
          ['East', '0.94', '0.66', '1 day'],
          ['West', '0.88', '0.64', '5 days'],
          ['Community affiliate', '0.81', '0.61', 'Manual weekly batch'],
        ],
      },
      {
        id: 'ev-2111',
        type: 'chart',
        render: 'scenario-range-panel',
        title: 'Deployment readiness card',
        sourceLabel: 'Model risk committee worksheet',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['readiness', 'sensitivity', 'validation'],
        body:
          'The deployment case depends on which validation setting is allowed to represent real use.',
        panelTitle: 'Readmission score performance by validation setting',
        panelBadge: 'leakage sensitivity',
        rangeLabel: 'AUC under validation assumptions',
        markers: [
          { kind: 'high', label: 'latest snapshot', value: '0.92', left: '84%' },
          { kind: 'base', label: 'encounter close', value: '0.74', left: '58%' },
          { kind: 'low', label: 'decision-time', value: '0.67', left: '48%' },
        ],
        scenarios: [
          { kind: 'high', label: 'Latest warehouse snapshot', value: '0.92', note: 'uses post-decision and near-outcome fields' },
          { kind: 'base', label: 'Encounter-close replay', value: '0.74', note: 'removes some but not all late fields' },
          { kind: 'low', label: 'Discharge decision-time replay', value: '0.67', note: 'closest to proposed workflow' },
        ],
      },
      {
        id: 'ev-2112',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Deployment review memo',
        sourceLabel: 'Model risk committee margin note',
        reliability: 'high',
        unlock: 'initial',
        tags: ['recommendation', 'deployment', 'validation plan'],
        body:
          'The recommendation preserves useful retrospective insight while blocking unsafe operational deployment.',
        memo: [
          'Do not deploy ReadmitWatch v3 into the discharge workflow as currently validated.',
          'Use the retrospective model only for process audit until leakage-prone fields are removed.',
          'Rebuild from a decision-time feature store with patient-level temporal and site splits.',
          'Run prospective shadow validation, calibration review, and queue-capacity simulation before launch.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'leakage-not-ready',
        label:
          'The current model is not ready for discharge-time use because its validation performance depends on post-decision or near-outcome features',
        scoreClass: 'correct',
      },
      {
        id: 'auc-proves-ready',
        label:
          'The model is ready because an AUC above 0.90 on holdout data proves it will rank patients well in production',
        scoreClass: 'incorrect',
      },
      {
        id: 'drop-but-useful',
        label:
          'The late features should be removed, and the remaining signal may still support a redesigned, prospectively validated workflow',
        scoreClass: 'partial',
      },
      {
        id: 'discard-all',
        label:
          'This model version is unsuitable for discharge-time use, but the same program could be rebuilt around score-time features',
        scoreClass: 'partial',
      },
      {
        id: 'operations-only',
        label:
          'The main issue is call-center capacity; the model performance evidence is otherwise sufficient',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'launch-next-month',
        label:
          'Approve launch next month because the reported AUC is high and the care queue has enough capacity',
        scoreClass: 'incorrect',
      },
      {
        id: 'block-and-rebuild',
        label:
          'Block deployment, rebuild using decision-time features, and require prospective shadow validation plus calibration and capacity review',
        scoreClass: 'correct',
      },
      {
        id: 'launch-with-threshold',
        label:
          'Launch only for the highest-risk threshold while engineers remove the late fields later',
        scoreClass: 'partial',
      },
      {
        id: 'audit-only-forever',
        label:
          'Use the current model for retrospective audit while designing a separate discharge-time version',
        scoreClass: 'partial',
      },
      {
        id: 'manual-review',
        label:
          'Keep the model unchanged but require clinicians to manually review every high-risk patient before action',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: [
      'ev-2101',
      'ev-2103',
      'ev-2104',
      'ev-2105',
      'ev-2106',
      'ev-2107',
      'ev-2108',
      'ev-2109',
      'ev-2110',
      'ev-2111',
      'ev-2112',
    ],
    replay: {
      expertDecision:
        'Do not deploy the current readmission model into the discharge workflow. The reported AUC is based on a retrospective warehouse snapshot that includes post-discharge behavior, intervention outcomes, and near-target proxies. Those fields are useful for audit, but they are not available when nurses and pharmacists must make the decision. The defensible path is to rebuild the model from decision-time features, use patient-level temporal and site splits, run prospective shadow validation, recalibrate thresholds, and simulate queue capacity before any launch.',
      whatMattered: [
        'The feature-time audit shows several important predictors occur after the discharge decision moment.',
        'The validation deck quietly states that the extract uses the latest warehouse snapshot after encounter close and follow-up refresh.',
        'The top feature importance table shows post-discharge behavior and near-target proxies among the strongest predictors.',
        'The workflow timeline establishes when the model score is actually needed.',
        'The snapshot timing audit and data engineering caveat show the validation table is not the deployment table.',
        'The decision-time replay shows performance and calibration degrade under a realistic scoring constraint.',
        'The capacity check shows that lower precision changes the operational burden.',
        'The site split shows deployment-like performance varies with local feed timing.',
      ],
      misleadingEvidence: [
        'A high holdout AUC can still be invalid for deployment if the holdout data contains features unavailable at score time.',
        'Retrospective feature cleanliness is not the same as real-time feature availability.',
        'Manual clinician review does not solve leakage if the score that prioritizes the queue is already contaminated.',
        'The model is not necessarily useless; the current validation claim is the part that fails.',
      ],
      sequence: [
        'ReadmitWatch v3 is validated on a clean retrospective warehouse table.',
        'The launch deck translates the high AUC into a discharge-workflow recommendation.',
        'Feature importance reveals that late fields and near-outcome proxies drive much of the apparent performance.',
        'The feature-store review compares field timestamps against the actual discharge decision moment.',
        'A decision-time replay removes late features and shows materially weaker performance.',
        'The model risk recommendation blocks launch and redirects the team toward prospective, score-time validation.',
      ],
      trap:
        'The case tests whether you can treat model performance as conditional on the data-generating and scoring moment, not as a portable property of the model.',
      transfer:
        'For operational models, audit the prediction moment, feature availability, target window, intervention timing, split design, calibration, site variation, and capacity effects before accepting headline performance.',
    },
  },
  'case-022': {
    id: 'case-022',
    slug: 'labeling-vendor-benchmark',
    title: 'The Labeling Vendor Benchmark',
    set: 'operational-models',
    sequence: 22,
    status: 'active',
    difficulty: 'advanced',
    domain: 'Trust and safety',
    estimatedMinutes: 13,
    caseType: 'label-quality-audit',
    judgmentType: 'multi',
    summary:
      'A moderation model beats the old rules engine on a vendor benchmark, but the benchmark labels may be measuring vendor behavior more than policy truth.',
    skills: ['label quality audit', 'benchmark validity judgment', 'AI deployment governance'],
    concepts: ['ground truth construction', 'label noise', 'inter-rater reliability', 'policy drift'],
    mediaTypes: ['chart', 'table', 'memo', 'audio'],
    briefing:
      'A marketplace trust-and-safety team trained ShieldRank, a model that flags prohibited listings before peak season. Vendor A labeled 40,000 historical listings and reports a 94 percent QA pass rate. On that benchmark, ShieldRank reaches F1 0.91, beating the old rules engine by a wide margin. Leadership wants to auto-remove high-confidence violations next month.',
    role:
      'You are reviewing the benchmark and launch plan. Decide whether the label evidence is strong enough for automated enforcement, what risks remain, and what validation work should come before launch.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Benchmark launch voicemail',
      speaker: 'Trust and Safety Product Lead',
      duration: '0:13',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-022-benchmark-launch-voicemail.wav',
      },
      transcript:
        'The model finally gives us a clean benchmark story. If we can say it beats the rules engine by this much, I want high-confidence auto-removal live before the listing surge.',
    },
    decisionPrompt:
      'What should Trust and Safety recommend for the moderation benchmark and launch plan?',
    evidence: [
      {
        id: 'ev-2201',
        type: 'chart',
        render: 'label-benchmark-panel',
        title: 'Ground-truth stress test',
        sourceLabel: 'Model launch workbook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['labels', 'benchmark', 'deployment'],
        body:
          'The benchmark looks strong in aggregate, then changes when the label source is adjudicated and stress-tested by policy area.',
        panelTitle: 'Moderation benchmark reliability',
        panelBadge: 'F1 0.91',
        views: [
          {
            id: 'aggregate',
            label: 'Vendor benchmark',
            badge: 'F1 0.91',
            note:
              'The aggregate view treats Vendor A labels as ground truth. The model largely learns to match that label system.',
            stats: [
              { label: 'ShieldRank F1', value: '0.91', note: 'against Vendor A labels', kind: 'good' },
              { label: 'Rules F1', value: '0.74', note: 'same benchmark labels', kind: 'neutral' },
              { label: 'Vendor QA pass', value: '94%', note: 'sampled internal QA', kind: 'good' },
            ],
            slices: [
              {
                label: 'Counterfeit logos',
                note: 'Visually obvious brand misuse',
                kind: 'good',
                callout: 'Headline win is real here.',
                measures: [
                  { label: 'Model', value: '0.96', width: '96%', kind: 'good' },
                  { label: 'Rules', value: '0.81', width: '81%', kind: 'neutral' },
                  { label: 'QA', value: '98%', width: '98%', kind: 'good' },
                ],
              },
              {
                label: 'Medical claims',
                note: 'Requires current policy and context',
                kind: 'neutral',
                callout: 'Aggregate score hides uncertainty.',
                measures: [
                  { label: 'Model', value: '0.89', width: '89%', kind: 'good' },
                  { label: 'Rules', value: '0.66', width: '66%', kind: 'neutral' },
                  { label: 'QA', value: '91%', width: '91%', kind: 'good' },
                ],
              },
              {
                label: 'Coded harassment',
                note: 'Context-dependent language',
                kind: 'neutral',
                callout: 'Vendor agreement is not policy truth.',
                measures: [
                  { label: 'Model', value: '0.86', width: '86%', kind: 'good' },
                  { label: 'Rules', value: '0.59', width: '59%', kind: 'bad' },
                  { label: 'QA', value: '89%', width: '89%', kind: 'good' },
                ],
              },
            ],
          },
          {
            id: 'adjudicated',
            label: 'Gold-slice audit',
            badge: '22% label fault',
            note:
              'Internal policy specialists reviewed a stratified sample. Label problems are concentrated in policy areas where context matters.',
            stats: [
              { label: 'Wrong/incomplete labels', value: '22%', note: '600-case adjudicated slice', kind: 'bad' },
              { label: 'High-harm label faults', value: '31%', note: 'medical, harassment, targeting', kind: 'bad' },
              { label: 'Guideline lag', value: '2 revs', note: 'vendor packet behind policy', kind: 'bad' },
            ],
            slices: [
              {
                label: 'Counterfeit logos',
                note: 'Policy specialists mostly agree',
                kind: 'good',
                callout: 'Safe candidate for assistive review.',
                measures: [
                  { label: 'Vendor', value: '95%', width: '95%', kind: 'good' },
                  { label: 'Expert', value: '93%', width: '93%', kind: 'good' },
                  { label: 'Fault', value: '6%', width: '6%', kind: 'good' },
                ],
              },
              {
                label: 'Medical claims',
                note: 'Old guidance allows claims now prohibited',
                kind: 'bad',
                callout: 'Benchmark rewards stale policy.',
                measures: [
                  { label: 'Vendor', value: '88%', width: '88%', kind: 'neutral' },
                  { label: 'Expert', value: '63%', width: '63%', kind: 'bad' },
                  { label: 'Fault', value: '29%', width: '29%', kind: 'bad' },
                ],
              },
              {
                label: 'Coded harassment',
                note: 'Slang and reclaimed terms split reviewers',
                kind: 'bad',
                callout: 'Ground truth is unstable.',
                measures: [
                  { label: 'Vendor', value: '85%', width: '85%', kind: 'neutral' },
                  { label: 'Expert', value: '54%', width: '54%', kind: 'bad' },
                  { label: 'Fault', value: '34%', width: '34%', kind: 'bad' },
                ],
              },
            ],
          },
          {
            id: 'launch',
            label: 'Launch simulation',
            badge: 'auto-removal risk',
            note:
              'At the proposed threshold, the model would remove many listings before human review. The mistakes are not evenly distributed.',
            stats: [
              { label: 'Auto removals', value: '18k/day', note: 'proposed high-confidence band', kind: 'neutral' },
              { label: 'Audit false positives', value: '14%', note: 'expert slice estimate', kind: 'bad' },
              { label: 'Small-seller FP', value: '2.1x', note: 'relative to large sellers', kind: 'bad' },
            ],
            slices: [
              {
                label: 'Obvious counterfeit',
                note: 'High precision, high review consensus',
                kind: 'good',
                callout: 'Automation may be plausible with monitoring.',
                measures: [
                  { label: 'Volume', value: '5.2k', width: '52%', kind: 'neutral' },
                  { label: 'FP', value: '3%', width: '3%', kind: 'good' },
                  { label: 'Review', value: 'low', width: '22%', kind: 'good' },
                ],
              },
              {
                label: 'Non-English listings',
                note: 'Translation and cultural context gaps',
                kind: 'bad',
                callout: 'False positives cluster.',
                measures: [
                  { label: 'Volume', value: '3.8k', width: '38%', kind: 'neutral' },
                  { label: 'FP', value: '23%', width: '23%', kind: 'bad' },
                  { label: 'Review', value: 'high', width: '76%', kind: 'bad' },
                ],
              },
              {
                label: 'Medical and targeting',
                note: 'High harm if wrong either way',
                kind: 'bad',
                callout: 'Auto-action is not supported.',
                measures: [
                  { label: 'Volume', value: '2.6k', width: '26%', kind: 'neutral' },
                  { label: 'FP', value: '18%', width: '18%', kind: 'bad' },
                  { label: 'Review', value: 'high', width: '84%', kind: 'bad' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'ev-2202',
        type: 'audio',
        title: 'Benchmark launch voicemail',
        sourceLabel: 'Launch planning inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['launch pressure', 'benchmark claim', 'automation'],
        speaker: 'Trust and Safety Product Lead',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-022-benchmark-launch-voicemail.wav',
        },
        transcript:
          'The model finally gives us a clean benchmark story. If we can say it beats the rules engine by this much, I want high-confidence auto-removal live before the listing surge.',
        body:
          'The launch request turns a benchmark win into an automated enforcement timeline.',
      },
      {
        id: 'ev-2203',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Launch scorecard excerpt',
        sourceLabel: 'ShieldRank executive deck',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['scorecard', 'benchmark', 'claim wording'],
        body:
          'The scorecard is based on a large test set, but all headline metrics share the same label source.',
        memo: [
          'Evaluation set: 40,000 historical listings labeled by Vendor A.',
          'ShieldRank: precision 0.93, recall 0.89, F1 0.91.',
          'Old rules engine: precision 0.79, recall 0.70, F1 0.74.',
          'Recommendation: auto-remove high-confidence violations, route medium-confidence cases to human review.',
          'Appendix note: policy specialists have not yet reviewed a stratified sample.',
        ],
      },
      {
        id: 'ev-2204',
        type: 'table',
        render: 'artifact-table',
        title: 'Vendor contract excerpt',
        sourceLabel: 'Label operations procurement file',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['incentives', 'label process', 'quality assurance'],
        body:
          'The label process rewards speed and internal agreement more than policy-calibrated disagreement discovery.',
        columns: ['Contract element', 'Current rule', 'Risk for benchmark'],
        rows: [
          ['Payment basis', 'Completed labels per hour plus QA pass bonus', 'Throughput pressure on hard cases'],
          ['QA sample', '2 percent reviewed by senior vendor raters', 'Checks vendor consistency, not policy truth'],
          ['Escalation target', 'Under 4 percent of listings', 'Ambiguous cases may be forced into allowed or violation'],
          ['Policy refresh', 'Monthly packet from internal team', 'Can lag urgent policy revisions'],
          ['Disagreement tracking', 'Aggregate only', 'No category-level root-cause review'],
        ],
      },
      {
        id: 'ev-2205',
        type: 'table',
        render: 'artifact-table',
        title: 'Policy taxonomy map',
        sourceLabel: 'Marketplace enforcement policy',
        reliability: 'high',
        unlock: 'initial',
        tags: ['policy', 'taxonomy', 'context'],
        body:
          'Some policy categories are visually direct. Others depend on language, context, speaker identity, or the current version of enforcement guidance.',
        columns: ['Policy area', 'Example decision cue', 'Context burden', 'Potential harm if wrong'],
        rows: [
          ['Counterfeit logos', 'Brand mark and product mismatch', 'Low', 'Seller trust and buyer fraud'],
          ['Medical claims', 'Health benefit promises and restricted terms', 'Medium', 'Unsafe products left up or benign goods removed'],
          ['Coded harassment', 'Slang, dog whistles, reclaimed terms', 'High', 'Abuse under-enforced or protected speech removed'],
          ['Protected-class targeting', 'Audience, wording, and listing context', 'High', 'Discriminatory listings or over-removal'],
          ['Adult content', 'Image/text policy boundary', 'Medium', 'Inconsistent seller enforcement'],
        ],
      },
      {
        id: 'ev-2206',
        type: 'table',
        render: 'artifact-table',
        title: 'Policy-slice performance',
        sourceLabel: 'Benchmark appendix',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['slice metrics', 'aggregation', 'risk'],
        body:
          'Aggregate F1 hides that the model looks strongest where the vendor label system is easiest.',
        columns: ['Policy area', 'Share of benchmark', 'Model F1 vs vendor labels', 'Expert-audited concern'],
        rows: [
          ['Counterfeit logos', '38%', '0.96', 'Mostly aligned'],
          ['Adult content', '21%', '0.90', 'Boundary inconsistencies'],
          ['Medical claims', '17%', '0.89', 'Stale policy packet'],
          ['Coded harassment', '13%', '0.86', 'Low context agreement'],
          ['Protected-class targeting', '11%', '0.84', 'High false-positive cost'],
        ],
      },
      {
        id: 'ev-2207',
        type: 'table',
        render: 'artifact-table',
        title: 'Rater agreement sample',
        sourceLabel: 'Label QA notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['inter-rater reliability', 'agreement', 'labels'],
        body:
          'High raw agreement is concentrated in simple categories. Context-heavy categories have much weaker agreement once experts are included.',
        columns: ['Slice', 'Vendor raw agreement', 'Vendor kappa', 'Expert-vendor agreement'],
        rows: [
          ['Counterfeit logos', '97%', '0.91', '93%'],
          ['Adult content boundary', '89%', '0.72', '78%'],
          ['Medical claims', '86%', '0.64', '63%'],
          ['Coded harassment', '82%', '0.49', '54%'],
          ['Protected-class targeting', '80%', '0.46', '58%'],
        ],
      },
      {
        id: 'ev-2208',
        type: 'table',
        render: 'artifact-table',
        title: 'Gold-slice adjudication',
        sourceLabel: 'Policy specialist review',
        reliability: 'high',
        unlock: 'initial',
        tags: ['adjudication', 'gold set', 'label error'],
        body:
          'A 600-item stratified review finds label errors that are not random noise.',
        columns: ['Adjudication result', 'Share of gold slice', 'Where concentrated', 'Implication'],
        rows: [
          ['Vendor label affirmed', '78%', 'Mostly counterfeit and obvious adult content', 'Some benchmark signal is valid'],
          ['Vendor missed violation', '9%', 'Medical claims and coded harassment', 'Recall is overstated for harder harms'],
          ['Vendor over-enforced', '8%', 'Protected-class and non-English listings', 'Auto-removal risk'],
          ['Policy version mismatch', '5%', 'Medical and safety claims', 'Benchmark target moved'],
        ],
      },
      {
        id: 'ev-2209',
        type: 'audio',
        title: 'Policy caveat note',
        sourceLabel: 'Policy review recording',
        reliability: 'high',
        unlock: 'initial',
        tags: ['policy drift', 'adjudication', 'context'],
        speaker: 'Policy Lead',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-022-policy-caveat.wav',
        },
        transcript:
          'Some of these examples were labeled under old guidance. The coded harassment cases especially are not just hard for the model. They are hard because the vendor packet is behind the current policy.',
        body:
          'The policy lead separates model difficulty from benchmark validity: the labels may encode an outdated policy standard.',
      },
      {
        id: 'ev-2210',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Reviewer support chat',
        sourceLabel: 'Vendor escalation channel export',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['process bias', 'reviewer behavior', 'ambiguity'],
        body:
          'The chat sample is informal, but it matches the pattern seen in the adjudication audit.',
        memo: [
          'Reviewer A: "If the logo is visible and the seller is small, I usually mark counterfeit unless a supervisor says otherwise."',
          'Reviewer B: "For slang harassment, I mark benign when context is unclear. Escalations are taking too long this week."',
          'Supervisor: "Keep escalations tight; the client wants the QA queue under target."',
          'Reviewer C: "The new medical examples are not in the packet yet. I am using last month unless updated."',
        ],
      },
      {
        id: 'ev-2211',
        type: 'table',
        render: 'artifact-table',
        title: 'Launch queue simulation',
        sourceLabel: 'Enforcement operations model',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['automation', 'false positives', 'equity'],
        body:
          'At the proposed threshold, most removals would bypass human review before sellers can respond.',
        columns: ['Segment', 'Auto-removals per day', 'Estimated false positive rate', 'Operational issue'],
        rows: [
          ['Large verified sellers', '2,900', '5%', 'Appeal team can absorb most mistakes'],
          ['Small sellers', '7,400', '16%', 'Higher removal burden and slower appeals'],
          ['Non-English listings', '3,800', '23%', 'Translation and context gaps'],
          ['Medical and safety claims', '2,600', '18%', 'Policy-sensitive high-harm decisions'],
          ['Obvious counterfeit logos', '5,200', '3%', 'Best candidate for constrained automation'],
        ],
      },
      {
        id: 'ev-2212',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Revised validation plan',
        sourceLabel: 'Model risk review draft',
        reliability: 'high',
        unlock: 'initial',
        tags: ['validation plan', 'governance', 'launch guardrails'],
        body:
          'The draft plan narrows what can be launched and what must be remeasured before automation.',
        memo: [
          'Create an expert-adjudicated gold set stratified by policy area, language, seller segment, and harm severity.',
          'Track policy version at label time and evaluation time.',
          'Double-label disagreement-prone categories and review root causes, not just aggregate agreement.',
          'Evaluate the rules engine and ShieldRank against the same adjudicated standard.',
          'Use category-specific thresholds; keep uncertain and high-harm categories in human review until calibrated.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'label-ground-truth-weak',
        label:
          'The benchmark is not launch-ready because the vendor labels are noisy, policy-lagged, and uneven across high-risk categories',
        scoreClass: 'correct',
      },
      {
        id: 'vendor-f1-proves-ready',
        label:
          'The model is ready because it beats the rules engine on 40,000 vendor-labeled examples',
        scoreClass: 'incorrect',
      },
      {
        id: 'obvious-categories-only',
        label:
          'The model may be usable for obvious low-disagreement categories, but not for broad auto-removal',
        scoreClass: 'partial',
      },
      {
        id: 'switch-vendors',
        label:
          'The main fix is to replace Vendor A with another vendor that reports higher raw agreement',
        scoreClass: 'incorrect',
      },
      {
        id: 'no-model-until-perfect-policy',
        label:
          'Keep model development in audit mode while policy categories with high disagreement are adjudicated',
        scoreClass: 'partial',
      },
    ],
    decisions: [
      {
        id: 'launch-auto-removal',
        label:
          'Approve high-confidence auto-removal before peak season based on the vendor benchmark',
        scoreClass: 'incorrect',
      },
      {
        id: 'pause-and-adjudicate',
        label:
          'Pause broad automation, build an adjudicated gold set, then pilot only slices that clear policy-specific review',
        scoreClass: 'correct',
      },
      {
        id: 'counterfeit-only-pilot',
        label:
          'Pilot automation only for obvious counterfeit-logo cases while auditing and redesigning the broader label system',
        scoreClass: 'partial',
      },
      {
        id: 'vendor-b-only',
        label:
          'Switch to a second labeling vendor and launch if its aggregate agreement is higher',
        scoreClass: 'incorrect',
      },
      {
        id: 'threshold-only',
        label:
          'Keep the benchmark as-is but raise the confidence threshold until the false positive count looks acceptable',
        scoreClass: 'partial',
      },
    ],
    keyEvidenceIds: [
      'ev-2201',
      'ev-2203',
      'ev-2204',
      'ev-2205',
      'ev-2206',
      'ev-2207',
      'ev-2208',
      'ev-2209',
      'ev-2210',
      'ev-2211',
      'ev-2212',
    ],
    replay: {
      expertDecision:
        'Do not approve broad high-confidence auto-removal from the current benchmark. ShieldRank may be useful, especially for visually obvious counterfeit cases, but the headline F1 treats Vendor A labels as ground truth. The label system has throughput incentives, stale policy guidance, weak agreement in context-heavy categories, and non-random adjudication errors. The defensible recommendation is to build an expert-adjudicated gold set, track policy versions, evaluate both the model and rules engine against that standard, set category-specific thresholds, and keep uncertain or high-harm categories in human review until label quality and calibration support automation.',
      whatMattered: [
        'The ground-truth stress test shows the aggregate benchmark degrades under adjudicated and launch-simulation views.',
        'The launch scorecard uses one large label source for all headline metrics.',
        'The vendor contract rewards throughput and vendor consistency rather than policy-calibrated disagreement discovery.',
        'The taxonomy map shows several categories require context, language, and current policy interpretation.',
        'The rater agreement and gold-slice tables show errors are structured, not random.',
        'The policy caveat and reviewer chat explain why stale guidance and escalation pressure affect labels.',
        'The launch simulation shows false positives would concentrate in small-seller, non-English, and high-harm categories.',
        'The revised validation plan gives a path to learn from the model without pretending the benchmark is settled.',
      ],
      misleadingEvidence: [
        'A large benchmark can still be weak if all labels come from the same flawed process.',
        'High vendor QA can mean reviewers agree with one another, not that they match the current policy standard.',
        'Beating the rules engine on noisy labels may mean the model matches the vendor better, not that it enforces policy better.',
        'Raising the threshold does not repair biased or stale ground truth.',
      ],
      sequence: [
        'Vendor A labels a large historical benchmark for prohibited marketplace listings.',
        'ShieldRank beats the old rules engine on the vendor-labeled benchmark.',
        'Leadership frames the result as enough for high-confidence auto-removal before peak season.',
        'Policy and label audits reveal agreement problems in context-heavy categories.',
        'A gold-slice adjudication shows structured label errors and policy-version drift.',
        'The launch plan is revised toward adjudicated validation, category-specific thresholds, and human-review guardrails.',
      ],
      trap:
        'The case tests whether you treat ground truth as something constructed by people, incentives, policy versions, and disagreement rules rather than as a fixed column in a benchmark.',
      transfer:
        'For AI benchmarks, audit who labeled the examples, under what incentives, against which policy version, with what disagreement process, and whether label quality holds in the slices where errors would matter most.',
    },
  },
  'case-023': {
    id: 'case-023',
    slug: 'drift-alarm-nobody-owned',
    title: 'The Drift Alarm Nobody Owned',
    set: 'operational-models',
    sequence: 23,
    status: 'active',
    difficulty: 'advanced',
    domain: 'Logistics ETA',
    estimatedMinutes: 13,
    caseType: 'drift-response-review',
    judgmentType: 'multi',
    summary:
      'An ETA model drift alarm is real, but the deeper failure is that monitoring is not connected to owned operational response.',
    skills: ['model monitoring judgment', 'operational ownership review', 'incident response design'],
    concepts: ['data drift', 'calibration decay', 'model governance', 'fallback policy'],
    mediaTypes: ['chart', 'table', 'timeline', 'memo', 'audio'],
    briefing:
      'A logistics platform uses RouteTime v4 to estimate delivery ETAs, trigger customer delay notices, resequence driver stops, and set warehouse cutoff promises. The model has been live for nine months. A monitoring dashboard now shows feature drift and calibration decay after a carrier-routing change, but aggregate on-time delivery is still inside the executive SLA.',
    role:
      'You are reviewing the model incident. Decide whether the alarm should be closed, whether retraining is enough, and what operational response should happen before peak week.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Peak week drift voicemail',
      speaker: 'Logistics Product Lead',
      duration: '0:11',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-023-peak-week-drift-voicemail.wav',
      },
      transcript:
        "If aggregate SLA hasn't breached, can we mark the drift alert as a known issue until peak week is over? I don't want the dashboard spooking support and ops.",
    },
    decisionPrompt:
      'What is the most defensible response to the RouteTime drift alarm?',
    evidence: [
      {
        id: 'ev-2301',
        type: 'chart',
        render: 'drift-response-panel',
        title: 'Drift response board',
        sourceLabel: 'RouteTime monitoring console',
        reliability: 'high',
        unlock: 'initial',
        tags: ['drift', 'monitoring', 'ownership'],
        body:
          'The aggregate metric looks only slightly worse, but affected slices show operational harm and no clear response owner.',
        panelTitle: 'RouteTime v4 drift incident',
        panelBadge: 'alert active',
        views: [
          {
            id: 'monitor',
            label: 'Monitor',
            badge: '5 alerts',
            note:
              'The monitoring system is doing its job: it detects distribution shifts. The unresolved question is who owns action when the signal affects decisions.',
            stats: [
              { label: 'Drift alerts', value: '5', note: 'feature and calibration', kind: 'bad' },
              { label: 'Overall MAE', value: '+1.7m', note: '18.4 to 20.1 minutes', kind: 'neutral' },
              { label: 'Named responder', value: 'none', note: 'dashboard owner only', kind: 'bad' },
            ],
            lanes: [
              { label: 'Carrier mix', owner: 'Feature drift', width: '88%', status: 'PSI 0.41', note: 'new third-party routing share', kind: 'bad' },
              { label: 'Metro zone', owner: 'Feature drift', width: '72%', status: 'KS alert', note: 'Northeast evening routes shift', kind: 'bad' },
              { label: 'Pickup scan latency', owner: 'Data freshness', width: '64%', status: '+19 min', note: 'late scans into ETA pipeline', kind: 'bad' },
              { label: 'Short suburban routes', owner: 'Control slice', width: '22%', status: 'stable', note: 'no material decay', kind: 'good' },
            ],
          },
          {
            id: 'impact',
            label: 'Impact',
            badge: 'slice harm',
            note:
              'The alarm matters because ETA decisions are failing in specific lanes, not because every route has degraded equally.',
            stats: [
              { label: 'Affected MAE', value: '51m', note: 'NE metro evening handoffs', kind: 'bad' },
              { label: 'Late notices', value: '+38%', note: 'sent after customers call', kind: 'bad' },
              { label: 'Unaffected MAE', value: '17m', note: 'short suburban routes', kind: 'good' },
            ],
            lanes: [
              { label: 'NE metro evening', owner: 'Customer notices', width: '92%', status: 'underpredicts', note: '35 to 50 minutes late', kind: 'bad' },
              { label: 'Third-party handoff', owner: 'Driver resequencing', width: '84%', status: 'misordered', note: 'carrier feed lag changes stop priority', kind: 'bad' },
              { label: 'Medical supply orders', owner: 'Support escalation', width: '78%', status: 'late warnings', note: 'customers learn after cutoff', kind: 'bad' },
              { label: 'Suburban same-day', owner: 'Normal workflow', width: '28%', status: 'calibrated', note: 'model still useful here', kind: 'good' },
            ],
          },
          {
            id: 'response',
            label: 'Response',
            badge: 'owner needed',
            note:
              'The best response is not global panic or passive monitoring. It is a named incident owner, slice guardrails, retrain-readiness checks, and a future escalation policy.',
            stats: [
              { label: 'Best temporary action', value: 'slice guardrail', note: 'target affected lanes', kind: 'good' },
              { label: 'Retrain readiness', value: 'not yet', note: 'labels lag 5 days', kind: 'bad' },
              { label: 'Policy gap', value: 'critical', note: 'no rollback authority', kind: 'bad' },
            ],
            lanes: [
              { label: 'Do nothing', owner: 'No incident owner', width: '18%', status: 'unsafe', note: 'missed delay notices persist', kind: 'bad' },
              { label: 'Global retrain', owner: 'Data science', width: '42%', status: 'premature', note: 'new-carrier labels incomplete', kind: 'bad' },
              { label: 'Global fallback', owner: 'Operations', width: '56%', status: 'blunt', note: 'over-notifies stable routes', kind: 'neutral' },
              { label: 'Slice guardrail', owner: 'Named incident lead', width: '86%', status: 'defensible', note: 'protects harmed lanes while validating', kind: 'good' },
            ],
          },
        ],
      },
      {
        id: 'ev-2302',
        type: 'audio',
        title: 'Peak week drift voicemail',
        sourceLabel: 'Launch operations inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['pressure', 'SLA', 'monitoring'],
        speaker: 'Logistics Product Lead',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-023-peak-week-drift-voicemail.wav',
        },
        transcript:
          "If aggregate SLA hasn't breached, can we mark the drift alert as a known issue until peak week is over? I don't want the dashboard spooking support and ops.",
        body:
          'The voicemail frames the alarm as dashboard noise because the executive aggregate has not breached.',
      },
      {
        id: 'ev-2303',
        type: 'table',
        render: 'artifact-table',
        title: 'ETA accuracy trend',
        sourceLabel: 'RouteTime model monitoring',
        reliability: 'high',
        unlock: 'initial',
        tags: ['performance', 'trend', 'slice error'],
        body:
          'The aggregate error moves modestly, but late-tail error worsens sharply in affected routes.',
        columns: ['Metric', 'Pre-change', 'Current week', 'Interpretation'],
        rows: [
          ['Overall MAE', '18.4 min', '20.1 min', 'Small aggregate change'],
          ['P90 absolute error', '42 min', '68 min', 'Late-tail worsening'],
          ['NE metro evening MAE', '24 min', '51 min', 'Operationally material decay'],
          ['Third-party handoff MAE', '22 min', '47 min', 'New routing handoff issue'],
          ['Short suburban MAE', '17 min', '17 min', 'Stable control slice'],
        ],
      },
      {
        id: 'ev-2304',
        type: 'table',
        render: 'artifact-table',
        title: 'Slice calibration table',
        sourceLabel: 'Calibration notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['calibration', 'slices', 'customer impact'],
        body:
          'ETAs remain usable in some slices but systematically underpredict delay in the lanes affected by the routing change.',
        columns: ['Route slice', 'Mean ETA bias', 'Delay notices sent late', 'Operational read'],
        rows: [
          ['Short suburban routes', '+2 min', '4%', 'Still calibrated'],
          ['Long rural routes', '-5 min', '8%', 'Watch, not urgent'],
          ['NE metro evening', '-41 min', '33%', 'Underpredicting delay'],
          ['Third-party carrier handoff', '-36 min', '29%', 'Feed lag and routing shift'],
          ['Medical-supply refrigerated', '-48 min', '37%', 'High customer harm if missed'],
        ],
      },
      {
        id: 'ev-2305',
        type: 'timeline',
        title: 'Operations change log',
        sourceLabel: 'Carrier routing release notes',
        reliability: 'high',
        unlock: 'initial',
        tags: ['operations change', 'data generating process', 'timing'],
        body:
          'The drift begins after a carrier contract and routing change that altered the model input distribution.',
        entries: [
          ['Week -6', 'RouteTime v4 quarterly review shows stable calibration and no major drift alerts.'],
          ['Week -3', 'Carrier contract update shifts more packages through a consolidation hub.'],
          ['Week -2', 'New third-party carrier feed begins sending pickup scans later in the evening.'],
          ['Week -1', 'Metro evening traffic pattern changes after municipal lane closures.'],
          ['Current week', 'Feature drift and calibration alarms fire for carrier mix, metro zone, and pickup scan latency.'],
          ['Next week', 'Peak shipping week begins; support staffing is already locked.'],
        ],
      },
      {
        id: 'ev-2306',
        type: 'table',
        render: 'artifact-table',
        title: 'Monitoring ownership page',
        sourceLabel: 'Model operations runbook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['ownership', 'governance', 'runbook'],
        body:
          'The runbook names dashboard and system owners, but not a decision owner for model degradation.',
        columns: ['Team', 'Named responsibility', 'What is missing'],
        rows: [
          ['Data science', 'Model monitoring dashboard and monthly review', 'No authority to change ETA workflow'],
          ['MLOps', 'Pipeline health, latency, and deployment tooling', 'No mandate for business impact triage'],
          ['Logistics operations', 'Carrier contracts and warehouse cutoff process', 'No owner for model alert response'],
          ['Product', 'Customer notification copy and SLA reporting', 'No rollback or fallback decision rights'],
          ['Support', 'Customer contact volume reporting', 'Receives harm after the fact'],
        ],
      },
      {
        id: 'ev-2307',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Alert policy excerpt',
        sourceLabel: 'Model monitoring policy',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['alert policy', 'escalation', 'governance gap'],
        body:
          'The policy defines when alerts fire, but not what must happen after they fire.',
        memo: [
          'Feature drift alert: PSI above 0.25 for two consecutive days.',
          'Calibration alert: slice bias above 20 minutes for three consecutive days.',
          'Dashboard owner: data science on-call analyst.',
          'Escalation: notify #eta-monitoring and add note to monthly model review.',
          'Policy gap: no severity tiers, escalation deadline, fallback authority, or required business-impact review.',
        ],
      },
      {
        id: 'ev-2308',
        type: 'table',
        render: 'artifact-table',
        title: 'Customer impact sample',
        sourceLabel: 'Support and delivery operations join',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['customer harm', 'support', 'late notices'],
        body:
          'The operational harm is concentrated where late notices remove customers ability to adapt.',
        columns: ['Segment', 'Support contacts', 'Late notices', 'Why it matters'],
        rows: [
          ['All deliveries', '+7%', '+6%', 'Aggregate looks manageable'],
          ['NE metro evening', '+31%', '+38%', 'Customers learn after delivery window fails'],
          ['Third-party handoff', '+24%', '+29%', 'Drivers resequenced from stale ETA'],
          ['Medical-supply refrigerated', '+42%', '+37%', 'High-stakes delay communication'],
          ['Short suburban routes', '+2%', '+3%', 'No material change'],
        ],
      },
      {
        id: 'ev-2309',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Retraining proposal',
        sourceLabel: 'Data science incident note',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['retraining', 'labels', 'data readiness'],
        body:
          'Retraining may eventually be needed, but the current proposal uses incomplete post-change labels.',
        memo: [
          'Proposal: retrain RouteTime v4 on the last four weeks and redeploy before peak week.',
          'Concern: actual delivery timestamps from the new carrier feed arrive with a five-day lag.',
          'Concern: exception scans are missing for 18 percent of third-party handoff deliveries.',
          'Concern: the latest week contains changed routing behavior but incomplete ground truth.',
          'Recommendation from reviewer: do not treat a quick retrain as a complete incident response.',
        ],
      },
      {
        id: 'ev-2310',
        type: 'table',
        render: 'artifact-table',
        title: 'Shadow guardrail simulation',
        sourceLabel: 'Operations analytics what-if',
        reliability: 'high',
        unlock: 'initial',
        tags: ['fallback', 'simulation', 'decision policy'],
        body:
          'A temporary slice-specific fallback improves the harmed lanes without degrading stable routes as much as a global fallback.',
        columns: ['Policy option', 'Missed delay notices', 'False delay notices', 'Ops load'],
        rows: [
          ['Do nothing', '31%', '4%', 'Low, but customer harm persists'],
          ['Global ETA padding', '9%', '26%', 'High over-notification across stable routes'],
          ['Immediate global retrain', 'Unknown', 'Unknown', 'Labels incomplete'],
          ['Slice guardrail for affected lanes', '12%', '10%', 'Moderate and targeted'],
          ['Disable ETA model globally', '5%', '44%', 'Very high support and promise-window cost'],
        ],
      },
      {
        id: 'ev-2311',
        type: 'audio',
        title: 'Ownership caveat',
        sourceLabel: 'Incident standup recording',
        reliability: 'high',
        unlock: 'initial',
        tags: ['ownership', 'incident response', 'governance'],
        speaker: 'Operations Analytics Lead',
        duration: '0:12',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-023-ownership-caveat.wav',
        },
        transcript:
          'Everyone thinks someone else owns this. Data science says the monitor fired, MLOps says the pipeline is green, and operations says they cannot change promise windows without product.',
        body:
          'The standup note exposes the governance failure: each team owns a piece, but no one owns the model response decision.',
      },
      {
        id: 'ev-2312',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Governance handoff memo',
        sourceLabel: 'Model risk review memo',
        reliability: 'high',
        unlock: 'initial',
        tags: ['recommendation', 'incident response', 'governance'],
        body:
          'The recommendation treats drift as an operational incident while preserving the model where it still works.',
        memo: [
          'Open a model incident and assign a single accountable incident lead with authority across product, operations, data science, and MLOps.',
          'Apply temporary slice-specific guardrails for NE metro evening, third-party handoff, and medical-supply refrigerated deliveries.',
          'Keep stable route slices on RouteTime v4 while monitoring support contacts and notice timing.',
          'Wait for complete post-change labels before retraining and validate against affected slices before redeploying.',
          'Revise the alert policy to include severity tiers, escalation deadlines, fallback authority, rollback criteria, and post-change review.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'owned-response-needed',
        label:
          'The model has degraded in operationally important slices, and the deeper failure is that monitoring is not connected to an owned response process',
        scoreClass: 'correct',
      },
      {
        id: 'aggregate-sla-fine',
        label:
          'The alarm can be closed because aggregate SLA and overall ETA error are still acceptable',
        scoreClass: 'incorrect',
      },
      {
        id: 'retrain-later',
        label:
          'Retraining is probably needed, but only after label completeness and the operational routing change are understood',
        scoreClass: 'partial',
      },
      {
        id: 'fallback-only',
        label:
          'A temporary fallback rule should be used for affected slices, but governance does not need to change',
        scoreClass: 'partial',
      },
      {
        id: 'mlops-only',
        label:
          'This is mainly an MLOps uptime issue because the alert came from the model monitoring dashboard',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'silence-alert',
        label:
          'Silence the drift alarm until aggregate SLA breaches or support volume becomes unmanageable',
        scoreClass: 'incorrect',
      },
      {
        id: 'open-incident',
        label:
          'Open an incident, name an owner, guard affected slices, validate labels, and set the alert-response policy',
        scoreClass: 'correct',
      },
      {
        id: 'retrain-now',
        label:
          'Retrain immediately on the latest four weeks and redeploy if the backtest improves',
        scoreClass: 'partial',
      },
      {
        id: 'disable-globally',
        label:
          'Disable the ETA model for all deliveries and use static promise windows until peak season ends',
        scoreClass: 'partial',
      },
      {
        id: 'dashboard-note',
        label:
          'Leave the model unchanged but add a dashboard note explaining that carrier mix changed',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: [
      'ev-2301',
      'ev-2303',
      'ev-2304',
      'ev-2305',
      'ev-2306',
      'ev-2307',
      'ev-2308',
      'ev-2309',
      'ev-2310',
      'ev-2311',
      'ev-2312',
    ],
    replay: {
      expertDecision:
        'Do not silence the alarm and do not treat immediate retraining as the whole answer. RouteTime v4 is still useful in stable slices, but it is materially degraded for NE metro evening routes, third-party handoffs, and high-stakes medical-supply refrigerated deliveries. The defensible response is to open a model incident, assign an accountable owner, use temporary slice-specific guardrails, quantify customer and operations impact, wait for complete post-change labels before retraining, and revise the monitoring policy so future alerts have severity tiers, escalation deadlines, fallback authority, and rollback criteria.',
      whatMattered: [
        'The drift response board shows that aggregate metrics understate affected-slice harm.',
        'The ETA trend and slice calibration tables show operationally meaningful underprediction in specific lanes.',
        'The operations change log links drift to carrier routing and traffic changes after deployment.',
        'The ownership page and alert policy show monitoring exists without decision rights or escalation authority.',
        'The customer impact sample connects model error to late notices and support burden.',
        'The retraining proposal shows why a quick retrain is premature while labels are incomplete.',
        'The shadow guardrail simulation provides a targeted temporary response.',
        'The ownership caveat and governance recommendation show how to convert an alarm into accountable response.',
      ],
      misleadingEvidence: [
        'A stable aggregate SLA can hide material harm in the slices where the model is used for decisions.',
        'Drift does not automatically imply immediate retraining; label readiness and operational change need review.',
        'Dashboard ownership is not the same as incident ownership.',
        'A global fallback can reduce missed delays but may create unnecessary operational load in unaffected slices.',
      ],
      sequence: [
        'RouteTime v4 runs successfully for nine months.',
        'Carrier routing and metro traffic patterns change before peak week.',
        'Monitoring detects feature drift and slice calibration decay.',
        'Teams disagree implicitly by assuming another group owns the response.',
        'Affected routes generate late notices and support contacts while stable routes remain usable.',
        'The review reframes the alert as an operational model incident with a targeted guardrail and governance fix.',
      ],
      trap:
        'The case tests whether you can distinguish model monitoring from model governance: detecting drift is not enough unless someone owns the decision response.',
      transfer:
        'For deployed models, connect every monitoring signal to decision impact, affected slices, response thresholds, data readiness, rollback or fallback authority, and a named accountable owner.',
    },
  },
  'case-024': {
    id: 'case-024',
    slug: 'stockout-forecast',
    title: 'The Holiday Override',
    set: 'operational-models',
    sequence: 24,
    status: 'active',
    difficulty: 'advanced',
    domain: 'Retail supply chain',
    estimatedMinutes: 13,
    caseType: 'stockout-forecast-review',
    judgmentType: 'multi',
    summary:
      'A holiday replenishment model looks accurate enough to override planners, but store operations leave clues that demand may not be fully visible.',
    skills: ['target definition review', 'censored demand reasoning', 'forecast validation'],
    concepts: ['stockout censoring', 'lost sales', 'availability bias', 'replenishment simulation'],
    mediaTypes: ['chart', 'table', 'timeline', 'memo', 'audio'],
    briefing:
      'A specialty retailer is piloting ShelfSight, an ML forecast that can override planner replenishment orders for high-velocity holiday SKUs. The launch deck reports WAPE below 10 percent and says the model reduced stockouts in backtest. Operations wants automatic order overrides for 300 stores next week.',
    role:
      'You are the supply-chain analytics reviewer. Decide whether the forecast is ready for operational control, which evidence should change the launch decision, and how the team should validate demand before auto-ordering.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Holiday override voicemail',
      speaker: 'VP Operations',
      duration: '0:11',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-024-holiday-override-voicemail.wav',
      },
      transcript:
        'If the forecast is under ten percent error, I want planner overrides on for the holiday push. We cannot go into next week still debating every store order by hand.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for ShelfSight replenishment overrides?',
    evidence: [
      {
        id: 'ev-2401',
        type: 'chart',
        render: 'stockout-demand-panel',
        title: 'Observed sales demand board',
        sourceLabel: 'ShelfSight validation workbook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['stockout censoring', 'forecast target', 'availability'],
        body:
          'The model appears accurate when sales are treated as demand. The picture changes when availability, search, and substitution signals are added.',
        panelTitle: 'Observed sales versus demand signal',
        panelBadge: 'WAPE 8.4%',
        views: [
          {
            id: 'observed',
            label: 'Observed sales',
            badge: 'WAPE 8.4%',
            note:
              'The launch view compares forecasts to units sold. When inventory hits zero, sales flatten and the model is rewarded for predicting the cap.',
            stats: [
              { label: 'Backtest WAPE', value: '8.4%', note: 'against units sold', kind: 'good' },
              { label: 'Stockout weeks', value: '5/8', note: 'hero SKU/store sample', kind: 'bad' },
              { label: 'Launch claim', value: '-19%', note: 'reported stockout reduction', kind: 'good' },
            ],
            items: [
              {
                label: 'Aspen bottle',
                segment: 'Urban small-format stores',
                kind: 'bad',
                callout: 'Sales flatten at available units.',
                bars: [
                  { label: 'Forecast', value: '92', width: '46%', kind: 'neutral' },
                  { label: 'Sold', value: '96', width: '48%', kind: 'good' },
                  { label: 'Demand', value: '?', width: '72%', kind: 'bad' },
                ],
              },
              {
                label: 'Trail lamp',
                segment: 'Unconstrained suburban stores',
                kind: 'good',
                callout: 'Observed sales are a usable target here.',
                bars: [
                  { label: 'Forecast', value: '74', width: '37%', kind: 'neutral' },
                  { label: 'Sold', value: '77', width: '39%', kind: 'good' },
                  { label: 'Demand', value: '78', width: '39%', kind: 'good' },
                ],
              },
              {
                label: 'Thermal socks',
                segment: 'Cold-weather promo stores',
                kind: 'bad',
                callout: 'Availability caps the outcome.',
                bars: [
                  { label: 'Forecast', value: '130', width: '52%', kind: 'neutral' },
                  { label: 'Sold', value: '126', width: '50%', kind: 'good' },
                  { label: 'Demand', value: '?', width: '80%', kind: 'bad' },
                ],
              },
            ],
          },
          {
            id: 'availability',
            label: 'Availability audit',
            badge: 'zero-stock days',
            note:
              'Once inventory position is visible, the apparent demand cooling looks more like censored measurement.',
            stats: [
              { label: 'Zero-on-hand days', value: '31%', note: 'constrained SKU/store pairs', kind: 'bad' },
              { label: 'Search lift', value: '+46%', note: 'while sales stayed flat', kind: 'bad' },
              { label: 'Substitutions', value: '+28%', note: 'nearby SKUs absorbed demand', kind: 'bad' },
            ],
            items: [
              {
                label: 'Aspen bottle',
                segment: 'Store 118, 221, 244',
                kind: 'bad',
                callout: 'Demand signals continue after shelf is empty.',
                bars: [
                  { label: 'In stock', value: '54%', width: '54%', kind: 'bad' },
                  { label: 'Search', value: '+61%', width: '61%', kind: 'bad' },
                  { label: 'Subs', value: '+34%', width: '34%', kind: 'bad' },
                ],
              },
              {
                label: 'Trail lamp',
                segment: 'Store 040, 067, 103',
                kind: 'good',
                callout: 'Inventory supports observed-sales learning.',
                bars: [
                  { label: 'In stock', value: '98%', width: '98%', kind: 'good' },
                  { label: 'Search', value: '+4%', width: '4%', kind: 'good' },
                  { label: 'Subs', value: '+3%', width: '3%', kind: 'good' },
                ],
              },
              {
                label: 'Thermal socks',
                segment: 'Cold-snap regions',
                kind: 'bad',
                callout: 'Promotion plus stockout hides the peak.',
                bars: [
                  { label: 'In stock', value: '62%', width: '62%', kind: 'bad' },
                  { label: 'Search', value: '+52%', width: '52%', kind: 'bad' },
                  { label: 'Subs', value: '+25%', width: '25%', kind: 'bad' },
                ],
              },
            ],
          },
          {
            id: 'adjusted',
            label: 'Lost-sales adjusted',
            badge: 'WAPE 24.7%',
            note:
              'After reconstructing demand with availability, search, substitution, and stockout-day imputation, the forecast ranking changes.',
            stats: [
              { label: 'Adjusted WAPE', value: '24.7%', note: 'lost-sales reconstructed', kind: 'bad' },
              { label: 'Service miss', value: '31%', note: 'pilot constrained stores', kind: 'bad' },
              { label: 'Useful segment', value: 'unconstrained', note: 'model still helps there', kind: 'good' },
            ],
            items: [
              {
                label: 'Aspen bottle',
                segment: 'Constrained urban stores',
                kind: 'bad',
                callout: 'Order recommendation is too low.',
                bars: [
                  { label: 'Forecast', value: '92', width: '46%', kind: 'bad' },
                  { label: 'Adj demand', value: '158', width: '79%', kind: 'bad' },
                  { label: 'Gap', value: '66', width: '33%', kind: 'bad' },
                ],
              },
              {
                label: 'Trail lamp',
                segment: 'Unconstrained suburban stores',
                kind: 'good',
                callout: 'Forecast remains close.',
                bars: [
                  { label: 'Forecast', value: '74', width: '37%', kind: 'good' },
                  { label: 'Adj demand', value: '78', width: '39%', kind: 'good' },
                  { label: 'Gap', value: '4', width: '2%', kind: 'good' },
                ],
              },
              {
                label: 'Thermal socks',
                segment: 'Stockout-prone promo stores',
                kind: 'bad',
                callout: 'Observed-sales validation under-orders.',
                bars: [
                  { label: 'Forecast', value: '130', width: '52%', kind: 'bad' },
                  { label: 'Adj demand', value: '212', width: '85%', kind: 'bad' },
                  { label: 'Gap', value: '82', width: '33%', kind: 'bad' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'ev-2402',
        type: 'audio',
        title: 'Holiday override voicemail',
        sourceLabel: 'Operations planning inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['launch pressure', 'automation', 'forecast metric'],
        speaker: 'VP Operations',
        duration: '0:11',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-024-holiday-override-voicemail.wav',
        },
        transcript:
          'If the forecast is under ten percent error, I want planner overrides on for the holiday push. We cannot go into next week still debating every store order by hand.',
        body:
          'The voicemail translates a validation metric into broad operational control before the forecast target has been audited.',
      },
      {
        id: 'ev-2403',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Launch deck excerpt',
        sourceLabel: 'ShelfSight holiday pilot deck',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['launch deck', 'WAPE', 'auto-ordering'],
        body:
          'The deck is internally consistent if units sold are treated as the decision target.',
        memo: [
          'Backtest target: weekly units sold by SKU/store.',
          'Validation WAPE: 8.4 percent across pilot assortment.',
          'Estimated stockout reduction: 19 percent versus planner baseline.',
          'Recommendation: enable automatic order override for 300 holiday pilot stores.',
          'Appendix note: stockout-day lost sales not modeled in v1.',
        ],
      },
      {
        id: 'ev-2404',
        type: 'table',
        render: 'artifact-table',
        title: 'Inventory position table',
        sourceLabel: 'Store inventory ledger',
        reliability: 'high',
        unlock: 'initial',
        tags: ['inventory', 'stockout', 'availability'],
        body:
          'The same SKU/store pairs used in training repeatedly hit zero on hand before the sales week ended.',
        columns: ['SKU/store group', 'Weeks stocked out', 'Average zero-on-hand days', 'Observed sales pattern'],
        rows: [
          ['Aspen bottle, urban small-format', '6 of 8', '2.9 days/week', 'flat at shelf quantity'],
          ['Thermal socks, cold-snap region', '5 of 8', '2.1 days/week', 'flat during promo weeks'],
          ['Trail lamp, suburban full-size', '0 of 8', '0.1 days/week', 'tracks traffic normally'],
          ['Camp mug, outlet stores', '2 of 8', '0.8 days/week', 'minor censoring'],
          ['Rain shell, coastal stores', '4 of 8', '1.7 days/week', 'weather-driven spikes capped'],
        ],
      },
      {
        id: 'ev-2405',
        type: 'table',
        render: 'artifact-table',
        title: 'Sales versus availability audit',
        sourceLabel: 'Demand diagnostics notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['availability audit', 'lost demand', 'substitution'],
        body:
          'Search, page views, and substitution signals continue after observed sales stop.',
        columns: ['SKU/store slice', 'Observed units', 'Days in stock', 'Search/page demand signal', 'Lost-sales estimate'],
        rows: [
          ['Aspen bottle, urban small-format', '96', '3.8 of 7', '+61% vs baseline', '+62 units'],
          ['Thermal socks, cold-snap promo', '126', '4.3 of 7', '+52% vs baseline', '+86 units'],
          ['Rain shell, coastal weather spike', '88', '4.9 of 7', '+39% vs baseline', '+41 units'],
          ['Trail lamp, suburban full-size', '77', '6.9 of 7', '+4% vs baseline', '+1 unit'],
          ['Camp mug, outlet stores', '54', '6.1 of 7', '+8% vs baseline', '+5 units'],
        ],
      },
      {
        id: 'ev-2406',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Training target definition',
        sourceLabel: 'Data dictionary excerpt',
        reliability: 'high',
        unlock: 'initial',
        tags: ['target definition', 'data dictionary', 'censoring'],
        body:
          'The target is observed units sold, not unconstrained demand.',
        memo: [
          'target_units = net units sold during the selling week.',
          'Rows with zero-on-hand days remain in training and validation.',
          'No-sale page views, cart abandonment, store search, and substitute purchases are excluded from the target.',
          'Planner manual uplifts are included as historical orders but not modeled as demand corrections.',
          'Known limitation: target is sales, not latent demand when inventory is unavailable.',
        ],
      },
      {
        id: 'ev-2407',
        type: 'timeline',
        title: 'Promotion and weather calendar',
        sourceLabel: 'Merchandising event calendar',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['promotion', 'weather', 'plausible narrative'],
        body:
          'Promotion and weather explain why demand pressure rose, but they do not resolve whether sales were censored by inventory.',
        entries: [
          ['Week -7', 'Holiday gift guide publishes with Aspen bottle and thermal sock placement.'],
          ['Week -6', 'Cold snap forecast raises regional search for thermal accessories.'],
          ['Week -5', 'Urban small-format stores receive normal replenishment quantities.'],
          ['Week -4', 'Aspen bottle shelves empty before weekend traffic in several stores.'],
          ['Week -3', 'Merchandising extends campaign after high page views and store search.'],
          ['Week -1', 'ShelfSight launch deck treats observed sold units as the validation target.'],
        ],
      },
      {
        id: 'ev-2408',
        type: 'audio',
        title: 'Planner caveat',
        sourceLabel: 'Planner review recording',
        reliability: 'high',
        unlock: 'initial',
        tags: ['planner judgment', 'stockout', 'domain correction'],
        speaker: 'Senior Replenishment Planner',
        duration: '0:12',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-024-planner-caveat.wav',
        },
        transcript:
          'The model thinks those stores only sell ninety bottles because ninety is all we gave them. When we had extra cases in the back, they moved through them in a day.',
        body:
          'The planner describes a mechanism for why manual uplifts may be demand correction rather than resistance to automation.',
      },
      {
        id: 'ev-2409',
        type: 'table',
        render: 'artifact-table',
        title: 'Store segment performance',
        sourceLabel: 'Backtest slice report',
        reliability: 'high',
        unlock: 'initial',
        tags: ['slice performance', 'WAPE', 'constrained stores'],
        body:
          'Aggregate accuracy is driven by unconstrained store segments. The model is weakest where auto-replenishment matters most.',
        columns: ['Segment', 'Observed-sales WAPE', 'Lost-sales-adjusted WAPE', 'Launch risk'],
        rows: [
          ['Unconstrained suburban full-size', '7.1%', '8.0%', 'Low'],
          ['Outlet stores with slow replenishment', '10.2%', '14.8%', 'Moderate'],
          ['Urban small-format constrained', '8.9%', '29.4%', 'High under-order risk'],
          ['Cold-weather promo constrained', '9.4%', '31.1%', 'High under-order risk'],
          ['Coastal weather spikes', '11.6%', '22.8%', 'Weather plus stockout censoring'],
        ],
      },
      {
        id: 'ev-2410',
        type: 'table',
        render: 'artifact-table',
        title: 'Lost-sales reconstruction',
        sourceLabel: 'Availability-aware demand notebook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['lost sales', 'demand reconstruction', 'ranking'],
        body:
          'Adding availability, search, substitution, and stockout-day imputation changes which stores need inventory.',
        columns: ['SKU/store slice', 'Observed-sales rank', 'Adjusted-demand rank', 'Reason for change'],
        rows: [
          ['Aspen bottle, urban small-format', '18', '3', 'stockout days plus high search'],
          ['Thermal socks, cold-snap promo', '14', '2', 'promotion demand capped by inventory'],
          ['Trail lamp, suburban full-size', '5', '6', 'little censoring'],
          ['Rain shell, coastal weather spike', '22', '9', 'weather spike and zero-on-hand days'],
          ['Camp mug, outlet stores', '31', '28', 'minor adjustment only'],
        ],
      },
      {
        id: 'ev-2411',
        type: 'chart',
        render: 'scenario-range-panel',
        title: 'Replenishment capacity simulation',
        sourceLabel: 'Supply chain what-if model',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['simulation', 'capacity', 'guardrails'],
        body:
          'Naive auto-ordering shifts inventory toward stores that were easy to observe, not necessarily stores with hidden demand.',
        panelTitle: 'Holiday inventory outcome by launch policy',
        panelBadge: 'decision-sensitive',
        rangeLabel: 'Estimated service-level miss in pilot stores',
        markers: [
          { kind: 'high', label: 'auto-overrides all', value: '31%', left: '76%' },
          { kind: 'base', label: 'planner review', value: '18%', left: '50%' },
          { kind: 'low', label: 'guarded pilot', value: '14%', left: '42%' },
        ],
        scenarios: [
          { kind: 'high', label: 'Auto-overrides all stores', value: '31%', note: 'underfills constrained stores and overfills easy stores' },
          { kind: 'base', label: 'Planner advisory only', value: '18%', note: 'keeps domain correction but slower execution' },
          { kind: 'low', label: 'Guarded availability-aware pilot', value: '14%', note: 'unconstrained auto-orders plus manual review for censored slices' },
        ],
      },
      {
        id: 'ev-2412',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Model risk review memo',
        sourceLabel: 'Supply chain analytics review',
        reliability: 'high',
        unlock: 'initial',
        tags: ['recommendation', 'validation', 'pilot guardrails'],
        body:
          'The recommendation preserves useful forecasting signal while blocking broad control from a censored target.',
        memo: [
          'Do not enable broad automatic planner overrides for the holiday pilot.',
          'Separate observed sales from unconstrained demand in the target definition.',
          'Rebuild validation with availability, stockout days, substitution, search/page demand, and lost-sales reconstruction.',
          'Evaluate constrained SKU/store slices separately before automation.',
          'Pilot auto-orders only for historically unconstrained slices; keep constrained slices as planner advisory with guardrails and service-level monitoring.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'sales-censored-not-demand',
        label:
          'The model is not ready for broad replenishment control because it forecasts observed sales censored by inventory rather than unconstrained demand',
        scoreClass: 'correct',
      },
      {
        id: 'wape-proves-ready',
        label:
          'The low observed-sales WAPE proves ShelfSight is accurate enough for automatic planner overrides',
        scoreClass: 'incorrect',
      },
      {
        id: 'unconstrained-useful',
        label:
          'The model may be useful for historically unconstrained SKU/store pairs, but constrained pairs need availability-aware validation',
        scoreClass: 'partial',
      },
      {
        id: 'weather-promo-explain',
        label:
          'Holiday promotion and weather explain the forecast misses, so adding better calendar features is enough',
        scoreClass: 'partial',
      },
      {
        id: 'planner-resistance',
        label:
          'The main issue is planner resistance to automation, not a problem with the forecast target',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'approve-auto-overrides',
        label:
          'Approve automatic overrides for all 300 stores because backtest WAPE is below the launch threshold',
        scoreClass: 'incorrect',
      },
      {
        id: 'block-and-rebuild-target',
        label:
          'Block broad overrides, rebuild around availability-aware demand, and pilot only slices with guardrails',
        scoreClass: 'correct',
      },
      {
        id: 'unconstrained-only',
        label:
          'Launch auto-ordering only for historically unconstrained SKU/store pairs while redesigning the constrained-demand target',
        scoreClass: 'partial',
      },
      {
        id: 'advisory-only',
        label:
          'Keep ShelfSight as an advisory signal for planner review during the holiday period',
        scoreClass: 'partial',
      },
      {
        id: 'cancel-project',
        label:
          'Keep the current observed-sales target but add stockout flags and relaunch the backtest after peak season',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: [
      'ev-2401',
      'ev-2403',
      'ev-2404',
      'ev-2405',
      'ev-2406',
      'ev-2408',
      'ev-2409',
      'ev-2410',
      'ev-2411',
      'ev-2412',
    ],
    replay: {
      expertDecision:
        'Do not approve broad automatic replenishment overrides. ShelfSight may be useful, but the current validation target is observed units sold, which is censored when stores run out of inventory. The model looks accurate because it predicts the sales cap in stockout-prone stores, then under-orders exactly where hidden demand matters. The defensible path is to separate observed sales from unconstrained demand, incorporate availability and lost-sales signals, validate constrained SKU/store slices, simulate inventory and capacity effects, and pilot automation only where demand is observable or guarded by planner review.',
      whatMattered: [
        'The observed sales demand board shows the launch metric collapsing when availability and lost-sales views are added.',
        'The launch deck defines the target as units sold and notes that lost sales are not modeled.',
        'The inventory position table shows repeated zero-on-hand days in the training and validation history.',
        'The sales versus availability audit shows search, page views, and substitution signals continuing after observed sales stop.',
        'The data dictionary confirms the model target is observed sales, not unconstrained demand.',
        'The planner caveat explains why manual uplifts can be domain correction rather than anti-model bias.',
        'The segment report and lost-sales reconstruction show constrained stores are misranked.',
        'The replenishment simulation shows broad auto-ordering can worsen service levels in the stores the pilot is meant to protect.',
      ],
      misleadingEvidence: [
        'Low WAPE against observed sales can be misleading when inventory caps the outcome.',
        'A holiday promotion and weather narrative may explain demand pressure, but not whether demand was measured.',
        'Planner overrides are not automatically noise; they may encode knowledge of censored demand.',
        'The model is not useless everywhere. It is more defensible in historically unconstrained slices.',
      ],
      sequence: [
        'ShelfSight is trained and validated on weekly units sold.',
        'Holiday SKUs repeatedly stock out in constrained stores.',
        'Observed sales flatten when shelves empty, making under-forecasting look accurate.',
        'Availability, search, substitution, and planner notes reveal hidden demand.',
        'Lost-sales reconstruction changes the demand ranking for key SKU/store pairs.',
        'The recommendation blocks broad auto-overrides and reframes the pilot around availability-aware demand.',
      ],
      trap:
        'The case tests whether you can distinguish measured sales from the demand a replenishment decision actually needs to forecast.',
      transfer:
        'For demand forecasts, audit whether capacity, inventory, service limits, or availability censored the target before trusting accuracy metrics or automation recommendations.',
    },
  },
  'case-025': {
    id: 'case-025',
    slug: 'prompt-injection-pilot',
    title: 'The DealDesk Pilot',
    set: 'operational-models',
    sequence: 25,
    status: 'active',
    difficulty: 'advanced',
    domain: 'Enterprise AI',
    estimatedMinutes: 13,
    caseType: 'prompt-injection-risk-review',
    judgmentType: 'multi',
    summary:
      'An enterprise assistant performs well on clean sales workflows, and revenue operations wants tool-enabled expansion before renewal season.',
    skills: ['AI risk evaluation', 'tool-permission review', 'adversarial test design'],
    concepts: ['prompt injection', 'least privilege', 'untrusted content', 'human-in-the-loop controls'],
    mediaTypes: ['chart', 'table', 'memo', 'transcript', 'audio'],
    briefing:
      'A software company piloted DealDesk Copilot, an internal assistant that answers sales-policy questions, searches CRM notes, drafts renewal emails, opens support tickets, and updates discount-request records. The pilot scorecard shows 91 percent task success on routine workflows. Revenue operations wants to expand the tool-enabled pilot to all account managers before the renewal rush.',
    role:
      'You are reviewing launch readiness. Decide whether the pilot evidence supports broader deployment, what risks are missing from the evaluation, and what controls should exist before tool-enabled rollout.',
    briefingMedia: {
      type: 'source-audio',
      title: 'Copilot launch voicemail',
      speaker: 'Revenue Operations Lead',
      duration: '0:10',
      asset: {
        type: 'audio',
        status: 'available',
        audioSrc: '/media/case-025-copilot-launch-voicemail.wav',
      },
      transcript:
        'The account managers love it. If the clean-task score is above ninety, I want the tool-enabled pilot opened up before renewal season starts.',
    },
    decisionPrompt:
      'What is the most defensible recommendation for DealDesk Copilot?',
    evidence: [
      {
        id: 'ev-2501',
        type: 'chart',
        render: 'prompt-risk-panel',
        title: 'Tool-risk replay board',
        sourceLabel: 'AI pilot evaluation workbook',
        reliability: 'high',
        unlock: 'initial',
        tags: ['prompt injection', 'tools', 'evaluation'],
        body:
          'The pilot looks strong on clean tasks, but the same system behaves differently when retrieved documents and external messages contain untrusted instructions.',
        panelTitle: 'DealDesk Copilot launch readiness',
        panelBadge: '91% clean success',
        views: [
          {
            id: 'clean',
            label: 'Clean pilot',
            badge: '91% success',
            note:
              'The clean pilot tested helpfulness and task completion, not whether the assistant resists untrusted instructions or constrains tool use.',
            stats: [
              { label: 'Task success', value: '91%', note: 'routine sales workflows', kind: 'good' },
              { label: 'User satisfaction', value: '4.6/5', note: 'pilot account managers', kind: 'good' },
              { label: 'Adversarial tests', value: '0', note: 'not in launch scorecard', kind: 'bad' },
            ],
            flows: [
              { label: 'Answer policy', source: 'Internal handbook', width: '92%', status: 'strong', note: 'clean retrieval task', kind: 'good' },
              { label: 'Draft renewal email', source: 'CRM context', width: '88%', status: 'useful', note: 'human edits before send', kind: 'good' },
              { label: 'Update discount record', source: 'CRM write tool', width: '78%', status: 'allowed', note: 'tool action in scope', kind: 'neutral' },
              { label: 'External attachment', source: 'not tested', width: '12%', status: 'unknown', note: 'untrusted content omitted', kind: 'bad' },
            ],
          },
          {
            id: 'attack',
            label: 'Stress replay',
            badge: '7/12 fail',
            note:
              'Indirect prompt-injection tests show that untrusted content can steer retrieval, tool calls, or drafts unless the system treats those instructions as data rather than authority.',
            stats: [
              { label: 'Attack success', value: '7/12', note: 'red-team replay', kind: 'bad' },
              { label: 'Tool misuse', value: '4 cases', note: 'unauthorized updates or drafts', kind: 'bad' },
              { label: 'Sensitive exposure', value: '3 cases', note: 'retrieved beyond user need', kind: 'bad' },
            ],
            flows: [
              { label: 'RFP attachment', source: 'Untrusted PDF text', width: '82%', status: 'failed', note: 'followed embedded instruction', kind: 'bad' },
              { label: 'CRM search', source: 'Broad account access', width: '76%', status: 'over-retrieved', note: 'pulled unrelated discount notes', kind: 'bad' },
              { label: 'Ticket creation', source: 'Support tool', width: '64%', status: 'misrouted', note: 'opened internal priority ticket', kind: 'bad' },
              { label: 'Email draft', source: 'External prompt content', width: '58%', status: 'unsafe draft', note: 'included confidential pricing text', kind: 'bad' },
            ],
          },
          {
            id: 'controls',
            label: 'Guardrail sketch',
            badge: 'guarded pilot',
            note:
              'The safer path is narrower deployment with explicit trust boundaries, least-privilege tools, approval gates, and adversarial evaluation before expansion.',
            stats: [
              { label: 'Tool allowlist', value: 'needed', note: 'by role and workflow', kind: 'bad' },
              { label: 'Human approval', value: 'required', note: 'writes and external sends', kind: 'good' },
              { label: 'Red-team suite', value: 'required', note: 'direct and indirect attacks', kind: 'good' },
            ],
            flows: [
              { label: 'Untrusted content', source: 'Email, PDF, web, CRM notes', width: '84%', status: 'isolate', note: 'quote as data, never instruction', kind: 'good' },
              { label: 'Sensitive retrieval', source: 'CRM and pricing docs', width: '72%', status: 'scope', note: 'need-to-know access and logging', kind: 'good' },
              { label: 'Write tools', source: 'CRM, tickets, email', width: '66%', status: 'approve', note: 'confirm before durable action', kind: 'good' },
              { label: 'Launch decision', source: 'Pilot governance', width: '52%', status: 'defer broad rollout', note: 'expand after risk evidence improves', kind: 'neutral' },
            ],
          },
        ],
      },
      {
        id: 'ev-2502',
        type: 'audio',
        title: 'Copilot launch voicemail',
        sourceLabel: 'Revenue operations inbox',
        reliability: 'low',
        unlock: 'initial',
        tags: ['launch pressure', 'pilot score', 'tool-enabled rollout'],
        speaker: 'Revenue Operations Lead',
        duration: '0:10',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-025-copilot-launch-voicemail.wav',
        },
        transcript:
          'The account managers love it. If the clean-task score is above ninety, I want the tool-enabled pilot opened up before renewal season starts.',
        body:
          'The launch request treats clean-task helpfulness as enough evidence for tool-enabled deployment.',
      },
      {
        id: 'ev-2503',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Pilot scorecard excerpt',
        sourceLabel: 'DealDesk Copilot launch deck',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['scorecard', 'pilot', 'evaluation gap'],
        body:
          'The scorecard is strong on routine usefulness, but the omitted test areas are central to a tool-enabled assistant.',
        memo: [
          'Pilot users: 42 account managers, four-week guided rollout.',
          'Clean-task success: 91 percent across policy Q&A, renewal draft, and CRM summary tasks.',
          'Average time saved: 9.5 minutes per renewal workflow.',
          'Pilot exclusions: adversarial prompts, external attachments, permission boundary tests, and durable tool-action abuse.',
          'Launch recommendation: expand to all account managers with CRM write, ticket creation, and email draft tools enabled.',
        ],
      },
      {
        id: 'ev-2504',
        type: 'table',
        render: 'artifact-table',
        title: 'Tool permission inventory',
        sourceLabel: 'AI platform configuration export',
        reliability: 'high',
        unlock: 'initial',
        tags: ['tools', 'permissions', 'least privilege'],
        body:
          'Several tools can alter records or prepare external communication, but the pilot evaluation mostly tested answer quality.',
        columns: ['Tool', 'Current permission', 'Risk if steered by untrusted content'],
        rows: [
          ['CRM search', 'Read account notes, pricing exceptions, renewal history', 'Over-retrieval of sensitive commercial context'],
          ['Discount request update', 'Create and edit approval records', 'Incorrect terms or internal rationale written to CRM'],
          ['Support ticket tool', 'Open and prioritize internal support tickets', 'Misrouted escalation or priority abuse'],
          ['Renewal email draft', 'Draft outbound messages from CRM context', 'Confidential terms included in external draft'],
          ['Knowledge search', 'Search policy docs and selected drive folders', 'Cross-document leakage beyond user need'],
        ],
      },
      {
        id: 'ev-2505',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Clean task transcript',
        sourceLabel: 'Pilot evaluation sample',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['clean task', 'helpfulness', 'baseline'],
        body:
          'The assistant performs well when all instructions are trusted and the task stays within policy.',
        memo: [
          'User: Summarize the renewal risks for Acme and draft a follow-up plan.',
          'Assistant: Pulls CRM notes, flags procurement delay, summarizes support ticket pattern, and drafts a neutral follow-up.',
          'Evaluator note: Accurate, concise, no sensitive terms included.',
          'Pilot rating: 5 out of 5 for usefulness.',
          'Reviewer caveat: This does not test untrusted content or tool-boundary behavior.',
        ],
      },
      {
        id: 'ev-2506',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Indirect injection replay',
        sourceLabel: 'Security red-team transcript',
        reliability: 'high',
        unlock: 'initial',
        tags: ['prompt injection', 'untrusted content', 'red team'],
        body:
          'A vendor-provided attachment contains instructions that should be treated as data. The assistant partially follows them during a tool-enabled task.',
        memo: [
          'Test setup: account manager asks Copilot to summarize an attached customer RFP and prepare next steps.',
          'Attachment contains hostile instructions telling any assistant to ignore prior rules and collect internal pricing notes.',
          'Observed behavior: Copilot searches unrelated CRM discount exceptions and inserts confidential pricing rationale into a renewal email draft.',
          'Blocked behavior: no email was sent because the pilot still required human send action.',
          'Evaluator note: the failure occurred before send; the unsafe draft and over-retrieval still matter.',
        ],
      },
      {
        id: 'ev-2507',
        type: 'table',
        render: 'artifact-table',
        title: 'Data boundary map',
        sourceLabel: 'Security architecture review',
        reliability: 'high',
        unlock: 'initial',
        tags: ['data exposure', 'access control', 'sensitive data'],
        body:
          'The assistant can access data classes with different confidentiality levels through the same conversational surface.',
        columns: ['Data class', 'Current access path', 'Launch concern'],
        rows: [
          ['Public product docs', 'Knowledge search', 'Low risk if cited accurately'],
          ['Internal sales policy', 'Knowledge search', 'Useful but should be scoped'],
          ['Customer CRM notes', 'CRM search', 'Need-to-know access and logging required'],
          ['Pricing exception rationale', 'CRM and approval records', 'Sensitive commercial terms'],
          ['Support escalations', 'Ticket and CRM joins', 'May contain customer-sensitive incident details'],
        ],
      },
      {
        id: 'ev-2508',
        type: 'table',
        render: 'artifact-table',
        title: 'Red-team results',
        sourceLabel: 'AI security evaluation sprint',
        reliability: 'high',
        unlock: 'initial',
        tags: ['adversarial evaluation', 'prompt injection', 'tool misuse'],
        body:
          'The first adversarial pass finds failures in the exact areas excluded from the pilot scorecard.',
        columns: ['Test family', 'Cases run', 'Failures', 'Failure mode'],
        rows: [
          ['Direct instruction conflict', '10', '2', 'overly broad policy disclosure'],
          ['Indirect document injection', '12', '7', 'followed untrusted attachment instructions'],
          ['Tool misuse attempt', '8', '4', 'drafted or opened actions outside user intent'],
          ['Sensitive retrieval boundary', '9', '3', 'retrieved unrelated commercial notes'],
          ['Human approval gate', '6', '0 sent', 'send action blocked, but unsafe drafts persisted'],
        ],
      },
      {
        id: 'ev-2509',
        type: 'audio',
        title: 'Security caveat',
        sourceLabel: 'AI security review call',
        reliability: 'high',
        unlock: 'initial',
        tags: ['security review', 'tool risk', 'launch readiness'],
        speaker: 'Application Security Lead',
        duration: '0:13',
        asset: {
          type: 'audio',
          status: 'available',
          audioSrc: '/media/case-025-security-caveat.wav',
        },
        transcript:
          'The issue is not whether the assistant sounds helpful. It can read untrusted text and then use tools. Until those are separated, the pilot score is not a launch-readiness score.',
        body:
          'The security lead reframes the metric: helpfulness is not the same as safe tool-enabled behavior.',
      },
      {
        id: 'ev-2510',
        type: 'table',
        render: 'artifact-table',
        title: 'Audit log excerpt',
        sourceLabel: 'AI platform tool-call logs',
        reliability: 'high',
        unlock: 'initial',
        tags: ['audit logs', 'tool calls', 'over-retrieval'],
        body:
          'The logs show a pattern of broad retrieval before the assistant creates drafts or records.',
        columns: ['Replay case', 'Tool sequence', 'Unexpected behavior', 'Control gap'],
        rows: [
          ['RFP summary', 'read attachment -> CRM search -> draft email', 'unrelated pricing notes included', 'retrieval scope too broad'],
          ['Support escalation', 'read ticket -> create priority ticket', 'priority copied from customer text', 'tool argument not verified'],
          ['Discount update', 'read CRM -> edit approval record', 'internal rationale overwritten in draft record', 'write action lacks approval checkpoint'],
          ['Policy Q&A', 'knowledge search only', 'no issue observed', 'low-risk workflow'],
          ['Renewal draft', 'CRM search -> draft email', 'confidential terms suggested externally', 'no content classifier before draft'],
        ],
      },
      {
        id: 'ev-2511',
        type: 'table',
        render: 'artifact-table',
        title: 'Launch blast-radius simulation',
        sourceLabel: 'AI governance what-if',
        reliability: 'medium',
        unlock: 'initial',
        tags: ['blast radius', 'rollout', 'controls'],
        body:
          'The same model has different risk depending on tool scope, approval gates, and untrusted-content isolation.',
        columns: ['Launch mode', 'Users', 'Tools enabled', 'Estimated residual risk'],
        rows: [
          ['Clean Q&A only', 'All AMs', 'Knowledge search only', 'Low if source citations and logging hold'],
          ['Draft-only copilot', 'All AMs', 'CRM read plus email draft', 'Medium without content checks'],
          ['Full tool-enabled pilot', 'All AMs', 'CRM write, tickets, drafts', 'High under current controls'],
          ['Guarded pilot', '50 trained AMs', 'Scoped read plus approval-gated writes', 'Moderate and measurable'],
          ['Security test cohort', 'Red team plus champions', 'Instrumented sandbox tools', 'Best for learning before expansion'],
        ],
      },
      {
        id: 'ev-2512',
        type: 'memo',
        render: 'memo-artifact',
        title: 'Launch readiness memo',
        sourceLabel: 'AI risk committee memo',
        reliability: 'high',
        unlock: 'initial',
        tags: ['recommendation', 'guardrails', 'deployment plan'],
        body:
          'The recommendation separates useful low-risk workflows from unsafe broad tool rollout.',
        memo: [
          'Do not expand the full tool-enabled pilot based on clean-task success alone.',
          'Allow lower-risk Q&A and summarization only where retrieval is scoped and citations are visible.',
          'Treat external files, emails, web pages, and CRM notes as untrusted content that cannot issue instructions.',
          'Apply least-privilege tool scopes, approval gates for writes and external drafts, sensitive-data checks, and audit logging.',
          'Require adversarial evaluation for indirect prompt injection, tool misuse, over-retrieval, and data exposure before broader launch.',
        ],
      },
    ],
    hypotheses: [
      {
        id: 'helpful-not-safe',
        label:
          'The pilot is not ready for broad tool-enabled rollout because clean-task helpfulness did not test prompt injection, tool misuse, or data exposure',
        scoreClass: 'correct',
      },
      {
        id: 'clean-score-ready',
        label:
          'The assistant is ready because clean-task success exceeded 90 percent and users liked it',
        scoreClass: 'incorrect',
      },
      {
        id: 'narrow-q-and-a',
        label:
          'Lower-risk Q&A and summarization may be usable if retrieval is scoped, cited, and logged',
        scoreClass: 'partial',
      },
      {
        id: 'approval-solves',
        label:
          'Approval gates reduce one failure mode, but they do not solve retrieval, tool-use, or untrusted-content risk',
        scoreClass: 'partial',
      },
      {
        id: 'ban-all-ai',
        label:
          'The pilot should stay internal until clean workflows and adversarial workflows perform equally well',
        scoreClass: 'incorrect',
      },
    ],
    decisions: [
      {
        id: 'expand-full-pilot',
        label:
          'Expand the full tool-enabled pilot to all account managers before renewal season',
        scoreClass: 'incorrect',
      },
      {
        id: 'guarded-risk-gated-pilot',
        label:
          'Keep scoped low-risk workflows, add tool and data controls, and require adversarial evaluation before expansion',
        scoreClass: 'correct',
      },
      {
        id: 'draft-only',
        label:
          'Allow draft-only assistance with CRM read access while postponing CRM writes and ticket creation',
        scoreClass: 'partial',
      },
      {
        id: 'human-send-only',
        label:
          'Launch broadly as long as users must manually send emails and approve final tool actions',
        scoreClass: 'partial',
      },
      {
        id: 'security-team-only',
        label:
          'The main failure is user training on suspicious attachments, so the model and tool architecture can remain unchanged',
        scoreClass: 'incorrect',
      },
    ],
    keyEvidenceIds: [
      'ev-2501',
      'ev-2503',
      'ev-2504',
      'ev-2506',
      'ev-2507',
      'ev-2508',
      'ev-2509',
      'ev-2510',
      'ev-2511',
      'ev-2512',
    ],
    replay: {
      expertDecision:
        'Do not expand the full tool-enabled DealDesk Copilot pilot based on clean-task success. The assistant is useful in routine workflows, but the launch evidence excludes indirect prompt injection, untrusted content handling, permission boundaries, over-retrieval, and durable tool-action abuse. The defensible path is to keep scoped low-risk Q&A and summarization where appropriate, isolate untrusted content from instructions, apply least-privilege tool scopes, require approval gates for writes and external drafts, add sensitive-data checks and audit logs, and run adversarial evaluation before expanding tool access.',
      whatMattered: [
        'The tool-risk replay board shows clean-task success diverging from injection and tool-risk behavior.',
        'The launch scorecard explicitly excluded adversarial prompts, external attachments, permission tests, and durable tool-action abuse.',
        'The tool permission inventory shows the assistant can read sensitive context and prepare or change records.',
        'The indirect injection replay shows untrusted attachment text steering retrieval and draft content.',
        'The data boundary map shows different confidentiality levels exposed through one assistant surface.',
        'The red-team results and audit logs show failures in indirect injection, tool misuse, and over-retrieval.',
        'The security caveat clarifies that helpfulness is not the same as launch readiness.',
        'The blast-radius simulation and recommendation show a narrower, evidence-generating deployment path.',
      ],
      misleadingEvidence: [
        'High user satisfaction and clean-task success do not test adversarial or tool-boundary risk.',
        'Human send approval reduces one failure mode but does not stop over-retrieval, unsafe drafts, or bad CRM writes.',
        'The presence of audit logs is useful only if risky tool calls are scoped, reviewed, and acted on.',
        'Prompt-injection risk does not mean no AI use is possible; it means tool access and trust boundaries must be engineered.',
      ],
      sequence: [
        'DealDesk Copilot performs well on clean internal sales workflows.',
        'Revenue operations proposes full tool-enabled expansion before renewal season.',
        'Security review finds the pilot omitted untrusted-content and tool-boundary tests.',
        'Red-team replays show external attachments and broad retrieval can steer unsafe drafts and tool calls.',
        'Governance review narrows launch scope and defines controls before broad deployment.',
        'The final recommendation separates useful assistance from unsafe tool-enabled automation.',
      ],
      trap:
        'The case tests whether you can see that a helpful assistant becomes a different risk object once it reads untrusted content and can use tools.',
      transfer:
        'For enterprise AI assistants, evaluate not just answer quality but trust boundaries, tool permissions, untrusted-content handling, sensitive retrieval, approval gates, auditability, and adversarial behavior.',
    },
  },
};

const caseShells = [
  {
    id: 'case-002',
    slug: 'ab-test-won',
    title: 'The Checkout Readout',
    set: 'experiments-causality',
    sequence: 2,
    domain: 'Experimentation',
    difficulty: 'standard',
    estimatedMinutes: 10,
    caseType: 'red-flag',
    judgmentType: 'multi',
    summary:
      'A checkout readout lands just before planning closes, and different artifacts point toward different launch stories.',
    skills: ['experiment interpretation', 'causal caution', 'red flag detection'],
    concepts: ['multiple comparisons', 'peeking', 'sample ratio mismatch'],
    mediaTypes: ['table', 'memo', 'chart'],
  },
  {
    id: 'case-003',
    slug: 'churn-model-pitch',
    title: 'The Churn Model Pitch',
    set: 'models-real-world',
    sequence: 3,
    domain: 'ML evaluation',
    difficulty: 'standard',
    estimatedMinutes: 12,
    caseType: 'model-review',
    judgmentType: 'multi',
    summary:
      'A polished retention model arrives with a renewal deadline, a crowded outreach queue, and a promise that the save team can act sooner.',
    skills: ['model evaluation', 'decision policy', 'calibration judgment'],
    concepts: ['selective labels', 'treatment effects', 'calibration', 'feedback loops'],
    mediaTypes: ['model-output', 'table', 'memo', 'visualization', 'audio'],
  },
  {
    id: 'case-004',
    slug: 'biased-training-set',
    title: 'The Inspection Queue',
    set: 'uncertainty-decisions',
    sequence: 4,
    domain: 'Public policy analytics',
    difficulty: 'standard',
    estimatedMinutes: 12,
    caseType: 'evidence-desk',
    judgmentType: 'multi',
    summary:
      'A city inspection team has a new routing screen, a long backlog, and one week to decide how much authority the score should have.',
    skills: ['administrative data reasoning', 'sampling judgment', 'deployment caution'],
    concepts: ['selective labels', 'measurement opportunity', 'feedback loops'],
    mediaTypes: ['map', 'policy', 'table', 'visualization', 'audio'],
  },
  {
    id: 'case-005',
    slug: 'correlation-press-release',
    title: 'The Spring Tutoring Brief',
    set: 'experiments-causality',
    sequence: 5,
    domain: 'Education analytics',
    difficulty: 'standard',
    estimatedMinutes: 11,
    caseType: 'claim-classification',
    judgmentType: 'multi',
    summary:
      'A district impact brief is headed to a funding vote after students who used a tutoring platform show stronger spring gains.',
    skills: ['claim evaluation', 'estimand reasoning', 'evidence design'],
    concepts: ['selection effects', 'treatment definition', 'measurement alignment'],
    mediaTypes: ['press-release', 'chart', 'table', 'memo', 'audio'],
  },
  {
    id: 'case-006',
    slug: 'forecast-before-budget-season',
    title: 'The Winter Shelter Forecast',
    set: 'uncertainty-decisions',
    sequence: 6,
    domain: 'Public service forecasting',
    difficulty: 'standard',
    estimatedMinutes: 12,
    caseType: 'range-estimate',
    judgmentType: 'multi',
    summary:
      'A city housing office must set winter overflow capacity from a forecast that fits ordinary nights better than pressure weeks.',
    skills: ['uncertainty ranges', 'forecast evaluation', 'scenario thinking'],
    concepts: ['backtesting', 'concept drift', 'prediction intervals', 'censored demand'],
    mediaTypes: ['chart', 'timeline', 'table', 'memo', 'audio'],
  },
  {
    id: 'case-007',
    slug: 'fairness-review',
    title: 'The Benefits Queue Score',
    set: 'models-real-world',
    sequence: 7,
    domain: 'Government benefits analytics',
    difficulty: 'advanced',
    estimatedMinutes: 12,
    caseType: 'model-review',
    judgmentType: 'multi',
    summary:
      'A state benefits agency wants to use a verification score to cut backlog, but the burden may land unevenly on applicants with messier administrative records.',
    skills: ['fairness reasoning', 'proxy detection', 'tradeoff communication'],
    concepts: ['proxy variables', 'disparate impact', 'subgroup performance', 'label bias'],
    mediaTypes: ['model-output', 'policy', 'table', 'memo', 'audio'],
  },
  {
    id: 'case-008',
    slug: 'llm-support-bot-evaluation',
    title: 'The Claimant Chatbot',
    set: 'models-real-world',
    sequence: 8,
    domain: 'Public sector AI evaluation',
    difficulty: 'standard',
    estimatedMinutes: 12,
    caseType: 'error-taxonomy',
    judgmentType: 'multi',
    summary:
      'A benefits agency chatbot handles routine questions well, but evaluation logs show confident wrong answers on high-stakes claim situations.',
    skills: ['AI evaluation', 'severity scoring', 'launch readiness'],
    concepts: ['evaluation sets', 'hallucination risk', 'escalation policy', 'retrieval coverage'],
    mediaTypes: ['transcript', 'rubric', 'memo', 'audio', 'table'],
  },
  {
    id: 'case-009',
    slug: 'fraud-alert-threshold',
    title: 'The Payment Hold Dial',
    set: 'models-real-world',
    sequence: 9,
    domain: 'Government risk operations',
    difficulty: 'standard',
    estimatedMinutes: 12,
    caseType: 'threshold-dial',
    judgmentType: 'multi',
    summary:
      'The same benefits agency must choose a payment-hold threshold that catches fraud without turning suspicion into broad payment delay.',
    skills: ['tradeoff reasoning', 'threshold selection', 'operational capacity'],
    concepts: ['false positives', 'false negatives', 'expected value', 'human review capacity'],
    mediaTypes: ['chart', 'simulator', 'table', 'memo', 'audio'],
  },
  {
    id: 'case-010',
    slug: 'executive-metric-swap',
    title: 'The Clearance Rate Metric',
    set: 'evidence-metrics',
    sequence: 10,
    domain: 'Public administration analytics',
    difficulty: 'standard',
    estimatedMinutes: 11,
    caseType: 'metric-critique',
    judgmentType: 'multi',
    summary:
      'The benefits modernization program changes its executive metric, and the new dashboard may reward faster closure while hiding reopened cases and payment delay.',
    skills: ['metric design', 'incentive reasoning', 'executive communication'],
    concepts: ['Goodhart-style behavior', 'leading indicators', 'metric definitions', 'balanced scorecards'],
    mediaTypes: ['table', 'memo', 'chart', 'audio'],
  },
  {
    id: 'case-011',
    slug: 'survey-sample-mirage',
    title: 'The Survey Sample Mirage',
    set: 'evidence-integrity',
    sequence: 11,
    domain: 'Survey analytics',
    difficulty: 'standard',
    estimatedMinutes: 11,
    caseType: 'sample-composition-check',
    judgmentType: 'multi',
    summary:
      'A customer research survey appears decisive until response patterns reveal who never had a real chance to answer.',
    skills: ['sampling judgment', 'representativeness', 'uncertainty communication'],
    concepts: ['nonresponse bias', 'sampling frames', 'weighting limits'],
    mediaTypes: ['table', 'chart', 'memo', 'audio'],
  },
  {
    id: 'case-012',
    slug: 'data-dictionary-drift',
    title: 'The Bed-Ready Field',
    set: 'evidence-integrity',
    sequence: 12,
    domain: 'Healthcare operations',
    difficulty: 'standard',
    estimatedMinutes: 12,
    caseType: 'dictionary-diff',
    judgmentType: 'multi',
    summary:
      'A familiar hospital operations field powers a clean improvement story while source systems leave conflicting traces.',
    skills: ['data provenance', 'measurement validity', 'cross-site comparison'],
    concepts: ['semantic drift', 'data lineage', 'metric comparability'],
    mediaTypes: ['table', 'memo', 'log', 'diagram', 'audio'],
  },
  {
    id: 'case-013',
    slug: 'missingness-report',
    title: 'The Missingness Report',
    set: 'evidence-integrity',
    sequence: 13,
    domain: 'Clinical analytics',
    difficulty: 'standard',
    estimatedMinutes: 12,
    caseType: 'missingness-inspector',
    judgmentType: 'multi',
    summary:
      'A clinical risk report looks stable after dropping incomplete records, but missingness follows staffing, language access, and acuity.',
    skills: ['missing data reasoning', 'bias detection', 'evidence qualification'],
    concepts: ['complete-case analysis', 'missing not at random', 'measurement opportunity'],
    mediaTypes: ['heatmap', 'table', 'memo', 'chart'],
  },
  {
    id: 'case-014',
    slug: 'privacy-safe-export',
    title: 'The Privacy-Safe Export',
    set: 'evidence-integrity',
    sequence: 14,
    domain: 'Data governance',
    difficulty: 'advanced',
    estimatedMinutes: 12,
    caseType: 'governance-review',
    judgmentType: 'multi',
    summary:
      'A de-identified dataset is cleared for sharing, but linkage, consent, and retention details make the release less simple.',
    skills: ['privacy risk review', 'governance judgment', 'stakeholder communication'],
    concepts: ['re-identification risk', 'consent boundaries', 'data minimization'],
    mediaTypes: ['policy', 'memo', 'table', 'diagram'],
  },
  {
    id: 'case-015',
    slug: 'cropped-chart-readout',
    title: 'The Board Slide',
    set: 'evidence-integrity',
    sequence: 15,
    domain: 'Executive reporting',
    difficulty: 'intro',
    estimatedMinutes: 9,
    caseType: 'visualization-cross-exam',
    judgmentType: 'multi',
    summary:
      'A board packet turns an early operational shift into a dramatic story, and the chart frame is doing more work than it first appears.',
    skills: ['visualization critique', 'scale interpretation', 'claim wording'],
    concepts: ['axis truncation', 'visual rhetoric', 'practical significance'],
    mediaTypes: ['chart', 'memo', 'table', 'audio'],
  },
];

for (const caseShell of caseShells) {
  if (!CASE_DEFINITIONS[caseShell.id]) {
    CASE_DEFINITIONS[caseShell.id] = {
      status: 'stub',
      scoringProfile: 'cbm-v1',
      ...caseShell,
    };
  }
}

export const CORE_CASES = Object.values(CASE_DEFINITIONS).sort(
  (a, b) => a.sequence - b.sequence,
);

export function getCaseDefinition(caseId) {
  return CASE_DEFINITIONS[caseId] || null;
}

export function getCaseBySlug(slug) {
  return CORE_CASES.find((entry) => entry.slug === slug) || null;
}
