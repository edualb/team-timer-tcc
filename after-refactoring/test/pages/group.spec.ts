import { Membro } from "../../src/contents/membro";
import { GroupPage } from "../../src/pages/group/group";
import { SettingsGroupPage } from "../../src/pages/settings-group/settings-group";
import { TimerGroupPage } from "../../src/pages/timer-group/timer-group";
import { GroupUtils } from "../utils/group.utils";
import { InsomniaMock } from "../mocks/insomnia.mock";
import { PlatformMock } from "../mocks/platform.mock";
import { NavParamsMock } from "../mocks/nav-params.mock";
import { GrupoProviderMock } from "../mocks/group-provider.mock";
import { NavControllerMock } from "../mocks/nav-controller.mock";
import { MembroProviderMock } from "../mocks/member-provider.mock";

/* TO DO LIST
* Tratar caso this.navParams.get('groupKey') venha uma key null/undefined
* Tratar caso this.grupoProvider.getGrupo não ache nenhum grupo
* nome é boolean???
* Tratar se this.key está null/undefined em vaiParaSettingsGroup
* Tratar se this.key e this.grupo está null/undefined em vaiParaTimer
* O que é key?
* Tratar se this.grupo está null/undefined em addMembro
* Verificar se this.key e this.grupo está em addMembro
* Tratar se this.grupo está null/undefined em deletaMembro
* Tratar se grupo.membros e this.key está null/undefined em possuiPresencaMembros
*/
describe('GroupPage', () => {

  let component: GroupPage;
  let insomnia: InsomniaMock;
  let platform: PlatformMock;
  let groupProvider: GrupoProviderMock;
  let navCtrl: NavControllerMock;
  let memberProvider: MembroProviderMock;
  let navParams: NavParamsMock;

  beforeEach(() => {
    insomnia = new InsomniaMock();
    platform = new PlatformMock();
    groupProvider = new GrupoProviderMock();
    navCtrl = new NavControllerMock()
    memberProvider = new MembroProviderMock();
    navParams = new NavParamsMock();
    navParams.isGroupTest = true;

    component = new GroupPage(
      navCtrl,
      navParams, 
      groupProvider,
      memberProvider, 
      insomnia, 
      platform
    );
  });

  it('should be initialized component', () => {
    expect(component).toBeTruthy();
    expect(component.key).toBeUndefined();
    expect(component.grupo).toBeUndefined();
    expect(component.nome).toBeTrue();
    expect(component.faltouTodosMembros).toBeUndefined();
  });

  it('should be set key property on ionViewWillEnter', () => {
    component.ionViewWillEnter();
    expect(component.key).toEqual('Group team-timer');
  });

  it('should be set group and call possuiPresencaMembros on ionViewWillEnter', () => {
    spyOn(component, 'possuiPresencaMembros');
    let spy = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(GroupUtils.createGroup()))

    component.ionViewWillEnter();
    spy.calls.mostRecent().returnValue.then(() => {
      expect(component.grupo).toBeTruthy();
      expect(component.grupo.membros.length).toEqual(2);
      expect(component.grupo.titulo).toEqual('Group team-timer');
      expect(component.grupo.tempoLimite).toEqual('00:01:20');
      expect(component.possuiPresencaMembros).toHaveBeenCalled();
      expect(component.possuiPresencaMembros).toHaveBeenCalledWith(component.grupo);
    });
  });

  it('should be call allowSleepAgain in cordova platform on ionViewWillEnter', (done) => {
    spyOn(window.console, 'log');
    let spy = spyOn(insomnia, 'allowSleepAgain').and.returnValue(Promise.resolve('done'));

    component.ionViewWillEnter()
    spy.calls.mostRecent().returnValue.then(() => {
      expect(window.console.log).toHaveBeenCalled()
      expect(window.console.log).toHaveBeenCalledWith('success');
      expect(window.console.log).toHaveBeenCalledWith('error');
      expect(insomnia.allowSleepAgain).toHaveBeenCalled();
      done();
    })
  });

  it('should not be call allowSleepAgain in cordova platform on ionViewWillEnter', () => {
    spyOn(window.console, 'log');
    spyOn(insomnia, 'allowSleepAgain')
    spyOn(platform, 'is');
    platform.isCordova = false;

    component.ionViewWillEnter()
    expect(platform.is).toHaveBeenCalled();
    expect(window.console.log).not.toHaveBeenCalled()
    expect(insomnia.allowSleepAgain).not.toHaveBeenCalled();

  });
  
  it('should be push to SettingsGroupPage on vaiParaSettingsGroup', () => {
    component.key = 'Group team-timer';

    component.vaiParaSettingsGroup();
    expect(navCtrl.page).toEqual(SettingsGroupPage);
    expect(navCtrl.params.groupKey).toEqual('Group team-timer');
    expect(navCtrl.params.novoGrupo).toBeFalse();
    let qtyNavCtrlParams = Object.keys(navCtrl.params);
    expect(qtyNavCtrlParams.length).toEqual(2);
  });

  it('should be call update member from group provider on vaiParaTimer', () => {
    spyOn(groupProvider, 'update');
    let key = 'Group team-timer';
    let group = GroupUtils.createGroup();
    
    component.grupo = group;
    component.key = key;
    component.vaiParaTimer();
    expect(groupProvider.update).toHaveBeenCalled();
    expect(groupProvider.update).toHaveBeenCalledWith(key, group);
  })

  it('should be push to TimerGroupPage on vaiParaTimer', () => {
    let key = 'Group team-timer';
    let group = GroupUtils.createGroup();
    
    component.grupo = group;
    component.key = key;
    component.vaiParaTimer();
    expect(navCtrl.page).toEqual(TimerGroupPage);
    expect(navCtrl.params.groupKey).toEqual('Group team-timer');
    let qtyNavCtrlParams = Object.keys(navCtrl.params);
    expect(qtyNavCtrlParams.length).toEqual(1);
  });

  it('should be push a new member inside of grupo on addMembro', () => {
    let key = 'Group team-timer';
    let group = GroupUtils.createGroup();
    let newMember = new Membro(3, 'Carol', '00:01:20');

    component.key = key;
    component.grupo = group;

    expect(component.grupo.membros.length).toEqual(2);
    component.addMembro(newMember);
    expect(component.grupo.membros.length).toEqual(3);
    expect(component.grupo.membros[2]).toEqual(newMember);
  })

  it('should be call update member from group provider on addMembro', () => {
    spyOn(groupProvider, 'update');
    let key = 'Group team-timer';
    let group = GroupUtils.createGroup();
    let newMember = new Membro(3, 'Carol', '00:01:20');

    component.key = key;
    component.grupo = group;
    component.addMembro(newMember);
    expect(groupProvider.update).toHaveBeenCalled();
    group.membros.push(newMember);
    expect(groupProvider.update).toHaveBeenCalledWith(key, group);
  })

  it('should be call delete member from member provider on deletaMembro', () => {
    spyOn(memberProvider, 'deletaMembro');
    let group = GroupUtils.createGroup();
    let removeMember = new Membro(1, 'Eduardo', '00:01:20');

    component.grupo = group;
    component.deletaMembro(removeMember);
    expect(memberProvider.deletaMembro).toHaveBeenCalled();
    expect(memberProvider.deletaMembro).toHaveBeenCalledWith(removeMember, group.membros);
  });

  it('should be call update members from group provider on possuiPresencaMembros', () => {
    spyOn(groupProvider, 'update');
    let key = 'Group team-timer';
    let group = GroupUtils.createGroup();

    component.key = key;
    component.possuiPresencaMembros(group);
    expect(groupProvider.update).toHaveBeenCalled();
    expect(groupProvider.update).toHaveBeenCalledWith(key, group);
  })

  it('should be faltouTodosMembros property true when all members.presenca are false', () => {
    let key = 'Group team-timer';
    let group = GroupUtils.createGroup();
    group.membros.forEach(member => {
      member.presenca = false;
    });

    component.key = key;
    component.possuiPresencaMembros(group);
    expect(component.faltouTodosMembros).toBeTrue();
  });

  it('should be faltouTodosMembros property false when all members.presenca are true', () => {
    let key = 'Group team-timer';
    let group = GroupUtils.createGroup();
    group.membros.forEach(member => {
      member.presenca = true;
    });

    component.key = key;
    component.possuiPresencaMembros(group);
    expect(component.faltouTodosMembros).toBeFalse();
  });

  it('should be faltouTodosMembros property false when one member.presenca of all is false', () => {
    let key = 'Group team-timer';
    let group = GroupUtils.createGroup();
    group.membros[0].presenca = true;
    group.membros[1].presenca = false;

    component.key = key;
    component.possuiPresencaMembros(group);
    expect(component.faltouTodosMembros).toBeFalse();
  });

});

