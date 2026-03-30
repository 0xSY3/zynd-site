"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

function animateCounter(el: HTMLElement, target: number) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    onUpdate() {
      el.textContent = Math.floor(obj.val).toLocaleString() + "+";
    },
  });
}

export function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // --- Lenis smooth scroll ---
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // --- Hero entrance cascade ---
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .from("header .inline-flex", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
      .from(
        "header h1",
        { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .from(
        "header h1 + p",
        { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .from(
        "header .flex.flex-col.sm\\:flex-row",
        { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .from(
        "header .inline-block",
        { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

    // --- Section reveals ---
    gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
      const h2 = section.querySelector("h2");
      const h4 = section.querySelector("h4");
      const p = section.querySelector("h2 + p, h2 + div");

      if (h4) {
        gsap.from(h4, {
          x: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: h4,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }

      if (h2) {
        gsap.from(h2, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: h2,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }

      if (p) {
        gsap.from(p, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    // --- Staggered grid reveals (features, agents, use cases, SDK cards) ---
    const gridSelectors = [
      ".grid.md\\:grid-cols-2.lg\\:grid-cols-4 > div",
      ".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div",
      ".grid.lg\\:grid-cols-3 > div",
      ".grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8 > div",
    ];

    gridSelectors.forEach((selector) => {
      const items = gsap.utils.toArray<HTMLElement>(selector);
      if (!items.length) return;

      items.forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    // --- Comparison table reveal ---
    const tableRows = gsap.utils.toArray<HTMLElement>(
      ".border-mechanical tbody tr"
    );
    tableRows.forEach((row, i) => {
      gsap.from(row, {
        x: -30,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    });

    // --- Protocol flow steps ---
    const steps = gsap.utils.toArray<HTMLElement>(
      ".border-mechanical .flex.items-center.gap-4.group"
    );
    steps.forEach((step, i) => {
      gsap.from(step, {
        x: 30,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: step,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

    // --- Stat counter animations ---
    gsap.utils
      .toArray<HTMLElement>(".border-mechanical.text-center span.text-primary")
      .forEach((el) => {
        const text = el.textContent || "";
        const num = parseInt(text.replace(/[^0-9]/g, ""), 10);
        if (isNaN(num)) return;
        animateCounter(el, num);
      });

    // --- Roadmap timeline ---
    const phases = gsap.utils.toArray<HTMLElement>(
      ".grid.md\\:grid-cols-4 > div"
    );
    phases.forEach((phase, i) => {
      gsap.from(phase, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: phase,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    // --- Roadmap timeline line draw ---
    const timelineLine = document.querySelector(
      ".grid.md\\:grid-cols-4 .absolute.top-0"
    );
    if (timelineLine instanceof HTMLElement) {
      gsap.from(timelineLine, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: timelineLine,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    // --- Testimonial quote ---
    const quote = document.querySelector(".border-l-4.border-primary");
    if (quote instanceof HTMLElement) {
      gsap.from(quote, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    // --- Parallax on hero dot grid ---
    const dotGrid = document.querySelector(
      "header .bg-\\[radial-gradient\\(\\#27272A_1px\\2c transparent_1px\\)\\]"
    );
    if (dotGrid instanceof HTMLElement) {
      gsap.to(dotGrid, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: "header",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
