import { Membro } from "../../../contents/membro";
import { SharingMessageContent } from "../../../contents/sharing-message";

export interface DailyMeetingSharing {

  share: SharingMessageContent;

  setTimeMembers(time: string, member: Membro): void;
  setMembersAndTime(): void;
  buildMessage(): void;
}