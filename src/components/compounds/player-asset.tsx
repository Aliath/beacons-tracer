import { useEffect, useState } from 'react';
import { Circle, Group, Image } from 'react-konva';
import useImage from 'use-image';
import assetIcon from '@/assets/person.svg';
import { usePositionComputings } from '@/hooks/use-position-computings';
import { getScaledImage } from '@/lib/image-ratio';
import snapshot from '@/snapshots/2024-08-17T12:27:07.444Z.json';

const RADIUS = 20;
const PADDING = 6;

// @ts-expect-error TEMP code
const jsonSample = snapshot['asset-0'];

export function PlayerAsset() {
  const { fractionToScaled } = usePositionComputings();
  const [icon] = useImage(assetIcon);
  const [position, setPosition] = useState<{ x: number; y: number }>(jsonSample[0]);

  useEffect(() => {
    let frameId: number;

    const render = (t: number) => {
      frameId = requestAnimationFrame(render);

      const lastItem = [...jsonSample].reverse().find((item) => item.timestamp <= t) || jsonSample[0];
      setPosition(lastItem);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  const maxSize = RADIUS * 2 - 2 * PADDING;

  const imageSize = getScaledImage(
    {
      width: maxSize,
      height: maxSize,
    },
    {
      width: icon?.width || 0,
      height: icon?.height || 0,
    }
  );

  return (
    <Group {...fractionToScaled(position)}>
      <Circle radius={RADIUS} x={0} y={0} fill="#ffffff" stroke="#e2e8f0" strokeWidth={1} />
      <Image
        x={-RADIUS + (maxSize - imageSize.width) / 2 + PADDING}
        y={-RADIUS + (maxSize - imageSize.height) / 2 + PADDING}
        image={icon}
        {...imageSize}
      />
    </Group>
  );
}
