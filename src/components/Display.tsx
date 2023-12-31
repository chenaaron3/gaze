import { useState, useEffect } from "react";

import { getGameStatus, useGridStore } from "~/store";
import { formatMilliseconds } from "~/utils/helper";
import { GAME_STATUS } from "~/utils/types";

export const Display: React.FC = () => {
  const { status, time, setTime } = useGridStore((state) => ({
    status: getGameStatus(state),
    time: state.time,
    setTime: state.setTime,
  }));

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (status == GAME_STATUS.IN_PROGRESS) {
      // Constantly update time while game in progress
      intervalId = setInterval(() => setTime(time + 10), 10);
    }
    return () => clearInterval(intervalId);
  }, [status, time]);

  return (
    <div className="relative flex h-16 items-center justify-center">
      <p
        className={`absolute text-center text-[var(--text-color)] transition-opacity ${
          status != GAME_STATUS.START && "opacity-0"
        }`}
      >
        Focus on the blinking crosshair in the center. <br />
        Use your peripheral vision to click on the boxes in ascending order.
      </p>
      <p
        className={`absolute text-center text-xl text-[var(--text-color)] transition-opacity ${
          status != GAME_STATUS.IN_PROGRESS && "opacity-0"
        }`}
      >
        {formatMilliseconds(time)}
      </p>
    </div>
  );
};
