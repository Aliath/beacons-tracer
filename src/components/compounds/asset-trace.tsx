import { useMemo } from 'react';
import { Line } from 'react-konva';
import { useAtom } from 'jotai';
import { usePositionComputings } from '@/hooks/use-position-computings';
import { useTraceDuration } from '@/hooks/use-trace-duration';
import { useTraceSmooth } from '@/hooks/use-trace-smooth';
import { simulationTimestampAtom } from '@/lib/state';
import { getPathInterpolator, getTimestampIndex } from '@/lib/trace';
import { TraceItem } from '@/lib/validate-snapshot';

const POINTS_PER_SECOND = 20;

export function AssetTrace({ traces, color }: { traces: TraceItem[]; color: [number, number, number] }) {
  const [timestamp] = useAtom(simulationTimestampAtom);
  const { fractionToScaled } = usePositionComputings();
  const { smoothTrace } = useTraceSmooth();
  const { traceDuration } = useTraceDuration();

  const pathInterpolator = useMemo(() => getPathInterpolator(traces, smoothTrace), [smoothTrace, traces]);
  const getAssetColorRGB = (opacity: number) => `rgba(${[...color, opacity].join(', ')})`;

  const pointsInTrace = Math.floor((traceDuration / 1000) * POINTS_PER_SECOND);
  const segmentLength = traceDuration / (pointsInTrace - 1);
  const points = [...Array(pointsInTrace).keys()].flatMap((index) => {
    const pointTimestamp = timestamp - traceDuration + segmentLength * index;
    const pointIndex = getTimestampIndex(traces, pointTimestamp);

    return fractionToScaled(pathInterpolator(pointIndex));
  });

  const groupedPoints = points.reduce<number[][][]>((result, item, index) => {
    if (index === 0) {
      return [[[item.x, item.y]]];
    }

    const lastResult = result.at(-1)!;
    const updatedResult = [...result.slice(0, -1), [lastResult[0], [item.x, item.y]]];

    if (index % 2 !== 0) {
      updatedResult.push([[item.x, item.y]]);
    }

    return updatedResult;
  }, []);

  return (
    <>
      {groupedPoints.map((value, index, array) => {
        const firstElement = value[0];
        const lastElement = value[1] || value[0];

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        const gradient = ctx.createLinearGradient(firstElement[0], lastElement[0], firstElement[1], lastElement[1]);
        const gradientStartColor = getAssetColorRGB(1 - (array.length - index - 1) / groupedPoints.length);
        const gradientEndColor = getAssetColorRGB(1 - (array.length - index - 2) / groupedPoints.length);

        gradient.addColorStop(0, gradientStartColor);
        gradient.addColorStop(1, gradientEndColor);

        return <Line key={index} strokeWidth={3} stroke={gradient} points={value.flat()} />;
      })}
    </>
  );
}
