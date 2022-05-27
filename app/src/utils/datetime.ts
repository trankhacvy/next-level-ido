export const formatSeconds = (count: number) => {
  let days: number | string = Math.floor(count / 86400);
  let hours: number | string = Math.floor((count - days * 86400) / 3600);
  let minutes: number | string = Math.floor(
    (count - days * 86400 - hours * 3600) / 60
  );
  let seconds: number | string =
    count - days * 86400 - hours * 3600 - minutes * 60;

  if (days < 10) {
    days = days === 0 ? "" : "0" + days;
  }
  if (hours < 10) {
    hours = hours === 0 ? "" : "0" + hours;
  }
  if (minutes < 10) {
    minutes = minutes === 0 ? "" : "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return [days, hours, minutes, seconds].filter(Boolean).join(":");
};
