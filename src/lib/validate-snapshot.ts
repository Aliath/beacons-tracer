import { SnapshotItem } from '@/types/common';

export const isSnapshotValid = (data: unknown): data is SnapshotItem[] => {
  if (!Array.isArray(data)) {
    return false;
  }

  const REQUIRED_FIELDS = { x: 'number', y: 'number', timestamp: 'number' };

  return data.every((item) => {
    if (typeof item !== 'object' || !item) {
      return false;
    }

    return Object.entries(REQUIRED_FIELDS).every(
      ([requiredKey, requiredType]) => requiredKey in item && typeof item[requiredKey] === requiredType
    );
  });
};
