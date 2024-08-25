import { TracePlayer } from '@/components/compounds/trace-player';
import { DataLoader } from '@/components/operational/data-loader';
import { Loader } from '@/components/ui/loader';

export function App() {
  return (
    <DataLoader loader={<Loader />}>
      <TracePlayer />
    </DataLoader>
  );
}
