import { useState } from 'react';
import { useAtom } from 'jotai';
import { usePlayerControls } from './use-player-controls';
import { useRunOnce } from './use-run-once';
import { getAvailableSnapshots } from '@/lib/get-available-snapshots';
import { availableSnapshotsAtom, currentSnapshotNameAtom } from '@/lib/state';

const MIN_LOADING_TIME = 500;
const TOTAL_LOADERS = 3;

export const useLoadData = () => {
  const [loadersReady, setLoadersReady] = useState(0);
  const [, setAvailableSnapshots] = useAtom(availableSnapshotsAtom);
  const [currentSnapshotName, setCurrentSnapshotName] = useAtom(currentSnapshotNameAtom);
  const { play } = usePlayerControls();

  useRunOnce(() => {
    const timerId = setTimeout(() => {
      setLoadersReady((value) => value + 1);
    }, MIN_LOADING_TIME);

    return () => {
      clearTimeout(timerId);
    };
  });

  useRunOnce(() => {
    document.fonts.ready.then(() => {
      setLoadersReady((value) => value + 1);
    });
  });

  // load sample snapshots
  useRunOnce(() => {
    getAvailableSnapshots().then((availableSnapshots) => {
      setAvailableSnapshots(availableSnapshots);

      const [firstAvailableSnapshot] = availableSnapshots;

      if (firstAvailableSnapshot) {
        setCurrentSnapshotName(firstAvailableSnapshot.name);
      }

      setLoadersReady((value) => value + 1);
    });
  });

  const ready = loadersReady === TOTAL_LOADERS;

  useRunOnce(() => {
    if (currentSnapshotName) {
      play();
    }
  }, ready);

  return ready;
};
