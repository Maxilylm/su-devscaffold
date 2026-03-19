import { useState, useMemo } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { OptionCard } from './components/OptionCard';
import { FeatureCheckbox } from './components/FeatureCheckbox';
import { FilePreview } from './components/FilePreview';
import {
  generateFiles,
  CLI_OPTIONS,
  PROJECT_OPTIONS,
  FEATURE_OPTIONS,
} from './templates';
import type { CodingCLI, ProjectType, Feature } from './templates';
import './App.css';

const STEP_LABELS = ['AI CLI', 'Project Type', 'Features', 'Download'];

function App() {
  const [step, setStep] = useState(1);
  const [cli, setCli] = useState<CodingCLI | null>(null);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [projectName, setProjectName] = useState('my-project');
  const [animDir, setAnimDir] = useState<'forward' | 'backward'>('forward');

  const files = useMemo(() => {
    if (cli && projectType) {
      return generateFiles(cli, projectName, projectType, features);
    }
    return [];
  }, [cli, projectName, projectType, features]);

  const canNext =
    (step === 1 && cli !== null) ||
    (step === 2 && projectType !== null) ||
    step === 3;

  function goNext() {
    if (!canNext) return;
    setAnimDir('forward');
    setStep((s) => Math.min(s + 1, 4));
  }

  function goBack() {
    setAnimDir('backward');
    setStep((s) => Math.max(s - 1, 1));
  }

  function toggleFeature(f: Feature) {
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="logo">
          <span className="logo-icon">{'\u{1F9F0}'}</span> DevScaffold
        </h1>
        <p className="tagline">Generate AI coding assistant config files in seconds</p>
      </header>

      <StepIndicator current={step} total={4} labels={STEP_LABELS} />

      <main className={`wizard-content anim-${animDir}`} key={step}>
        {step === 1 && (
          <section className="step-section">
            <h2>Choose your AI Coding CLI</h2>
            <p className="step-desc">Which AI-powered coding assistant do you use?</p>
            <div className="options-grid cli-grid">
              {CLI_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  icon={opt.icon}
                  name={opt.name}
                  description={opt.description}
                  selected={cli === opt.id}
                  onClick={() => setCli(opt.id)}
                />
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="step-section">
            <h2>Choose your Project Type</h2>
            <p className="step-desc">What kind of project are you building?</p>
            <div className="name-input-row">
              <label htmlFor="project-name">Project Name</label>
              <input
                id="project-name"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="my-project"
                className="name-input"
              />
            </div>
            <div className="options-grid project-grid">
              {PROJECT_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  icon={opt.icon}
                  name={opt.name}
                  description={opt.description}
                  selected={projectType === opt.id}
                  onClick={() => setProjectType(opt.id)}
                />
              ))}
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="step-section">
            <h2>Select Features</h2>
            <p className="step-desc">
              Pick the features relevant to your project. Each adds specialized rules and patterns.
            </p>
            <div className="features-grid">
              {FEATURE_OPTIONS.map((opt) => (
                <FeatureCheckbox
                  key={opt.id}
                  icon={opt.icon}
                  name={opt.name}
                  description={opt.description}
                  checked={features.includes(opt.id)}
                  onChange={() => toggleFeature(opt.id)}
                />
              ))}
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="step-section">
            <h2>Preview &amp; Download</h2>
            <p className="step-desc">
              {files.length} file{files.length !== 1 ? 's' : ''} generated for{' '}
              <strong>{CLI_OPTIONS.find((c) => c.id === cli)?.name}</strong> +{' '}
              <strong>{PROJECT_OPTIONS.find((p) => p.id === projectType)?.name}</strong>
              {features.length > 0 && (
                <> with {features.length} feature{features.length !== 1 ? 's' : ''}</>
              )}
            </p>
            <FilePreview files={files} projectName={projectName} />
          </section>
        )}
      </main>

      <footer className="wizard-nav">
        {step > 1 && (
          <button className="nav-btn back-btn" onClick={goBack} type="button">
            {'\u2190'} Back
          </button>
        )}
        <div className="nav-spacer" />
        {step < 4 && (
          <button
            className="nav-btn next-btn"
            onClick={goNext}
            disabled={!canNext}
            type="button"
          >
            {step === 3 ? 'Generate' : 'Next'} {'\u2192'}
          </button>
        )}
      </footer>
    </div>
  );
}

export default App;
