interface FeatureCheckboxProps {
  icon: string;
  name: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function FeatureCheckbox({ icon, name, description, checked, onChange }: FeatureCheckboxProps) {
  return (
    <button
      className={`feature-checkbox ${checked ? 'checked' : ''}`}
      onClick={() => onChange(!checked)}
      type="button"
      role="checkbox"
      aria-checked={checked}
    >
      <span className="feature-check">{checked ? '\u2713' : ''}</span>
      <span className="feature-icon">{icon}</span>
      <span className="feature-info">
        <span className="feature-name">{name}</span>
        <span className="feature-desc">{description}</span>
      </span>
    </button>
  );
}
