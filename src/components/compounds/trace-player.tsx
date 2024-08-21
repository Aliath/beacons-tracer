import { LowpassFilter } from './lowpass-filter';
import { PlayerAsset } from './player-asset';
import { PlayerSpeed } from './player-speed';
import { PlayerStage } from './player-stage';
import { PlayerTrack } from './player-track';
import { SnapshotSelector } from './snapshot-selector';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export function TracePlayer() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={15} minSize={15} maxSize={50}>
        <SnapshotSelector />
        <div className="h-px w-full bg-input" />
        <PlayerSpeed />
        <div className="h-px w-full bg-input" />
        <LowpassFilter />
        <div className="h-px w-full bg-input" />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel className="flex flex-col">
        <PlayerStage>
          <PlayerAsset />
        </PlayerStage>

        <div className="h-px w-full bg-input" />

        <PlayerTrack />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
