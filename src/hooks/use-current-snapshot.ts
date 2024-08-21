import { useAtom } from 'jotai';
import { currentSnapshotPathAtom } from '@/lib/state';

export const useCurrentSnapshot = () => {
  const [currentPath, setCurrentPath] = useAtom(currentSnapshotPathAtom);

  const onPathChange = (path: string) => {
    // place for side effects

    setCurrentPath(path);
  };

  return { currentPath, onPathChange };
};
