import { backgroundSizeAtom, stageSizeAtom } from "@/lib/state";
import { useAtom } from "jotai";

export const usePositionComputings = () => {
  const [size] = useAtom(stageSizeAtom);
  const [backgroundSize] = useAtom(backgroundSizeAtom);

  const [xShift, yShift] = [
    (size.width - backgroundSize.width) / 2,
    (size.height - backgroundSize.height) / 2,
  ];

  const fractionToScaled = ({
    x: fractionX,
    y: fractionY,
  }: {
    x: number;
    y: number;
  }) => ({
    x: xShift + fractionX * backgroundSize.width,
    y: yShift + fractionY * backgroundSize.height,
  });

  const scaledToFraction = ({
    x: scaledX,
    y: scaledY,
  }: {
    x: number;
    y: number;
  }) => ({
    x: scaledX / backgroundSize.width - xShift,
    y: scaledY / backgroundSize.height - yShift,
  });

  return { fractionToScaled, scaledToFraction };
};
