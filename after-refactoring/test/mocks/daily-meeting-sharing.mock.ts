import { DailyMeetingSharingMessageProvider } from "../../src/providers/daily-meeting/daily-meeting-sharing";
import { Membro } from "../../src/contents/membro";

export class DailyMeetingSharingMessageProviderMock extends DailyMeetingSharingMessageProvider {
  
  title: string;
  timeWaited: string;
  standupTime: string;
  timeLimit: string;

  message: string;
  members: Membro[];

  public buildMessage(): void {
  }

  public setMembersAndTime(): void {
    return;
  }
  
  setTimeMembers(time: string, currentMember: Membro): void {
    this.members.push(currentMember);
  }

}