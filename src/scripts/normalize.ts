import fs from 'node:fs/promises';
import { isSnapshotValid, TraceItem } from '@/lib/validate-snapshot';

const TICK_TIME_IN_MS = 1000 / 30;

const readAndValidateData = async (fileName: string) => {
  const jsonContent = await fs.readFile(fileName, 'utf-8');
  const parsedData: unknown = JSON.parse(jsonContent);

  if (!isSnapshotValid(parsedData)) {
    throw new Error('Invalid data');
  }

  return parsedData;
};

const getMaximumTimestamp = (data: TraceItem[]) => data.at(-1)!.timestamp;

const createTicks = (data: TraceItem[]) => {
  const ticks = Math.ceil(getMaximumTimestamp(data) / TICK_TIME_IN_MS) + 1;
  return [...Array(ticks).keys()].map((index) => ({
    timestamp: index * TICK_TIME_IN_MS,
  }));
};

const getInterpolatedPosition = (timestamp: number, data: TraceItem[]) => {
  const reversedData = [...data].reverse();

  const [minIndex, maxIndex] = [0, data.length - 1];
  const foundIndex = maxIndex - reversedData.findIndex((item) => item.timestamp <= timestamp);

  const previousRecordIndex = Math.min(maxIndex, Math.max(minIndex, foundIndex));
  const nextRecordIndex = Math.min(maxIndex, Math.max(minIndex, previousRecordIndex + 1));

  const previousTimestamp = data[previousRecordIndex].timestamp;
  const nextTimestamp = data[nextRecordIndex].timestamp;

  const timestampDifference = nextTimestamp - previousTimestamp;
  const xDifference = data[nextRecordIndex].x - data[previousRecordIndex].x;
  const yDifference = data[nextRecordIndex].y - data[previousRecordIndex].y;

  const fractionBetweenTimestamps = (timestamp - previousTimestamp) / Math.max(1, timestampDifference);

  return {
    x: data[previousRecordIndex].x + xDifference * fractionBetweenTimestamps,
    y: data[previousRecordIndex].y + yDifference * fractionBetweenTimestamps,
  };
};

const filePath = process.argv.at(-1);

if (!filePath) {
  throw new Error('Filepath is not specified');
}

const data = await readAndValidateData(filePath);

const output = Object.fromEntries(
  Object.entries(data.assets).map(([assetIdentifier, assetTraces]) => {
    const ticks = createTicks(assetTraces);

    const tweakedTraces = ticks.map(({ timestamp }) => ({
      ...getInterpolatedPosition(timestamp, assetTraces),
      timestamp,
    }));

    return [assetIdentifier, tweakedTraces];
  })
);

console.log(JSON.stringify(output, null, 4));
