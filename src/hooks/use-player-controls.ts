import { useAtom } from 'jotai';
import { playerStateAtom } from '@/lib/state';

export const usePlayerControls = () => {
  const [playerState, setPlayerState] = useAtom(playerStateAtom);

  const play = () => {
    setPlayerState('playing');
  };

  const pause = () => {
    setPlayerState('paused');
  };

  const toggle = () => {
    setPlayerState((state) => (state === 'paused' ? 'playing' : 'paused'));
  };

  return { playerState, play, pause, toggle };
};
