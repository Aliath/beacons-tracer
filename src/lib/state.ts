import { atom } from 'jotai';
import { DEFAULT_SPEED, SPEED_LEVELS } from '@/constants/player';
import { SnapshotItem } from '@/types/common';

export const stageSizeAtom = atom({ width: 0, height: 0 });
export const backgroundSizeAtom = atom({ width: 0, height: 0 });

export const playerSpeedAtom = atom<(typeof SPEED_LEVELS)[number]>(DEFAULT_SPEED);
export const currentSnapshotPathAtom = atom<string | null>(null);
export const snapshotsQueryAtom = atom<
  | { initialized: false; snapshots: null }
  | {
      initialized: true;
      snapshots: {
        path: string;
        data: SnapshotItem[];
      }[];
    }
>({ initialized: false, snapshots: null });
