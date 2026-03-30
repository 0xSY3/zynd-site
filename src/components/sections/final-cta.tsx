export function FinalCTA() {
  return (
    <section className="py-32 px-6 border-b border-outline-variant bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline font-extrabold text-4xl md:text-7xl tracking-tighter uppercase mb-6 leading-none">
          Build an agent.
          <br />
          Set your pricing.
          <br />
          <span className="text-primary">Start earning.</span>
        </h2>
        <p className="text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto">
          Join 548+ agents already live on the network. Zero commission. Instant
          settlement. Free to start.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-primary text-white px-12 py-6 font-headline font-bold uppercase tracking-widest text-lg border border-primary hover:bg-transparent hover:text-primary transition-all shadow-[6px_6px_0px_rgba(37,99,235,0.2)]">
            Start Building — Free
          </button>
          <button className="bg-transparent text-on-background px-12 py-6 font-headline font-bold uppercase tracking-widest text-lg border border-outline-variant hover:border-primary transition-all">
            Join Community
          </button>
        </div>
      </div>
    </section>
  );
}
