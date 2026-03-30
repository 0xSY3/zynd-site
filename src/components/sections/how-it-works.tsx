"use client";

import { useEffect, useRef } from "react";

const PRODUCTS = [
  {
    title: "H402",
    subtitle: "OPEN STANDARDS",
    description:
      "Machine2Machine payments protocol enabling agents to buy APIs, compute, and digital products with HTTP calls and native blockchain transfers.",
    mediaUrl: "/videos/identity.mp4",
    ctaText: "Try now",
    ctaUrl: "https://h402.xyz/",
    ctaDisabled: false,
  },
  {
    title: "402pay",
    subtitle: "SELF-CUSTODY CHECKOUT",
    description:
      "Crypto and agent ready checkout with custom custody, lower fees, faster settlement, and clear controls for finance.",
    mediaUrl: "/videos/discovery.mp4",
    ctaText: "Try now",
    ctaUrl: "https://www.402pay.com/",
    ctaDisabled: false,
  },
  {
    title: "Agent Builder",
    subtitle: "PRIVATE AGENTS",
    description:
      "From template or scratch, create powerful agents that execute tasks across channels, safely, with full control.",
    mediaUrl: "/videos/messaging.mp4",
    ctaText: "Try now",
    ctaUrl: "https://agents.bitgpt.xyz/app",
    ctaDisabled: false,
  },
  {
    title: "Digital IDs",
    subtitle: "DIGITAL IDs",
    description:
      "Build trust with KYA enabled agent IDs that prove identity, permission scope, and intent before transactions proceed.",
    mediaUrl: "/videos/payments.mp4",
    ctaText: "Coming soon",
    ctaUrl: "#",
    ctaDisabled: true,
  },
] as const;

function TabIcon({ index }: { index: number }) {
  const icons = [
    // H402: text label
    <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor" stroke="none">h402</text>
    </svg>,
    // 402pay: X mark
    <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 8l8 8M16 8l-8 8" />
    </svg>,
    // Agent Builder: checkmark
    <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 12l2 2 4-4" />
    </svg>,
    // Digital IDs: person
    <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 18c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    </svg>,
  ];
  return icons[index] || null;
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers = container.querySelectorAll(".ss-trigger");
    const observers: IntersectionObserver[] = [];

    function setActive(index: number) {
      if (index === activeRef.current) return;
      activeRef.current = index;

      const toggle = (sel: string) => {
        container!.querySelectorAll(sel).forEach((el, i) => {
          el.classList.toggle("active", i === index);
        });
      };

      toggle(".ss-tab");
      toggle(".ss-title-item");
      toggle(".ss-media");
      toggle(".ss-desc-item");
      toggle(".ss-dot");

      container!.querySelectorAll(".ss-media").forEach((m, i) => {
        const v = m.querySelector("video");
        if (!v) return;
        if (i === index) v.play().catch(() => {});
        else v.pause();
      });
    }

    triggers.forEach((trigger, i) => {
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setActive(i);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(trigger);
      observers.push(obs);
    });

    setActive(0);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function handleTabClick(i: number) {
    const container = containerRef.current;
    if (!container) return;
    const trigger = container.querySelectorAll(".ss-trigger")[i];
    trigger?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <>
      <style>{`
        .ss { position: relative; }
        .ss-sticky {
          position: sticky; top: 0; height: 100vh;
          display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .ss-card {
          width: min(90vw, 1280px); height: min(85vh, 720px);
          background: #000000; border-radius: 32px;
          display: grid; grid-template-columns: 1fr 1.2fr 1fr; grid-template-rows: auto 1fr;
          padding: 48px; position: relative;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 24px 80px rgba(0,0,0,0.4);
        }
        .ss-tabs {
          grid-column: 3; grid-row: 1;
          display: flex; gap: 12px; justify-content: flex-end; align-items: flex-start;
        }
        .ss-tab {
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12); outline: none; color: rgba(255,255,255,0.5);
          transition: background-color 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-tab:hover { transform: scale(1.05); }
        .ss-tab.active { background: #ffffff; color: #000000; border-color: #ffffff; }
        .ss-tab svg {
          width: 24px; height: 24px; color: inherit;
          transition: color 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-left {
          grid-column: 1; grid-row: 1 / -1;
          display: flex; flex-direction: column; justify-content: flex-start;
        }
        .ss-title-group { position: relative; min-height: 120px; }
        .ss-title-item {
          position: absolute; top: 0; left: 0;
          opacity: 0; transform: translateY(20px); pointer-events: none;
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-title-item.active { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .ss-title {
          font-size: clamp(48px, 6vw, 80px); font-weight: 400;
          letter-spacing: -0.04em; line-height: 1; margin-bottom: 16px; color: #F3F4F6;
        }
        .ss-subtitle {
          font-size: 14px; font-weight: 400;
          letter-spacing: 0.05em; text-transform: uppercase; color: #71717A;
        }
        .ss-center {
          grid-column: 2; grid-row: 1 / -1;
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .ss-media-wrapper { position: relative; width: 100%; height: 100%; min-height: 0; }
        .ss-media {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.95); pointer-events: none;
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-media.active { opacity: 1; transform: scale(1); pointer-events: auto; }
        .ss-media video, .ss-media img {
          width: 100%; height: 100%; object-fit: cover;
          border-radius: 12px; filter: invert(1);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .ss-right {
          grid-column: 3; grid-row: 2;
          display: flex; flex-direction: column; justify-content: flex-end; position: relative;
        }
        .ss-desc-group { position: relative; min-height: 200px; }
        .ss-desc-item {
          position: absolute; bottom: 0; left: 0; right: 0;
          opacity: 0; transform: translateY(20px); pointer-events: none;
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-desc-item.active { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .ss-description {
          font-size: clamp(18px, 2vw, 24px); font-weight: 300;
          letter-spacing: -0.03em; line-height: 1.3; margin-bottom: 24px; color: #a1a1aa;
        }
        .ss-cta {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 12px 24px; border-radius: 99px;
          font-size: 14px; font-weight: 500; letter-spacing: -0.01em;
          text-decoration: none; width: fit-content;
          background: #ffffff; color: #000000;
          border: 1px solid rgba(255,255,255,0.15);
          transition: background-color 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.2s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-cta:hover { transform: scale(1.03); }
        .ss-cta:active { transform: scale(0.98); }
        .ss-cta--disabled {
          background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.4);
          pointer-events: none; border-color: rgba(255,255,255,0.1);
        }
        .ss-bottom-nav {
          position: absolute; bottom: 48px; left: 48px; z-index: 5;
          display: flex; align-items: center; gap: 12px;
        }
        .ss-bottom-logo {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.12); display: flex;
          align-items: center; justify-content: center;
        }
        .ss-bottom-logo svg { width: 20px; height: 20px; color: #ffffff; }
        .ss-bottom-pill {
          display: flex; align-items: center; gap: 0;
          background: rgba(255,255,255,0.12); border-radius: 99px;
          padding: 4px;
        }
        .ss-bottom-pill a {
          padding: 8px 16px; border-radius: 99px; font-size: 14px;
          font-weight: 500; color: rgba(255,255,255,0.85);
          text-decoration: none; transition: color 0.2s;
          letter-spacing: -0.01em;
        }
        .ss-bottom-pill a:hover { color: #ffffff; }
        .ss-bottom-contact {
          padding: 8px 20px; border-radius: 99px; font-size: 14px;
          font-weight: 500; color: rgba(255,255,255,0.7);
          text-decoration: none; border: 1px solid rgba(255,255,255,0.2);
          transition: color 0.2s, border-color 0.2s;
          letter-spacing: -0.01em;
        }
        .ss-bottom-contact:hover { color: #ffffff; border-color: rgba(255,255,255,0.4); }
        @media (max-width: 640px) {
          .ss-bottom-nav { bottom: 24px; left: 24px; gap: 8px; }
          .ss-bottom-logo { width: 36px; height: 36px; }
          .ss-bottom-pill a { padding: 6px 12px; font-size: 13px; }
          .ss-bottom-contact { padding: 6px 14px; font-size: 13px; }
        }
        .ss-triggers { position: relative; }
        .ss-trigger { height: 100vh; }
        .ss-dots {
          position: absolute; right: 48px; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 8px; z-index: 10;
        }
        .ss-dot {
          width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-dot.active { background: #ffffff; border-color: #ffffff; transform: scale(1.3); }

        @media (max-width: 1024px) {
          .ss-card {
            grid-template-columns: 1fr 1fr; grid-template-rows: auto 1fr auto;
            padding: 32px; height: min(90vh, 800px);
          }
          .ss-tabs { grid-column: 2; grid-row: 1; }
          .ss-left { grid-column: 1; grid-row: 1; }
          .ss-center { grid-column: 1 / -1; grid-row: 2; }
          .ss-right { grid-column: 1 / -1; grid-row: 3; }
          .ss-desc-group { min-height: 150px; }
        }
        @media (max-width: 640px) {
          .ss-card {
            grid-template-columns: 1fr; grid-template-rows: auto auto 1fr auto;
            padding: 24px; width: 95vw; height: min(90vh, 700px); border-radius: 24px;
          }
          .ss-tabs { grid-column: 1; grid-row: 1; justify-content: flex-start; }
          .ss-left { grid-column: 1; grid-row: 2; }
          .ss-center { grid-column: 1; grid-row: 3; }
          .ss-right { grid-column: 1; grid-row: 4; }
          .ss-tab { width: 44px; height: 44px; border-radius: 12px; }
          .ss-title { font-size: 36px; }
          .ss-description { font-size: 16px; }
          .ss-dots { display: none; }
        }
      `}</style>

      <div className="ss" ref={containerRef}>
        <div className="ss-sticky">
          <div className="ss-card">
            <div className="ss-dots">
              {PRODUCTS.map((p) => (
                <div key={p.title} className="ss-dot" />
              ))}
            </div>

            <div className="ss-tabs">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.title}
                  className="ss-tab"
                  aria-label={p.title}
                  onClick={() => handleTabClick(i)}
                >
                  <TabIcon index={i} />
                </button>
              ))}
            </div>

            <div className="ss-left">
              <div className="ss-title-group">
                {PRODUCTS.map((p) => (
                  <div key={p.title} className="ss-title-item">
                    <h2 className="ss-title">{p.title}</h2>
                    <p className="ss-subtitle">{p.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="ss-center">
              <div className="ss-media-wrapper">
                {PRODUCTS.map((p) => (
                  <div key={p.title} className="ss-media">
                    <video
                      src={p.mediaUrl}
                      loop
                      muted
                      playsInline
                      preload="none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="ss-right">
              <div className="ss-desc-group">
                {PRODUCTS.map((p) => (
                  <div key={p.title} className="ss-desc-item">
                    <p className="ss-description">{p.description}</p>
                    <a
                      href={p.ctaDisabled ? "#" : p.ctaUrl}
                      className={`ss-cta${p.ctaDisabled ? " ss-cta--disabled" : ""}`}
                      {...(!p.ctaDisabled && p.ctaUrl.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      {p.ctaText}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom nav bar */}
            <div className="ss-bottom-nav">
              <div className="ss-bottom-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="6" cy="9" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="18" cy="9" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="6" cy="15" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="18" cy="15" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className="ss-bottom-pill">
                <a href="#">Protocol</a>
                <a href="#">Developers</a>
              </div>
              <a href="#" className="ss-bottom-contact">
                Join Network
              </a>
            </div>
          </div>
        </div>

        <div className="ss-triggers">
          {PRODUCTS.map((p) => (
            <div key={p.title} className="ss-trigger" />
          ))}
        </div>
      </div>
    </>
  );
}
