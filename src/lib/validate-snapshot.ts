import { TraceItem } from '@/types/common';

const isObject = (data: unknown): data is Record<string, unknown> => !!data && typeof data === 'object';

export const isSnapshotValid = (data: unknown): data is Record<string, TraceItem[]> => {
  if (!isObject(data)) {
    return false;
  }

  return Object.values(data).every((assetTraces) => {
    if (!Array.isArray(assetTraces)) {
      return false;
    }

    const REQUIRED_FIELDS = { x: 'number', y: 'number', timestamp: 'number' };

    return assetTraces.every((item) => {
      if (!isObject(item)) {
        return false;
      }

      return Object.entries(REQUIRED_FIELDS).every(
        ([requiredKey, requiredType]) => requiredKey in item && typeof item[requiredKey] === requiredType
      );
    });
  });
};
