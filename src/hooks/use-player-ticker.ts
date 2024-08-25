import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { useCurrentSnapshot } from './use-current-snapshot';
import { usePlayerControls } from './use-player-controls';
import { usePlayerSpeed } from './use-player-speed';
import { getSnapshotTimespan } from '@/lib/snapshot';
import { simulationTimestampAtom } from '@/lib/state';

export const usePlayerTicker = () => {
  const [, setTimestamp] = useAtom(simulationTimestampAtom);
  const previousTick = useRef(performance.now());
  const { playerSpeed } = usePlayerSpeed();
  const { playerState, pause } = usePlayerControls();
  const { currentSnapshot } = useCurrentSnapshot();
  const { min, max } = getSnapshotTimespan(currentSnapshot);

  useEffect(() => {
    if (!currentSnapshot) {
      return;
    }

    let animationFrame: number;

    const render = (tick: number) => {
      animationFrame = requestAnimationFrame(render);

      const tickDifference = tick - previousTick.current;
      previousTick.current = tick;

      if (playerState === 'playing') {
        setTimestamp((currentTimestamp) => {
          const nextResult = Math.max(min, Math.min(max, currentTimestamp + tickDifference * playerSpeed));

          if (nextResult >= max) {
            pause();
          }

          return nextResult;
        });
      }
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [currentSnapshot, max, min, pause, playerSpeed, playerState, setTimestamp]);
};
