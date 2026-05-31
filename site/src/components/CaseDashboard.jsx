import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Clock3,
  FlaskConical,
  RotateCcw,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CASE_SETS } from '../lib/cases.js';
import { withBase } from '../lib/paths.js';
import {
  caseStatus,
  emptyProgress,
  progressSummary,
  readProgress,
  resetProgress,
} from '../lib/progress.js';
import CalibrationSnapshot from './CalibrationSnapshot.jsx';
import './case-dashboard.css';

export default function CaseDashboard({ cases }) {
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
  const nextCase =
    cases.find((entry) => !['submitted', 'reviewed'].includes(caseStatus(progress, entry.id))) ||
    cases[0];

  return (
    <div className="dashboard-grid">
      <section className="case-room" aria-label="Case library">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Case library</p>
            <h2>Evidence docket</h2>
          </div>
          <a className="button button--compact" href={withBase(`/cases/${nextCase.slug}/`)}>
            <ArrowRight size={17} aria-hidden="true" />
            {summary.submittedCount > 0 ? 'Continue' : 'Start'}
          </a>
        </div>
        <div className="case-grid">
          {cases.map((entry) => (
            <CaseCard
              key={entry.id}
              caseItem={entry}
              status={caseStatus(progress, entry.id)}
            />
          ))}
        </div>
      </section>

      <aside className="dashboard-aside">
        <CalibrationSnapshot />
        <section className="set-panel">
          <p className="eyebrow">Case sets</p>
          <h2>Judgment areas</h2>
          <div className="set-list">
            {CASE_SETS.map((set) => {
              const completed = set.caseIds.filter((id) =>
                ['submitted', 'reviewed'].includes(caseStatus(progress, id)),
              ).length;
              return (
                <div className="set-row" key={set.id}>
                  <div>
                    <strong>{set.title}</strong>
                    <span>{set.purpose}</span>
                  </div>
                  <b>
                    {completed}/{set.caseIds.length}
                  </b>
                </div>
              );
            })}
          </div>
        </section>
        <button
          className="ghost-action"
          type="button"
          onClick={() => {
            resetProgress();
            setProgress(readProgress());
          }}
        >
          <RotateCcw size={16} aria-hidden="true" />
          Reset local progress
        </button>
      </aside>
    </div>
  );
}

function CaseCard({ caseItem, status }) {
  const statusLabel = {
    unopened: 'Unopened',
    in_progress: 'In progress',
    submitted: 'Submitted',
    reviewed: 'Reviewed',
  }[status];

  const StatusIcon = ['submitted', 'reviewed'].includes(status)
    ? CheckCircle2
    : CircleDot;

  return (
    <article className={`case-card case-card--${status}`}>
      <div className="case-card__topline">
        <span>Case {String(caseItem.sequence).padStart(2, '0')}</span>
        <span className="status-pill">
          <StatusIcon size={14} aria-hidden="true" />
          {statusLabel}
        </span>
      </div>
      <h3>
        <a href={withBase(`/cases/${caseItem.slug}/`)}>{caseItem.title}</a>
      </h3>
      <p>{caseItem.summary}</p>
      <div className="case-meta">
        <span>
          <FlaskConical size={14} aria-hidden="true" />
          {caseItem.domain}
        </span>
        <span>
          <Clock3 size={14} aria-hidden="true" />
          {caseItem.estimatedMinutes} min
        </span>
      </div>
      <div className="tag-row">
        {(caseItem.mediaTypes || []).slice(0, 3).map((mediaType) => (
          <span key={mediaType}>{mediaType}</span>
        ))}
      </div>
    </article>
  );
}
