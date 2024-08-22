import { Slider } from '@/components/ui/slider';
import { useTraceDuration } from '@/hooks/use-trace-duration';

export function TraceDuration() {
  const { traceDuration, onDurationChange } = useTraceDuration();

  return (
    <div className="p-4 flex items-center gap-4 text-sm">
      <span className="text-muted-foreground/60 min-w-max">Trace Duration:</span>
      <Slider
        min={0}
        max={15_000}
        step={100}
        value={[traceDuration]}
        onValueChange={([value]) => onDurationChange(value)}
      />
      <span className="inline-block min-w-8 text-right">{traceDuration / 1000}s</span>
    </div>
  );
}
