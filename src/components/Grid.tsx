import { useGridStore } from "~/store";
import { useState, useEffect } from "react";
import { TbCrosshair } from "react-icons/tb";

import { Cell } from "./Cell";

export const Grid: React.FC = () => {
  const { grid, restart, dimension } = useGridStore((state) => ({
    grid: state.grid,
    restart: state.restart,
    dimension: state.dimension,
  }));

  useEffect(() => {
    restart();
  }, []);

  if (!grid || grid.length == 0) {
    return <></>;
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <TbCrosshair color="var(--error-color)" className="animate-ping" />
      </div>
      {Array.from({ length: dimension }).map((_, row) => {
        return (
          <div className="flex w-fit flex-row">
            {Array.from({ length: dimension }).map((_, col) => {
              const index = row * dimension + col;
              return <Cell index={index} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
