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
import { groupBy } from '@/lib/common';

export function SnapshotSelector() {
  const { currentPath, onPathChange } = useCurrentSnapshot();
  const { snapshotOptions } = useAvailableSnapshots({
    onSnapshotsReady: ([{ path }]) => {
      onPathChange(path);
    },
  });

  const selectedOption = snapshotOptions.find(({ value }) => value === currentPath);

  const optionsByGroup = groupBy(snapshotOptions, ({ group }) => group);

  return (
    <div className="p-4">
      <Select value={currentPath ?? undefined} onValueChange={onPathChange}>
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
