import { Activity, AlertTriangle, Gauge, ListChecks } from 'lucide-react';
import { useEffect, useState } from 'react';
import { emptyProgress, progressSummary, readProgress } from '../lib/progress.js';
import './calibration-snapshot.css';

export default function CalibrationSnapshot() {
  const [summary, setSummary] = useState(() => progressSummary(emptyProgress()));

  useEffect(() => {
    const update = () => setSummary(progressSummary(readProgress()));
    update();
    window.addEventListener('dsjl:progress', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('dsjl:progress', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return (
    <section className="snapshot" aria-label="Calibration snapshot">
      <div className="snapshot__header">
        <div>
          <p className="eyebrow">Local calibration</p>
          <h2>Judgment signal</h2>
        </div>
        <Gauge size={22} aria-hidden="true" />
      </div>
      <div className="metric-grid">
        <Metric
          icon={ListChecks}
          label="Submitted"
          value={summary.submittedCount}
        />
        <Metric icon={Activity} label="Score" value={summary.totalScore} />
        <Metric icon={Gauge} label="Calibration" value={summary.calibration} />
        <Metric
          icon={AlertTriangle}
          label="High-conf misses"
          value={summary.highConfidenceMisses}
        />
      </div>
      <p className="snapshot__note">
        Scores stay in this browser. The profile gets useful after several
        completed cases.
      </p>
    </section>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="metric">
      <Icon size={17} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
