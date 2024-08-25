import { isSnapshotValid } from './validate-snapshot';

describe('validateSnapshot', () => {
  it('returns true for valid items', () => {
    const validItems = [
      {
        assetX: [
          { x: 0, y: 0, timestamp: 1 },
          { x: 0, y: 0, timestamp: 2 },
        ],
        assetY: [
          { x: 0, y: 0, timestamp: 1 },
          { x: 0, y: 0, timestamp: 2 },
        ],
      },
      {},
      { assetX: [], assetY: [] },
      { assetX: [{ x: 0, y: 0, timestamp: 1 }], assetY: [] },
    ];

    validItems.forEach((validItem) => {
      expect(isSnapshotValid(validItem)).toBe(true);
    });
  });

  it('returns  for valid items', () => {
    const invalidItems = [
      null,
      { test: {} },
      { test: [{}] },
      { test: [{ x: 0, y: 0 }] },
      { test: [{ timestamp: 0 }] },
      { test: [{ timestamp: '0', x: '0', y: '0' }] },
    ];

    invalidItems.forEach((validItem) => {
      expect(isSnapshotValid(validItem)).toBe(false);
    });
  });
});
