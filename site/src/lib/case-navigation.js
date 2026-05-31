export const CASE_FILTERS = [
  {
    id: 'measurement',
    label: 'Measurement and metrics',
    description: 'Dashboards, definitions, denominators, samples, and visual claims.',
    caseIds: ['case-001', 'case-010', 'case-011', 'case-012', 'case-013', 'case-015', 'case-024'],
  },
  {
    id: 'causal-claims',
    label: 'Causal claims',
    description: 'Experiments, quasi-experiments, comparison groups, and claim wording.',
    caseIds: ['case-002', 'case-005', 'case-016', 'case-017', 'case-018', 'case-019', 'case-020'],
  },
  {
    id: 'model-deployment',
    label: 'Model deployment',
    description: 'Scores, thresholds, validation evidence, workflow fit, and operational readiness.',
    caseIds: ['case-003', 'case-007', 'case-008', 'case-009', 'case-021', 'case-022', 'case-023', 'case-024', 'case-025'],
  },
  {
    id: 'public-impact',
    label: 'Public impact',
    description: 'Benefits, education, housing, health, labor, and civic decision settings.',
    caseIds: ['case-004', 'case-005', 'case-006', 'case-007', 'case-008', 'case-009', 'case-010', 'case-017', 'case-018'],
  },
  {
    id: 'data-integrity',
    label: 'Data integrity',
    description: 'Provenance, missingness, data release, field definitions, and label quality.',
    caseIds: ['case-001', 'case-011', 'case-012', 'case-013', 'case-014', 'case-022', 'case-024'],
  },
  {
    id: 'ai-systems',
    label: 'AI systems',
    description: 'AI assistance, model monitoring, benchmark evidence, and tool-enabled workflows.',
    caseIds: ['case-008', 'case-021', 'case-022', 'case-023', 'case-025'],
  },
  {
    id: 'visual-evidence',
    label: 'Visual evidence',
    description: 'Charts, boards, maps, sensitivity panels, and executive readouts.',
    caseIds: ['case-001', 'case-004', 'case-010', 'case-015', 'case-016', 'case-020', 'case-023'],
  },
  {
    id: 'beginner',
    label: 'Good first cases',
    description: 'Shorter entries that introduce the investigation format with lower friction.',
    caseIds: ['case-001', 'case-002', 'case-005', 'case-006', 'case-010', 'case-015'],
  },
  {
    id: 'advanced',
    label: 'Advanced files',
    description: 'Dense, multi-signal reviews for learners who want a harder case desk.',
    caseIds: ['case-007', 'case-014', 'case-018', 'case-021', 'case-022', 'case-023', 'case-024', 'case-025'],
  },
  {
    id: 'audio-heavy',
    label: 'Audio-rich',
    description: 'Cases with stakeholder or field clips that add pressure and context.',
    caseIds: ['case-001', 'case-002', 'case-006', 'case-007', 'case-008', 'case-009', 'case-010', 'case-016', 'case-020', 'case-025'],
  },
];

export const CASE_PATHWAYS = [
  {
    id: 'first-shift',
    title: 'First Shift in the Case Room',
    audience: 'New learners',
    purpose: 'Learn the workflow without starting in the densest evidence files.',
    caseIds: ['case-001', 'case-002', 'case-006', 'case-010', 'case-015'],
  },
  {
    id: 'causal-reviewer',
    title: 'Causal Claim Reviewer',
    audience: 'Experiment and policy analysts',
    purpose: 'Practice deciding when a comparison supports a causal story and when it only suggests one.',
    caseIds: ['case-002', 'case-005', 'case-016', 'case-017', 'case-018', 'case-019', 'case-020'],
  },
  {
    id: 'model-risk',
    title: 'Model Risk Desk',
    audience: 'ML reviewers and analytics leads',
    purpose: 'Trace model performance through labels, thresholds, workflows, drift, and operational authority.',
    caseIds: ['case-003', 'case-007', 'case-009', 'case-021', 'case-022', 'case-023', 'case-024'],
  },
  {
    id: 'public-service',
    title: 'Public Service Evidence',
    audience: 'Government, nonprofit, health, and education teams',
    purpose: 'Practice evidence judgment where delays, access, fairness, and claimant harm matter.',
    caseIds: ['case-004', 'case-005', 'case-006', 'case-007', 'case-008', 'case-010', 'case-017', 'case-018'],
  },
  {
    id: 'data-integrity',
    title: 'Evidence Integrity Lab',
    audience: 'Data quality and governance reviewers',
    purpose: 'Interrogate whether the records, fields, samples, and releases are fit for the decision.',
    caseIds: ['case-011', 'case-012', 'case-013', 'case-014', 'case-015'],
  },
  {
    id: 'enterprise-ai',
    title: 'Enterprise AI Readiness',
    audience: 'AI product, security, and enablement teams',
    purpose: 'Evaluate AI systems as deployed workflows, not clean-task demos.',
    caseIds: ['case-008', 'case-021', 'case-022', 'case-023', 'case-025'],
  },
];

export const DIAGNOSTIC_PROMPTS = [
  {
    id: 'role',
    label: 'Work setting',
    question: 'Which work setting should the lab emphasize first?',
    options: [
      { id: 'public-service', label: 'Public service', pathwayId: 'public-service' },
      { id: 'product-growth', label: 'Product or growth', pathwayId: 'causal-reviewer' },
      { id: 'ai-ml', label: 'AI or ML systems', pathwayId: 'model-risk' },
    ],
  },
  {
    id: 'habit',
    label: 'Judgment habit',
    question: 'Which habit do you most want to sharpen?',
    options: [
      { id: 'claims', label: 'Challenge causal claims', pathwayId: 'causal-reviewer' },
      { id: 'records', label: 'Check data records', pathwayId: 'data-integrity' },
      { id: 'deployment', label: 'Review operational models', pathwayId: 'model-risk' },
    ],
  },
  {
    id: 'pace',
    label: 'Starting pace',
    question: 'How hard should the first run feel?',
    options: [
      { id: 'first-shift', label: 'Start focused', pathwayId: 'first-shift' },
      { id: 'advanced', label: 'Start hard', pathwayId: 'model-risk' },
      { id: 'ai', label: 'Start with AI', pathwayId: 'enterprise-ai' },
    ],
  },
];

export function casesById(cases) {
  return new Map(cases.map((caseItem) => [caseItem.id, caseItem]));
}

export function materializeCaseList(cases, caseIds) {
  const lookup = casesById(cases);
  return caseIds.map((id) => lookup.get(id)).filter(Boolean);
}

export function selectedPathwayForAnswers(answers) {
  const counts = new Map();
  for (const pathwayId of Object.values(answers)) {
    counts.set(pathwayId, (counts.get(pathwayId) || 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 'first-shift';
}
