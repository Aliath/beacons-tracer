import { useState } from 'react';
import { useRunOnce } from '@/hooks/use-run-once';

const SEGMENTS = 250;
const TIME_TO_REVEAL_IN_MS = 500;

export function Intro() {
  const [revealedSegments, setRevealedSegments] = useState(0);

  useRunOnce(() => {
    const start = performance.now();
    let frameId: number;

    const render = (time: number) => {
      const timeDelta = time - start;
      const fraction = Math.min(1, timeDelta / TIME_TO_REVEAL_IN_MS);
      const newSegmentsValue = fraction * SEGMENTS;
      const animationFinished = newSegmentsValue >= SEGMENTS;

      setRevealedSegments(newSegmentsValue);

      if (animationFinished) {
        // set intro loader to 1
      } else {
        frameId = requestAnimationFrame(render);
      }
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
    };
  });

  return (
    <div className="fixed inset-0 bg-accent flex flex-col gap-4 items-center justify-center">
      <svg viewBox="0 0 90 70" width="20vw">
        <path
          fill="none"
          stroke="#dedede"
          d="M15,10H70A10,10 0 0 1 70,35H20A10,10 0 0 0 20,60H80"
          strokeLinecap="round"
          strokeWidth={1.5}
        />
        <path
          fill="none"
          stroke="#505050"
          d="M15,10H70A10,10 0 0 1 70,35H20A10,10 0 0 0 20,60H80"
          strokeLinecap="round"
          strokeWidth={1.5}
          strokeDasharray={SEGMENTS}
          strokeDashoffset={SEGMENTS - revealedSegments}
        />
        <circle
          fill={revealedSegments + 10 < SEGMENTS ? '#dedede' : '#505050'}
          r={(revealedSegments / SEGMENTS) * 3}
          cx={80}
          cy={60}
        />
      </svg>
      <h2 className="font-light text-4xl">Beacons Tracer</h2>
    </div>
  );
}
