import { getPathInterpolator, getSurroundingPointIndexes, getTimestampIndex, getValueInterpolator } from './trace';

const getSampleData = ({
  pointsNumber = 10_000,
  maxDifferenceBetweenPeers = 500,
}: { pointsNumber?: number; maxDifferenceBetweenPeers?: number } = {}) => {
  let lastTimestamp = Date.now();

  return [...Array(pointsNumber).keys()].map(() => {
    const result = { timestamp: lastTimestamp };
    lastTimestamp += Math.random() * maxDifferenceBetweenPeers - 2 + 2;

    return result;
  });
};

describe('trace utils', () => {
  describe('getSurroundingPointIndexes', () => {
    it('returns surrounding points when available', () => {
      const sampleData = getSampleData();

      const [expectedLeftIndex, expectedRightIndex] = [4, 5];
      const timestamp = sampleData[expectedLeftIndex].timestamp + 1;

      const result = getSurroundingPointIndexes(sampleData, timestamp);

      expect(result.left).toEqual(expectedLeftIndex);
      expect(result.right).toEqual(expectedRightIndex);
    });

    it('returns [first_element, first_element] when timestamp is lower than [first_element.timestamp]', () => {
      const sampleData = getSampleData({ pointsNumber: 2 });

      const [expectedLeftIndex, expectedRightIndex] = [0, 0];

      const result = getSurroundingPointIndexes(sampleData, -1);

      expect(result.left).toEqual(expectedLeftIndex);
      expect(result.right).toEqual(expectedRightIndex);
    });

    it('returns [last_element, last_element] when timestamp is higher than [last_element.timestamp]', () => {
      const sampleData = getSampleData({ pointsNumber: 2 });

      const [expectedLeftIndex, expectedRightIndex] = [1, 1];

      const result = getSurroundingPointIndexes(sampleData, sampleData.at(-1)!.timestamp + 1);

      expect(result.left).toEqual(expectedLeftIndex);
      expect(result.right).toEqual(expectedRightIndex);
    });
  });

  describe('getTimestampIndex', () => {
    it('returns fraction index when item is between', () => {
      const [left, between, right] = [500, 750, 1000];
      const sampleData = [{ timestamp: left }, { timestamp: right }];

      expect(getTimestampIndex(sampleData, between)).toBe(0.5);
    });

    it('returns [0] when timestamp is lower than left', () => {
      const [left, right] = [500, 1000];
      const sampleData = [{ timestamp: left }, { timestamp: right }];

      expect(getTimestampIndex(sampleData, left - 1)).toBe(0);
    });

    it('returns [length-1] when timestamp is higher than right', () => {
      const [left, right] = [500, 1000];
      const sampleData = [{ timestamp: left }, { timestamp: right }];

      expect(getTimestampIndex(sampleData, right + 1)).toBe(1);
    });
  });

  describe('getValueInterpolator', () => {
    it('returns exact value when index is a natural number', () => {
      expect(getValueInterpolator([1, 2, 3])(0)).toBe(1);
      expect(getValueInterpolator([1, 2, 3])(1)).toBe(2);
      expect(getValueInterpolator([1, 2, 3])(2)).toBe(3);
    });

    it('returns value between when index is not a natural number', () => {
      expect(getValueInterpolator([0, 5])(0.5)).toBe(2.5);
      expect(getValueInterpolator([1000, 2000])(0.25)).toBe(1250);
      expect(getValueInterpolator([0.1, 0.2])(0.5)).toBeCloseTo(0.15);
      expect(getValueInterpolator([-100, -200])(0.5)).toBeCloseTo(-150);
    });

    it('returns the first item when index is negative', () => {
      expect(getValueInterpolator([0, 5])(-1)).toBe(0);
    });

    it('returns the last item when index is higher than [length - 1]', () => {
      expect(getValueInterpolator([0, 5])(1.1)).toBe(5);
    });
  });

  describe('getPathInterpolator', () => {
    [true, false].forEach((smooth) => {
      it(`returns exact point when index is a natural number, smooth=${smooth}`, () => {
        expect(
          getPathInterpolator(
            [
              { x: 0, y: 0 },
              { x: -5, y: 5 },
            ],
            smooth
          )(0)
        ).toEqual({ x: 0, y: 0 });

        expect(
          getPathInterpolator(
            [
              { x: 0, y: 0 },
              { x: -5, y: 5 },
            ],
            smooth
          )(1)
        ).toEqual({ x: -5, y: 5 });
      });

      it(`returns exact point when index is not a natural number, smooth=${smooth}`, () => {
        expect(
          getPathInterpolator(
            [
              { x: 0, y: 0 },
              { x: -5, y: 5 },
            ],
            smooth
          )(0.5)
        ).toEqual({ x: -2.5, y: 2.5 });
      });
    });
  });
});
