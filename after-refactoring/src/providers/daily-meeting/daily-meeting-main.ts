import { Injectable } from "@angular/core";
import { DailyMeetingMain } from "./interfaces/daily-meeting-main.interface";
import { AspectTime } from "../../aspects/time.aspect";
import { IAspectTime } from "./interfaces/aspect-time.interface";

@Injectable()
@AspectTime()
export class DailyMeetingMainProvider implements DailyMeetingMain, IAspectTime {
  hourNumber: number;
  minuteNumber: number;
  secondNumber: number;
  hour: string;
  minute: string;
  second: string;
  
  getTimeFormat(): string { return '' }
  resetTimer(): void {}
  updateTime(): void {}

  private timerInterval: any;

  public clearTimerInterval() {
    clearInterval(this.timerInterval);
  }

  public initTimerInterval() {
    this.timerInterval = setInterval(() => this.updateTime(), 1000);
  }

}