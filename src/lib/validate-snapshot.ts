import { z } from 'zod';

const traceItemShape = z.object({
  timestamp: z.number().int().min(0),
  x: z.number(),
  y: z.number(),
});

const snapshotShape = z.object({
  name: z.string(),
  group: z.string().optional(),
  assets: z.record(z.string(), z.array(traceItemShape)),
});

export type TraceItem = z.infer<typeof traceItemShape>;
export type Snapshot = z.infer<typeof snapshotShape>;

export const isSnapshotValid = (data: unknown): data is Snapshot => {
  const { success } = snapshotShape.safeParse(data);

  return success;
};
