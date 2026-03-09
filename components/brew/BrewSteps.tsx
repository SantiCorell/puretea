"use client";

interface BrewStepsProps {
  steps: string[];
  alternate?: boolean;
}

const STEP_ICONS: string[] = [
  "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4",
  "M12 3v18M3 12h18",
  "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z",
  "M12 5v14M5 12h14",
];

function StepIcon({ index }: { index: number }) {
  const d = STEP_ICONS[index % STEP_ICONS.length];
  return (
    <div className="w-10 h-10 rounded-xl bg-puretea-organic/15 flex items-center justify-center text-puretea-organic shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </div>
  );
}

function ArrowRight({ alternate }: { alternate: boolean }) {
  return (
    <div className={`brew-arrow-connector ${alternate ? "brew-arrow--alt" : ""}`} aria-hidden>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-puretea-organic/80">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  );
}

export function BrewSteps({ steps, alternate = true }: BrewStepsProps) {
  return (
    <div className="brew-flow">
      <p className="text-sm font-medium text-puretea-dark/70 mb-6 text-center lg:text-left">
        Proceso claro, paso a paso. Temperatura y tiempo para un resultado perfecto.
      </p>
      <ol className="brew-steps-cards list-none p-0 m-0 flex flex-col lg:flex-row lg:flex-nowrap gap-6 lg:gap-2 items-center lg:items-stretch" role="list">
        {steps.map((text, i) => (
          <li key={i} className="brew-step-card-wrapper flex flex-col lg:flex-row lg:flex-1 lg:min-w-0 items-center gap-4 lg:gap-1">
            <div
              className="brew-step-card group w-full lg:w-auto"
              data-step={i + 1}
            >
              <div className="flex items-center gap-3 mb-3">
                <StepIcon index={i} />
                <span className="text-xs font-semibold uppercase tracking-wider text-puretea-organic">
                  Paso {i + 1}
                </span>
              </div>
              <p className="text-puretea-dark font-medium leading-relaxed">
                {text}
              </p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight alternate={alternate && i % 2 === 1} />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
