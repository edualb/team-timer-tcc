export interface IAspectTime {
  hourNumber: number;
  minuteNumber: number;
  secondNumber: number;

  hour: string;
  minute: string;
  second: string;

  getTimeFormat(): string;
  resetTimer(): void;
  updateTime(): void;
}