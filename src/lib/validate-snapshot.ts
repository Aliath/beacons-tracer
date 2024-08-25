import { z } from 'zod';

const traceItemShape = z.object({
  timestamp: z.number().int().min(0),
  x: z.number(),
  y: z.number(),
});

const snapshotShape = z.object({
  name: z.string(),
  map: z.union([z.undefined(), z.literal('map-01'), z.literal('map-02')]),

  group: z.string().optional(),
  assets: z.record(
    z.string(),
    z.object({
      icon: z.union([
        z.undefined(),
        z.literal('person-01'),
        z.literal('person-02'),
        z.literal('person-03'),
        z.literal('person-04'),
      ]),
      traces: z.array(traceItemShape),
    })
  ),
});

export type TraceItem = z.infer<typeof traceItemShape>;
export type Snapshot = z.infer<typeof snapshotShape>;
export type AssetIcon = Snapshot['assets'][string]['icon'];
export type MapIcon = Snapshot['map'];

export const isSnapshotValid = (data: unknown): data is Snapshot => {
  const { success } = snapshotShape.safeParse(data);

  return success;
};
