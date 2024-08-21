import { Slider } from '@/components/ui/slider';
import { SPEED_LEVELS } from '@/constants/player';
import { usePlayerSpeed } from '@/hooks/use-player-speed';

export function PlayerSpeed() {
  const { playerSpeed, onSpeedChange } = usePlayerSpeed();

  return (
    <div className="p-4 flex items-center gap-4 text-sm">
      <span className="text-muted-foreground/60">Speed:</span>
      <Slider
        min={0}
        max={SPEED_LEVELS.length - 1}
        step={1}
        value={[SPEED_LEVELS.indexOf(playerSpeed)]}
        onValueChange={([value]) => onSpeedChange(SPEED_LEVELS[value])}
      />
      <span className="inline-block min-w-8 text-right">{playerSpeed}x</span>
    </div>
  );
}
