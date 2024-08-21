import { atom } from 'jotai';
import { DEFAULT_SPEED, SPEED_LEVELS } from '@/constants/player';
import { TraceItem } from '@/types/common';

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
        data: Record<string, TraceItem[]>;
      }[];
    }
>({ initialized: false, snapshots: null });

export const simulationTimestamp = atom(0);
