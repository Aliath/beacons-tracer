import { atom } from 'jotai';
import { Snapshot } from './validate-snapshot';
import { DEFAULT_SPEED, DEFAULT_TRACE_DURATION, SPEED_LEVELS } from '@/constants/player';

export const stageSizeAtom = atom({ width: 0, height: 0 });
export const backgroundSizeAtom = atom({ width: 0, height: 0 });

export const playerSpeedAtom = atom<(typeof SPEED_LEVELS)[number]>(DEFAULT_SPEED);
export const traceDurationAtom = atom(DEFAULT_TRACE_DURATION);
export const currentSnapshotNameAtom = atom('');
export const availableSnapshotsAtom = atom<Snapshot[]>([]);

export const simulationTimestampAtom = atom(0);
export const smoothTraceAtom = atom(true);
export const playerStateAtom = atom<'playing' | 'paused'>('paused');
