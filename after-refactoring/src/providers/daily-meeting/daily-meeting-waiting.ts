import { Injectable } from "@angular/core";
import { DailyMeetingMain } from "./interfaces/daily-meeting-main.interface";
import { IAspectTime } from "./interfaces/aspect-time.interface";
import { AspectTime } from "../../aspects/time.aspect";

@Injectable()
@AspectTime()
export class DailyMeetingWaitingProvider implements DailyMeetingMain, IAspectTime {
  hourNumber: number;
  minuteNumber: number;
  secondNumber: number;
  hour: string;
  minute: string;
  second: string;

  private timerInterval: any;

  getTimeFormat(): string { return ''; }
  resetTimer(): void { }
  updateTime(): void { }

  public clearTimerInterval() {
    clearInterval(this.timerInterval);
  }

  public initTimerInterval() {
    this.timerInterval = setInterval(() => this.updateTime(), 1000);
  }
  
}