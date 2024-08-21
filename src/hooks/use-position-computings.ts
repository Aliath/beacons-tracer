import { useAtom } from 'jotai';
import { backgroundSizeAtom } from '@/lib/state';

export const usePositionComputings = () => {
  const [backgroundSize] = useAtom(backgroundSizeAtom);

  const fractionToScaled = ({ x: fractionX, y: fractionY }: { x: number; y: number }) => ({
    x: fractionX * backgroundSize.width,
    y: fractionY * backgroundSize.height,
  });

  const scaledToFraction = ({ x: scaledX, y: scaledY }: { x: number; y: number }) => ({
    x: scaledX / backgroundSize.width,
    y: scaledY / backgroundSize.height,
  });

  return { fractionToScaled, scaledToFraction };
};
