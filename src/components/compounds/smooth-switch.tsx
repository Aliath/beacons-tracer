import { useId } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useTraceSmooth } from '@/hooks/use-trace-smooth';

export function SmoothSwitch() {
  const id = useId();
  const { smoothTrace, onSmoothChange } = useTraceSmooth();

  return (
    <div className="p-4 flex items-center gap-2 text-sm">
      <Checkbox checked={smoothTrace} onCheckedChange={onSmoothChange} id={id} />
      <Label htmlFor={id}>Enable trace-smoothing</Label>
    </div>
  );
}
