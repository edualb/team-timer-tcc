import { Membro } from "../../../contents/membro";

export interface DailyMeetingMember {

  drawMembers: Membro[];

  drawingMembers(members: Membro[]);
  clearTimerInterval(): void;
  resetTimer(): void;
  initTimerInterval(timeLimit: number): void;
  getTimeFormat(): string;
}