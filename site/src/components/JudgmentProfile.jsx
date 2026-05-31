import { ArrowRight, CheckCircle2, Gauge, Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CASE_FILTERS } from '../lib/case-navigation.js';
import { withBase } from '../lib/paths.js';
import {
  caseStatus,
  emptyProgress,
  progressSummary,
  readProgress,
} from '../lib/progress.js';
import './case-navigation.css';

export default function JudgmentProfile({ cases }) {
  const [progress, setProgress] = useState(() => emptyProgress());

  useEffect(() => {
    const update = () => setProgress(readProgress());
    update();
    window.addEventListener('dsjl:progress', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('dsjl:progress', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  const summary = useMemo(() => progressSummary(progress), [progress]);
  const issueProgress = CASE_FILTERS.slice(0, 7).map((filter) => {
    const completed = filter.caseIds.filter((id) =>
      ['submitted', 'reviewed'].includes(caseStatus(progress, id)),
    ).length;
    return { ...filter, completed };
  });
  const submitted = cases.filter((caseItem) =>
    ['submitted', 'reviewed'].includes(caseStatus(progress, caseItem.id)),
  );
  const partialCount = submitted.filter(
    (caseItem) => progress.cases?.[caseItem.id]?.judgment?.outcome === 'partial',
  ).length;
  const lowConfidenceCorrect = submitted.filter((caseItem) => {
    const judgment = progress.cases?.[caseItem.id]?.judgment;
    return judgment?.outcome === 'correct' && judgment?.confidence === 'low';
  }).length;
  const nextCases = cases
    .filter((caseItem) => !['submitted', 'reviewed'].includes(caseStatus(progress, caseItem.id)))
    .slice(0, 3);

  return (
    <section className="profile-shell" aria-label="Judgment profile">
      <div className="profile-header">
        <div>
          <p className="eyebrow">Judgment profile</p>
          <h2>Your local calibration record</h2>
          <p>
            This profile updates as cases are submitted and reviewed. It is meant
            to guide the next file, not rank the learner.
          </p>
        </div>
        <div className="profile-stat">
          <Gauge size={24} aria-hidden="true" />
          <span>Calibration</span>
          <strong>{summary.calibration}</strong>
        </div>
      </div>

      <div className="profile-grid">
        <article className="profile-panel">
          <h3>Productive struggle signals</h3>
          <dl className="profile-metrics">
            <div>
              <dt>Submitted</dt>
              <dd>{summary.submittedCount}</dd>
            </div>
            <div>
              <dt>Reviewed</dt>
              <dd>{summary.reviewedCount}</dd>
            </div>
            <div>
              <dt>Partial calls</dt>
              <dd>{partialCount}</dd>
            </div>
            <div>
              <dt>Low-conf correct</dt>
              <dd>{lowConfidenceCorrect}</dd>
            </div>
            <div>
              <dt>High-conf misses</dt>
              <dd>{summary.highConfidenceMisses}</dd>
            </div>
          </dl>
        </article>

        <article className="profile-panel">
          <h3>Issue coverage</h3>
          <div className="profile-coverage">
            {issueProgress.map((filter) => (
              <div key={filter.id}>
                <span>{filter.label}</span>
                <b>{filter.completed}/{filter.caseIds.length}</b>
                <i aria-hidden="true">
                  <em style={{ width: `${(filter.completed / filter.caseIds.length) * 100}%` }} />
                </i>
              </div>
            ))}
          </div>
        </article>

        <article className="profile-panel">
          <h3>Recommended next files</h3>
          <div className="profile-next-list">
            {nextCases.map((caseItem) => (
              <a href={withBase(`/cases/${caseItem.slug}/`)} key={caseItem.id}>
                <Target size={16} aria-hidden="true" />
                <span>
                  Case {String(caseItem.sequence).padStart(2, '0')}: {caseItem.title}
                </span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            ))}
            {nextCases.length === 0 ? (
              <p>
                <CheckCircle2 size={16} aria-hidden="true" />
                Every case has been submitted or reviewed in this browser.
              </p>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}
