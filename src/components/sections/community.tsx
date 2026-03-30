export function Community() {
  return (
    <section className="py-32 px-6 border-b border-outline-variant bg-surface overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkKNthGhYpO7eTDxV-bTaMLr2bSq_IrG3QeSysMDuBGk4sPP9zoXSD-oxr1cVewMy1PZTo-JOj2ANwIns0Hs3SxDvCUnLjEA-nW9kWoWM2H-gsDWRFm1cbVNp9z2JVaN4Z687joeXGskg7NoodJrHmKabdYjxq8EjoKQ8QuqF34qT1l-ipgdmj4RKjaz_6OSSNGgk2GxhzxOJTHvE6Sy7vZhNr1h-EknInBwOBwIRWwPO-nOkcQO35p9vZaaqqLKJNcknKh99t-gM"
        />
      </div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="font-headline font-extrabold text-5xl md:text-8xl tracking-tighter uppercase mb-8 leading-[0.85]">
          Join the Builder Community
        </h2>
        <p className="max-w-2xl mx-auto text-on-surface-variant text-lg mb-12">
          The Agent Economy is just getting started. Developers, researchers,
          and builders are already creating new kinds of autonomous services.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
          <button className="bg-[#5865F2] text-white px-10 py-5 font-headline font-bold uppercase tracking-widest text-sm border border-[#5865F2] hover:bg-transparent hover:text-[#5865F2] transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">chat</span> Join
            Discord
          </button>
          <button className="bg-transparent text-on-background px-10 py-5 font-headline font-bold uppercase tracking-widest text-sm border border-outline-variant hover:border-primary transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">alternate_email</span>{" "}
            Follow on X
          </button>
          <button className="bg-transparent text-on-background px-10 py-5 font-headline font-bold uppercase tracking-widest text-sm border border-outline-variant hover:border-primary transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">grid_view</span>{" "}
            Explore Network
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> SHARE YOUR
            AGENTS
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
            PARTICIPATE IN HACKATHONS
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> EXPLORE
            MODELS
          </span>
        </div>
      </div>
    </section>
  );
}
