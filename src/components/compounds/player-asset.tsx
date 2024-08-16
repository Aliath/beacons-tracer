import { usePositionComputings } from "@/hooks/use-scaled-position";
import { Circle, Group, Image } from "react-konva";
import useImage from "use-image";
import assetIcon from "@/assets/person.svg";
import { getScaledImage } from "@/lib/image-ratio";

const RADIUS = 20;
const PADDING = 6;

export function PlayerAsset() {
  const { fractionToScaled } = usePositionComputings();
  const [icon] = useImage(assetIcon);

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
    <Group {...fractionToScaled({ x: 0.5, y: 0.5 })}>
      <Circle
        radius={RADIUS}
        x={0}
        y={0}
        fill="#ffffff"
        stroke="#e2e8f0"
        strokeWidth={1}
      />
      <Image
        x={-RADIUS + (maxSize - imageSize.width) / 2 + PADDING}
        y={-RADIUS + (maxSize - imageSize.height) / 2 + PADDING}
        image={icon}
        {...imageSize}
      />
    </Group>
  );
}
