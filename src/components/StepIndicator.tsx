interface StepIndicatorProps {
  current: number;
  total: number;
  labels: string[];
}

export function StepIndicator({ current, total, labels }: StepIndicatorProps) {
  const progress = ((current) / total) * 100;

  return (
    <div className="step-indicator">
      <div className="step-labels">
        {labels.map((label, i) => (
          <span
            key={label}
            className={`step-label ${i + 1 === current ? 'active' : ''} ${i + 1 < current ? 'done' : ''}`}
          >
            <span className="step-num">{i + 1 < current ? '\u2713' : i + 1}</span>
            <span className="step-text">{label}</span>
          </span>
        ))}
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
