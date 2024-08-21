import { useAtom } from 'jotai';
import { smoothTraceAtom } from '@/lib/state';

export const useTraceSmooth = () => {
  const [smoothTrace, setSmoothTrace] = useAtom(smoothTraceAtom);

  const onSmoothChange = (value: boolean) => {
    // place for side effects

    setSmoothTrace(value);
  };

  return { smoothTrace, onSmoothChange };
};
