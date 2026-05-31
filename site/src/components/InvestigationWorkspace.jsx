import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileText,
  GitCompare,
  Gauge,
  LockKeyhole,
  Pin,
  PlayCircle,
  Radio,
  Search,
  ShieldQuestion,
  SlidersHorizontal,
  Table2,
  Volume2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getCaseDefinition } from '../lib/cases.js';
import {
  confidenceLabel,
  scoreClassToOutcome,
  summarizeCaseScore,
} from '../lib/scoring.js';
import { withBase } from '../lib/paths.js';
import { readProgress, saveCaseProgress } from '../lib/progress.js';
import './investigation-workspace.css';

const typeIcons = {
  audio: Volume2,
  chart: BarChart3,
  diagram: GitCompare,
  heatmap: BarChart3,
  memo: FileText,
  timeline: ClipboardList,
  table: Table2,
  log: Table2,
  segment: SlidersHorizontal,
  definition: ShieldQuestion,
  'model-output': Gauge,
  policy: LockKeyhole,
  'press-release': Radio,
  rubric: ClipboardList,
  simulator: SlidersHorizontal,
  visualization: BarChart3,
};

const confidenceOptions = [
  { id: 'low', label: 'Low', note: 'Plausible, but I am not certain' },
  { id: 'medium', label: 'Medium', note: 'Supported, with caveats' },
  { id: 'high', label: 'High', note: 'Strongly supported' },
];

const artifactMarkOptions = [
  {
    id: 'lead',
    label: 'Lead',
    description: 'Evidence that moves the likely explanation.',
  },
  {
    id: 'narrative',
    label: 'Narrative',
    description: 'A stakeholder story, incentive, or urgency cue.',
  },
  {
    id: 'context',
    label: 'Context',
    description: 'Background that helps interpret the scene, but is not decisive alone.',
  },
  {
    id: 'open-thread',
    label: 'Open thread',
    description: 'A loose end you would verify before acting with confidence.',
  },
];

const emptyReconstruction = {
  changed: '',
  tension: '',
  nextStep: '',
};

const MINIMUM_PINNED_EVIDENCE = 2;
const MINIMUM_SORTED_ARTIFACTS = 3;
const MINIMUM_RATIONALE_CHARACTERS = 60;

const evidenceCardLayouts = [
  {
    left: '2%',
    top: '42px',
    width: '32%',
    rotate: '-4deg',
    depth: 3,
    openLeft: '2%',
    openTop: '84px',
    openWidth: '61%',
  },
  {
    left: '41%',
    top: '10px',
    width: '29%',
    rotate: '2.4deg',
    depth: 5,
    openLeft: '18%',
    openTop: '72px',
    openWidth: '62%',
  },
  {
    left: '68%',
    top: '82px',
    width: '30%',
    rotate: '-2.1deg',
    depth: 2,
    openLeft: '35%',
    openTop: '118px',
    openWidth: '62%',
  },
  {
    left: '12%',
    top: '246px',
    width: '28%',
    rotate: '3.8deg',
    depth: 4,
    openLeft: '5%',
    openTop: '242px',
    openWidth: '62%',
  },
  {
    left: '49%',
    top: '218px',
    width: '34%',
    rotate: '-3.1deg',
    depth: 6,
    openLeft: '27%',
    openTop: '226px',
    openWidth: '62%',
  },
  {
    left: '4%',
    top: '470px',
    width: '36%',
    rotate: '1.7deg',
    depth: 1,
    openLeft: '3%',
    openTop: '418px',
    openWidth: '64%',
  },
  {
    left: '62%',
    top: '430px',
    width: '31%',
    rotate: '4.2deg',
    depth: 7,
    openLeft: '35%',
    openTop: '400px',
    openWidth: '62%',
  },
  {
    left: '32%',
    top: '622px',
    width: '32%',
    rotate: '-3.5deg',
    depth: 2,
    openLeft: '17%',
    openTop: '560px',
    openWidth: '64%',
  },
  {
    left: '5%',
    top: '770px',
    width: '30%',
    rotate: '2.6deg',
    depth: 4,
    openLeft: '3%',
    openTop: '720px',
    openWidth: '64%',
  },
  {
    left: '53%',
    top: '735px',
    width: '31%',
    rotate: '-1.6deg',
    depth: 5,
    openLeft: '30%',
    openTop: '720px',
    openWidth: '63%',
  },
  {
    left: '22%',
    top: '928px',
    width: '34%',
    rotate: '3.2deg',
    depth: 3,
    openLeft: '15%',
    openTop: '900px',
    openWidth: '65%',
  },
  {
    left: '65%',
    top: '965px',
    width: '29%',
    rotate: '-2.6deg',
    depth: 6,
    openLeft: '35%',
    openTop: '900px',
    openWidth: '62%',
  },
  {
    left: '8%',
    top: '1142px',
    width: '31%',
    rotate: '-1.9deg',
    depth: 2,
    openLeft: '5%',
    openTop: '1060px',
    openWidth: '64%',
  },
  {
    left: '47%',
    top: '1130px',
    width: '34%',
    rotate: '2.8deg',
    depth: 4,
    openLeft: '27%',
    openTop: '1060px',
    openWidth: '64%',
  },
  {
    left: '68%',
    top: '1300px',
    width: '29%',
    rotate: '-3.2deg',
    depth: 5,
    openLeft: '34%',
    openTop: '1210px',
    openWidth: '62%',
  },
  {
    left: '24%',
    top: '1345px',
    width: '33%',
    rotate: '1.9deg',
    depth: 3,
    openLeft: '15%',
    openTop: '1210px',
    openWidth: '64%',
  },
];

function evidenceCardStyle(index, seed) {
  const layout = evidenceCardLayouts[index % evidenceCardLayouts.length];
  const jitter = seededNumber(`${seed}:jitter:${index}`);
  const rotateJitter = (jitter * 2.2 - 1.1).toFixed(2);

  return {
    '--card-left': layout.left,
    '--card-top': layout.top,
    '--card-width': layout.width,
    '--card-rotate': `calc(${layout.rotate} + ${rotateJitter}deg)`,
    '--card-depth': layout.depth,
    '--card-open-left': layout.openLeft,
    '--card-open-top': layout.openTop,
    '--card-open-width': layout.openWidth,
  };
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededNumber(value) {
  return hashString(value) / 4294967295;
}

function boardPlacements(caseId, evidence) {
  const seed = `${caseId}:${evidence.map((item) => item.id).join('|')}`;
  const shuffledSlots = evidence.map((_, index) => ({
    index,
    sort: hashString(`${seed}:slot:${index}`),
  })).sort((a, b) => a.sort - b.sort);
  const placements = new Map();

  evidence.forEach((item, evidenceIndex) => {
    placements.set(item.id, {
      boardIndex: shuffledSlots[evidenceIndex]?.index ?? evidenceIndex,
      boardSeed: seed,
    });
  });

  return placements;
}

function boardHeightForEvidence(count) {
  const usedSlots = Array.from({ length: count }, (_, index) => evidenceCardLayouts[index])
    .filter(Boolean);
  const maxBottom = usedSlots.reduce((max, layout) => {
    const top = Number.parseInt(layout.top, 10) || 0;
    return Math.max(max, top + 180);
  }, 980);

  return `${maxBottom + 80}px`;
}

function boardStyle(caseId, evidence) {
  return {
    '--board-height': boardHeightForEvidence(evidence.length),
    '--board-seed': hashString(`${caseId}:${evidence.length}`),
  };
}

function boardSlotForItem(placements, item, fallbackIndex) {
  return placements.get(item.id) || {
    boardIndex: fallbackIndex,
    boardSeed: item.id,
  };
}

export default function InvestigationWorkspace({ caseId }) {
  const caseData = getCaseDefinition(caseId);
  const [viewedEvidenceIds, setViewedEvidenceIds] = useState([]);
  const [activeEvidenceId, setActiveEvidenceId] = useState('');
  const [pinnedEvidenceIds, setPinnedEvidenceIds] = useState([]);
  const [hypothesisId, setHypothesisId] = useState('');
  const [decisionId, setDecisionId] = useState('');
  const [confidence, setConfidence] = useState('medium');
  const [rationale, setRationale] = useState('');
  const [artifactMarks, setArtifactMarks] = useState({});
  const [reconstruction, setReconstruction] = useState(emptyReconstruction);
  const [judgmentUnlocked, setJudgmentUnlocked] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    const existing = readProgress().cases?.[caseId];
    if (!existing) {
      saveCaseProgress(caseId, { status: 'in_progress' });
      return;
    }

    const savedViewedEvidenceIds = existing.viewedEvidenceIds || [];
    setViewedEvidenceIds(savedViewedEvidenceIds);
    setActiveEvidenceId(
      existing.activeEvidenceId ||
        savedViewedEvidenceIds[savedViewedEvidenceIds.length - 1] ||
        '',
    );
    setPinnedEvidenceIds(existing.pinnedEvidenceIds || []);
    setHypothesisId(existing.hypothesisId || '');
    setDecisionId(existing.judgment?.answer || '');
    setConfidence(existing.judgment?.confidence || 'medium');
    setRationale(existing.judgment?.rationale || '');
    setArtifactMarks(existing.artifactMarks || {});
    setReconstruction(existing.reconstruction || emptyReconstruction);
    setJudgmentUnlocked(
      Boolean(
        existing.judgmentUnlocked ||
          existing.status === 'submitted' ||
          existing.status === 'reviewed',
      ),
    );
    setSubmitted(existing.status === 'submitted' || existing.status === 'reviewed' ? existing : null);
  }, [caseId]);

  const evidenceItems = caseData?.evidence || [];
  const keyEvidenceIds = caseData?.keyEvidenceIds || [];
  const selectedDecision = caseData?.decisions?.find(
    (entry) => entry.id === decisionId,
  );
  const selectedHypothesis = caseData?.hypotheses?.find(
    (entry) => entry.id === hypothesisId,
  );

  const keyEvidenceCount = useMemo(
    () =>
      keyEvidenceIds.filter((id) => pinnedEvidenceIds.includes(id))
        .length,
    [keyEvidenceIds, pinnedEvidenceIds],
  );

  const evidenceCount = evidenceItems.length;
  const minimumEvidenceForJudgment = Math.min(
    evidenceCount,
    caseData.minimumEvidenceForJudgment ||
      Math.max(5, Math.ceil(evidenceCount * 0.55)),
  );
  const minimumPinnedEvidence = Math.min(
    evidenceCount,
    caseData.minimumPinnedEvidence ||
      Math.max(
        MINIMUM_PINNED_EVIDENCE,
        Math.min(4, Math.ceil(Math.max(1, keyEvidenceIds.length) * 0.4)),
      ),
  );
  const markedCount = Object.values(artifactMarks).filter(Boolean).length;
  const assemblyRequirements = [
    {
      id: 'viewed',
      label: `Inspect ${minimumEvidenceForJudgment} artifacts`,
      met: viewedEvidenceIds.length >= minimumEvidenceForJudgment,
    },
    {
      id: 'cited',
      label: `Cite ${minimumPinnedEvidence} artifacts you would rely on`,
      met: pinnedEvidenceIds.length >= minimumPinnedEvidence,
    },
    {
      id: 'sorted',
      label: `Sort ${MINIMUM_SORTED_ARTIFACTS} artifacts by role`,
      met: markedCount >= MINIMUM_SORTED_ARTIFACTS,
    },
  ];
  const canAssembleJudgment = assemblyRequirements.every((item) => item.met);
  const reconstructionReady = Object.values(reconstruction).every(
    (value) => String(value || '').trim().length >= 10,
  );
  const rationaleReady =
    rationale.trim().length >= MINIMUM_RATIONALE_CHARACTERS;
  const canSubmitJudgment = Boolean(
    decisionId &&
      hypothesisId &&
      reconstructionReady &&
      rationaleReady &&
      pinnedEvidenceIds.length >= minimumPinnedEvidence,
  );
  const visualPlacements = useMemo(
    () => boardPlacements(caseId, evidenceItems),
    [caseId, evidenceItems],
  );

  if (!caseData || caseData.status === 'stub') {
    return (
      <section className="workspace-placeholder">
        <LockKeyhole size={24} aria-hidden="true" />
        <h2>Case shell</h2>
        <p>
          This case is mapped into the Core Lab, but the interactive evidence
          package has not been authored yet.
        </p>
      </section>
    );
  }

  function toggleEvidence(id) {
    const nextViewed = viewedEvidenceIds.includes(id)
      ? viewedEvidenceIds
      : [...viewedEvidenceIds, id];
    const nextActive = activeEvidenceId === id ? '' : id;
    setViewedEvidenceIds(nextViewed);
    setActiveEvidenceId(nextActive);
    saveCaseProgress(caseId, {
      status: submitted ? 'submitted' : 'in_progress',
      viewedEvidenceIds: nextViewed,
      activeEvidenceId: nextActive,
      pinnedEvidenceIds,
      hypothesisId,
      artifactMarks,
      reconstruction,
      judgmentUnlocked,
    });
  }

  function togglePin(id) {
    const nextPinned = pinnedEvidenceIds.includes(id)
      ? pinnedEvidenceIds.filter((item) => item !== id)
      : [...pinnedEvidenceIds, id];
    setPinnedEvidenceIds(nextPinned);
    saveCaseProgress(caseId, {
      status: submitted ? 'submitted' : 'in_progress',
      viewedEvidenceIds,
      activeEvidenceId,
      pinnedEvidenceIds: nextPinned,
      hypothesisId,
      artifactMarks,
      reconstruction,
      judgmentUnlocked,
    });
  }

  function setArtifactMark(id, mark) {
    const nextMarks = {
      ...artifactMarks,
      [id]: mark,
    };
    setArtifactMarks(nextMarks);
    saveCaseProgress(caseId, {
      status: submitted ? 'submitted' : 'in_progress',
      viewedEvidenceIds,
      activeEvidenceId,
      pinnedEvidenceIds,
      hypothesisId,
      artifactMarks: nextMarks,
      reconstruction,
      judgmentUnlocked,
    });
  }

  function updateReconstruction(field, value) {
    const nextReconstruction = {
      ...reconstruction,
      [field]: value,
    };
    setReconstruction(nextReconstruction);
    saveCaseProgress(caseId, {
      status: submitted ? 'submitted' : 'in_progress',
      viewedEvidenceIds,
      activeEvidenceId,
      pinnedEvidenceIds,
      hypothesisId,
      artifactMarks,
      reconstruction: nextReconstruction,
      judgmentUnlocked,
    });
  }

  function unlockJudgment() {
    setJudgmentUnlocked(true);
    saveCaseProgress(caseId, {
      status: submitted ? 'submitted' : 'in_progress',
      viewedEvidenceIds,
      activeEvidenceId,
      pinnedEvidenceIds,
      hypothesisId,
      artifactMarks,
      reconstruction,
      judgmentUnlocked: true,
    });
  }

  function submitJudgment(event) {
    event.preventDefault();
    if (!selectedDecision) {
      return;
    }

    const decisionOutcome = scoreClassToOutcome(selectedDecision.scoreClass);
    const score = summarizeCaseScore({
      decisionOutcome,
      confidence,
      keyEvidenceCount,
      keyEvidenceTotal: caseData.keyEvidenceIds.length,
    });
    const nextProgress = {
      status: 'submitted',
      viewedEvidenceIds,
      activeEvidenceId,
      pinnedEvidenceIds,
      hypothesisId,
      hypothesisOutcome: selectedHypothesis
        ? scoreClassToOutcome(selectedHypothesis.scoreClass)
        : null,
      artifactMarks,
      reconstruction,
      judgmentUnlocked: true,
      judgment: {
        answer: decisionId,
        confidence,
        rationale: rationale.trim(),
        outcome: decisionOutcome,
        submittedAt: new Date().toISOString(),
      },
      score,
    };

    saveCaseProgress(caseId, nextProgress);
    setSubmitted(nextProgress);
  }

  function markReviewed() {
    const current = readProgress().cases?.[caseId];
    const next = {
      ...current,
      status: 'reviewed',
    };
    saveCaseProgress(caseId, next);
    setSubmitted(next);
  }

  const shellClassName = [
    'investigation-shell',
    `investigation-shell--${caseId}`,
    judgmentUnlocked || submitted ? 'investigation-shell--judgment-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={shellClassName}>
      <section className="briefing-panel" aria-label="Case briefing">
        <div className="briefing-copy">
          <p className="eyebrow">Case intake</p>
          <h2>{caseData.title}</h2>
          <p>{caseData.briefing}</p>
          <p>{caseData.role}</p>
        </div>
        <div className="briefing-media" aria-label="Source clip">
          <SourceAudioClip item={caseData.briefingMedia} compact />
        </div>
      </section>

      <div className="workspace-grid">
        <section className="evidence-locker" aria-label="Evidence board">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Evidence board</p>
              <h2>Work the scene</h2>
              <p className="case-task">
                Inspect artifacts in any order. Sort what each one does, cite
                the few you would rely on, then assemble a final judgment with
                confidence.
              </p>
            </div>
            <span className="progress-chip">
              {viewedEvidenceIds.length}/{caseData.evidence.length} viewed
            </span>
          </div>
          <div className="evidence-board" style={boardStyle(caseId, caseData.evidence)}>
            {caseData.evidence.map((item, index) => {
              const slot = boardSlotForItem(visualPlacements, item, index);

              return (
                <EvidenceItem
                  key={item.id}
                  item={item}
                  index={slot.boardIndex}
                  boardSeed={slot.boardSeed}
                  opened={activeEvidenceId === item.id}
                  viewed={viewedEvidenceIds.includes(item.id)}
                  pinned={pinnedEvidenceIds.includes(item.id)}
                  mark={artifactMarks[item.id]}
                  onOpen={() => toggleEvidence(item.id)}
                  onPin={() => togglePin(item.id)}
                  onMark={(mark) => setArtifactMark(item.id, mark)}
                />
              );
            })}
          </div>
        </section>

        <aside className="case-rail">
          <CaseNotesPanel
            assemblyRequirements={assemblyRequirements}
            artifactMarks={artifactMarks}
            canAssembleJudgment={canAssembleJudgment}
            caseData={caseData}
            minimumEvidenceForJudgment={minimumEvidenceForJudgment}
            onUnlock={unlockJudgment}
            pinnedCount={pinnedEvidenceIds.length}
            viewedCount={viewedEvidenceIds.length}
            judgmentUnlocked={judgmentUnlocked}
          />

          {judgmentUnlocked || submitted ? (
            <>
              <section className="hypothesis-board">
                <p className="eyebrow">Theory board</p>
                <h2>Most likely explanation</h2>
                <div className="choice-stack">
                  {caseData.hypotheses.map((hypothesis) => (
                    <label
                      className={
                        hypothesisId === hypothesis.id
                          ? 'choice choice--selected'
                          : 'choice'
                      }
                      key={hypothesis.id}
                    >
                      <input
                        type="radio"
                        name={`${caseId}-hypothesis`}
                        value={hypothesis.id}
                        checked={hypothesisId === hypothesis.id}
                        onChange={() => {
                          setHypothesisId(hypothesis.id);
                          saveCaseProgress(caseId, {
                            status: submitted ? 'submitted' : 'in_progress',
                            viewedEvidenceIds,
                            activeEvidenceId,
                            pinnedEvidenceIds,
                            hypothesisId: hypothesis.id,
                            artifactMarks,
                            reconstruction,
                            judgmentUnlocked,
                          });
                        }}
                        disabled={Boolean(submitted)}
                      />
                      <span>{hypothesis.label}</span>
                    </label>
                  ))}
                </div>
              </section>

              <form
                className="judgment-panel"
                id={`${caseId}-final-call`}
                onSubmit={submitJudgment}
              >
                <p className="eyebrow">Final call</p>
                <h2>{caseData.decisionPrompt}</h2>
                <div className="choice-stack">
                  {caseData.decisions.map((decision) => (
                    <label
                      className={
                        decisionId === decision.id
                          ? 'choice choice--selected'
                          : 'choice'
                      }
                      key={decision.id}
                    >
                      <input
                        type="radio"
                        name={`${caseId}-decision`}
                        value={decision.id}
                        checked={decisionId === decision.id}
                        onChange={() => setDecisionId(decision.id)}
                        disabled={Boolean(submitted)}
                      />
                      <span>{decision.label}</span>
                    </label>
                  ))}
                </div>

                <fieldset className="confidence-field">
                  <legend>Confidence</legend>
                  <div className="confidence-options">
                    {confidenceOptions.map((option) => (
                      <label
                        className={
                          confidence === option.id
                            ? 'confidence-option confidence-option--selected'
                            : 'confidence-option'
                        }
                        key={option.id}
                      >
                        <input
                          type="radio"
                          name={`${caseId}-confidence`}
                          value={option.id}
                          checked={confidence === option.id}
                          onChange={() => setConfidence(option.id)}
                          disabled={Boolean(submitted)}
                        />
                        <strong>{option.label}</strong>
                        <span>{option.note}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="reconstruction-fieldset">
                  <p className="eyebrow">Scene reconstruction</p>
                  <label>
                    <span>What changed?</span>
                    <textarea
                      value={reconstruction.changed}
                      onChange={(event) =>
                        updateReconstruction('changed', event.target.value)
                      }
                      rows={2}
                      disabled={Boolean(submitted)}
                    />
                  </label>
                  <label>
                    <span>What is contested?</span>
                    <textarea
                      value={reconstruction.tension}
                      onChange={(event) =>
                        updateReconstruction('tension', event.target.value)
                      }
                      rows={2}
                      disabled={Boolean(submitted)}
                    />
                  </label>
                  <label>
                    <span>What would you verify next?</span>
                    <textarea
                      value={reconstruction.nextStep}
                      onChange={(event) =>
                        updateReconstruction('nextStep', event.target.value)
                      }
                      rows={2}
                      disabled={Boolean(submitted)}
                    />
                  </label>
                </div>

                <label className="rationale-field">
                  <span>Investigator note</span>
                  <textarea
                    value={rationale}
                    onChange={(event) => setRationale(event.target.value)}
                    placeholder="Name the evidence that matters and what remains uncertain."
                    rows={4}
                    disabled={Boolean(submitted)}
                  />
                </label>

                <div className="submission-checklist" aria-live="polite">
                  <p>Ready to submit when your record includes:</p>
                  <ul>
                    <li className={hypothesisId ? 'met' : ''}>a working theory</li>
                    <li className={decisionId ? 'met' : ''}>a final decision</li>
                    <li className={reconstructionReady ? 'met' : ''}>scene reconstruction notes</li>
                    <li className={rationaleReady ? 'met' : ''}>an investigator note that names evidence and uncertainty</li>
                  </ul>
                </div>

                <button className="button" type="submit" disabled={!canSubmitJudgment || Boolean(submitted)}>
                  <Gauge size={17} aria-hidden="true" />
                  Submit judgment
                </button>
              </form>
            </>
          ) : null}
        </aside>
      </div>

      {submitted ? (
        <CaseReplay
          caseData={caseData}
          progress={submitted}
          decision={selectedDecision}
          confidence={confidence}
          pinnedCount={pinnedEvidenceIds.length}
          artifactMarks={artifactMarks}
          onReview={markReviewed}
        />
      ) : null}
    </div>
  );
}

function CaseNotesPanel({
  assemblyRequirements,
  artifactMarks,
  canAssembleJudgment,
  caseData,
  judgmentUnlocked,
  minimumEvidenceForJudgment,
  onUnlock,
  pinnedCount,
  viewedCount,
}) {
  const markedCount = Object.values(artifactMarks).filter(Boolean).length;
  const markCounts = artifactMarkOptions.map((option) => ({
    ...option,
    count: Object.values(artifactMarks).filter((mark) => mark === option.id)
      .length,
  }));

  return (
    <section
      className={
        judgmentUnlocked
          ? 'case-notes-panel case-notes-panel--compact'
          : 'case-notes-panel'
      }
      aria-label="Case notes"
    >
      <div className="case-notes-panel__header">
        <p className="eyebrow">Open threads</p>
        <Search size={19} aria-hidden="true" />
      </div>
      <h2>Case notes</h2>
      <div className="case-meter">
        <span>
          Viewed <strong>{viewedCount}/{caseData.evidence.length}</strong>
        </span>
        <span>
          Cited evidence <strong>{pinnedCount}</strong>
        </span>
        <span>
          Sorted <strong>{markedCount}</strong>
        </span>
      </div>
      <p className="case-task case-task--rail">
        Treat this like a case board: sort artifacts by role, cite only evidence
        you would stand behind, then make the final call.
      </p>
      <dl className="mark-summary">
        {markCounts.map((option) => (
          <div key={option.id}>
            <dt>
              {option.label}
              <strong>{option.count}</strong>
            </dt>
            <dd>{option.description}</dd>
          </div>
        ))}
      </dl>
      {!judgmentUnlocked ? (
        <button
          className="button secondary assemble-button"
          disabled={!canAssembleJudgment}
          onClick={onUnlock}
          type="button"
        >
          <ClipboardList size={17} aria-hidden="true" />
          Assemble final judgment
        </button>
      ) : null}
      {judgmentUnlocked ? (
        <a
          className="button secondary assemble-button final-call-link"
          href={`#${caseData.id}-final-call`}
        >
          <ClipboardList size={17} aria-hidden="true" />
          Jump to final call
        </a>
      ) : null}
      {!canAssembleJudgment && !judgmentUnlocked ? (
        <ul className="case-meter-note">
          {assemblyRequirements.map((requirement) => (
            <li className={requirement.met ? 'met' : ''} key={requirement.id}>
              {requirement.label}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function EvidenceItem({
  item,
  index,
  boardSeed,
  opened,
  viewed,
  pinned,
  mark,
  onOpen,
  onPin,
  onMark,
}) {
  const Icon = typeIcons[item.type] || FileText;
  const variant = index % 6;
  const bodyId = `${item.id}-body`;
  const statusLabel = opened ? 'Close' : viewed ? 'Reopen' : 'Inspect';

  return (
    <article
      className={[
        'evidence-item',
        `evidence-item--${item.type}`,
        `evidence-item--variant-${variant}`,
        viewed ? 'evidence-item--viewed' : '',
        opened ? 'evidence-item--open' : '',
        mark ? `evidence-item--marked-${mark}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={evidenceCardStyle(index, `${boardSeed}:${item.id}`)}
    >
      <button
        aria-controls={bodyId}
        aria-expanded={opened}
        className="evidence-button"
        type="button"
        onClick={onOpen}
      >
        <span className="evidence-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span>
          <strong>{item.title}</strong>
          <small>
            {item.id} · {item.sourceLabel}
          </small>
        </span>
        <b>{statusLabel}</b>
      </button>
      {opened ? (
        <div className="evidence-body" id={bodyId}>
          <EvidenceMedia item={item} />
          <p>{item.body}</p>
          <div className="evidence-footer">
            <ArtifactMarkControl mark={mark} onMark={onMark} />
            <button
              className={pinned ? 'pin-button pin-button--active' : 'pin-button'}
              type="button"
              onClick={onPin}
              title="Mark this artifact as evidence you would rely on in your final theory."
            >
              <Pin size={15} aria-hidden="true" />
              {pinned ? 'Cited in theory' : 'Cite in theory'}
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function ArtifactMarkControl({ mark, onMark }) {
  return (
    <div className="artifact-mark-control" aria-label="Artifact label">
      {artifactMarkOptions.map((option) => (
        <button
          className={
            mark === option.id
              ? 'artifact-mark artifact-mark--active'
              : 'artifact-mark'
          }
          key={option.id}
          aria-label={`${option.label}: ${option.description}`}
          onClick={() => onMark(option.id)}
          title={option.description}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function EvidenceMedia({ item }) {
  if (item.render === 'experiment-dashboard') {
    return <ExperimentDashboard item={item} />;
  }
  if (item.render === 'subgroup-table') {
    return <SubgroupTable item={item} />;
  }
  if (item.render === 'assignment-check') {
    return <AssignmentCheck item={item} />;
  }
  if (item.render === 'memo-artifact') {
    return <MemoArtifact item={item} />;
  }
  if (item.render === 'model-scorecard') {
    return <ModelScorecard item={item} />;
  }
  if (item.render === 'calibration-panel') {
    return <CalibrationPanel item={item} />;
  }
  if (item.render === 'fairness-audit-panel') {
    return <FairnessAuditPanel item={item} />;
  }
  if (item.render === 'error-taxonomy-panel') {
    return <ErrorTaxonomyPanel item={item} />;
  }
  if (item.render === 'threshold-tradeoff-panel') {
    return <ThresholdTradeoffPanel item={item} />;
  }
  if (item.render === 'metric-swap-panel') {
    return <MetricSwapPanel item={item} />;
  }
  if (item.render === 'intervention-ledger') {
    return <ArtifactTable item={item} className="intervention-ledger" />;
  }
  if (item.render === 'artifact-table') {
    return <ArtifactTable item={item} />;
  }
  if (item.render === 'inspection-coverage-map') {
    return <InspectionCoverageMap item={item} />;
  }
  if (item.render === 'dose-response-panel') {
    return <DoseResponsePanel item={item} />;
  }
  if (item.render === 'capacity-panel') {
    return <CapacityPanel item={item} />;
  }
  if (item.render === 'retraining-diff') {
    return <RetrainingDiff item={item} />;
  }
  if (item.render === 'forecast-fan-panel') {
    return <ForecastFanPanel item={item} />;
  }
  if (item.render === 'scenario-range-panel') {
    return <ScenarioRangePanel item={item} />;
  }
  if (item.render === 'sample-composition-panel') {
    return <SampleCompositionPanel item={item} />;
  }
  if (item.render === 'missingness-heatmap-panel') {
    return <MissingnessHeatmapPanel item={item} />;
  }
  if (item.render === 'cropped-chart-panel') {
    return <CroppedChartPanel item={item} />;
  }
  if (item.render === 'geo-market-panel') {
    return <GeoMarketPanel item={item} />;
  }
  if (item.render === 'parallel-trends-panel') {
    return <ParallelTrendsPanel item={item} />;
  }
  if (item.render === 'rd-cutoff-inspector') {
    return <RDCutoffInspector item={item} />;
  }
  if (item.render === 'power-audit-panel') {
    return <PowerAuditPanel item={item} />;
  }
  if (item.render === 'lifecycle-lift-panel') {
    return <LifecycleLiftPanel item={item} />;
  }
  if (item.render === 'leakage-audit-panel') {
    return <LeakageAuditPanel item={item} />;
  }
  if (item.render === 'label-benchmark-panel') {
    return <LabelBenchmarkPanel item={item} />;
  }
  if (item.render === 'drift-response-panel') {
    return <DriftResponsePanel item={item} />;
  }
  if (item.render === 'stockout-demand-panel') {
    return <StockoutDemandPanel item={item} />;
  }
  if (item.render === 'prompt-risk-panel') {
    return <PromptRiskPanel item={item} />;
  }
  if (item.type === 'audio') {
    return <SourceAudioClip item={item} />;
  }
  if (item.type === 'chart') {
    return <MiniDashboard />;
  }
  if (item.type === 'log') {
    return <EventLog />;
  }
  if (item.type === 'timeline') {
    return <Timeline item={item} />;
  }
  if (item.type === 'segment') {
    return <SegmentComparison />;
  }
  if (item.type === 'definition') {
    return <MetricDefinition />;
  }
  if (item.type === 'memo') {
    return <MemoArtifact item={item} />;
  }
  return (
    <div className="memo-block">
      <Radio size={18} aria-hidden="true" />
      <p>
        <strong>Transcript excerpt:</strong> The launch note pushes for a clean
        success story before the measurement question has been settled.
      </p>
    </div>
  );
}

function ModelScorecard({ item }) {
  return (
    <div className="model-scorecard">
      <div className="model-scorecard__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="model-metrics">
        {item.metrics.map((metric) => (
          <div className="model-metric" key={metric.label}>
            <span>{metric.label}</span>
            <b>{metric.value}</b>
            <em>{metric.note}</em>
          </div>
        ))}
      </div>
      <div className="risk-band-chart" aria-label="Risk band outcomes">
        {item.bands.map((band) => (
          <div className="risk-band" key={band.label}>
            <span>{band.label}</span>
            <div>
              <i style={{ height: `${band.height}%` }} />
            </div>
            <strong>{band.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalibrationPanel({ item }) {
  return (
    <div className="calibration-panel">
      {item.groups.map((group) => (
        <div className="calibration-row" key={group.label}>
          <div>
            <strong>{group.label}</strong>
            <span>{group.note}</span>
          </div>
          <div className="calibration-bars">
            <span style={{ width: group.predictedWidth }}>
              predicted {group.predicted}
            </span>
            <span style={{ width: group.observedWidth }}>
              observed {group.observed}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FairnessAuditPanel({ item }) {
  return (
    <div className="fairness-audit-panel">
      <div className="fairness-audit-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="fairness-audit-rows">
        {item.groups.map((group) => (
          <div className="fairness-audit-row" key={group.label}>
            <div>
              <strong>{group.label}</strong>
              <span>{group.note}</span>
            </div>
            <div className="fairness-audit-bars">
              <span style={{ width: group.reviewWidth }}>
                {item.primaryLabel || 'review'} {group.reviewRate}
              </span>
              <span style={{ width: group.clearedWidth }}>
                {item.secondaryLabel || 'cleared'} {group.clearedRate}
              </span>
            </div>
            <em>{group.delay}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorTaxonomyPanel({ item }) {
  return (
    <div className="error-taxonomy-panel">
      <div className="error-taxonomy-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="error-taxonomy-grid">
        {item.errors.map((error) => (
          <div className={`error-taxonomy-card error-taxonomy-card--${error.kind}`} key={error.label}>
            <span>{error.label}</span>
            <strong>{error.value}</strong>
            <em>{error.note}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThresholdTradeoffPanel({ item }) {
  return (
    <div className="threshold-tradeoff-panel">
      <div className="threshold-tradeoff-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="threshold-options">
        {item.options.map((option) => (
          <div
            className="threshold-option"
            key={option.label}
          >
            <div>
              <span>{option.label}</span>
              <strong>{option.threshold}</strong>
            </div>
            <div className="threshold-meter">
              <span style={{ width: option.captureWidth }}>capture {option.capture}</span>
              <span style={{ width: option.burdenWidth }}>burden {option.burden}</span>
            </div>
            <em>{option.note}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricSwapPanel({ item }) {
  return (
    <div className="metric-swap-panel">
      <div className="metric-swap-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="metric-swap-grid">
        {item.metrics.map((metric) => (
          <div className={`metric-swap-card metric-swap-card--${metric.kind}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <em>{metric.note}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtifactTable({ item, className }) {
  return (
    <table className={`evidence-table ${className || ''}`.trim()}>
      <thead>
        <tr>
          {item.columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {item.rows.map((row) => (
          <tr key={row.join('-')}>
            {row.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function InspectionCoverageMap({ item }) {
  return (
    <div className="inspection-map" aria-label={item.mapLabel || item.title}>
      <div className="inspection-map__legend">
        {item.legend.map((entry) => (
          <span key={entry.label}>
            <i className={`map-dot map-dot--${entry.kind}`} />
            {entry.label}
          </span>
        ))}
      </div>
      <div className="inspection-map__canvas">
        <span className="map-river" aria-hidden="true" />
        <span className="map-corridor map-corridor--north" aria-hidden="true" />
        <span className="map-corridor map-corridor--south" aria-hidden="true" />
        {item.points.map((point) => (
          <span
            className={`map-point map-point--${point.kind}`}
            key={`${point.label}-${point.x}-${point.y}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            title={point.label}
          >
            <span>{point.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function DoseResponsePanel({ item }) {
  return (
    <div className="dose-panel">
      <div className="dose-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="dose-bars" aria-label="Usage and outcome chart">
        {item.doses.map((dose) => (
          <div className="dose-bar" key={dose.label}>
            <span>{dose.label}</span>
            <div>
              <i style={{ height: `${dose.height}%` }} />
            </div>
            <strong>{dose.value}</strong>
            <em>{dose.note}</em>
          </div>
        ))}
      </div>
      <div className="outcome-strip">
        {item.outcomes.map((outcome) => (
          <div key={outcome.label}>
            <span>{outcome.label}</span>
            <strong>{outcome.value}</strong>
            <em>{outcome.note}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function CapacityPanel({ item }) {
  return (
    <div className="capacity-panel">
      {item.rows.map(([label, value, note]) => (
        <div className="capacity-row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <em>{note}</em>
        </div>
      ))}
    </div>
  );
}

function RetrainingDiff({ item }) {
  return (
    <div className="retraining-diff">
      <div>
        <strong>{item.before.title}</strong>
        <ul>
          {item.before.items.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <GitCompare size={24} aria-hidden="true" />
      <div>
        <strong>{item.after.title}</strong>
        <ul>
          {item.after.items.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ForecastFanPanel({ item }) {
  return (
    <div className="forecast-fan-panel">
      <div className="forecast-fan-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="forecast-bars" aria-label={item.chartLabel || item.title}>
        {item.weeks.map((week) => (
          <div
            className={week.projected ? 'forecast-week forecast-week--projected' : 'forecast-week'}
            key={week.label}
          >
            {week.low !== undefined && week.high !== undefined ? (
              <span
                className="forecast-band"
                style={{
                  bottom: `${week.low}%`,
                  height: `${Math.max(4, week.high - week.low)}%`,
                }}
              />
            ) : null}
            <i style={{ height: `${week.actual ?? week.point}%` }} />
            <b>{week.label}</b>
            <em>{week.value}</em>
          </div>
        ))}
      </div>
      <div className="forecast-fan-panel__stats">
        {item.stats.map((stat) => (
          <div key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.note}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenarioRangePanel({ item }) {
  return (
    <div className="scenario-range-panel">
      <div className="scenario-range-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="scenario-track" aria-label={item.rangeLabel || item.title}>
        <span className="scenario-track__axis" />
        {item.markers.map((marker) => (
          <span
            className={`scenario-marker scenario-marker--${marker.kind}`}
            key={marker.label}
            style={{ left: marker.left }}
          >
            <b>{marker.value}</b>
            <em>{marker.label}</em>
          </span>
        ))}
      </div>
      <div className="scenario-cards">
        {item.scenarios.map((scenario) => (
          <div
            className={[
              'scenario-card',
              `scenario-card--${scenario.kind}`,
            ]
              .filter(Boolean)
              .join(' ')}
            key={scenario.label}
          >
            <span>{scenario.label}</span>
            <strong>{scenario.value}</strong>
            <em>{scenario.note}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperimentDashboard({ item }) {
  return (
    <div className="experiment-dashboard">
      <div className="experiment-dashboard__header">
        <span>Checkout experiment readout</span>
        <strong>Subgroup highlighted</strong>
      </div>
      <div className="experiment-metrics">
        {item.metrics.map((metric) => (
          <div className="experiment-metric" key={metric.label}>
            <span>{metric.label}</span>
            <div>
              <b>{metric.result}</b>
              <em>{metric.status}</em>
            </div>
            <small>
              Control {metric.control} · Treatment {metric.treatment} · p = {metric.pValue}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubgroupTable({ item }) {
  return (
    <table className="evidence-table subgroup-table">
      <thead>
        <tr>
          <th>Segment</th>
          <th>Effect</th>
          <th>p-value</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {item.rows.map((row) => {
          const flagged = row[3].includes('highlighted') || row[3].includes('Negative');
          return (
            <tr className={flagged ? 'table-row--flagged' : undefined} key={row.join('-')}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function AssignmentCheck({ item }) {
  return (
    <div className="assignment-panel">
      {item.rows.map(([label, value, note]) => (
        <div className="assignment-row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <em>{note}</em>
        </div>
      ))}
    </div>
  );
}

function SampleCompositionPanel({ item }) {
  return (
    <div className="sample-composition-panel">
      <div className="sample-composition-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="sample-composition-grid">
        {item.groups.map((group) => (
          <div className="sample-composition-row" key={group.label}>
            <div>
              <strong>{group.label}</strong>
              <span>{group.note}</span>
            </div>
            <div className="sample-bars" aria-label={`${group.label} composition`}>
              <span className="sample-bar sample-bar--population">
                <b style={{ width: group.populationWidth }} />
                <em>population {group.population}</em>
              </span>
              <span className="sample-bar sample-bar--response">
                <b style={{ width: group.responseWidth }} />
                <em>responses {group.responses}</em>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MissingnessHeatmapPanel({ item }) {
  const gridTemplateColumns = `minmax(92px, 0.85fr) repeat(${item.columns.length}, minmax(76px, 1fr))`;

  return (
    <div className="missingness-heatmap-panel">
      <div className="missingness-heatmap-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="missingness-heatmap-grid" aria-label={item.chartLabel || item.title}>
        <div className="heatmap-row heatmap-row--header" style={{ gridTemplateColumns }}>
          <span>Group</span>
          {item.columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>
        {item.rows.map((row) => (
          <div className="heatmap-row" key={row.label} style={{ gridTemplateColumns }}>
            <strong>{row.label}</strong>
            {row.cells.map((cell) => (
              <span
                className={`heatmap-cell heatmap-cell--${cell.level}`}
                key={`${row.label}-${cell.label}`}
                title={cell.note}
              >
                <b>{cell.value}</b>
                <em>{cell.label}</em>
              </span>
            ))}
          </div>
        ))}
      </div>
      {item.stats ? (
        <div className="missingness-heatmap-stats">
          {item.stats.map((stat) => (
            <div key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <em>{stat.note}</em>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CroppedChartPanel({ item }) {
  const chartHeight = 150;
  const scaleValue = (value, min, max) => {
    const span = Math.max(1, max - min);
    return Math.max(4, Math.min(100, ((value - min) / span) * 100));
  };

  const renderChart = (view) => (
    <div className="cropped-chart-view" key={view.title}>
      <div className="cropped-chart-view__header">
        <strong>{view.title}</strong>
        <span>{view.axisLabel}</span>
      </div>
      <div
        className="cropped-chart-bars"
        aria-label={view.title}
        style={{ minHeight: `${chartHeight}px` }}
      >
        {item.points.map((point) => (
          <span className="cropped-chart-bar" key={`${view.title}-${point.label}`}>
            <b
              style={{
                height: `${scaleValue(point.value, view.min, view.max)}%`,
              }}
            />
            <em>{point.label}</em>
            <i>{point.display}</i>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="cropped-chart-panel">
      <div className="cropped-chart-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="cropped-chart-panel__views">
        {item.views.map(renderChart)}
      </div>
      {item.notes ? (
        <div className="cropped-chart-notes">
          {item.notes.map((note) => (
            <div key={note.label}>
              <span>{note.label}</span>
              <strong>{note.value}</strong>
              <em>{note.note}</em>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function GeoMarketPanel({ item }) {
  const min = item.trendMin ?? 0;
  const max = item.trendMax ?? 100;
  const scaleValue = (value) => {
    const span = Math.max(1, max - min);
    return Math.max(7, Math.min(100, ((value - min) / span) * 100));
  };

  const renderSparkline = (values, label) => (
    <div className="geo-sparkline" aria-label={label}>
      {values.map((value, index) => (
        <span key={`${label}-${index}`} style={{ height: `${scaleValue(value)}%` }} />
      ))}
    </div>
  );

  return (
    <div className="geo-market-panel">
      <div className="geo-market-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="geo-market-grid">
        {item.pairs.map((pair) => (
          <div className={`geo-market-card geo-market-card--${pair.risk}`} key={pair.label}>
            <div className="geo-market-card__top">
              <span>{pair.label}</span>
              <strong>{pair.lift}</strong>
            </div>
            <div className="geo-market-pair">
              <div>
                <b>{pair.treated}</b>
                {renderSparkline(pair.treatedTrend, `${pair.treated} pre trend`)}
              </div>
              <div>
                <b>{pair.control}</b>
                {renderSparkline(pair.controlTrend, `${pair.control} pre trend`)}
              </div>
            </div>
            <ul>
              {pair.flags.map((flag) => (
                <li key={flag}>{flag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {item.notes ? (
        <div className="geo-market-notes">
          {item.notes.map((note) => (
            <div key={note.label}>
              <span>{note.label}</span>
              <strong>{note.value}</strong>
              <em>{note.note}</em>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ParallelTrendsPanel({ item }) {
  const min = item.trendMin ?? 0;
  const max = item.trendMax ?? 100;
  const scaleValue = (value) => {
    const span = Math.max(1, max - min);
    return Math.max(5, Math.min(100, ((value - min) / span) * 100));
  };

  return (
    <div className="parallel-trends-panel">
      <div className="parallel-trends-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{item.panelBadge}</strong>
      </div>
      <div className="parallel-trends-periods" aria-hidden="true">
        <span />
        {item.periods.map((period) => (
          <b className={`parallel-trends-period parallel-trends-period--${period.phase}`} key={period.label}>
            {period.label}
          </b>
        ))}
      </div>
      <div className="parallel-trends-series" aria-label={item.chartLabel || item.title}>
        {item.series.map((series) => (
          <div className="parallel-trends-row" key={series.label}>
            <div>
              <strong>{series.label}</strong>
              <span>{series.note}</span>
            </div>
            <div className="parallel-trends-bars">
              {series.values.map((value, index) => (
                <i
                  className={`parallel-trend-bar parallel-trend-bar--${item.periods[index].phase} parallel-trend-bar--${series.kind}`}
                  key={`${series.label}-${item.periods[index].label}`}
                  title={`${item.periods[index].label}: ${value}${item.valueSuffix || ''}`}
                  style={{ height: `${scaleValue(value)}%` }}
                >
                  <span>{value}{item.valueSuffix || ''}</span>
                </i>
              ))}
            </div>
          </div>
        ))}
      </div>
      {item.stats ? (
        <div className="parallel-trends-stats">
          {item.stats.map((stat) => (
            <div key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <em>{stat.note}</em>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RDCutoffInspector({ item }) {
  const firstView = item.views?.[0]?.id || 'default';
  const [activeViewId, setActiveViewId] = useState(firstView);
  const activeView = item.views?.find((view) => view.id === activeViewId) || item.views?.[0] || item;
  const bins = activeView.bins || item.bins || [];
  const maxCount = Math.max(1, ...bins.map((bin) => bin.count || 0));

  return (
    <div className="rd-cutoff-inspector">
      <div className="rd-cutoff-inspector__header">
        <span>{item.panelTitle}</span>
        <strong>{activeView.badge || item.panelBadge}</strong>
      </div>
      {item.views?.length ? (
        <div className="rd-cutoff-inspector__controls" role="group" aria-label="Cutoff view">
          {item.views.map((view) => (
            <button
              className={view.id === activeView.id ? 'is-active' : ''}
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              {view.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="rd-cutoff-axis">
        <span>{item.leftLabel}</span>
        <strong>{item.cutoffLabel}</strong>
        <span>{item.rightLabel}</span>
      </div>
      <div className="rd-cutoff-bars" aria-label={item.chartLabel || item.title}>
        {bins.map((bin) => (
          <div
            className={`rd-cutoff-bin rd-cutoff-bin--${bin.side || 'neutral'}${bin.cutoff ? ' rd-cutoff-bin--cutoff' : ''}`}
            key={`${activeView.id}-${bin.score}`}
            title={`${bin.score}: ${bin.count} applications, ${bin.outcome} eviction filing rate`}
          >
            <i style={{ height: `${Math.max(8, ((bin.count || 0) / maxCount) * 100)}%` }}>
              <span>{bin.count}</span>
            </i>
            <strong>{bin.score}</strong>
            <em>{bin.outcome}</em>
          </div>
        ))}
      </div>
      <div className="rd-cutoff-stats">
        {(activeView.stats || item.stats || []).map((stat) => (
          <div key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.note}</em>
          </div>
        ))}
      </div>
      <p className="rd-cutoff-note">{activeView.note || item.body}</p>
    </div>
  );
}

function PowerAuditPanel({ item }) {
  const firstView = item.views?.[0]?.id || 'default';
  const [activeViewId, setActiveViewId] = useState(firstView);
  const activeView = item.views?.find((view) => view.id === activeViewId) || item.views?.[0] || item;

  return (
    <div className="power-audit-panel">
      <div className="power-audit-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{activeView.badge || item.panelBadge}</strong>
      </div>
      {item.views?.length ? (
        <div className="power-audit-panel__controls" role="group" aria-label="Power audit view">
          {item.views.map((view) => (
            <button
              className={view.id === activeView.id ? 'is-active' : ''}
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              {view.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="power-audit-stats">
        {(activeView.stats || item.stats || []).map((stat) => (
          <div key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.note}</em>
          </div>
        ))}
      </div>
      <div className="power-sample-bars">
        {(activeView.samples || item.samples || []).map((sample) => (
          <div className="power-sample-row" key={sample.label}>
            <div>
              <strong>{sample.label}</strong>
              <span>{sample.value}</span>
            </div>
            <i>
              <b style={{ width: sample.width }} />
            </i>
            <em>{sample.note}</em>
          </div>
        ))}
      </div>
      <div className="power-intervals" aria-label={item.chartLabel || item.title}>
        {(activeView.intervals || item.intervals || []).map((interval) => (
          <div className="power-interval-row" key={interval.label}>
            <span>{interval.label}</span>
            <div>
              <i style={{ left: interval.left, width: interval.width }} />
              <b style={{ left: interval.markerLeft }} />
              <em style={{ left: interval.zeroLeft }}>{interval.zeroLabel || '0'}</em>
            </div>
            <strong>{interval.value}</strong>
          </div>
        ))}
      </div>
      <p className="power-audit-note">{activeView.note || item.body}</p>
    </div>
  );
}

function LifecycleLiftPanel({ item }) {
  const firstView = item.views?.[0]?.id || 'default';
  const [activeViewId, setActiveViewId] = useState(firstView);
  const activeView = item.views?.find((view) => view.id === activeViewId) || item.views?.[0] || item;

  return (
    <div className="lifecycle-lift-panel">
      <div className="lifecycle-lift-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{activeView.badge || item.panelBadge}</strong>
      </div>
      {item.views?.length ? (
        <div className="lifecycle-lift-panel__controls" role="group" aria-label="Lifecycle view">
          {item.views.map((view) => (
            <button
              className={view.id === activeView.id ? 'is-active' : ''}
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              {view.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="lifecycle-metrics">
        {(activeView.metrics || item.metrics || []).map((metric) => (
          <div className={`lifecycle-metric lifecycle-metric--${metric.kind || 'neutral'}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <em>{metric.note}</em>
          </div>
        ))}
      </div>
      <div className="lifecycle-path" aria-label={item.chartLabel || item.title}>
        {(activeView.stages || item.stages || []).map((stage) => (
          <div className={`lifecycle-stage lifecycle-stage--${stage.kind || 'neutral'}`} key={stage.label}>
            <div>
              <span>{stage.label}</span>
              <strong>{stage.value}</strong>
            </div>
            <i>
              <b style={{ width: stage.width }} />
            </i>
            <em>{stage.note}</em>
          </div>
        ))}
      </div>
      <div className="lifecycle-ledger">
        {(activeView.ledger || item.ledger || []).map((row) => (
          <div key={row.label}>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
            <em>{row.note}</em>
          </div>
        ))}
      </div>
      <p className="lifecycle-lift-note">{activeView.note || item.body}</p>
    </div>
  );
}

function LeakageAuditPanel({ item }) {
  const firstView = item.views?.[0]?.id || 'default';
  const [activeViewId, setActiveViewId] = useState(firstView);
  const activeView = item.views?.find((view) => view.id === activeViewId) || item.views?.[0] || item;

  return (
    <div className="leakage-audit-panel">
      <div className="leakage-audit-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{activeView.badge || item.panelBadge}</strong>
      </div>
      {item.views?.length ? (
        <div className="leakage-audit-panel__controls" role="group" aria-label="Leakage audit view">
          {item.views.map((view) => (
            <button
              className={view.id === activeView.id ? 'is-active' : ''}
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              {view.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="leakage-audit-stats">
        {(activeView.stats || item.stats || []).map((stat) => (
          <div className={`leakage-audit-stat leakage-audit-stat--${stat.kind || 'neutral'}`} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.note}</em>
          </div>
        ))}
      </div>
      <div className="leakage-feature-list">
        {(activeView.features || item.features || []).map((feature) => (
          <div className={`leakage-feature leakage-feature--${feature.kind || 'neutral'}`} key={feature.label}>
            <div>
              <strong>{feature.label}</strong>
              <span>{feature.source}</span>
            </div>
            <i>
              <b style={{ left: feature.left }} />
            </i>
            <em>{feature.note}</em>
          </div>
        ))}
      </div>
      <div className="leakage-axis">
        {(item.axis || []).map((tick) => (
          <span key={tick.label} style={{ left: tick.left }}>{tick.label}</span>
        ))}
      </div>
      <p className="leakage-audit-note">{activeView.note || item.body}</p>
    </div>
  );
}

function LabelBenchmarkPanel({ item }) {
  const firstView = item.views?.[0]?.id || 'default';
  const [activeViewId, setActiveViewId] = useState(firstView);
  const activeView = item.views?.find((view) => view.id === activeViewId) || item.views?.[0] || item;

  return (
    <div className="label-benchmark-panel">
      <div className="label-benchmark-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{activeView.badge || item.panelBadge}</strong>
      </div>
      {item.views?.length ? (
        <div className="label-benchmark-panel__controls" role="group" aria-label="Label benchmark view">
          {item.views.map((view) => (
            <button
              className={view.id === activeView.id ? 'is-active' : ''}
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              {view.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="label-benchmark-stats">
        {(activeView.stats || item.stats || []).map((stat) => (
          <div className={`label-benchmark-stat label-benchmark-stat--${stat.kind || 'neutral'}`} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.note}</em>
          </div>
        ))}
      </div>
      <div className="label-benchmark-slices">
        {(activeView.slices || item.slices || []).map((slice) => (
          <div className={`label-benchmark-slice label-benchmark-slice--${slice.kind || 'neutral'}`} key={slice.label}>
            <div>
              <strong>{slice.label}</strong>
              <span>{slice.note}</span>
            </div>
            <div className="label-benchmark-bars">
              {(slice.measures || []).map((measure) => (
                <div className={`label-benchmark-bar label-benchmark-bar--${measure.kind || 'neutral'}`} key={measure.label}>
                  <span>{measure.label}</span>
                  <i>
                    <b style={{ width: measure.width }} />
                  </i>
                  <strong>{measure.value}</strong>
                </div>
              ))}
            </div>
            <em>{slice.callout}</em>
          </div>
        ))}
      </div>
      <p className="label-benchmark-note">{activeView.note || item.body}</p>
    </div>
  );
}

function DriftResponsePanel({ item }) {
  const firstView = item.views?.[0]?.id || 'default';
  const [activeViewId, setActiveViewId] = useState(firstView);
  const activeView = item.views?.find((view) => view.id === activeViewId) || item.views?.[0] || item;

  return (
    <div className="drift-response-panel">
      <div className="drift-response-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{activeView.badge || item.panelBadge}</strong>
      </div>
      {item.views?.length ? (
        <div className="drift-response-panel__controls" role="group" aria-label="Drift response view">
          {item.views.map((view) => (
            <button
              className={view.id === activeView.id ? 'is-active' : ''}
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              {view.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="drift-response-stats">
        {(activeView.stats || item.stats || []).map((stat) => (
          <div className={`drift-response-stat drift-response-stat--${stat.kind || 'neutral'}`} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.note}</em>
          </div>
        ))}
      </div>
      <div className="drift-response-lanes">
        {(activeView.lanes || item.lanes || []).map((lane) => (
          <div className={`drift-response-lane drift-response-lane--${lane.kind || 'neutral'}`} key={lane.label}>
            <div>
              <strong>{lane.label}</strong>
              <span>{lane.owner}</span>
            </div>
            <i aria-hidden="true">
              <b style={{ width: lane.width }} />
            </i>
            <div>
              <strong>{lane.status}</strong>
              <em>{lane.note}</em>
            </div>
          </div>
        ))}
      </div>
      <p className="drift-response-note">{activeView.note || item.body}</p>
    </div>
  );
}

function StockoutDemandPanel({ item }) {
  const firstView = item.views?.[0]?.id || 'default';
  const [activeViewId, setActiveViewId] = useState(firstView);
  const activeView = item.views?.find((view) => view.id === activeViewId) || item.views?.[0] || item;

  return (
    <div className="stockout-demand-panel">
      <div className="stockout-demand-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{activeView.badge || item.panelBadge}</strong>
      </div>
      {item.views?.length ? (
        <div className="stockout-demand-panel__controls" role="group" aria-label="Stockout demand view">
          {item.views.map((view) => (
            <button
              className={view.id === activeView.id ? 'is-active' : ''}
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              {view.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="stockout-demand-stats">
        {(activeView.stats || item.stats || []).map((stat) => (
          <div className={`stockout-demand-stat stockout-demand-stat--${stat.kind || 'neutral'}`} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.note}</em>
          </div>
        ))}
      </div>
      <div className="stockout-demand-items">
        {(activeView.items || item.items || []).map((entry) => (
          <div className={`stockout-demand-item stockout-demand-item--${entry.kind || 'neutral'}`} key={entry.label}>
            <div>
              <strong>{entry.label}</strong>
              <span>{entry.segment}</span>
            </div>
            <div className="stockout-demand-bars">
              {(entry.bars || []).map((bar) => (
                <div className={`stockout-demand-bar stockout-demand-bar--${bar.kind || 'neutral'}`} key={bar.label}>
                  <span>{bar.label}</span>
                  <i>
                    <b style={{ width: bar.width }} />
                  </i>
                  <strong>{bar.value}</strong>
                </div>
              ))}
            </div>
            <em>{entry.callout}</em>
          </div>
        ))}
      </div>
      <p className="stockout-demand-note">{activeView.note || item.body}</p>
    </div>
  );
}

function PromptRiskPanel({ item }) {
  const firstView = item.views?.[0]?.id || 'default';
  const [activeViewId, setActiveViewId] = useState(firstView);
  const activeView = item.views?.find((view) => view.id === activeViewId) || item.views?.[0] || item;

  return (
    <div className="prompt-risk-panel">
      <div className="prompt-risk-panel__header">
        <span>{item.panelTitle}</span>
        <strong>{activeView.badge || item.panelBadge}</strong>
      </div>
      {item.views?.length ? (
        <div className="prompt-risk-panel__controls" role="group" aria-label="Prompt risk view">
          {item.views.map((view) => (
            <button
              className={view.id === activeView.id ? 'is-active' : ''}
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              {view.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="prompt-risk-stats">
        {(activeView.stats || item.stats || []).map((stat) => (
          <div className={`prompt-risk-stat prompt-risk-stat--${stat.kind || 'neutral'}`} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em>{stat.note}</em>
          </div>
        ))}
      </div>
      <div className="prompt-risk-flows">
        {(activeView.flows || item.flows || []).map((flow) => (
          <div className={`prompt-risk-flow prompt-risk-flow--${flow.kind || 'neutral'}`} key={flow.label}>
            <div>
              <strong>{flow.label}</strong>
              <span>{flow.source}</span>
            </div>
            <i aria-hidden="true">
              <b style={{ width: flow.width }} />
            </i>
            <div>
              <strong>{flow.status}</strong>
              <em>{flow.note}</em>
            </div>
          </div>
        ))}
      </div>
      <p className="prompt-risk-note">{activeView.note || item.body}</p>
    </div>
  );
}

function MemoArtifact({ item }) {
  return (
    <div className="memo-artifact">
      <FileText size={18} aria-hidden="true" />
      <div>
        <strong>{item.title}</strong>
        {item.memo ? (
          <ul>
            {item.memo.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p>{item.body}</p>
        )}
      </div>
    </div>
  );
}

function SourceAudioClip({ item, compact = false }) {
  const asset = item.asset || {};
  const hasVideo = Boolean(asset.videoSrc);
  const hasAudio = Boolean(asset.audioSrc);
  const hasNote = asset.type === 'note';
  const className = [
    'source-clip',
    compact ? 'source-clip--compact' : '',
    hasNote ? 'source-clip--note' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      {hasVideo ? (
        <video
          className="clip-player"
          controls
          preload="metadata"
          src={withBase(asset.videoSrc)}
        />
      ) : hasAudio ? (
        <div className="clip-audio-player">
          <Volume2 size={compact ? 28 : 34} aria-hidden="true" />
          <audio controls preload="metadata" src={withBase(asset.audioSrc)}>
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : hasNote ? (
        <div className="clip-note-card">
          <FileText size={compact ? 28 : 34} aria-hidden="true" />
          <span>Dossier note</span>
        </div>
      ) : (
        <div className="clip-screen" aria-hidden="true">
          <PlayCircle size={compact ? 30 : 38} />
          <div className="waveform">
            {Array.from({ length: 14 }).map((_, index) => (
              <span key={index} style={{ height: `${12 + ((index * 7) % 26)}px` }} />
            ))}
          </div>
          <span>{asset.status === 'planned' ? 'Media asset pending' : 'Source clip'}</span>
        </div>
      )}
      <div className="clip-copy">
        <strong>{item.title}</strong>
        <span>{item.speaker || 'Source audio'}</span>
        <details className="transcript-disclosure">
          <summary>{hasNote ? 'View note' : 'View transcript'}</summary>
          <p>{item.transcript}</p>
        </details>
      </div>
    </div>
  );
}

function MiniDashboard() {
  const bars = [38, 40, 41, 42, 42, 58];
  return (
    <div className="mini-dashboard" aria-label="Weekly active user chart">
      <div className="chart-header">
        <span>Executive WAU trend</span>
        <strong>+38%</strong>
      </div>
      <div className="bar-chart">
        {bars.map((bar, index) => (
          <span
            className={index === bars.length - 1 ? 'bar bar--alert' : 'bar'}
            key={`${bar}-${index}`}
            style={{ height: `${bar * 2}px` }}
          />
        ))}
      </div>
      <small>Current dashboard definition, last 6 weeks</small>
    </div>
  );
}

function EventLog() {
  const rows = [
    ['u-1042', 'guide_step_viewed', '09:12:02', 'onboarding_v2'],
    ['u-1042', 'guide_step_viewed', '09:12:09', 'onboarding_v2'],
    ['u-1042', 'guide_step_viewed', '09:12:14', 'onboarding_v2'],
    ['u-2088', 'report_viewed', '09:21:44', 'core_app'],
    ['u-3110', 'guide_step_viewed', '09:35:18', 'onboarding_v2'],
  ];
  return (
    <table className="evidence-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Event</th>
          <th>Time</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.join('-')}>
            {row.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Timeline({ item }) {
  const isCampaign = item.id === 'ev-003';
  const entries = item.entries || (isCampaign
    ? [
        ['Monday', 'Pricing-page refresh ships.'],
        ['Tuesday', 'Onboarding v2 launches.'],
        ['Wednesday', 'Paid social campaign begins.'],
        ['Friday', 'Executive dashboard labels the week as a launch win.'],
      ]
    : [
        ['Tuesday 10:20', 'Onboarding v2 ships.'],
        ['Wednesday 14:14', 'guide_step_viewed added to active-user events.'],
        ['Monday 09:12', 'WAU dashboard shows +38% week over week.'],
      ]);

  return (
    <ol className="timeline">
      {entries.map(([time, label]) => (
        <li key={`${time}-${label}`}>
          <strong>{time}</strong>
          <span>{label}</span>
        </li>
      ))}
    </ol>
  );
}

function MetricDefinition() {
  return (
    <div className="definition-card definition-card--diff">
      <div>
        <strong>Before Wednesday</strong>
        <ul>
          <li>core_action_completed</li>
          <li>invite_sent</li>
          <li>report_viewed</li>
        </ul>
      </div>
      <GitCompare size={24} aria-hidden="true" />
      <div>
        <strong>After Wednesday</strong>
        <ul>
          <li>core_action_completed</li>
          <li>invite_sent</li>
          <li>report_viewed</li>
          <li className="new-rule">guide_step_viewed</li>
        </ul>
      </div>
    </div>
  );
}

function SegmentComparison() {
  const rows = [
    ['Core app activity', '+3%', 'stable'],
    ['Onboarding guide views', '+184%', 'spike'],
    ['Paid social arrivals', '+21%', 'plausible lead'],
    ['Unknown/test source', '+66%', 'needs review'],
  ];

  return (
    <div className="segment-panel">
      {rows.map(([label, lift, state]) => (
        <div className="segment-row" key={label}>
          <span>{label}</span>
          <strong>{lift}</strong>
          <em>{state}</em>
        </div>
      ))}
    </div>
  );
}

function CaseReplay({ caseData, progress, decision, confidence, pinnedCount, onReview }) {
  const score = progress.score;
  const outcome = progress.judgment?.outcome;

  return (
    <section className="case-replay" aria-label="Case replay">
      <div className="replay-header">
        <div>
          <p className="eyebrow">Case reconstruction</p>
          <h2>What the evidence supports</h2>
        </div>
        <div className={`score-badge score-badge--${outcome}`}>
          <strong>{score.totalScore}</strong>
          <span>Total</span>
        </div>
      </div>

      <div className="replay-grid">
        <div className="replay-panel">
          <h3>Your judgment</h3>
          <p>{decision?.label}</p>
          <p className="confidence-readout">
            <Gauge size={16} aria-hidden="true" />
            {confidenceLabel(confidence)}
          </p>
        </div>
        <div className="replay-panel replay-panel--expert">
          <h3>Expert reconstruction</h3>
          <p>{caseData.replay.expertDecision}</p>
        </div>
      </div>

      <div className="replay-details">
        <DetailList title="Evidence that mattered" items={caseData.replay.whatMattered} />
        <DetailList title="Misleading signal" items={caseData.replay.misleadingEvidence} />
      </div>

      <div className="reconstruction-strip">
        <h3>Reconstruction sequence</h3>
        <ol>
          {caseData.replay.sequence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>

      <div className="score-grid">
        <ScoreLine label="Decision" value={score.decisionScore} />
        <ScoreLine label="Evidence pins" value={score.evidenceScore} />
        <ScoreLine label="Calibration" value={score.calibrationScore} />
        <ScoreLine label="CBM raw" value={score.cbmRaw} />
      </div>

      <div className="trap-note">
        <AlertTriangle size={18} aria-hidden="true" />
        <div>
          <strong>{caseData.replay.trap}</strong>
          <p>{caseData.replay.transfer}</p>
          <p>
            You pinned {pinnedCount} of {caseData.keyEvidenceIds.length} key
            evidence items.
          </p>
        </div>
      </div>

      <button className="button secondary" type="button" onClick={onReview}>
        <CheckCircle2 size={17} aria-hidden="true" />
        Mark replay reviewed
      </button>
    </section>
  );
}

function DetailList({ title, items }) {
  return (
    <div className="replay-panel">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ScoreLine({ label, value }) {
  return (
    <div className="score-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
