interface OptionCardProps {
  icon: string;
  name: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ icon, name, description, selected, onClick }: OptionCardProps) {
  return (
    <button
      className={`option-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="option-icon">{icon}</span>
      <span className="option-name">{name}</span>
      <span className="option-desc">{description}</span>
    </button>
  );
}
