import { create } from "zustand";
import { shuffle } from "~/utils/helper";
import { GAME_STATUS } from "~/utils/types";

interface GridState {
  grid: number[];
  checkedGrid: boolean[];
  target: number;
  dimension: number;
  gap: number;
  time: number;
  attempts: number;
  initializeGrid: (grid: number[]) => void;
  setDimension: (dimension: number) => void;
  setGap: (gap: number) => void;
  incrementAttempt: () => void;
  checkCell: (index: number) => void;
  setTarget: (target: number) => void;
  setTime: (time: number) => void;
  restart: () => void;
}

export const useGridStore = create<GridState>()((set) => ({
  grid: [],
  checkedGrid: [],
  target: 0,
  dimension: 3,
  gap: 1,
  time: 0,
  attempts: 0,
  initializeGrid: (grid) =>
    set(() => ({
      grid: grid,
    })),
  setDimension: (dimension) =>
    set(() => ({
      dimension: dimension,
      grid: shuffle(Array.from(Array(dimension ** 2).keys())),
      checkedGrid: Array.from(Array(dimension ** 2)).map(() => false),
    })),
  setGap: (gap) =>
    set(() => ({
      gap: gap,
    })),
  incrementAttempt: () =>
    set((state) => ({
      attempts: state.attempts + 1,
    })),
  checkCell: (index) =>
    set((state) => {
      // create new grid
      const newState: Partial<GridState> = {
        checkedGrid: [...state.checkedGrid],
      };
      newState.checkedGrid![index] = true;
      return newState;
    }),
  setTarget: (target) =>
    set(() => ({
      target: target,
    })),
  setTime: (time) =>
    set(() => ({
      time: time,
    })),
  restart: () =>
    set((state) => ({
      grid: shuffle(Array.from(Array(state.dimension ** 2).keys())),
      checkedGrid: Array.from(Array(state.dimension ** 2)).map(() => false),
      target: 0,
      time: 0,
      attempts: 0,
    })),
}));

export const getGameStatus = (state: GridState) => {
  // Finished if all are checked
  if (state.checkedGrid.every((isChecked) => isChecked)) {
    return GAME_STATUS.FINISHED;
  } else if (state.checkedGrid.every((isChecked) => !isChecked)) {
    return GAME_STATUS.START;
  } else {
    return GAME_STATUS.IN_PROGRESS;
  }
};

// In progress if at least one cell is checked, not all cells are checked
export const isGameInProgress = (state: GridState) =>
  getGameStatus(state) == GAME_STATUS.IN_PROGRESS;
