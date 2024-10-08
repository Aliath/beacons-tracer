import { useMemo, useRef } from 'react';
import { Circle, Group, Image, Label, Tag, Text } from 'react-konva';
import { useAtom } from 'jotai';
import useImage from 'use-image';
import { usePositionComputings } from '@/hooks/use-position-computings';
import { useTraceSmooth } from '@/hooks/use-trace-smooth';
import { getAssetByIcon } from '@/lib/image-assets';
import { getScaledImage } from '@/lib/image-ratio';
import { simulationTimestampAtom } from '@/lib/state';
import { getPathInterpolator, getTimestampIndex } from '@/lib/trace';
import { AssetIcon, TraceItem } from '@/lib/validate-snapshot';

const BIG_RADIUS = 20;
const PADDING = 8;
const MAX_SIZE = BIG_RADIUS * 2 - 2 * PADDING;
const DEFAULT_ICON = 'person-01';

export function PlayerAsset({
  traces,
  color,
  name,
  icon = DEFAULT_ICON,
}: {
  traces: TraceItem[];
  color: [number, number, number];
  name: string;
  icon?: AssetIcon;
}) {
  const { fractionToScaled } = usePositionComputings();
  const [iconImage] = useImage(getAssetByIcon(icon));
  const [timestamp] = useAtom(simulationTimestampAtom);
  const { smoothTrace } = useTraceSmooth();

  const pathInterpolator = useMemo(() => getPathInterpolator(traces, smoothTrace), [smoothTrace, traces]);
  const index = getTimestampIndex(traces, timestamp);
  const position = pathInterpolator(index);

  const lastPosition = useRef(position);
  const rotation = Math.atan2(position.y - lastPosition.current.y, position.x - lastPosition.current.x) - Math.PI / 2;
  lastPosition.current = position;

  const assetColorRGB = `rgb(${color.join(', ')})`;

  const imageSize = getScaledImage(
    { width: MAX_SIZE, height: MAX_SIZE },
    { width: iconImage?.width || 0, height: iconImage?.height || 0 }
  );

  return (
    <Group {...fractionToScaled(position)}>
      <Circle radius={BIG_RADIUS} x={0} y={0} fill="#fff" stroke={assetColorRGB} strokeWidth={2} />
      <Label x={BIG_RADIUS / 2} y={BIG_RADIUS * (2 - Math.sqrt(2)) - 2}>
        <Tag fill={assetColorRGB} cornerRadius={4} />
        <Text text={name} fill="#fff" padding={4} fontSize={12} fontStyle="500" fontFamily="Inter" />
      </Label>

      <Group rotation={rotation * (180 / Math.PI)}>
        <Image
          x={-BIG_RADIUS + (MAX_SIZE - imageSize.width) / 2 + PADDING}
          y={-BIG_RADIUS + (MAX_SIZE - imageSize.height) / 2 + PADDING}
          image={iconImage}
          {...imageSize}
        />
      </Group>
    </Group>
  );
}
