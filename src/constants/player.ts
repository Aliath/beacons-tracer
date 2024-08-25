export const SPEED_LEVELS = [0.25, 0.5, 1, 2, 5, 10] as const;
export const DEFAULT_SPEED = 1 satisfies (typeof SPEED_LEVELS)[number];
export const DEFAULT_TRACE_DURATION = 5_000;
