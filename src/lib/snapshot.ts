import { TraceItem } from '@/types/common';

export const getSnapshotTimespan = (snapshot: Record<string, TraceItem[]>) => {
  const objectsToIterateOver = Object.values(snapshot);

  if (objectsToIterateOver.length === 0) {
    return { min: 0, max: 0 };
  }

  const snapshotTimestamps = objectsToIterateOver.flatMap((assetTrace) =>
    assetTrace.map((traceItem) => traceItem.timestamp)
  );

  return {
    min: Math.min(...snapshotTimestamps),
    max: Math.max(...snapshotTimestamps),
  };
};
