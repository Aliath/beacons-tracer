import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const SPEED_LEVELS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

export function PlayerSpeed() {
  const [value, setValue] = useState(Math.floor(SPEED_LEVELS.length / 2));

  return (
    <div className="p-4 flex items-center gap-4 text-sm">
      <span className="text-muted-foreground/60">Speed:</span>
      <Slider
        min={0}
        max={SPEED_LEVELS.length - 1}
        step={1}
        value={[value]}
        onValueChange={([value]) => setValue(value)}
      />
      <span className="inline-block min-w-8 text-right">
        {SPEED_LEVELS[value]}x
      </span>
    </div>
  );
}
