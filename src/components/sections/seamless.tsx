"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_LOTTIE_URL = "/assets/json/AgentYard-Asset-Exported.json?v=6";

const CLEAR_PX =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

function stripHexAssets(json: Record<string, unknown>): Record<string, unknown> {
  const assets = json.assets as Array<{ id: string; w: number; h: number; p: string }>;
  if (!assets) return json;

  const stripWidths = new Set([960, 158, 328, 432, 96]);
  const cleaned = assets.map((a) => {
    if (a.w && stripWidths.has(a.w)) return { ...a, p: CLEAR_PX };
    return a;
  });

  return { ...json, assets: cleaned };
}

function useLottieData(url: string | null): Record<string, unknown> | null {
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      return;
    }

    let cancelled = false;

    fetch(url)
      .then((res) => res.json())
      .then((json: Record<string, unknown>) => {
        if (!cancelled) setData(stripHexAssets(json));
      })
      .catch((err: unknown) => {
        console.error("Failed to load Lottie animation:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return data;
}

const CATEGORIES = [
  "Blockchain Network",
  "Automations",
  "(DeFi) Protocols",
  "User Applications",
  "Development Tools",
  "Analytics",
];

const LOGO_DATA = [
  { label: "Gemini", src: "/assets/images/logos/gemini.svg" },
  { label: "Claude", src: "/assets/images/logos/anthropic.svg" },
  { label: "OpenAI", src: "/assets/images/logos/openai.svg" },
  { label: "LangChain", src: "/assets/images/logos/langchain.svg" },
  { label: "n8n", src: "/assets/images/logos/n8n.svg" },
  { label: "Base", src: "/assets/images/logos/base.svg" },
  { label: "CrewAI", src: "/assets/images/logos/crewai.svg" },
  { label: "Pydantic", src: "/assets/images/logos/pydantic.svg" },
];

function MobileNetworkDiagram() {
  return (
    <div className="flex flex-col items-center gap-8 w-full px-4 py-6">
      <div className="grid grid-cols-4 gap-3.5 w-full max-w-[300px]">
        {LOGO_DATA.map((logo) => (
          <div
            key={logo.label}
            className="aspect-square bg-white/5 rounded-[14px] flex items-center justify-center border border-white/[0.08]"
          >
            <img
              src={logo.src}
              alt={logo.label}
              className="w-[48%] h-[48%] object-contain"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <img src="/zynd-logo.png" alt="ZyndAI" className="w-14 h-auto brightness-0 invert" />
        <span className="text-white text-lg font-bold mt-1.5 tracking-tight">
          Zynd<span className="text-primary">AI</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 w-full max-w-[300px]">
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            className="py-2 px-2.5 border border-white/[0.12] rounded-lg text-center text-xs leading-snug text-white/60 bg-white/[0.03]"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}

function injectLogos(container: HTMLElement): void {
  const svgEl = container.querySelector("svg");
  if (!svgEl) return;

  const NS = "http://www.w3.org/2000/svg";
  svgEl.querySelectorAll(".injected-label, .injected-logo").forEach((el) => el.remove());

  const images = Array.from(svgEl.querySelectorAll("image"));
  const logoWidths = new Set(["158px", "328px", "96px"]);
  const logoImages = images.filter((img) => {
    const w = img.getAttribute("width") || "";
    return logoWidths.has(w);
  });

  logoImages.forEach((img, i) => {
    const logo = LOGO_DATA[i];
    if (!logo) return;

    const w = parseFloat(img.getAttribute("width") || "0");
    const h = parseFloat(img.getAttribute("height") || "0");
    const parent = img.parentElement;
    if (!parent) return;

    img.style.opacity = "0";

    const logoSize = Math.min(w, h) * 0.7;
    const logoX = (w - logoSize) / 2;
    const logoY = (h - logoSize) / 2 - 8;

    const logoImg = document.createElementNS(NS, "image");
    logoImg.setAttribute("class", "injected-logo");
    logoImg.setAttribute("href", logo.src);
    logoImg.setAttribute("x", String(logoX));
    logoImg.setAttribute("y", String(logoY));
    logoImg.setAttribute("width", String(logoSize));
    logoImg.setAttribute("height", String(logoSize));
    parent.appendChild(logoImg);
  });
}

function ScrollDrivenLottie({
  data,
  className,
  showLabels = false,
}: {
  data: Record<string, unknown>;
  className: string;
  showLabels?: boolean;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    const instance = lottieRef.current;
    if (!instance) return;

    instance.pause();
    const totalFrames = instance.getDuration(true) || 1;
    const mobile = window.innerWidth <= 767;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 10%",
      end: mobile ? "+=100%" : "+=120%",
      pin: true,
      pinType: "transform",
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const frame = Math.round(self.progress * (totalFrames - 1));
        instance.goToAndStop(frame, true);
      },
    });

    if (showLabels && containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) injectLogos(containerRef.current);
      }, 100);
    }

    return () => {
      trigger.kill();
    };
  }, [isReady, showLabels]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={data}
        loop={false}
        autoplay={false}
        onDOMLoaded={() => setIsReady(true)}
      />
    </div>
  );
}

function AccentCorners() {
  return (
    <div className="pointer-events-none relative">
      <div className="accent-left-top-corner" />
      <div className="accent-left-bottom-corner" />
      <div className="accent-right-top-corner" />
      <div className="accent-right-bottom-corner" />
    </div>
  );
}

export function Seamless() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const desktopLottie = useLottieData(isMobile ? null : DESKTOP_LOTTIE_URL);

  return (
    <section className="seamless">
      <div className="max-w-7xl mx-auto px-6">
        <div className="seamless-wrapper">
          <div className="seamless-top-wrap">
            <div className="seamless-heading-wrap">
              <h2 className="font-headline font-bold text-4xl md:text-6xl tracking-tight text-center">
                Autonomous Agent Commerce
              </h2>
              <div className="hero-accent">
                <div className="font-headline font-bold text-4xl md:text-6xl tracking-tight text-center relative z-[4]">
                  Across the Network
                </div>
                <div className="accent-border-overlay" />
                <div className="accent-background" />
                <AccentCorners />
              </div>
            </div>
            <p className="text-white/50 text-lg text-center max-w-lg mx-auto">
              Agents discover peers, negotiate services, and settle
              payments autonomously across the ZyndAI network
            </p>
          </div>

          <div className="seamless-bottom-wrap">
            {isMobile ? (
              <MobileNetworkDiagram />
            ) : desktopLottie ? (
              <ScrollDrivenLottie
                data={desktopLottie}
                className="sticky-lottie"
                showLabels
              />
            ) : (
              <div className="sticky-lottie" style={{ minHeight: "50vh" }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
