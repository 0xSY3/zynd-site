"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Protocol", href: "#" },
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
    <nav className="relative z-50 px-4 pt-3">
      <div
        className={`
          max-w-5xl mx-auto
          flex items-center justify-between
          h-14 px-5
          rounded-full
          border
          transition-all duration-500 ease-out
          ${
            isLight
              ? "bg-white/90 border-black/[0.08] shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
              : pastHero
                ? "bg-background/70 border-outline-variant/60 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
                : "bg-transparent border-transparent"
          }
          backdrop-blur-xl
        `}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/zynd-logo.png"
            alt="ZyndAI"
            width={26}
            height={26}
            style={{
              filter: isLight ? "brightness(0)" : "brightness(0) invert(1)",
              transition: "filter 0.5s ease",
            }}
          />
          <span
            className={`text-base font-extrabold tracking-tight uppercase font-headline transition-colors duration-500 ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            Zynd
          </span>
        </a>

        {/* Center links in pill */}
        <div
          className={`
            hidden md:flex items-center gap-0 rounded-full px-1 py-1
            transition-all duration-500
            ${
              isLight
                ? "bg-black/[0.06]"
                : "bg-white/[0.08]"
            }
          `}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`
                relative px-4 py-1.5 text-[13px] font-medium rounded-full
                transition-all duration-300
                ${
                  isLight
                    ? "text-black/70 hover:text-black"
                    : "text-white/70 hover:text-white"
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
              px-5 py-1.5 rounded-full text-[13px] font-medium
              transition-all duration-300 border
              ${
                isLight
                  ? "border-black/20 text-black hover:bg-black/[0.04]"
                  : "border-white/20 text-white hover:bg-white/[0.06]"
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
              className={`block w-4 h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                isLight ? "bg-black" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-[3.25px]" : ""}`}
            />
            <span
              className={`block w-4 h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                isLight ? "bg-black" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-[3.25px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          max-w-5xl mx-auto mt-2
          rounded-2xl border overflow-hidden
          backdrop-blur-xl
          transition-all duration-300 origin-top
          ${
            menuOpen
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-95 pointer-events-none"
          }
          ${
            isLight
              ? "bg-white/95 border-black/[0.08]"
              : "bg-background/90 border-outline-variant/60"
          }
        `}
      >
        <div className="flex flex-col p-4 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`
                px-4 py-3 rounded-xl text-sm font-medium
                transition-colors duration-200
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
          <div
            className={`mt-2 pt-3 border-t ${
              isLight ? "border-black/[0.06]" : "border-white/[0.06]"
            }`}
          >
            <a
              href="mailto:contact@zyndai.com"
              className={`
                flex items-center justify-center
                w-full px-4 py-3 rounded-xl text-sm font-medium
                transition-colors duration-200 border
                ${
                  isLight
                    ? "border-black/20 text-black hover:bg-black/[0.04]"
                    : "border-white/20 text-white hover:bg-white/[0.06]"
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
