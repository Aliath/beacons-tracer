import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import { useAtom } from 'jotai';
import useImage from 'use-image';
import mapSource from '@/assets/map.svg';
import { usePositionComputings } from '@/hooks/use-position-computings';
import { getScaledImage } from '@/lib/image-ratio';
import { backgroundSizeAtom, stageSizeAtom } from '@/lib/state';

const SAMPLE_RECORDS: { x: number; y: number; timestamp: number }[] = [];

export function PlayerStage({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [backgroundImage] = useImage(mapSource);
  const [playerSize, setPlayerSize] = useAtom(stageSizeAtom);
  const [, setBackgroundSize] = useAtom(backgroundSizeAtom);
  const { scaledToFraction } = usePositionComputings();

  useLayoutEffect(() => {
    const targetElement = wrapperRef.current!;

    const resizeObserver = new ResizeObserver(() => {
      setPlayerSize({
        width: targetElement.clientWidth,
        height: targetElement.clientHeight,
      });
    });

    resizeObserver.observe(targetElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setPlayerSize]);

  const backgroundSize = useMemo(
    () =>
      backgroundImage
        ? getScaledImage(playerSize, {
            width: backgroundImage.naturalWidth,
            height: backgroundImage.naturalHeight,
          })
        : { width: 0, height: 0 },
    [backgroundImage, playerSize]
  );

  //   i'm so sorry, useImage hook doesn't come up with any handler so I need to do that :(
  useEffect(() => {
    setBackgroundSize(backgroundSize);
  }, [backgroundSize, setBackgroundSize]);

  const shiftX = (playerSize.width - backgroundSize.width) / 2;
  const shiftY = (playerSize.height - backgroundSize.height) / 2;

  return (
    <div className="flex-1 bg-muted/40" ref={wrapperRef}>
      {playerSize && (
        <Stage
          width={playerSize.width}
          height={playerSize.height}
          onClick={(event) => {
            console.log(
              scaledToFraction({
                x: event.evt.offsetX - shiftX,
                y: event.evt.offsetY - shiftY,
              })
            );

            SAMPLE_RECORDS.push({
              ...scaledToFraction({
                x: event.evt.offsetX - shiftX,
                y: event.evt.offsetY - shiftY,
              }),
              timestamp: performance.now(),
            });

            // @ts-expect-error This is  temporary trick, won't stay forever.
            window['SAMPLE_RECORDS'] = SAMPLE_RECORDS;
          }}
        >
          <Layer x={shiftX} y={shiftY}>
            <Image width={backgroundSize.width} height={backgroundSize.height} image={backgroundImage} />

            {children}
          </Layer>
        </Stage>
      )}
    </div>
  );
}
