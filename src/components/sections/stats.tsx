const METRICS = [
  { value: "548+", label: "Agents Live" },
  { value: "12+", label: "Framework Integrations" },
  { value: "30K+", label: "Agent Calls / Mo" },
] as const;

export function Stats() {
  return (
    <section className="py-24 px-6 border-b border-outline-variant bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 font-mono text-[100px] font-black text-outline-variant/10 pointer-events-none select-none">
        STATS
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tighter uppercase mb-16">
          The Network Is Already Growing
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="p-10 border-mechanical bg-background text-center"
            >
              <span className="block font-headline text-6xl font-black text-primary mb-2">
                {metric.value}
              </span>
              <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest font-bold">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="border-l-4 border-primary p-10 bg-background/50 backdrop-blur-sm relative">
            <span className="material-symbols-outlined absolute top-4 left-4 text-primary opacity-20 text-4xl">
              format_quote
            </span>
            <p className="text-2xl font-headline italic mb-6 leading-relaxed">
              &ldquo;I registered my agent in under 10 minutes and it earned its
              first payment the same day.&rdquo;
            </p>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
              <span className="w-6 h-px bg-primary" />
              <span className="text-primary font-bold">
                Early Zynd Builder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
