export function formatDateToYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

export function secondsToHMS(seconds: number): string {
  seconds = Math.ceil(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const HH = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(remainingSeconds).padStart(2, '0');

  return `${HH}:${mm}:${ss}`;
}

export function hmsToSeconds(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function secondToShortHSM(second: number): string {
  second = Math.ceil(second);

  let shotrHSM = secondsToHMS(second);
  while (shotrHSM.startsWith('00:')) {
    shotrHSM = shotrHSM.substring(3);
  }
  return shotrHSM;
}
