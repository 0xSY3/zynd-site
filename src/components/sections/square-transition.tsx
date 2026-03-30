"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLS = 30;
const ROWS = 10;

export function SquareTransition() {
  const gridRef = useRef<HTMLDivElement>(null);

  const squarePriorities = useMemo(() => {
    return Array.from({ length: ROWS * COLS }, (_, i) => {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const distanceFromBottom = ROWS - 1 - row;
      const basePriority = distanceFromBottom * 50;
      const randomFactor = Math.random() * 300;
      const waveEffect = Math.sin(col * 0.3) * 30;
      return { index: i, priority: basePriority + randomFactor + waveEffect };
    }).sort((a, b) => a.priority - b.priority);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const squares = grid.querySelectorAll<HTMLDivElement>(".sq");
    const sorted = squarePriorities.map((d) => squares[d.index]);

    const trigger = ScrollTrigger.create({
      trigger: grid,
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate(self) {
        const visible = Math.floor(sorted.length * self.progress);
        sorted.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            opacity: i < visible ? 1 : 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      },
    });

    return () => trigger.kill();
  }, [squarePriorities]);

  return (
    <div className="relative w-full bg-background">
      <div
        ref={gridRef}
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: ROWS * COLS }, (_, i) => (
          <div
            key={i}
            className="sq aspect-square bg-white opacity-0"
          />
        ))}
      </div>
    </div>
  );
}
