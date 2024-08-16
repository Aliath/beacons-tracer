import { Slider } from "@/components/ui/slider";

import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PlayerTrack() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Slider withThumb={false} rounded={false} trackClassName="h-2" />

      <div className="flex items-center gap-4">
        <Button
          onClick={() => setPlaying((value) => !value)}
          className="w-10 h-10 p-0"
          variant="ghost"
        >
          {playing ? (
            <PauseIcon className="w-3/4 h-3/4" />
          ) : (
            <PlayIcon className="w-3/4 h-3/4" />
          )}
        </Button>
        <div>12:17:00 pm / 12:21:32 pm</div>
      </div>
    </div>
  );
}
