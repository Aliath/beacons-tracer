import { useAtom } from 'jotai';
import { currentSnapshotPathAtom, snapshotsQueryAtom } from '@/lib/state';

export const useCurrentSnapshot = () => {
  const [currentPath, setCurrentPath] = useAtom(currentSnapshotPathAtom);
  const [snapshots] = useAtom(snapshotsQueryAtom);

  const onPathChange = (path: string) => {
    // place for side effects

    setCurrentPath(path);
  };

  const snapshotsData = snapshots.initialized ? snapshots.snapshots : [];
  const currentSnapshot = snapshotsData.find(({ path }) => path === currentPath);

  return { currentPath, currentSnapshot, onPathChange };
};
