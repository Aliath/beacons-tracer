import { isSnapshotValid, Snapshot } from './validate-snapshot';

describe('validateSnapshot', () => {
  it('returns true for valid items', () => {
    const validItems = [
      {
        name: 'name',
        assets: {
          assetX: {
            traces: [
              { x: 0, y: 0, timestamp: 1 },
              { x: 0, y: 0, timestamp: 2 },
            ],
          },
          assetY: {
            traces: [
              { x: 0, y: 0, timestamp: 1 },
              { x: 0, y: 0, timestamp: 2 },
            ],
          },
        },
      },
      { name: '', assets: {} },
      { name: '', assets: { assetX: { traces: [] }, assetY: { traces: [] } } },
      { name: '', assets: { assetX: { traces: [{ x: 0, y: 0, timestamp: 1 }] }, assetY: { traces: [] } } },
    ] satisfies Snapshot[];

    validItems.forEach((validItem) => {
      expect(isSnapshotValid(validItem)).toBe(true);
    });
  });

  it('returns false for invalid items', () => {
    const invalidItems = [
      null,
      { name: '' },
      { name: '', assets: [{}] },
      { name: '', assets: [{ 'john doe': {} }] },
      { name: '', assets: [{ x: 0, y: 0 }] },
      { name: '', assets: { test: [{ timestamp: 0 }] } },
      { name: '', assets: { test: [{ timestamp: '0', x: '0', y: '0' }] } },
    ];

    invalidItems.forEach((validItem) => {
      expect(isSnapshotValid(validItem)).toBe(false);
    });
  });
});
