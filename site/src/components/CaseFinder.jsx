import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CASE_FILTERS } from '../lib/case-navigation.js';
import { withBase } from '../lib/paths.js';
import { caseStatus, emptyProgress, readProgress } from '../lib/progress.js';
import './case-navigation.css';

const STATUS_FILTERS = [
  { id: 'all', label: 'All files' },
  { id: 'unopened', label: 'Unopened' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'reviewed', label: 'Reviewed' },
];

export default function CaseFinder({ cases }) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
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

  const filteredCases = useMemo(() => {
    const searchText = query.trim().toLowerCase();
    const activeIds = activeFilters.flatMap(
      (filterId) => CASE_FILTERS.find((filter) => filter.id === filterId)?.caseIds || [],
    );
    const activeSet = new Set(activeIds);

    return cases.filter((caseItem) => {
      const matchesFilter =
        activeFilters.length === 0 || activeSet.has(caseItem.id);
      const status = caseStatus(progress, caseItem.id);
      const matchesStatus = statusFilter === 'all' || status === statusFilter;
      const matchesQuery =
        searchText.length === 0 ||
        [
          caseItem.title,
          caseItem.summary,
          caseItem.domain,
          caseItem.difficulty,
          ...(caseItem.mediaTypes || []),
        ]
          .join(' ')
          .toLowerCase()
          .includes(searchText);
      return matchesFilter && matchesStatus && matchesQuery;
    });
  }, [activeFilters, cases, progress, query, statusFilter]);

  function toggleFilter(filterId) {
    setActiveFilters((current) =>
      current.includes(filterId)
        ? current.filter((id) => id !== filterId)
        : [...current, filterId],
    );
  }

  return (
    <section className="finder-shell" aria-label="Case finder">
      <div className="finder-controls">
        <label className="finder-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search cases</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by domain, media, or broad topic"
            value={query}
          />
        </label>
        {activeFilters.length > 0 ? (
          <button
            className="button secondary button--compact"
            onClick={() => setActiveFilters([])}
            type="button"
          >
            <X size={16} aria-hidden="true" />
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="finder-status-row" aria-label="Progress filters">
        {STATUS_FILTERS.map((filter) => (
          <button
            className={
              statusFilter === filter.id ? 'status-chip status-chip--active' : 'status-chip'
            }
            key={filter.id}
            onClick={() => setStatusFilter(filter.id)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="filter-grid" aria-label="Broad issue filters">
        {CASE_FILTERS.map((filter) => {
          const selected = activeFilters.includes(filter.id);
          return (
            <button
              className={selected ? 'filter-card filter-card--active' : 'filter-card'}
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              type="button"
            >
              <strong>{filter.label}</strong>
              <span>{filter.description}</span>
              <b>{filter.caseIds.length} cases</b>
            </button>
          );
        })}
      </div>

      <div className="finder-results">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Matched files</p>
            <h2>{filteredCases.length} cases</h2>
          </div>
          <a className="button secondary button--compact" href={withBase('/pathways/')}>
            View pathways
          </a>
        </div>

        <div className="finder-case-grid">
          {filteredCases.map((caseItem) => (
            <article className="finder-case" key={caseItem.id}>
              <div className="finder-case__topline">
                <span>Case {String(caseItem.sequence).padStart(2, '0')}</span>
                <b>{caseStatus(progress, caseItem.id).replace('_', ' ')}</b>
              </div>
              <h3>
                <a href={withBase(`/cases/${caseItem.slug}/`)}>{caseItem.title}</a>
              </h3>
              <p>{caseItem.summary}</p>
              <div className="finder-tags">
                <span>{caseItem.difficulty}</span>
                <span>{caseItem.domain}</span>
                <span>{caseItem.estimatedMinutes} min</span>
                {(caseItem.mediaTypes || []).slice(0, 2).map((mediaType) => (
                  <span key={mediaType}>{mediaType}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
