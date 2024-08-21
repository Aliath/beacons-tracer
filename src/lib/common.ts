import { type ClassValue, clsx } from 'clsx';
import getColorGenerator from 'iwanthue';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getDateFromPath = (path: string) => {
  const fileName = path.split('/').at(-1) || '';
  const [fileDate] = fileName.split('.');

  if (Number.isNaN(new Date(fileDate).getTime())) {
    throw new Error(`Filename "${path}" does not follow ISO date convention.`);
  }

  return fileDate;
};

export const groupBy = <T>(iterable: Iterable<T>, fn: (item: T) => string | number) => {
  return [...iterable].reduce<Record<string, T[]>>((groups, curr) => {
    const key = fn(curr);
    const group = [...(groups[key] ?? []), curr];

    return { ...groups, [key]: group };
  }, {});
};

let recentlyUsedColor = -1;
const MAX_COLORS_TO_GENERATE = 12;
const colorGenerator = getColorGenerator(MAX_COLORS_TO_GENERATE, { colorSpace: 'sensible' });

export const getRandomColor = () => {
  const hexColor = colorGenerator[++recentlyUsedColor];

  const red = parseInt(hexColor.slice(1 + 2 * 0, 1 + 2 * 1), 16);
  const green = parseInt(hexColor.slice(1 + 2 * 1, 1 + 2 * 2), 16);
  const blue = parseInt(hexColor.slice(1 + 2 * 2, 1 + 2 * 3), 16);

  return [red, green, blue] satisfies [number, number, number];
};
