import { Injectable } from "@angular/core";
import { Membro } from "../../contents/membro";
import { SharingMessageContent } from "../../contents/sharing-message";
import { DailyMeetingSharing } from "./interfaces/daily-meeting-sharing.interface";

@Injectable()
export class DailyMeetingSharingMessageProvider implements DailyMeetingSharing {
  share: SharingMessageContent = new SharingMessageContent();
  
  private membersMessage: string = '';

  public buildMessage() {
    this.share.message = 'Group: ' + this.share.title + '\n'
      + 'Suggested time per member: ' + this.share.timeLimit + '\n'
      + 'Standup time: ' + this.share.standupTime + '\n'
      + 'Time on hold: ' + this.share.timeWaited + '\n'
      + this.membersMessage;
  }

  public setMembersAndTime() {
    let membersWithTime = '-----MEMBERS-----';
    this.share.members.forEach(member => {
      membersWithTime +=  this.formatMemberMessage(member);
    });
    this.membersMessage =  membersWithTime.toString();
  }

  public setTimeMembers(time: string, currentMember: Membro) {
    this.share.members.push({
      id: currentMember.id,
      nome: currentMember.nome,
      tempo: time,
      presenca: currentMember.presenca,
      passouTempoSugerido: currentMember.passouTempoSugerido
    }); 
  }

  private formatMemberMessage(member: Membro): string {
    let memberMessage = member.nome + '(' + member.tempo + ')';
    return member.passouTempoSugerido ? 
      '\n' + '*' + memberMessage + '*' : 
      '\n' + memberMessage
  }

}