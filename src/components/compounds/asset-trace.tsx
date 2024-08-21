import { useMemo } from 'react';
import { Line } from 'react-konva';
import { useAtom } from 'jotai';
import { usePositionComputings } from '@/hooks/use-position-computings';
import { useTraceSmooth } from '@/hooks/use-trace-smooth';
import { simulationTimestampAtom } from '@/lib/state';
import { getPathInterpolator, getTimestampIndex } from '@/lib/trace';
import { TraceItem } from '@/types/common';

const POINTS_IN_TRACE = 100;

export function AssetTrace({
  traces,
  traceDuration = 2_500,
  color,
}: {
  traces: TraceItem[];
  traceDuration?: number;
  color: [number, number, number];
}) {
  const [timestamp] = useAtom(simulationTimestampAtom);
  const { fractionToScaled } = usePositionComputings();
  const { smoothTrace } = useTraceSmooth();

  const pathInterpolator = useMemo(() => getPathInterpolator(traces, smoothTrace), [smoothTrace, traces]);

  const segmentLength = traceDuration / (POINTS_IN_TRACE - 1);
  const points = [...Array(POINTS_IN_TRACE).keys()].flatMap((index) => {
    const pointTimestamp = timestamp - traceDuration + segmentLength * index;
    const pointIndex = getTimestampIndex(traces, pointTimestamp);

    return fractionToScaled(pathInterpolator(pointIndex));
  });

  const groupedPoints = points.reduce(
    (result, item, index) => {
      if (index === 0) {
        return [[[item.x, item.y]]];
      }

      const lastResult = result.at(-1)!;
      const updatedResult = [...result.slice(0, -1), [lastResult[0], [item.x, item.y]]];

      if (index % 2 !== 0) {
        updatedResult.push([[item.x, item.y]]);
      }

      return updatedResult;
    },
    [] as number[][][]
  );

  return (
    <>
      {groupedPoints.map((value, index, array) => {
        const firstElement = value[0];
        const lastElement = value[1] || value[0];

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        const gradient = ctx.createLinearGradient(firstElement[0], lastElement[0], firstElement[1], lastElement[1]);
        gradient.addColorStop(
          0.0,
          `rgba(${color.join(', ')}, ${1 - (array.length - index - 1) / groupedPoints.length})`
        );
        gradient.addColorStop(
          1.0,
          `rgba(${color.join(', ')}, ${1 - (array.length - index - 2) / groupedPoints.length})`
        );

        return <Line key={index} strokeWidth={3} stroke={gradient} points={value.flat()} />;
      })}
    </>
  );
}
