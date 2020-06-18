import { Injectable } from "@angular/core";
import { Membro } from "../../contents/membro";
import { DailyMeetingMember } from "./interfaces/daily-meeting-member.interface";
import { AspectTime } from "../../aspects/time.aspect";
import { IAspectTime } from "./interfaces/aspect-time.interface";

@Injectable()
@AspectTime()
export class DailyMeetingMemberProvider implements DailyMeetingMember, IAspectTime {
  hourNumber: number;
  minuteNumber: number;
  secondNumber: number;
  hour: string;
  minute: string;
  second: string;

  drawMembers: Membro[] = [];

  private timerInterval: any;

  getTimeFormat(): string { 
    console.log('test');
    return '' 
  }
  resetTimer(): void {
    console.log('test');
  }
  updateTime(): void {
    console.log('test');
  }

  public clearTimerInterval() {
    clearInterval(this.timerInterval);
  }

  public initTimerInterval(timeLimit: number) {
    this.timerInterval = setInterval(() => this.updateTimeMember(timeLimit), 1000);
  }

  public sendMemberToLast(timeLimit: number) {
    let member = this.drawMembers[0];
    this.drawMembers.splice(0, 1);
    this.drawMembers.splice(this.drawMembers.length, 0, member);
    this.clearTimerInterval();
    this.initTimerInterval(timeLimit);
    this.resetTimer();
  }

  public drawingMembers(members: Membro[]) {
    let presentMembers: Membro[] = [];
    
    presentMembers = this.getPresentMembers(members);
    let drawValue = Math.floor((Math.random() * presentMembers.length))

    this.drawMembers.push(presentMembers[drawValue]);

    for (let i = drawValue + 1 ; i < presentMembers.length ; i++) {
      this.drawMembers.push(presentMembers[i]);
    }
    for (let i = 0 ; i < drawValue ; i++) {
      this.drawMembers.push(presentMembers[i]);
    }
  }

  public updateTimeMember(timeLimit: number) {
    let tempoMemberLimite: number = this.calculateDecimalTime();

    this.updateTime();

    if (tempoMemberLimite >= timeLimit) {
        this.drawMembers[0].passouTempoSugerido = true;
    }
  }

  private getPresentMembers(members: Membro[]): Membro[] {
    let presentMembers: Membro[] = [];
    members.forEach(element => {
        if (element.presenca === true) {
          presentMembers.push(element);
        }
    });
    return presentMembers;
  }

  private calculateDecimalTime() {
    let minutoSegundo: number = this.minuteNumber * 60;
    let horaSegundo: number = this.hourNumber * 3600;

    return horaSegundo + minutoSegundo + this.secondNumber;
  }
}