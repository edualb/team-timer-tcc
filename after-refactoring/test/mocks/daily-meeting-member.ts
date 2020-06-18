import { DailyMeetingMemberProvider } from "../../src/providers/daily-meeting/daily-meeting-member";
import { Membro } from "../../src/contents/membro";

export class DailyMeetingMemberProviderMock extends DailyMeetingMemberProvider {
  
  drawMembers: Membro[] = []

  resetTimer() { }

  drawingMembers(members: Membro[]) {
    this.drawMembers = members
  }
}