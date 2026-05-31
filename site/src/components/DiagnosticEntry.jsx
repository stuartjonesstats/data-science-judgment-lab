import { ArrowRight, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  CASE_PATHWAYS,
  DIAGNOSTIC_PROMPTS,
  materializeCaseList,
  selectedPathwayForAnswers,
} from '../lib/case-navigation.js';
import { withBase } from '../lib/paths.js';
import './case-navigation.css';

const DIAGNOSTIC_KEY = 'dsjl.diagnostic.v1';

export default function DiagnosticEntry({ cases }) {
  const [answers, setAnswers] = useState(() => readDiagnostic());

  const selectedPathway = useMemo(() => {
    const pathwayId = selectedPathwayForAnswers(answers);
    return CASE_PATHWAYS.find((pathway) => pathway.id === pathwayId) || CASE_PATHWAYS[0];
  }, [answers]);
  const selectedCases = materializeCaseList(cases, selectedPathway.caseIds);

  function setAnswer(promptId, pathwayId) {
    const next = { ...answers, [promptId]: pathwayId };
    setAnswers(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(next));
    }
  }

  function reset() {
    setAnswers({});
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(DIAGNOSTIC_KEY);
    }
  }

  return (
    <section className="diagnostic-shell" aria-label="Case intake">
      <div className="diagnostic-grid">
        <div className="diagnostic-questions">
          {DIAGNOSTIC_PROMPTS.map((prompt) => (
            <fieldset className="diagnostic-card" key={prompt.id}>
              <legend>
                <span>{prompt.label}</span>
                {prompt.question}
              </legend>
              <div className="diagnostic-options">
                {prompt.options.map((option) => (
                  <label
                    className={
                      answers[prompt.id] === option.pathwayId
                        ? 'diagnostic-option diagnostic-option--selected'
                        : 'diagnostic-option'
                    }
                    key={option.id}
                  >
                    <input
                      checked={answers[prompt.id] === option.pathwayId}
                      name={prompt.id}
                      onChange={() => setAnswer(prompt.id, option.pathwayId)}
                      type="radio"
                      value={option.pathwayId}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <aside className="diagnostic-result">
          <p className="eyebrow">Recommended path</p>
          <h2>{selectedPathway.title}</h2>
          <p>{selectedPathway.purpose}</p>
          <div className="diagnostic-case-strip">
            {selectedCases.slice(0, 5).map((caseItem) => (
              <a href={withBase(`/cases/${caseItem.slug}/`)} key={caseItem.id}>
                <span>Case {String(caseItem.sequence).padStart(2, '0')}</span>
                <strong>{caseItem.title}</strong>
              </a>
            ))}
          </div>
          <div className="diagnostic-actions">
            <a className="button" href={withBase(`/cases/${selectedCases[0]?.slug || ''}/`)}>
              <ArrowRight size={17} aria-hidden="true" />
              Start recommendation
            </a>
            <button className="button secondary" onClick={reset} type="button">
              <RotateCcw size={16} aria-hidden="true" />
              Reset intake
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function readDiagnostic() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(DIAGNOSTIC_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}
