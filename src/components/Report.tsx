import { useEffect } from "react";
import { useGridStore, isGameInProgress } from "~/store";
import { formatMilliseconds } from "~/utils/helper";

export const Report: React.FC = () => {
  const { time, attempts, dimension } = useGridStore((state) => ({
    time: state.time,
    attempts: state.attempts,
    dimension: state.dimension,
  }));

  return (
    <div className="flex flex-col justify-center align-middle text-2xl">
      <div className="flex items-center justify-center">
        <span className="text-[var(--text-color)]">Completed in&nbsp;</span>
        <span className="text-[var(--main-color)]">
          {formatMilliseconds(time)}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-[var(--text-color)]">with&nbsp;</span>
        <span className="text-[var(--main-color)]">
          {((dimension ** 2 / attempts) * 100).toFixed(0)}%
        </span>
        <span className="text-[var(--text-color)]">&nbsp;accuracy</span>
      </div>
    </div>
  );
};
