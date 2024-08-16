import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
import mapSource from "@/assets/map.svg";
import { getScaledImage } from "@/lib/image-ratio";
import { useAtom } from "jotai";
import { backgroundSizeAtom, stageSizeAtom } from "@/lib/state";

export function PlayerStage({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [backgroundImage] = useImage(mapSource);
  const [playerSize, setPlayerSize] = useAtom(stageSizeAtom);
  const [, setBackgroundSize] = useAtom(backgroundSizeAtom);

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

  return (
    <div className="flex-1 bg-muted/40" ref={wrapperRef}>
      {playerSize && (
        <Stage width={playerSize.width} height={playerSize.height}>
          <Layer>
            <Image
              x={(playerSize.width - backgroundSize.width) / 2}
              y={(playerSize.height - backgroundSize.height) / 2}
              width={backgroundSize.width}
              height={backgroundSize.height}
              image={backgroundImage}
            />

            {children}
          </Layer>
        </Stage>
      )}
    </div>
  );
}
