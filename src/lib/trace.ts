import { Smooth } from 'smooth.ts';

export const getSurroundingPointIndexes = <T extends { timestamp: number }>(items: T[], currentTimestamp: number) => {
  const nextItemIndex = items.findIndex((item) => item.timestamp > currentTimestamp);
  const prevItemIndex = nextItemIndex === -1 ? -1 : Math.max(0, nextItemIndex - 1);

  const right = (nextItemIndex + items.length) % items.length;
  const left = (prevItemIndex + items.length) % items.length;

  return { left, right };
};

export const getTimestampIndex = <T extends { timestamp: number }>(items: T[], currentTimestamp: number) => {
  const { left, right } = getSurroundingPointIndexes(items, currentTimestamp);

  const { timestamp: leftTimestamp } = items.at(left)!;
  const { timestamp: rightTimestamp } = items.at(right)!;

  if (left === right) {
    return left;
  }

  const timestampsSpan = rightTimestamp - leftTimestamp;
  const relativeLeftTimestamp = currentTimestamp - leftTimestamp;

  return left + relativeLeftTimestamp / timestampsSpan;
};

export const getValueInterpolator = (input: number[]) => {
  return (index: number) => {
    const leftIndex = Math.max(0, Math.min(input.length - 1, Math.floor(index)));
    const rightIndex = Math.max(0, Math.min(input.length - 1, Math.ceil(index)));

    const leftItem = input.at(leftIndex)!;
    const rightItem = input.at(rightIndex)!;

    const progressFraction = index % 1;
    const span = rightItem - leftItem;

    return leftItem + progressFraction * span;
  };
};

export const getPathInterpolator = <T extends { x: number; y: number }>(items: T[], smooth = false) => {
  const getInterpolator = smooth ? Smooth : getValueInterpolator;

  const xSmoother = getInterpolator(items.map((item) => item.x));
  const ySmoother = getInterpolator(items.map((item) => item.y));

  return (index: number) => ({ x: xSmoother(index), y: ySmoother(index) });
};
