import { useGridStore } from "~/store";
import { api } from "~/utils/api";

export const Cell: React.FC<{
  index: number;
}> = ({ index }) => {
  const {
    target,
    setTarget,
    dimension,
    incrementAttempt,
    checked,
    value,
    checkCell,
    time,
    gap,
  } = useGridStore((state) => ({
    target: state.target,
    setTarget: state.setTarget,
    checked: state.checkedGrid[index],
    value: state.grid[index]!,
    checkCell: state.checkCell,
    incrementAttempt: state.incrementAttempt,
    dimension: state.dimension,
    time: state.time,
    gap: state.gap,
  }));

  const addSubmission = api.game.addSubmission.useMutation();

  const onClick = async () => {
    if (checked) {
      return;
    }

    incrementAttempt();

    // Selected correctly
    if (value == target) {
      checkCell(index);
      setTarget(target + 1);
      // Game over
      if (value == dimension ** 2 - 1) {
        const submission = await addSubmission.mutateAsync({
          dimension: dimension,
          time: time,
        });
        console.log("Created submission", submission);
      }
    }
  };

  // Cannot use dynamic margins, so hardcode mapping
  let margin = "m-3";
  if (gap == 1) {
    margin = "m-5"
  } else if (gap == 2) {
    margin = "m-7"
  } else if (gap == 3) {
    margin = "m-9"
  } else if (gap == 4) {
    margin = "m-11"
  } else if (gap == 5) {
    margin = "m-14"
  } 
  console.log(gap, margin)

  return (
    <div
      onClick={onClick}
      className={`${margin} m- h-16 w-16 cursor-pointer select-none rounded-lg p-5 text-center text-xl transition
         ${
           checked
             ? "bg-[var(--main-color)] text-[var(-sub-alt-color)]"
             : "bg-[var(--sub-alt-color)] text-[var(--main-color)] hover:scale-110 hover:bg-[var(--sub-color)]"
         }`}
    >
      {value + 1}
    </div>
  );
};
