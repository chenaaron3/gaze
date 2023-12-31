export function shuffle<T>(array: T[]) {
  return array.sort((a, b) => 0.5 - Math.random());
}

export const formatMilliseconds = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const remainingMilliseconds = milliseconds % 1000;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedMilliseconds = Math.floor(remainingMilliseconds / 10)
    .toString()
    .padStart(2, "0");

  return `${formattedSeconds}:${formattedMilliseconds}`;
};
