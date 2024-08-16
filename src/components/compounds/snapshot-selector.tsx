import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const options = [
  { label: "August 8, 1:32pm", value: "1", group: "August 8" },
  { label: "August 8, 1:50pm", value: "2", group: "August 8" },
  { label: "August 9, 2:17am", value: "3", group: "August 9" },
];

export function SnapshotSelector() {
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const selectedOption = options.find(({ value }) => value === selectedValue)!;

  const optionsByGroup = options.reduce<
    Record<string, (typeof options)[number][]>
  >((result, item) => {
    if (!(item.group in result)) {
      return { ...result, [item.group]: [item] };
    }

    return { ...result, [item.group]: [...result[item.group], item] };
  }, {});

  return (
    <div className="p-4">
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <SelectTrigger>
          <SelectValue className="test">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground/60">Snapshot:</span>
              {selectedOption.label}
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
