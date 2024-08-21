import { type ClassValue, clsx } from 'clsx';
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
