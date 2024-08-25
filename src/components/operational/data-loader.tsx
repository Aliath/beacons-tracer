import { useLoadData } from '@/hooks/use-load-data';

export function DataLoader({ children, loader }: { children: React.ReactNode; loader: React.ReactNode }) {
  const ready = useLoadData();

  if (!ready) {
    return loader;
  }

  return children;
}
