import { useAtom } from 'jotai';
import { useRunOnce } from './use-run-once';
import { simulationTimestampAtom } from '@/lib/state';

export const usePlayerTicker = () => {
  const [, setTimestamp] = useAtom(simulationTimestampAtom);

  useRunOnce(() => {
    let animationFrame: number;

    const render = (tick: number) => {
      animationFrame = requestAnimationFrame(render);

      setTimestamp(tick);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  });
};
