"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Protocol", href: "#" },
  { label: "Registry", href: "/registry" },
  { label: "Developers", href: "#" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    function onScroll() {
      setPastHero(window.scrollY > 60);

      const footer = document.querySelector("footer");
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top;
      setScrolled(footerTop < window.innerHeight * 0.6);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = scrolled;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className={`
          max-w-5xl mx-auto
          flex items-center justify-between
          h-14 px-6
          rounded-full
          border
          transition-all duration-500 ease-out
          ${
            isLight
              ? "bg-white/90 border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              : pastHero
                ? "bg-background/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "bg-background/20 border-white/5"
          }
          backdrop-blur-xl
        `}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative w-[28px] h-[28px] flex items-center justify-center">
             <div className={`absolute inset-0 rounded-full blur-[8px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${isLight ? "bg-black/20" : "bg-primary/40"}`} />
             <Image
              src="/zynd-logo.png"
              alt="ZyndAI"
              width={26}
              height={26}
              className="relative z-10 transition-all duration-500"
              unoptimized
              style={{
                filter: isLight ? "brightness(0)" : "brightness(0) invert(1)",
              }}
            />
          </div>
          <span
            className={`text-lg font-bold tracking-tight transition-colors duration-500 ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            Zynd
          </span>
        </a>

        {/* Center links in pill */}
        <div
          className={`
            hidden md:flex items-center gap-1 rounded-full px-1.5 py-1.5
            transition-all duration-500
            ${
              isLight
                ? "bg-black/[0.04]"
                : "bg-white/[0.03]"
            }
          `}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`
                relative px-5 py-1.5 text-sm font-medium rounded-full
                transition-all duration-300
                ${
                  isLight
                    ? "text-black/60 hover:text-black hover:bg-black/[0.04]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:contact@zyndai.com"
            className={`
              hidden md:flex items-center
              px-6 py-2 rounded-full text-sm font-semibold
              transition-all duration-400 border border-transparent
              ${
                isLight
                  ? "bg-black text-white hover:bg-black/80 hover:shadow-md hover:-translate-y-0.5"
                  : "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
              }
            `}
          >
            Join Network
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] w-8 h-8 items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center ${
                isLight ? "bg-black" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
            />
            <span
              className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center ${
                isLight ? "bg-black" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          max-w-5xl mx-auto mt-3
          rounded-3xl border overflow-hidden
          backdrop-blur-xl shadow-2xl
          transition-all duration-400 origin-top
          ${
            menuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          }
          ${
            isLight
              ? "bg-white/95 border-black/[0.08]"
              : "bg-background/95 border-white/10"
          }
        `}
      >
        <div className="flex flex-col p-6 gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`
                px-4 py-3 rounded-xl text-base font-semibold
                transition-colors duration-200
                ${
                  isLight
                    ? "text-black/70 hover:text-black hover:bg-black/[0.04]"
                    : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                }
              `}
            >
              {link.label}
            </a>
          ))}
          <div
            className={`mt-4 pt-4 border-t ${
              isLight ? "border-black/[0.06]" : "border-white/[0.06]"
            }`}
          >
            <a
              href="mailto:contact@zyndai.com"
              className={`
                flex items-center justify-center
                w-full px-4 py-4 rounded-xl text-base font-semibold
                transition-all duration-200 border border-transparent
                ${
                  isLight
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-white text-black hover:bg-white/90"
                }
              `}
            >
              Join Network
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
