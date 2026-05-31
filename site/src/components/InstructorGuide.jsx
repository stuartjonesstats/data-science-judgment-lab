import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { withBase } from '../lib/paths.js';
import './case-navigation.css';

export default function InstructorGuide({ cases }) {
  const [query, setQuery] = useState('');
  const searchText = query.trim().toLowerCase();

  const filteredCases = useMemo(
    () =>
      cases.filter((caseItem) =>
        searchText.length === 0
          ? true
          : [
              caseItem.title,
              caseItem.domain,
              caseItem.difficulty,
              ...(caseItem.skills || []),
              ...(caseItem.concepts || []),
            ]
              .join(' ')
              .toLowerCase()
              .includes(searchText),
      ),
    [cases, searchText],
  );

  return (
    <section className="instructor-shell" aria-label="Instructor guide">
      <label className="instructor-toolbar">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search instructor guide</span>
        <input
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by case, domain, hidden concept, or skill"
          value={query}
        />
      </label>

      <div className="instructor-grid">
        {filteredCases.map((caseItem) => {
          const keyEvidence = (caseItem.evidence || []).filter((evidence) =>
            (caseItem.keyEvidenceIds || []).includes(evidence.id),
          );
          return (
            <article className="instructor-card" key={caseItem.id}>
              <div className="instructor-card__topline">
                <span>Case {String(caseItem.sequence).padStart(2, '0')}</span>
                <b>
                  {caseItem.difficulty} · {caseItem.estimatedMinutes} min
                </b>
              </div>
              <h2>{caseItem.title}</h2>
              <p>{caseItem.domain}</p>
              <div className="finder-tags">
                {(caseItem.skills || []).slice(0, 4).map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <section>
                <p className="eyebrow">Hidden concept targets</p>
                <div className="evidence-chip-list">
                  {(caseItem.concepts || []).map((concept) => (
                    <span key={concept}>{concept}</span>
                  ))}
                </div>
              </section>

              <section>
                <p className="eyebrow">Key evidence</p>
                <div className="evidence-chip-list">
                  {keyEvidence.map((evidence) => (
                    <span key={evidence.id}>
                      {evidence.id}: {evidence.title}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <p className="eyebrow">Answer map</p>
                <div className="answer-map">
                  {[...(caseItem.hypotheses || []), ...(caseItem.decisions || [])].map(
                    (answer) => (
                      <div data-score={answer.scoreClass} key={answer.id}>
                        <span>{answer.scoreClass}</span>
                        <strong>{answer.label}</strong>
                      </div>
                    ),
                  )}
                </div>
              </section>

              {caseItem.replay?.trap ? (
                <p className="instructor-note">
                  <strong>Facilitation focus:</strong> {caseItem.replay.trap}
                </p>
              ) : null}

              <a className="button secondary button--compact" href={withBase(`/cases/${caseItem.slug}/`)}>
                Open learner file
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
