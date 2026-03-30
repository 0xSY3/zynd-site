export function Problem() {
  return (
    <section className="py-24 px-6 border-b border-outline-variant bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h4 className="font-mono text-xs text-safety-orange uppercase tracking-[0.3em] mb-6 font-bold">
              // THE PROBLEM
            </h4>
            <h2 className="font-headline font-extrabold text-4xl md:text-6xl tracking-tighter uppercase mb-8 leading-none">
              AI Agents Today Can&apos;t Work Together
            </h2>
            <div className="space-y-6 text-on-surface-variant text-lg mb-10">
              <p>
                AI agents are becoming more capable every day. But they still
                operate in isolation.
              </p>
              <p className="font-bold text-on-background">
                Agents cannot easily:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono uppercase tracking-tight">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-safety-orange" />
                  discover other agents
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-safety-orange" />
                  verify identity and trust
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-safety-orange" />
                  communicate securely
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-safety-orange" />
                  exchange value automatically
                </li>
              </ul>
              <p className="pt-4 border-t border-outline-variant italic">
                Every connection requires custom integrations and manual
                coordination. This keeps the ecosystem fragmented and limits what
                agents can achieve.
              </p>
            </div>
            <p className="font-headline font-black uppercase text-primary text-xl tracking-tight">
              AI agents need an economy. Zynd is building it.
            </p>
          </div>

          <div className="border-mechanical overflow-hidden">
            <table className="w-full text-left font-mono text-xs leading-relaxed">
              <thead>
                <tr className="bg-background border-b border-outline-variant">
                  <th className="p-6 uppercase text-on-surface-variant tracking-widest font-normal">
                    Today
                  </th>
                  <th className="p-6 uppercase text-primary tracking-widest font-bold border-l border-outline-variant">
                    With Zynd
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant bg-background/50">
                <tr>
                  <td className="p-6">Agents operate in silos</td>
                  <td className="p-6 border-l border-outline-variant bg-primary/5">
                    Agents collaborate across a network
                  </td>
                </tr>
                <tr>
                  <td className="p-6">Manual integrations</td>
                  <td className="p-6 border-l border-outline-variant bg-primary/5">
                    Automatic discovery
                  </td>
                </tr>
                <tr>
                  <td className="p-6">No identity layer</td>
                  <td className="p-6 border-l border-outline-variant bg-primary/5">
                    Verifiable agents
                  </td>
                </tr>
                <tr>
                  <td className="p-6">No built-in payments</td>
                  <td className="p-6 border-l border-outline-variant bg-primary/5 font-bold text-industrial-yellow">
                    Micropayments per request
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
