import { useAtom } from 'jotai';
import { simulationTimestampAtom } from '@/lib/state';

export const usePlayerTime = () => {
  const [simulationTime, setSimulationTime] = useAtom(simulationTimestampAtom);

  const onSimulationTimeChange = (value: number) => {
    setSimulationTime(value);
  };

  return { simulationTime, onSimulationTimeChange };
};
