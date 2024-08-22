import { useRef } from 'react';
import { format } from 'date-fns/format';
import { PlayerSpeed } from './player-speed';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useCurrentSnapshot } from '@/hooks/use-current-snapshot';
import { usePlayerControls } from '@/hooks/use-player-controls';
import { usePlayerTime } from '@/hooks/use-player-time';
import { getSnapshotTimespan } from '@/lib/snapshot';
import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';

const TIME_FORMAT = 'h:mm:ss aaa';

export function PlayerTrack() {
  const { playerState, toggle, pause, play } = usePlayerControls();
  const { simulationTime, onSimulationTimeChange } = usePlayerTime();
  const { currentSnapshot } = useCurrentSnapshot();
  const stateToRestore = useRef(playerState);

  const snapshotTimestamp = getSnapshotTimespan(currentSnapshot?.data || {});

  const min = snapshotTimestamp.min;
  const max = snapshotTimestamp.max;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Slider
        withThumb={false}
        rounded={false}
        trackClassName="h-3"
        min={min}
        max={max}
        value={[simulationTime]}
        step={1}
        onValueChange={([value]) => onSimulationTimeChange(value)}
        onPointerDown={() => {
          stateToRestore.current = playerState;
          pause();
        }}
        onPointerUp={() => {
          if (stateToRestore.current === 'playing') {
            play();
          }
        }}
      />

      <div className="flex items-center gap-4">
        <Button onClick={toggle} className="w-10 h-10 p-0" variant="ghost">
          {playerState === 'playing' ? <PauseIcon className="w-3/4 h-3/4" /> : <PlayIcon className="w-3/4 h-3/4" />}
        </Button>
        <div>
          {min === 0 || max === 0
            ? '--:--:-- -- / --:--:-- --'
            : `${format(simulationTime, TIME_FORMAT)} / ${format(max || Date.now(), TIME_FORMAT)}`}
        </div>
        <div className="ml-auto">
          <PlayerSpeed />
        </div>
      </div>
    </div>
  );
}
