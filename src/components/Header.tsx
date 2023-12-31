import { useGridStore, isGameInProgress } from "~/store";
import { VscEye } from "react-icons/vsc";

export const Header: React.FC = () => {
  const { inProgress } = useGridStore((state) => ({
    inProgress: isGameInProgress(state),
  }));

  return (
    <header
      className={`flex select-none flex-row items-center justify-center gap-2 pt-5 text-4xl transition-colors sm:justify-start ${
        inProgress ? "text-[var(--sub-color)]" : "text-[var(--text-color)]"
      }`}
    >
      <VscEye
        style={{ color: inProgress ? "var(--sub-color)" : "var(--main-color)" }}
        className="transition-colors"
      />
      Gaze
    </header>
  );
};
