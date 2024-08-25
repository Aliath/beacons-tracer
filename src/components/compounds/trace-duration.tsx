import { Slider } from '@/components/ui/slider';
import { useCurrentSnapshot } from '@/hooks/use-current-snapshot';
import { useTraceDuration } from '@/hooks/use-trace-duration';
import { getSnapshotTimespan } from '@/lib/snapshot';

const MIN_TRACE_DURATION = 0;

export function TraceDuration() {
  const { traceDuration, onDurationChange } = useTraceDuration();
  const { currentSnapshot } = useCurrentSnapshot();

  const { min, max } = getSnapshotTimespan(currentSnapshot);
  const maxTraceDuration = (Math.round(((max - min) / 1_000) * 10) / 10) * 1_000;

  return (
    <div className="p-4 flex items-center gap-4 text-sm">
      <span className="text-muted-foreground/60 min-w-max">Trace Duration:</span>
      <Slider
        min={MIN_TRACE_DURATION}
        max={maxTraceDuration}
        step={100}
        value={[traceDuration]}
        onValueChange={([value]) => onDurationChange(value)}
      />
      <span className="inline-block min-w-8 text-right">{Math.round(traceDuration * 10) / (1_000 * 10)}s</span>
    </div>
  );
}
