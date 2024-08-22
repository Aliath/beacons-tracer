import { LowpassFilter } from './lowpass-filter';
import { PlayerAsset } from './player-asset';
import { PlayerStage } from './player-stage';
import { PlayerTrack } from './player-track';
import { SmoothSwitch } from './smooth-switch';
import { SnapshotSelector } from './snapshot-selector';
import { TraceDuration } from './trace-duration';
import { PlayerTicker } from '@/components/operational/player-ticker';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useCurrentSnapshot } from '@/hooks/use-current-snapshot';

export function TracePlayer() {
  const { currentSnapshot } = useCurrentSnapshot();

  return (
    <>
      <PlayerTicker />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} minSize={15} maxSize={50}>
          <SnapshotSelector />
          <div className="h-px w-full bg-input" />
          <TraceDuration />
          <div className="h-px w-full bg-input" />
          <SmoothSwitch />
          <div className="h-px w-full bg-input" />
          <LowpassFilter />
          <div className="h-px w-full bg-input" />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel className="flex flex-col">
          <PlayerStage>
            {Object.entries(currentSnapshot?.data || {}).map(([assetIdentifier, assetTrace]) => (
              <PlayerAsset key={assetIdentifier} traces={assetTrace} />
            ))}
          </PlayerStage>

          <div className="h-px w-full bg-input" />

          <PlayerTrack />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
