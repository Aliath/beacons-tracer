import { useMemo, useRef } from 'react';
import { Circle, Group, Image } from 'react-konva';
import { useAtom } from 'jotai';
import useImage from 'use-image';
import { AssetTrace } from './asset-trace';
import assetIcon from '@/assets/person.svg';
import { usePositionComputings } from '@/hooks/use-position-computings';
import { getRandomColor } from '@/lib/common';
import { getScaledImage } from '@/lib/image-ratio';
import { simulationTimestamp } from '@/lib/state';
import { getPathInterpolator, getTimestampIndex } from '@/lib/trace';
import { TraceItem } from '@/types/common';

const BIG_RADIUS = 20;
const PADDING = 8;
const MAX_SIZE = BIG_RADIUS * 2 - 2 * PADDING;

export function PlayerAsset({ traces }: { traces: TraceItem[] }) {
  const { fractionToScaled } = usePositionComputings();
  const [icon] = useImage(assetIcon);
  const [timestamp] = useAtom(simulationTimestamp);
  const color = useMemo(() => getRandomColor(), []);

  const pathInterpolator = useMemo(() => getPathInterpolator(traces, true), [traces]);
  const index = getTimestampIndex(traces, timestamp);
  const position = pathInterpolator(index);

  const lastPosition = useRef(position);
  const rotation = Math.atan2(position.y - lastPosition.current.y, position.x - lastPosition.current.x) - Math.PI / 2;
  lastPosition.current = position;

  const imageSize = getScaledImage(
    { width: MAX_SIZE, height: MAX_SIZE },
    { width: icon?.width || 0, height: icon?.height || 0 }
  );

  return (
    <>
      <AssetTrace traces={traces} color={color} />
      <Group {...fractionToScaled(position)}>
        <Circle radius={BIG_RADIUS} x={0} y={0} fill="#ffffff" stroke={`rgb(${color.join(',')})`} strokeWidth={2} />

        <Group rotation={rotation * (180 / Math.PI)}>
          <Image
            x={-BIG_RADIUS + (MAX_SIZE - imageSize.width) / 2 + PADDING}
            y={-BIG_RADIUS + (MAX_SIZE - imageSize.height) / 2 + PADDING}
            image={icon}
            {...imageSize}
          />
        </Group>
      </Group>
    </>
  );
}
