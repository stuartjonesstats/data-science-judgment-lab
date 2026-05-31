import { ArrowRight, CheckCircle2, CircleDot } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CASE_PATHWAYS, materializeCaseList } from '../lib/case-navigation.js';
import { withBase } from '../lib/paths.js';
import { caseStatus, emptyProgress, readProgress } from '../lib/progress.js';
import './case-navigation.css';

export default function PathwayBrowser({ cases }) {
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

  const pathways = useMemo(
    () =>
      CASE_PATHWAYS.map((pathway) => {
        const pathwayCases = materializeCaseList(cases, pathway.caseIds);
        const reviewed = pathwayCases.filter(
          (caseItem) => caseStatus(progress, caseItem.id) === 'reviewed',
        );
        const nextCase =
          pathwayCases.find(
            (caseItem) => caseStatus(progress, caseItem.id) !== 'reviewed',
          ) || pathwayCases[0];
        return { ...pathway, cases: pathwayCases, reviewed, nextCase };
      }),
    [cases, progress],
  );

  return (
    <div className="pathway-grid">
      {pathways.map((pathway) => (
        <article className="pathway-card" key={pathway.id}>
          <div className="pathway-card__topline">
            <span>{pathway.audience}</span>
            <b>{pathway.reviewed.length}/{pathway.cases.length} reviewed</b>
          </div>
          <h2>{pathway.title}</h2>
          <p>{pathway.purpose}</p>
          <ol className="pathway-case-list">
            {pathway.cases.map((caseItem) => {
              const status = caseStatus(progress, caseItem.id);
              const Icon = status === 'reviewed' ? CheckCircle2 : CircleDot;
              return (
                <li key={caseItem.id}>
                  <Icon size={16} aria-hidden="true" />
                  <a href={withBase(`/cases/${caseItem.slug}/`)}>
                    {String(caseItem.sequence).padStart(2, '0')}. {caseItem.title}
                  </a>
                  <span>{status.replace('_', ' ')}</span>
                </li>
              );
            })}
          </ol>
          <a className="button button--compact" href={withBase(`/cases/${pathway.nextCase.slug}/`)}>
            <ArrowRight size={17} aria-hidden="true" />
            {pathway.reviewed.length > 0 ? 'Continue pathway' : 'Start pathway'}
          </a>
        </article>
      ))}
    </div>
  );
}
