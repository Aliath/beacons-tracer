import { useAtom } from 'jotai';
import { useAvailableSnapshots } from './use-available-snapshots';
import { currentSnapshotNameAtom } from '@/lib/state';
import { Snapshot } from '@/lib/validate-snapshot';

export const useCurrentSnapshot = () => {
  const [currentName, setCurrentName] = useAtom(currentSnapshotNameAtom);
  const { snapshotsByName } = useAvailableSnapshots();

  const currentSnapshot = snapshotsByName[currentName] as Snapshot | undefined;

  return { currentName, setCurrentName, currentSnapshot };
};
