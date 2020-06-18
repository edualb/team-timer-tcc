import { TimerGroupPage } from "../../src/pages/timer-group/timer-group";
import { DailyMeetingMainProviderMock } from "../mocks/daily-meeting-main.mock";
import { DailyMeetingMemberProviderMock } from "../mocks/daily-meeting-member";
import { DailyMeetingSharingMessageProviderMock } from "../mocks/daily-meeting-sharing.mock";
import { DailyMeetingWaitingProviderMock } from "../mocks/daily-meeting-waiting.mock";
import { GrupoProviderMock } from "../mocks/group-provider.mock";
import { InsomniaMock } from "../mocks/insomnia.mock";
import { NavParamsMock } from "../mocks/nav-params.mock";
import { PlatformMock } from "../mocks/platform.mock";
import { GroupUtils } from "../utils/group.utils";
import { MemberUtils } from "../utils/member.utils";

/* TO DO LIST
* Caso o getGrupo dê erro, como tratar?
* Caso o tempo venha tudo 0 em calculaTempoDecimal?
* Se não tiver membro em stopDailyMeeting?
*/
describe('TimerGroupPage', () => {

  let component: TimerGroupPage;
  let navParams: NavParamsMock;
  let groupProvider: GrupoProviderMock;
  let insomnia: InsomniaMock;
  let platform: PlatformMock;
  let sharingMessageProvider: DailyMeetingSharingMessageProviderMock;
  let DMMemberProvider: DailyMeetingMemberProviderMock;
  let DMWaitingProvider: DailyMeetingWaitingProviderMock;
  let DMMainProvider: DailyMeetingMainProviderMock;

  beforeEach(() => {
    navParams = new NavParamsMock();
    groupProvider = new GrupoProviderMock();
    insomnia = new InsomniaMock();
    platform = new PlatformMock();
    sharingMessageProvider = new DailyMeetingSharingMessageProviderMock();
    DMMemberProvider = new DailyMeetingMemberProviderMock();
    DMWaitingProvider = new DailyMeetingWaitingProviderMock();
    DMMainProvider = new DailyMeetingMainProviderMock();

    navParams.isTimerGroupTest = true;

    component = new TimerGroupPage(
      navParams, 
      groupProvider,
      sharingMessageProvider,
      DMMemberProvider,
      [DMMainProvider, DMWaitingProvider],
      insomnia,
      platform
    )
  });

  it('should be component initialized', () => {
    expect(component).toBeTruthy();
  });

  it('should be set key on ionViewWillEnter', () => {
    component.ionViewWillEnter();
    expect(component.key).toEqual('Group team-timer');
  });

  it('should be call keepAwake on ionViewWillEnter', (done) => {
    let spyInsomnia = spyOn(insomnia, 'keepAwake').and.returnValue(Promise.resolve('done'));
    
    spyOn(window.console, 'log');

    component.ionViewWillEnter();

    spyInsomnia.calls.mostRecent().returnValue.then(() => {
      expect(window.console.log).toHaveBeenCalled()
      expect(window.console.log).toHaveBeenCalledWith('success');
      expect(window.console.log).toHaveBeenCalledWith('error');
      expect(insomnia.keepAwake).toHaveBeenCalled();
      done();
    })
  });

  it('should be set group, draw members and limit time on ionViewWillEnter', (done) => {
    let group = GroupUtils.createGroup();

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));

    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      // expect(component.group).toEqual(group);
      // expect(component.group.membros[0].nome).toEqual('Eduardo');
      // expect(component.group.membros[1].nome).toEqual('André');
      expect(component.DMMemberProvider.drawMembers.length).toEqual(2);
      expect(component.DMMemberProvider.drawMembers[0].nome).toEqual('Eduardo');
      expect(component.DMMemberProvider.drawMembers[1].nome).toEqual('André');
      expect(component.timeLimitNumber).toEqual(80);
      done();
    })
  });

  it('should be return 0 for 00:00:00 calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '00:00:00';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(0);
      component.timeLimit
      done();
    })
  });

  it('should be return 3600 for 01:00:00 on calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '01:00:00';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(3600);
      component.timeLimit
      done();
    })
  });

  it('should be return 7200 for 02:00:00 on calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '02:00:00';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(7200);
      component.timeLimit
      done();
    })
  });

  it('should be return 60 for 00:01:00 on calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '00:01:00';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(60);
      component.timeLimit
      done();
    })
  });

  it('should be return 120 for 00:02:00 on calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '00:02:00';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(120);
      component.timeLimit
      done();
    })
  });

  it('should be return 1 for 00:00:01 on calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '00:00:01';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(1);
      component.timeLimit
      done();
    })
  });

  it('should be return 2 for 00:00:02 on calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '00:00:02';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(2);
      component.timeLimit
      done();
    })
  });

  it('should be return 3660 for 01:01:00 on calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '01:01:00';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(3660);
      component.timeLimit
      done();
    })
  });

  it('should be return 61 for 00:01:01 on calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '00:01:01';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(61);
      component.timeLimit
      done();
    })
  });

  it('should be return 3601 for 01:00:01 on calculaTempoDecimal', (done) => {
    let group = GroupUtils.createGroup();
    group.tempoLimite = '01:00:01';

    let spyGroupProvider = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));
    
    component.ionViewWillEnter();

    spyGroupProvider.calls.mostRecent().returnValue.then(() => {
      expect(component.timeLimitNumber).toEqual(3601);
      component.timeLimit
      done();
    })
  });

  it('should be set first access to false and initialize counting on proximoMembro', () => {
    spyOn(component, 'initTimerDailyMeeting');

    component.firstAccessDailyMeeting = true;

    component.nextMember();

    expect(component.firstAccessDailyMeeting).toBeFalse();
    expect(component.initTimerDailyMeeting).toHaveBeenCalled();
  });

  it('should be call stopDailyMeeting with one draw member on proximoMembro', () => {
    DMMemberProvider.hour = '00';
    DMMemberProvider.minute = '01';
    DMMemberProvider.second = '20';
    component.firstAccessDailyMeeting = false;
    component.DMMemberProvider.drawMembers.push(MemberUtils.createMember());

    spyOn(component, 'stopDailyMeeting');
    spyOn(component.DMMemberProvider, 'resetTimer');

    component.nextMember();

    expect(component.DMMemberProvider.resetTimer).toHaveBeenCalled();
    expect(component.stopDailyMeeting).toHaveBeenCalled();
    expect(component.stopDailyMeeting).toHaveBeenCalledWith('00:01:20');
  });

  it('should be call playDailyMeeting with two draw member on proximoMembro', () => {
    DMMemberProvider.hour = '00';
    DMMemberProvider.minute = '01';
    DMMemberProvider.second = '20';
    component.firstAccessDailyMeeting = false;
    component.DMMemberProvider.drawMembers.push(MemberUtils.createMember());
    component.DMMemberProvider.drawMembers.push(MemberUtils.createMember());

    spyOn(component, 'playDailyMeeting');
    spyOn(component.DMMemberProvider, 'resetTimer');

    component.nextMember();

    expect(component.DMMemberProvider.resetTimer).toHaveBeenCalled();
    expect(component.playDailyMeeting).toHaveBeenCalled();
    expect(component.playDailyMeeting).toHaveBeenCalledWith('00:01:20');
  });

  it('should be remove a member from draw member on continuaDailyMeeting', () => {
    component.DMMemberProvider.drawMembers.push(MemberUtils.createMember());

    spyOn(component.DMSharingProvider, 'setTimeMembers');
    spyOn(component.DMMemberProvider, 'clearTimerInterval');
    spyOn(component.DMMemberProvider, 'initTimerInterval');

    expect(component.DMMemberProvider.drawMembers.length).toEqual(1);
    let member = component.DMMemberProvider.drawMembers[0];

    component.playDailyMeeting('00:01:20');

    expect(component.DMSharingProvider.setTimeMembers).toHaveBeenCalled();
    expect(component.DMSharingProvider.setTimeMembers).toHaveBeenCalledWith(
      '00:01:20',
      member
    );
    expect(component.DMMemberProvider.drawMembers.length).toEqual(0);
    expect(component.DMMemberProvider.clearTimerInterval).toHaveBeenCalled();
    expect(component.DMMemberProvider.initTimerInterval).toHaveBeenCalled();
  });

  it('should be build a message on stopDailyMeeting', () => {
    component.DMMemberProvider.drawMembers.push(MemberUtils.createMember());
    (component.DMMainProvider as DailyMeetingMainProviderMock).hour = '00';
    (component.DMMainProvider as DailyMeetingMainProviderMock).minute = '02';
    (component.DMMainProvider as DailyMeetingMainProviderMock).second = '40';
    (component.DMWaitingProvider as DailyMeetingWaitingProviderMock).hour = '00';
    (component.DMWaitingProvider as DailyMeetingWaitingProviderMock).minute = '00';
    (component.DMWaitingProvider as DailyMeetingWaitingProviderMock).second = '20';

    spyOn(component.DMSharingProvider, 'setMembersAndTime');
    spyOn(component.DMSharingProvider, 'buildMessage');
    spyOn(component.DMSharingProvider, 'setTimeMembers');
    spyOn(component, 'stopTimerDailyMeeting');
    
    expect(component.DMMemberProvider.drawMembers.length).toEqual(1);
    let member = component.DMMemberProvider.drawMembers[0];

    expect(component.endDailyMeeting).toBeFalse();

    component.stopDailyMeeting('00:01:20');

    expect(component.DMSharingProvider.setTimeMembers).toHaveBeenCalled();
    expect(component.DMSharingProvider.setTimeMembers).toHaveBeenCalledWith(
      '00:01:20',
      member
    );
    expect(component.DMSharingProvider.setMembersAndTime).toHaveBeenCalled();
    expect(component.DMSharingProvider.buildMessage).toHaveBeenCalled();

    expect(component.stopTimerDailyMeeting).toHaveBeenCalled();
    expect(component.endDailyMeeting).toBeTrue();
    expect(component.DMMemberProvider.drawMembers.length).toEqual(0);
  });

  it('should be reset time and set stopTimer, timerMember and timer on initTimerDailyMeeting', () => {
    spyOn(component.DMMemberProvider, 'initTimerInterval');
    spyOn(component.DMMainProvider, 'initTimerInterval');

    component.initTimerDailyMeeting();

    expect(component.stopTimer).toBeFalse();
    expect(component.DMMemberProvider.initTimerInterval).toHaveBeenCalled();
    expect(component.DMMainProvider.initTimerInterval).toHaveBeenCalled();
  });

  it('should be reset time and set stopTimer, timerMember and timer on pararContagem', () => {
    expect(component.stopTimer).toBeFalse();

    spyOn(component.DMMemberProvider, 'clearTimerInterval');
    spyOn(component.DMWaitingProvider, 'initTimerInterval');
    spyOn(component.DMMainProvider, 'clearTimerInterval');

    component.stopTimerDailyMeeting();

    expect(component.stopTimer).toBeTrue();
    expect(component.DMWaitingProvider.initTimerInterval).toHaveBeenCalled();
    expect(component.DMMemberProvider.clearTimerInterval).toHaveBeenCalled();
    expect(component.DMMainProvider.clearTimerInterval).toHaveBeenCalled();
  });

})