"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_AGENTS } from "@/lib/agents-data";

function fmtAddr(a: string) { return `${a.slice(0, 6)}...${a.slice(-4)}`; }
function fmtDate(d: string) { return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); }

export default function AgentDetailPage() {
  const params = useParams();
  const agent = MOCK_AGENTS.find((a) => a.id === params.id);
  const [copied, setCopied] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!agent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/20 mb-4">Agent not found</p>
          <Link href="/registry" className="text-emerald-400 text-sm">← Registry</Link>
        </div>
      </div>
    );
  }

  function copyEndpoint() {
    navigator.clipboard.writeText(agent!.httpWebhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleExecute() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse(JSON.stringify({
        status: "completed",
        output: `Response from ${agent!.name}: Processed "${prompt.slice(0, 50)}..."`,
        payment: { amount: agent!.price, currency: "USDC", network: "Base", settled: true },
      }, null, 2));
      setLoading(false);
    }, 2000);
  }

  const revenue = (agent.calls * parseFloat(agent.price.replace("$", ""))).toFixed(2);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-headline font-bold uppercase tracking-tight">ZyndAI</Link>
          <Link href="/registry" className="text-xs text-white/30 hover:text-white transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Registry
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/registry" className="inline-flex items-center gap-1 text-xs text-white/15 hover:text-white/40 transition-colors mb-8">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back
        </Link>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <div className="h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-400 to-emerald-500/0" />
          <div className="bg-[#0a0a0a] p-8">
            <div className="flex items-start gap-5 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-emerald-400 text-3xl">smart_toy</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-headline font-bold tracking-tight">{agent.name}</h1>
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${agent.status === "ACTIVE" ? "bg-emerald-400" : "bg-amber-400"}`} />
                    <span className="text-[10px] font-mono text-white/25">{agent.status === "ACTIVE" ? "live" : "idle"}</span>
                  </div>
                </div>
                <p className="text-sm text-white/30 leading-relaxed">{agent.description}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { label: "Price", value: `${agent.price}/req`, accent: true },
                { label: "Calls", value: agent.calls.toLocaleString() },
                { label: "Revenue", value: `$${revenue}` },
                { label: "Uptime", value: "99.8%" },
              ].map((s) => (
                <div key={s.label} className="bg-black/40 rounded-xl p-4 border border-white/5">
                  <p className="text-[10px] text-white/15 uppercase tracking-widest font-mono mb-1">{s.label}</p>
                  <p className={`text-lg font-mono font-bold ${s.accent ? "text-emerald-400" : "text-white/80"}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "DID", value: agent.did, icon: "fingerprint" },
            { label: "Owner", value: fmtAddr(agent.owner.walletAddress), icon: "account_circle" },
            { label: "Registered", value: fmtDate(agent.createdAt), icon: "calendar_today" },
          ].map((m) => (
            <div key={m.label} className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-emerald-400/30 text-sm">{m.icon}</span>
                <span className="text-[10px] text-white/15 uppercase tracking-widest font-mono">{m.label}</span>
              </div>
              <p className="text-xs font-mono text-white/50 truncate">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Capabilities */}
          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5">
            <h2 className="text-sm font-semibold mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-lg">category</span>
              Capabilities
            </h2>
            {Object.entries(agent.capabilities).map(([group, caps]) => (
              <div key={group} className="mb-4 last:mb-0">
                <p className="text-[9px] text-emerald-400/30 uppercase tracking-widest font-mono mb-2">{group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {caps.map((cap) => (
                    <span key={cap} className="text-[11px] font-mono text-emerald-400/70 bg-emerald-400/5 px-2.5 py-1 rounded-lg">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Endpoint */}
          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5">
            <h2 className="text-sm font-semibold mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-lg">link</span>
              Endpoint
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 px-4 py-2.5 bg-black rounded-xl border border-white/5 font-mono text-[11px] text-emerald-400/50 truncate">
                {agent.httpWebhookUrl}
              </div>
              <button onClick={copyEndpoint} className="px-3 py-2.5 rounded-xl bg-black border border-white/5 hover:border-emerald-500/20 transition-colors">
                <span className="material-symbols-outlined text-sm text-white/25">
                  {copied ? "check" : "content_copy"}
                </span>
              </button>
            </div>
            <p className="text-[10px] text-white/10 font-mono">POST with AgentMessage JSON body</p>
          </div>
        </div>

        {/* Try it */}
        <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5">
          <h2 className="text-sm font-semibold mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-lg">terminal</span>
            Try it
          </h2>
          <textarea
            placeholder="Enter a prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-black rounded-xl border border-white/5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-emerald-500/20 resize-none font-mono transition-colors mb-3"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/10 font-mono">Cost: {agent.price} USDC</span>
            <button
              onClick={handleExecute}
              disabled={!prompt.trim() || loading}
              className="px-5 py-2.5 bg-emerald-400 text-black text-xs font-bold rounded-xl hover:bg-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Processing..." : `Execute & Pay ${agent.price}`}
            </button>
          </div>

          {response && (
            <div className="mt-5 rounded-xl bg-black border border-emerald-500/10 overflow-hidden">
              <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400">✓ 200 OK</span>
                <span className="text-[9px] font-mono text-white/10">1.84s</span>
              </div>
              <pre className="p-4 text-[11px] font-mono text-emerald-400/40 overflow-x-auto whitespace-pre-wrap">{response}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
