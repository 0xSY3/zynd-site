"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLS = 30;
const ROWS = 10;

export function SquareTransition() {
  const gridRef = useRef<HTMLDivElement>(null);

  const [squarePriorities, setSquarePriorities] = useState<{index: number, priority: number}[]>([]);

  useEffect(() => {
    const priorities = Array.from({ length: ROWS * COLS }, (_, i) => {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const distanceFromBottom = ROWS - 1 - row;
      const basePriority = distanceFromBottom * 50;
      const randomFactor = Math.random() * 300;
      const waveEffect = Math.sin(col * 0.3) * 30;
      return { index: i, priority: basePriority + randomFactor + waveEffect };
    }).sort((a, b) => a.priority - b.priority);
    setSquarePriorities(priorities);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || squarePriorities.length === 0) return;

    const squares = grid.querySelectorAll<HTMLDivElement>(".sq");
    const sorted = squarePriorities.map((d) => squares[d.index]);

    let lastVisible = -1;
    const trigger = ScrollTrigger.create({
      trigger: grid,
      start: "top bottom",
      end: "top 20%",
      scrub: 1,
      onUpdate(self) {
        const visible = Math.floor(sorted.length * self.progress);
        if (visible === lastVisible) return;
        lastVisible = visible;
        sorted.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = i < visible ? "1" : "0";
        });
      },
    });

    return () => trigger.kill();
  }, [squarePriorities]);

  return (
    <div className="relative w-full bg-background -mt-1">
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      <div
        ref={gridRef}
        className="grid w-full relative z-0"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: "2px",
          padding: "2px"
        }}
      >
        {Array.from({ length: ROWS * COLS }, (_, i) => (
          <div
            key={i}
            className="sq aspect-square bg-white/[0.03] rounded-sm opacity-0 shadow-[0_0_10px_rgba(255,255,255,0.01)] transition-opacity duration-500"
          />
        ))}
      </div>
    </div>
  );
}
