import { useMemo } from 'react';
import { AssetTrace } from './asset-trace';
import { LowpassFilter } from './lowpass-filter';
import { PlayerAsset } from './player-asset';
import { PlayerStage } from './player-stage';
import { PlayerTrack } from './player-track';
import { SmoothSwitch } from './smooth-switch';
import { SnapshotSelector } from './snapshot-selector';
import { TraceDuration } from './trace-duration';
import { PlayerTicker } from '@/components/operational/player-ticker';
import { Intro } from '@/components/ui/intro';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useCurrentSnapshot } from '@/hooks/use-current-snapshot';
import { getRandomColor } from '@/lib/common';

export function TracePlayer() {
  const { currentSnapshot } = useCurrentSnapshot();

  const assetsData = useMemo(
    () =>
      Object.entries(currentSnapshot?.assets || {}).map(
        ([assetIdentifier, traces]) => [assetIdentifier, { traces, color: getRandomColor() }] as const
      ),
    [currentSnapshot?.assets]
  );

  return (
    <>
      <PlayerTicker />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} minSize={15} maxSize={50}>
          <Intro />
          <div className="h-px w-full bg-input" />
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
            {(['traces', 'assets'] as const).map((type) => {
              if (type === 'assets') {
                return assetsData.map(([identifier, { traces, color }]) => (
                  <PlayerAsset key={identifier} name={identifier} traces={traces} color={color} />
                ));
              }

              if (type === 'traces') {
                return assetsData.map(([identifier, { traces, color }]) => (
                  <AssetTrace key={identifier} traces={traces} color={color} />
                ));
              }
            })}
          </PlayerStage>

          <div className="h-px w-full bg-input" />

          <PlayerTrack />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
