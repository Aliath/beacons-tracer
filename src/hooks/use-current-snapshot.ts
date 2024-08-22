import { useAtom } from 'jotai';
import { useAvailableSnapshots } from './use-available-snapshots';
import { currentSnapshotPathAtom } from '@/lib/state';

export const useCurrentSnapshot = () => {
  const [currentPath, setCurrentPath] = useAtom(currentSnapshotPathAtom);
  const { snapshotsByPath } = useAvailableSnapshots();

  const currentSnapshot = snapshotsByPath[currentPath || ''] as (typeof snapshotsByPath)[string] | undefined;

  return { currentPath, setCurrentPath, currentSnapshot };
};
