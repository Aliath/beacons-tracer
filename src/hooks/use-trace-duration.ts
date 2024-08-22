import { useAtom } from 'jotai';
import { traceDurationAtom } from '@/lib/state';

export const useTraceDuration = () => {
  const [traceDuration, setTraceDuration] = useAtom(traceDurationAtom);

  const onDurationChange = (duration: number) => {
    setTraceDuration(duration);
  };

  return { traceDuration, onDurationChange };
};
