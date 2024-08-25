import { isSnapshotValid, Snapshot } from './validate-snapshot';

export const getAvailableSnapshots = async () => {
  const snapshotMap = import.meta.glob('@/snapshots/*.json');

  return Promise.all(
    Object.entries(snapshotMap).map(async ([path, fetchSnapshot]) => {
      const importedModule = await fetchSnapshot();
      const snapshot = (importedModule as Record<'default', unknown>).default;

      if (!isSnapshotValid(snapshot)) {
        return Promise.reject(new Error(`File "${path}" does not contain correct snapshot definition.`));
      }

      return snapshot satisfies Snapshot;
    })
  );
};
