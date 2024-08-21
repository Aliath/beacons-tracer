export const SPEED_LEVELS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2] as const;
export const DEFAULT_SPEED = 1 satisfies (typeof SPEED_LEVELS)[number];
