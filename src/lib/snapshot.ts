import { Snapshot } from './validate-snapshot';

export const getSnapshotTimespan = (snapshot?: Snapshot) => {
  if (!snapshot) {
    return { min: 0, max: 0 };
  }

  const objectsToIterateOver = Object.values(snapshot.assets);

  if (objectsToIterateOver.length === 0) {
    return { min: 0, max: 0 };
  }

  const snapshotTimestamps = objectsToIterateOver.flatMap((assetTrace) =>
    assetTrace.traces.map(({ timestamp }) => timestamp)
  );

  return {
    min: Math.min(...snapshotTimestamps),
    max: Math.max(...snapshotTimestamps),
  };
};
