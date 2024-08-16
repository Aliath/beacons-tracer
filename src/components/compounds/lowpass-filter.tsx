import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { useId, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function LowpassFilter() {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="p-4">
      <Collapsible open={open}>
        <div className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={open}
            onCheckedChange={(state) => setOpen(!!state)}
            id={id}
          />
          <Label className="cursor-pointer" htmlFor={id}>
            Activate Low-Pass Filter
          </Label>
        </div>
        <CollapsibleContent>
          {[
            { label: "Buffer Size", value: "bufferSize" },
            { label: "Iterations", value: "iterations" },
          ].map(({ label, value }) => (
            <div className="pl-6 pt-2 text-sm flex flex-col gap-1" key={label}>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground/60 min-w-[60px]">
                  {label}:
                </span>
                <Slider min={0} max={10} />
                <span className="inline-block min-w-2 text-right">2</span>
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
