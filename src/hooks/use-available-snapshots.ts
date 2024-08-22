import { format } from 'date-fns/format';
import { useAtom } from 'jotai';
import { useRunOnce } from './use-run-once';
import { getDateFromPath } from '@/lib/common';
import { getAvailableSnapshots } from '@/lib/get-available-snapshots';
import { snapshotsQueryAtom } from '@/lib/state';

export const useAvailableSnapshots = ({
  onSnapshotsReady,
}: {
  onSnapshotsReady?: (snapshots: Awaited<ReturnType<typeof getAvailableSnapshots>>) => void;
} = {}) => {
  const [snapshotsQuery, setSnapshotsQuery] = useAtom(snapshotsQueryAtom);
  const snapshotsData = snapshotsQuery.initialized ? snapshotsQuery.snapshots : [];

  useRunOnce(() => {
    const timerId = setTimeout(async () => {
      setSnapshotsQuery({ initialized: true, snapshots: [] });

      const snapshots = await getAvailableSnapshots();
      setSnapshotsQuery({ initialized: true, snapshots });
    });

    return () => {
      clearTimeout(timerId);
    };
  }, !snapshotsQuery.initialized);

  useRunOnce(() => {
    onSnapshotsReady?.(snapshotsData);
  }, snapshotsData.length > 0);

  const snapshotOptions = snapshotsData.map(({ path }) => {
    const snapshotDateString = getDateFromPath(path);

    return {
      label: format(snapshotDateString, 'd MMMM, h:mm aaa'),
      group: format(snapshotDateString, 'd MMMM'),
      value: path,
    };
  });

  const snapshotsByPath = Object.fromEntries(snapshotsData.map((snapshot) => [snapshot.path, snapshot]));

  return { snapshotOptions, snapshotsByPath };
};
