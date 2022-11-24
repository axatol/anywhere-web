const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;

export class Time {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(hours: number, minutes: number, seconds: number) {
    this.hours = Math.floor(hours);
    this.minutes = Math.floor(minutes);
    this.seconds = Math.floor(seconds);
  }

  static fromEpoch = (epoch: number) => {
    const hours = Math.floor(epoch / SECONDS_IN_HOUR);
    const hourLeftover = epoch % SECONDS_IN_HOUR;
    const minutes = Math.floor(hourLeftover / SECONDS_IN_MINUTE);
    const seconds = hourLeftover % SECONDS_IN_MINUTE;
    return new Time(hours, minutes, seconds);
  };

  toDuration() {
    const { hours, minutes, seconds } = this;

    const fragments = [
      `${minutes}`.padStart(2, "0"),
      `${seconds}`.padStart(2, "0"),
    ];

    if (hours > 0) {
      fragments.unshift(`${hours}`.padStart(2, "0"));
    }

    return fragments.filter(Boolean).join(":");
  }
}
