import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAvailableSnapshots } from '@/hooks/use-available-snapshots';
import { useCurrentSnapshot } from '@/hooks/use-current-snapshot';
import { usePlayerControls } from '@/hooks/use-player-controls';
import { usePlayerTime } from '@/hooks/use-player-time';
import { groupBy } from '@/lib/common';
import { getSnapshotTimespan } from '@/lib/snapshot';
import { TraceItem } from '@/types/common';

export function SnapshotSelector() {
  const { currentPath, setCurrentPath } = useCurrentSnapshot();
  const { play } = usePlayerControls();
  const { onSimulationTimeChange } = usePlayerTime();

  const selectSnapshot = ({ path, data }: { data: Record<string, TraceItem[]>; path: string }) => {
    const { min } = getSnapshotTimespan(data);

    setCurrentPath(path);
    onSimulationTimeChange(min);
    play();
  };

  const { snapshotOptions, snapshotsByPath } = useAvailableSnapshots({
    onSnapshotsReady: ([snapshot]) => {
      selectSnapshot(snapshot);
    },
  });

  const selectedOption = snapshotOptions.find(({ value }) => value === currentPath);

  const optionsByGroup = groupBy(snapshotOptions, ({ group }) => group);

  return (
    <div className="p-4">
      <Select
        value={currentPath ?? undefined}
        onValueChange={(newPath) => {
          const newSnapshot = snapshotsByPath[newPath];
          selectSnapshot(newSnapshot);
        }}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground/60">Snapshot:</span>
                N/A
              </div>
            }
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground/60">Snapshot:</span>
              {selectedOption?.label}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[calc(100%-2px)]">
          {Object.entries(optionsByGroup).map(([group, options]) => (
            <SelectGroup key={group}>
              <SelectLabel className="font-bold">{group}</SelectLabel>
              {options.map(({ label, value }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
