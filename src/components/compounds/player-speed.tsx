import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SPEED_LEVELS } from '@/constants/player';
import { usePlayerSpeed } from '@/hooks/use-player-speed';

export function PlayerSpeed() {
  const { playerSpeed, onSpeedChange } = usePlayerSpeed();

  return (
    <Select value={playerSpeed ? `${playerSpeed}` : undefined} onValueChange={(value) => onSpeedChange(+value)}>
      <SelectTrigger>
        <SelectValue>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground/60">Speed:</span>
            <div className="text-right w-10">{playerSpeed}x</div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[calc(100%-2px)]">
        {SPEED_LEVELS.map((level) => (
          <SelectItem value={String(level)} key={level}>
            {level}x
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
