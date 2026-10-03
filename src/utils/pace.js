export function calculatePace(distanceInput, hoursInput, minutesInput, secondsInput = 0) {
  const distance = Number(distanceInput);
  const hours = Number(hoursInput);
  const minutes = Number(minutesInput);
  const seconds = Number(secondsInput);

  const values = [distance, hours, minutes, seconds];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) return null;
  if (distance <= 0 || minutes >= 60 || seconds >= 60) return null;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds <= 0) return null;

  const paceSeconds = Math.round(totalSeconds / distance);
  return {
    paceMinutes: Math.floor(paceSeconds / 60),
    paceSeconds: paceSeconds % 60,
    speed: distance / (totalSeconds / 3600),
  };
}

