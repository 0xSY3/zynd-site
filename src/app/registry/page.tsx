"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_AGENTS } from "@/lib/agents-data";

const CATEGORIES = ["All", "AI", "Data", "Finance", "Security", "Monitoring", "Development", "Communication"] as const;
const SORT_OPTIONS = ["Newest", "Most Used", "Cheapest"] as const;

export default function RegistryPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<string>("Newest");

  const filtered = useMemo(() => {
    let list = MOCK_AGENTS.filter((a) => {
      if (search) {
        const q = search.toLowerCase();
        if (!a.name.toLowerCase().includes(q) && !a.description.toLowerCase().includes(q)) return false;
      }
      if (status !== "All" && a.status !== status) return false;
      if (category !== "All") {
        const cats = Object.keys(a.capabilities);
        if (!cats.some((c) => c.toLowerCase().includes(category.toLowerCase()))) return false;
      }
      return true;
    });

    if (sort === "Most Used") list = [...list].sort((a, b) => b.calls - a.calls);
    if (sort === "Cheapest") list = [...list].sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
    if (sort === "Newest") list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return list;
  }, [search, status, category, sort]);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="px-6 py-5 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-headline font-bold text-lg uppercase tracking-tight text-white">ZyndAI</Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">Home</Link>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Docs</a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10 pb-20">
        <h1 className="font-headline font-extrabold text-3xl tracking-tight mb-2 text-white">Registry</h1>
        <p className="text-white/30 text-sm mb-8">{MOCK_AGENTS.length} agents on the network</p>

        {/* Search + controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-[#141414] border border-[#222] rounded-2xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c6ef85]/30 transition-colors"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 bg-[#141414] border border-[#222] rounded-2xl text-sm text-white/50 appearance-none cursor-pointer focus:outline-none focus:border-[#c6ef85]/30 transition-colors"
          >
            <option value="All" className="bg-neutral-900">All Status</option>
            <option value="ACTIVE" className="bg-neutral-900">Active</option>
            <option value="INACTIVE" className="bg-neutral-900">Inactive</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 bg-[#141414] border border-[#222] rounded-2xl text-sm text-white/50 appearance-none cursor-pointer focus:outline-none focus:border-[#c6ef85]/30 transition-colors"
          >
            {SORT_OPTIONS.map((s) => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
          </select>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                category === cat
                  ? "bg-[#c6ef85] text-black"
                  : "bg-[#141414] text-white/30 hover:text-white/50 border border-[#222]"
              }`}
            >
              {cat}
            </button>
          ))}
          {(search || status !== "All" || category !== "All") && (
            <button
              onClick={() => { setSearch(""); setStatus("All"); setCategory("All"); }}
              className="px-3 py-1.5 text-[11px] text-white/20 hover:text-white/40 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <p className="text-[10px] text-white/15 font-mono mb-4">{filtered.length} results</p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((agent) => (
            <Link
              key={agent.id}
              href={`/registry/${agent.id}`}
              className="group p-6 rounded-3xl bg-[#152211] border border-[#c6ef85]/15 hover:border-[#c6ef85]/30 hover:bg-[#1a2c14] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1e3518] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#c6ef85] text-[16px]">smart_toy</span>
                  </div>
                  <h3 className="text-[14px] font-semibold text-white group-hover:text-[#c6ef85] transition-colors">{agent.name}</h3>
                </div>
                <span className={`w-2 h-2 rounded-full ${agent.status === "ACTIVE" ? "bg-[#c6ef85]" : "bg-orange-300"}`} />
              </div>

              <p className="text-[12px] text-white/30 leading-relaxed mb-5 line-clamp-2">{agent.description}</p>

              <div className="flex flex-wrap gap-1 mb-5">
                {Object.values(agent.capabilities).flat().slice(0, 3).map((cap) => (
                  <span key={cap} className="text-[9px] font-mono text-[#c6ef85]/60 bg-[#1e3518] px-2 py-0.5 rounded-full">
                    {cap}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <span className="text-[14px] font-mono text-[#c6ef85] font-semibold">{agent.price}<span className="text-white/20 font-normal text-[11px]">/req</span></span>
                <span className="text-[10px] text-white/15 font-mono">{agent.calls.toLocaleString()} calls</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/20 text-sm mb-2">No agents found</p>
            <button onClick={() => { setSearch(""); setStatus("All"); setCategory("All"); }} className="text-xs text-white/40 underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
