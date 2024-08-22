import { useId, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export function LowpassFilter() {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="p-4 relative">
      <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-foreground text-background rounded-full py-1 px-3 text-sm">
        SOON
      </div>
      <div className="opacity-25 pointer-events-none select-none">
        <Collapsible open={open}>
          <div className="flex items-center gap-2 text-sm">
            <Checkbox checked={open} onCheckedChange={(state) => setOpen(!!state)} id={id} />
            <Label className="cursor-pointer" htmlFor={id}>
              Activate Low-Pass Filter
            </Label>
          </div>
          <CollapsibleContent>
            {[
              { label: 'Buffer Size', value: 'bufferSize' },
              { label: 'Iterations', value: 'iterations' },
            ].map(({ label }) => (
              <div className="pl-6 pt-4 text-sm flex flex-col gap-1" key={label}>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground/60 min-w-[60px]">{label}:</span>
                  <Slider min={0} max={10} />
                  <span className="inline-block min-w-2 text-right">2</span>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
