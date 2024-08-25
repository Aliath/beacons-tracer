import { Fragment } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAvailableSnapshots } from '@/hooks/use-available-snapshots';
import { useCurrentSnapshot } from '@/hooks/use-current-snapshot';
import { usePlayerControls } from '@/hooks/use-player-controls';
import { usePlayerTime } from '@/hooks/use-player-time';
import { groupBy } from '@/lib/common';
import { getSnapshotTimespan } from '@/lib/snapshot';
import { QuestionMarkIcon } from '@radix-ui/react-icons';

export function SnapshotSelector() {
  const { currentName, setCurrentName } = useCurrentSnapshot();
  const { play } = usePlayerControls();
  const { onSimulationTimeChange } = usePlayerTime();
  const { snapshotOptions, snapshotsByName } = useAvailableSnapshots();

  const selectSnapshot = (name: string) => {
    const snapshot = snapshotsByName[name];
    const { min } = getSnapshotTimespan(snapshot);

    setCurrentName(name);
    onSimulationTimeChange(min);
    play();
  };

  const selectedOption = snapshotOptions.find(({ value }) => value === currentName);

  const optionsByGroup = groupBy(snapshotOptions, ({ group }) => group || '');

  return (
    <div className="p-4 flex gap-4 items-center">
      <Select value={currentName ?? undefined} onValueChange={selectSnapshot}>
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
          {Object.entries(optionsByGroup).map(([group, options]) => {
            const labelNode = (
              <>
                {group && <SelectLabel className="font-bold">{group}</SelectLabel>}
                {options.map(({ label, value }) => (
                  <SelectItem value={value} key={value}>
                    {label}
                  </SelectItem>
                ))}
              </>
            );

            return <Fragment key={group}>{group ? <SelectGroup>{labelNode}</SelectGroup> : labelNode}</Fragment>;
          })}
        </SelectContent>
      </Select>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger className="cursor-default">
            <div className="w-6 h-6 rounded-full flex items-center justify-center border border-foreground">
              <QuestionMarkIcon className="text-foreground w-[60%] h-[60%]" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm max-w-80 p-1">
              A snapshot contains data about multiple assets within a single location.
              <br />
              <br />
              Each asset includes an array of records that represent the asset's coordinates and the timestamp when it
              was at that location.
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
