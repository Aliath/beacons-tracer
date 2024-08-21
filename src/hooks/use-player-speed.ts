import { useAtom } from 'jotai';
import { SPEED_LEVELS } from '@/constants/player';
import { playerSpeedAtom } from '@/lib/state';

export const usePlayerSpeed = () => {
  const [playerSpeed, setPlayerSpeed] = useAtom(playerSpeedAtom);

  const onSpeedChange = (value: number) => {
    // place for side effects

    setPlayerSpeed(value as (typeof SPEED_LEVELS)[number]);
  };

  return { playerSpeed, onSpeedChange };
};
