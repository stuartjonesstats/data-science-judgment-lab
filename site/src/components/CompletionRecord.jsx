import { Award, CheckCircle2, Printer } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CASE_SETS } from '../lib/cases.js';
import { EXPANSION_PACKS } from '../lib/expansion-packs.js';
import { withBase } from '../lib/paths.js';
import {
  caseStatus,
  emptyProgress,
  progressSummary,
  readCompletionRecord,
  readProgress,
  saveCompletionRecord,
} from '../lib/progress.js';

export default function CompletionRecord({ cases }) {
  const [progress, setProgress] = useState(() => emptyProgress());
  const [record, setRecord] = useState(null);
  const [learnerName, setLearnerName] = useState('');

  useEffect(() => {
    setProgress(readProgress());
    setRecord(readCompletionRecord());

    function handleProgress(event) {
      setProgress(event.detail || readProgress());
    }

    function handleCompletion(event) {
      setRecord(event.detail || readCompletionRecord());
    }

    function handleStorage() {
      setProgress(readProgress());
      setRecord(readCompletionRecord());
    }

    window.addEventListener('dsjl:progress', handleProgress);
    window.addEventListener('dsjl:completion', handleCompletion);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('dsjl:progress', handleProgress);
      window.removeEventListener('dsjl:completion', handleCompletion);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const summary = useMemo(() => progressSummary(progress), [progress]);
  const reviewedCases = cases.filter(
    (caseItem) => caseStatus(progress, caseItem.id) === 'reviewed',
  );
  const submittedCases = cases.filter((caseItem) =>
    ['submitted', 'reviewed'].includes(caseStatus(progress, caseItem.id)),
  );
  const totalCases = cases.length;
  const minimumReviewedCases = Math.min(
    totalCases,
    Math.max(8, Math.ceil(totalCases * 0.8)),
  );
  const areaProgress = CASE_SETS.map((set) => ({
    ...set,
    reviewed: set.caseIds.filter(
      (id) => caseStatus(progress, id) === 'reviewed',
    ).length,
  }));
  const routeProgress = EXPANSION_PACKS.map((route) => {
    const activeCaseIds = route.cases
      .filter((caseItem) => caseItem.status === 'active')
      .map((caseItem) => caseItem.id);
    return {
      id: route.id,
      title: route.title,
      caseIds: activeCaseIds,
      reviewed: activeCaseIds.filter(
        (id) => caseStatus(progress, id) === 'reviewed',
      ).length,
      required: Math.min(3, activeCaseIds.length),
    };
  });
  const allCoreSetsRepresented = areaProgress.every((set) => set.reviewed > 0);
  const allRoutesRepresented = routeProgress.every(
    (route) => route.reviewed >= route.required,
  );
  const minimumComplete =
    reviewedCases.length >= minimumReviewedCases &&
    allCoreSetsRepresented &&
    allRoutesRepresented;
  const fullComplete = reviewedCases.length === totalCases;
  const eligible = minimumComplete || fullComplete;
  const completionKind = fullComplete ? 'Full 25-Case Lab' : 'Judgment Lab';
  const missingCases = cases.filter(
    (caseItem) => caseStatus(progress, caseItem.id) !== 'reviewed',
  );

  function lockRecord() {
    const name = learnerName.trim();
    if (name.length < 2 || !eligible) {
      return;
    }

    const nextRecord = saveCompletionRecord({
      name,
      completionKind,
      reviewedCaseIds: reviewedCases.map((caseItem) => caseItem.id),
      submittedCaseIds: submittedCases.map((caseItem) => caseItem.id),
      summary,
    });
    setRecord(nextRecord);
  }

  return (
    <section className="completion-record" aria-labelledby="completion-record-title">
      <div className="completion-record__header">
        <Award size={30} aria-hidden="true" />
        <div>
          <p className="eyebrow">Judgment record</p>
          <h2 id="completion-record-title">Self-attested completion</h2>
        </div>
      </div>

      <div className="completion-grid">
        <article className="completion-card">
          <h3>Completion rule</h3>
          <p>
            Generate the Judgment Lab record after reviewing at least{' '}
            {minimumReviewedCases} of {totalCases} cases, with coverage across
            every major judgment area and at least three reviewed cases in each
            focused route. The Full 25-Case Lab record unlocks after every
            replay has been reviewed.
          </p>
          <dl className="completion-stats">
            <div>
              <dt>Submitted</dt>
              <dd>{submittedCases.length}/{totalCases}</dd>
            </div>
            <div>
              <dt>Reviewed</dt>
              <dd>{reviewedCases.length}/{totalCases}</dd>
            </div>
            <div>
              <dt>Calibration</dt>
              <dd>{summary.calibration}</dd>
            </div>
            <div>
              <dt>High-conf misses</dt>
              <dd>{summary.highConfidenceMisses}</dd>
            </div>
          </dl>
        </article>

        <article className="completion-card">
          <h3>Coverage checks</h3>
          <div className="completion-set-list">
            {areaProgress.map((set) => (
              <div className={set.reviewed > 0 ? 'met' : ''} key={set.id}>
                <span>{set.title}</span>
                <strong>{set.reviewed}/{set.caseIds.length}</strong>
              </div>
            ))}
            {routeProgress.map((route) => (
              <div className={route.reviewed >= route.required ? 'met' : ''} key={route.id}>
                <span>{route.title}</span>
                <strong>{route.reviewed}/{route.caseIds.length}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>

      {eligible ? (
        <div className="completion-record__lock">
          {record ? (
            <div className="completion-record__statement">
              <CheckCircle2 size={22} aria-hidden="true" />
              <p>
                <strong>{record.name}</strong> self-attested completion of the{' '}
                {record.completionKind} on {formatDate(record.lockedAt)}.
              </p>
            </div>
          ) : (
            <>
              <label>
                <span>Name for this local learning record</span>
                <input
                  onChange={(event) => setLearnerName(event.target.value)}
                  placeholder="Enter your name"
                  value={learnerName}
                />
              </label>
              <button
                className="button"
                disabled={learnerName.trim().length < 2}
                onClick={lockRecord}
                type="button"
              >
                Lock name and generate record
              </button>
            </>
          )}
          <p>
            This is a browser-local, self-attested learning record. It is not a
            proctored credential, identity verification, compliance record, or
            psychometric certification.
          </p>
          {record ? (
            <button className="button secondary" onClick={() => window.print()} type="button">
              <Printer size={17} aria-hidden="true" />
              Print or save record
            </button>
          ) : null}
        </div>
      ) : (
        <div className="completion-record__lock">
          <h3>Not ready yet</h3>
          <p>
            Review enough replays to cover the judgment areas and the three
            focused routes. Scores are reported as calibration signals, not as
            a pass/fail cutoff.
          </p>
          <div className="completion-missing-list">
            {missingCases.slice(0, 5).map((caseItem) => (
              <a href={withBase(`/cases/${caseItem.slug}/`)} key={caseItem.id}>
                Case {String(caseItem.sequence).padStart(2, '0')}: {caseItem.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}
