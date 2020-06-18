import { DailyMeetingMemberProvider } from "../../src/providers/daily-meeting/daily-meeting-member";
import { MemberUtils } from "../utils/member.utils";

describe('DailyMeetingMemberProvider', () => {

  let provider: DailyMeetingMemberProvider;

  beforeEach(() => {
    provider = new DailyMeetingMemberProvider();
  });

  it('DailyMeetingMemberProvider initialized', () => {
    expect(provider).toBeTruthy();
    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('00');
    expect(provider.second).toEqual('00');
    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(0);
    expect(provider.secondNumber).toEqual(0);
  });

  it('should be reset timer of members on zeraTempo', () => {
    provider.resetTimer();

    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('00');
    expect(provider.second).toEqual('00');
    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(0);
    expect(provider.secondNumber).toEqual(0);
  });

  it('should be set draw members on sortearMembros', () => {
    let members = MemberUtils.createManyMembers();
    members[0].presenca = false;
    members[3].presenca = false;
    members[8].presenca = false;

    spyOn(Math, 'floor').and.returnValue(4);

    expect(members[0].nome).toEqual('Eduardo');
    expect(members[1].nome).toEqual('André');
    expect(members[2].nome).toEqual('Carol');
    expect(members[3].nome).toEqual('Barbara');
    expect(members[4].nome).toEqual('Cláudia');
    expect(members[5].nome).toEqual('Paulo');
    expect(members[6].nome).toEqual('Ana');
    expect(members[7].nome).toEqual('Angelo');
    expect(members[8].nome).toEqual('Lula');

    provider.drawingMembers(members);
    
    expect(provider.drawMembers.length).toEqual(6);
    expect(provider.drawMembers[0].nome).toEqual('Ana');
    expect(provider.drawMembers[1].nome).toEqual('Angelo');
    expect(provider.drawMembers[2].nome).toEqual('André');
    expect(provider.drawMembers[3].nome).toEqual('Carol');
    expect(provider.drawMembers[4].nome).toEqual('Cláudia');
    expect(provider.drawMembers[5].nome).toEqual('Paulo');
  });

  it('should be send the first member to the last on pularMembro', () => {
    provider.drawMembers = MemberUtils.createMembers();

    expect(provider.drawMembers[0].nome).toEqual('Eduardo');
    expect(provider.drawMembers[1].nome).toEqual('André');
    expect(provider.drawMembers[2].nome).toEqual('Carol');

    provider.sendMemberToLast(90)

    expect(provider.drawMembers[0].nome).toEqual('André');
    expect(provider.drawMembers[1].nome).toEqual('Carol');
    expect(provider.drawMembers[2].nome).toEqual('Eduardo');
  });

  it('should be up second on upTimeMember', () => {
    let member = MemberUtils.createMember();

    provider.drawMembers.push(member);
    provider.hourNumber = 0;
    provider.minuteNumber = 1;
    provider.secondNumber = 20;

    provider.updateTimeMember(90);

    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(1);
    expect(provider.secondNumber).toEqual(21);
    expect(provider.drawMembers[0].passouTempoSugerido).toBeFalse();
    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('01');
    expect(provider.second).toEqual('21');
  });

  it('should be up minute on upTimeMember', () => {
    let member = MemberUtils.createMember();

    provider.drawMembers.push(member);
    provider.hourNumber = 0;
    provider.minuteNumber = 0;
    provider.secondNumber = 59;

    provider.updateTimeMember(90);

    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(1);
    expect(provider.secondNumber).toEqual(0);
    expect(provider.drawMembers[0].passouTempoSugerido).toBeFalse();
    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('01');
    expect(provider.second).toEqual('00');
  });

  it('should be up hour on upTimeMember', () => {
    let member = MemberUtils.createMember();

    provider.drawMembers.push(member);
    provider.hourNumber = 0;
    provider.minuteNumber = 59;
    provider.secondNumber = 59;

    provider.updateTimeMember(4000);

    expect(provider.hourNumber).toEqual(1);
    expect(provider.minuteNumber).toEqual(0);
    expect(provider.secondNumber).toEqual(0);
    expect(provider.drawMembers[0].passouTempoSugerido).toBeFalse();
    expect(provider.hour).toEqual('01');
    expect(provider.minute).toEqual('00');
    expect(provider.second).toEqual('00');
  });

  it('should be set passouTempoSugerido to true on upTimeMember', () => {
    let member = MemberUtils.createMember();

    provider.drawMembers.push(member);
    provider.hourNumber = 0;
    provider.minuteNumber = 1;
    provider.secondNumber = 30;

    provider.updateTimeMember(90);

    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(1);
    expect(provider.secondNumber).toEqual(31);
    expect(provider.drawMembers[0].passouTempoSugerido).toBeTrue();
    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('01');
    expect(provider.second).toEqual('31');
  });

})