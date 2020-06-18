import { DailyMeetingSharingMessageProvider } from "../../src/providers/daily-meeting/daily-meeting-sharing";
import { MemberUtils } from "../utils/member.utils";

describe('DailyMeetingSharingMessageProvider', () => {

  let provider: DailyMeetingSharingMessageProvider;

  beforeEach(() => {
    provider = new DailyMeetingSharingMessageProvider();
  });

  it('DailyMeetingSharingMessageProvider initialized', () => {
    expect(provider).toBeTruthy();
    expect(provider.share.members.length).toEqual(0);
    expect(provider.share.message).toBeUndefined();
  });

  it('should be set a new member in members', () => {
    let member = MemberUtils.createMember();

    provider.setTimeMembers('00:02:20', member);

    expect(provider.share.members.length).toEqual(1);
    expect(provider.share.members[0].tempo).toEqual('00:02:20');
    expect(provider.share.members[0].id).toEqual(member.id);
    expect(provider.share.members[0].nome).toEqual(member.nome);
    expect(provider.share.members[0].passouTempoSugerido).toEqual(member.passouTempoSugerido);
    expect(provider.share.members[0].presenca).toEqual(member.presenca);
  });

  it('should be build a message with all members in time', () => {
    let members = MemberUtils.createMembers();
    members.forEach((member) => {
      provider.setTimeMembers('00:01:20', member)
    })
    provider.share.title = 'Team Timer';
    provider.share.timeWaited = '00:00:20';
    provider.share.timeLimit = '00:02:30';
    provider.share.standupTime = '00:08:30';
    provider.setMembersAndTime();
    provider.buildMessage();

    let messageArray = provider.share.message.split('\n');

    expect(messageArray.length).toEqual(8);
    expect(messageArray[0]).toEqual('Group: Team Timer');
    expect(messageArray[1]).toEqual('Suggested time per member: 00:02:30');
    expect(messageArray[2]).toEqual('Standup time: 00:08:30');
    expect(messageArray[3]).toEqual('Time on hold: 00:00:20');
    expect(messageArray[4]).toEqual('-----MEMBERS-----');
    expect(messageArray[5]).toEqual('Eduardo(00:01:20)');
    expect(messageArray[6]).toEqual('André(00:01:20)');
    expect(messageArray[7]).toEqual('Carol(00:01:20)');
  });

  it('should be build a message with one members out of time on getMembrosETempo', () => {
    let members = MemberUtils.createMembers();
    members.forEach((member) => {
      provider.setTimeMembers('00:01:20', member)
    })
    provider.share.members[0].passouTempoSugerido = true;
    provider.share.members[0].tempo = '00:02:20';

    provider.share.title = 'Team Timer';
    provider.share.timeWaited = '00:00:20';
    provider.share.timeLimit = '00:02:30';
    provider.share.standupTime = '00:08:30';
    provider.setMembersAndTime();
    provider.buildMessage()

    let messageArray = provider.share.message.split('\n');

    expect(messageArray.length).toEqual(8);
    expect(messageArray[0]).toEqual('Group: Team Timer');
    expect(messageArray[1]).toEqual('Suggested time per member: 00:02:30');
    expect(messageArray[2]).toEqual('Standup time: 00:08:30');
    expect(messageArray[3]).toEqual('Time on hold: 00:00:20');
    expect(messageArray[4]).toEqual('-----MEMBERS-----');
    expect(messageArray[5]).toEqual('*Eduardo(00:02:20)*');
    expect(messageArray[6]).toEqual('André(00:01:20)');
    expect(messageArray[7]).toEqual('Carol(00:01:20)');
  });

  it('should be build a message with all members out of time on getMembrosETempo', () => {
    let members = MemberUtils.createMembers();
    members.forEach((member) => {
      member.passouTempoSugerido = true;
      provider.setTimeMembers('00:01:20', member)
    })

    provider.share.title = 'Team Timer';
    provider.share.timeWaited = '00:00:20';
    provider.share.timeLimit = '00:02:30';
    provider.share.standupTime = '00:08:30';
    provider.setMembersAndTime();
    provider.buildMessage()
    
    let messageArray = provider.share.message.split('\n');

    expect(messageArray.length).toEqual(8);
    expect(messageArray[0]).toEqual('Group: Team Timer');
    expect(messageArray[1]).toEqual('Suggested time per member: 00:02:30');
    expect(messageArray[2]).toEqual('Standup time: 00:08:30');
    expect(messageArray[3]).toEqual('Time on hold: 00:00:20');
    expect(messageArray[4]).toEqual('-----MEMBERS-----');
    expect(messageArray[5]).toEqual('*Eduardo(00:01:20)*');
    expect(messageArray[6]).toEqual('*André(00:01:20)*');
    expect(messageArray[7]).toEqual('*Carol(00:01:20)*');
  });

})