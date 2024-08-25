import { useAtom } from 'jotai';
import { availableSnapshotsAtom } from '@/lib/state';

export const useAvailableSnapshots = () => {
  const [availableSnapshots] = useAtom(availableSnapshotsAtom);

  const snapshotOptions = availableSnapshots.map(({ name, group }) => ({ label: name, group: group, value: name }));
  const snapshotsByName = Object.fromEntries(availableSnapshots.map((snapshot) => [snapshot.name, snapshot]));

  return { snapshotOptions, snapshotsByName };
};
