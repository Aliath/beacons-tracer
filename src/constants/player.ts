export const SPEED_LEVELS = [0.5, 0.5, 1, 2, 5, 10] as const;
export const DEFAULT_SPEED = 1 satisfies (typeof SPEED_LEVELS)[number];
