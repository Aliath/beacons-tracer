import { SpinnerDiamond } from 'spinners-react';

export function Loader() {
  return (
    <div className="fixed inset-0 bg-accent flex flex-col gap-4 items-center justify-center z-50 transition-opacity duration-300">
      <SpinnerDiamond size={100} thickness={60} speed={120} color="#060c16" secondaryColor="#cfd1d3" />
      <h2 className="font-light text-4xl mt-4">Beacons Tracer</h2>
    </div>
  );
}
