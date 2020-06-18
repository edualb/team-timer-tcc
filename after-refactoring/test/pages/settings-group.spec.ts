import { Toast } from "ionic-angular";
import { Membro } from "../../src/contents/membro";
import { SettingsGroupPage } from "../../src/pages/settings-group/settings-group";
import { ToastControllerMock } from "../mocks/toast-controller.mock";
import { GroupUtils } from "../utils/group.utils";
import { GrupoProviderMock } from "../mocks/group-provider.mock";
import { MembroProviderMock } from "../mocks/member-provider.mock";
import { NavParamsMock } from "../mocks/nav-params.mock";
import { NavControllerMock } from "../mocks/nav-controller.mock";

/*
* Exbir pagina default de error caso de algum problema de pegar algum parametro
* Tratar campos ao criar grupo em criarNovoGrupo
* Verificar se o formato do tempo é válido em inserirTempoNosMembros
* Verificar se membros não está vazio em inserirTempoNosMembros
* Verificar se membros está vazio em deletaMembro
*/
describe('SettingsGroupPage', () => {

  let component: SettingsGroupPage;
  let toast: ToastControllerMock;
  let navParam: NavParamsMock;
  let groupProvider: GrupoProviderMock;
  let navCtrl: NavControllerMock;
  let memberProvider: MembroProviderMock;

  beforeEach(() => {
    toast = new ToastControllerMock();
    navParam = new NavParamsMock();
    groupProvider = new GrupoProviderMock();
    navCtrl = new NavControllerMock();
    memberProvider = new MembroProviderMock();

    component = new SettingsGroupPage(
      navCtrl, 
      navParam, 
      groupProvider, 
      toast, 
      memberProvider
    );
  });

  it('should be initialized component', () => {
    expect(component).toBeTruthy();
  });

  it('should be getGrupo with novoGrupo parameter false on ionViewWillEnter', (done) => {
    let group = GroupUtils.createGroup();
    let spy = spyOn(groupProvider, 'getGrupo').and.returnValue(Promise.resolve(group));

    component.ionViewWillEnter()
    expect(component.novoGrupo).toBeFalse();
    spy.calls.mostRecent().returnValue.then(() => {
      expect(component.grupo).toEqual(group);
      expect(component.nomeGrupoInput).toEqual(group.titulo);
      expect(component.tempoGrupo).toEqual(group.tempoLimite);
      done();
    })
  });

  it('should not be getGrupo with novoGrupo parameter true on ionViewWillEnter', () => {
    navParam.isNewGroup = true;

    component.ionViewWillEnter();
    expect(component.novoGrupo).toBeTrue();
    expect(component.grupo).toBeUndefined();
    expect(component.nomeGrupoInput).toEqual('');
    expect(component.tempoGrupo).toEqual('00:00:00');
  });

  it('should be show a success message with a success insert group on criarNovoGrupo', (done) => {
    let group = GroupUtils.createGroup();
    component.nomeGrupoInput = group.titulo;
    component.membros = group.membros;
    component.tempoGrupo = group.tempoLimite;
    spyOn(navCtrl, 'pop');
    spyOn(Toast.prototype, 'present');
    let spy = spyOn(groupProvider, 'insert').and.returnValue(Promise.resolve());

    component.criarNovoGrupo();
    spy.calls.mostRecent().returnValue.then(() => {
      expect(toast.opts.message).toEqual('Grupo Criado');
      expect(toast.opts.duration).toEqual(2000);
      expect(toast.opts.position).toEqual('top');
      expect(Toast.prototype.present).toHaveBeenCalled();
      expect(navCtrl.pop).toHaveBeenCalled();
      done();
    });
  });

  it('should be show a fail message with a fail insert group on criarNovoGrupo', (done) => {
    let group = GroupUtils.createGroup();
    component.nomeGrupoInput = group.titulo;
    component.membros = group.membros;
    component.tempoGrupo = group.tempoLimite;
    spyOn(navCtrl, 'pop');
    spyOn(Toast.prototype, 'present');
    let spy = spyOn(groupProvider, 'insert').and.returnValue(Promise.reject());

    component.criarNovoGrupo();
    spy.calls.mostRecent().returnValue.then(() => {}).catch(() => {
      expect(toast.opts.message).toEqual('Erro ao criar novo grupo');
      expect(toast.opts.duration).toEqual(3000);
      expect(toast.opts.position).toEqual('top');
      expect(Toast.prototype.present).toHaveBeenCalled();
      expect(navCtrl.pop).not.toHaveBeenCalled();
      done();
    });
  });

  it('should be equal time for all members on inserirTempoNosMembros', () => {
    let group = GroupUtils.createGroup();
    let time = '00:05:00';
    component.membros = group.membros;

    component.inserirTempoNosMembros(time);
    component.membros.forEach(members => {
      expect(members.tempo).toEqual(time);
    });
  })

  it('should be add a member on addMembro', () => {
    let group = GroupUtils.createGroup();
    let newMember = new Membro(3, 'Carol', '00:01:20')
    component.membros = group.membros;

    expect(component.membros.length).toEqual(2);
    component.addMembro(newMember);
    expect(component.membros.length).toEqual(3);
    expect(component.membros[2]).toEqual(newMember);
  });

  it('should be add a member on addMembro', () => {
    let group = GroupUtils.createGroup();
    let newMember = new Membro(3, 'Carol', '00:01:20')
    component.membros = group.membros;

    expect(component.membros.length).toEqual(2);
    component.addMembro(newMember);
    expect(component.membros.length).toEqual(3);
    expect(component.membros[2]).toEqual(newMember);
  });

  it('should be save a group on saveGrupo', () => {
    let group = GroupUtils.createGroup()
    let groupInput = 'Super group team-timer';
    let timeGroup = '00:02:20';
    let key = 'key';

    component.key = key;
    component.grupo = group;
    component.nomeGrupoInput = groupInput;
    component.tempoGrupo = timeGroup;

    spyOn(component, 'inserirTempoNosMembros');
    spyOn(groupProvider, 'update');
    spyOn(navCtrl, 'pop');

    component.saveGrupo();

    expect(component.grupo.titulo).toEqual(groupInput);
    expect(component.grupo.tempoLimite).toEqual(timeGroup);
    expect(component.inserirTempoNosMembros).toHaveBeenCalled();
    expect(component.inserirTempoNosMembros).toHaveBeenCalledWith(timeGroup);
    expect(groupProvider.update).toHaveBeenCalled();
    expect(groupProvider.update).toHaveBeenCalledWith(key, component.grupo);
    expect(navCtrl.pop).toHaveBeenCalled();
  });

  it('should be delete a group on deletaGrupo', () => {
    let key = 'key';

    component.key = key;

    spyOn(groupProvider, 'remove');
    spyOn(navCtrl, 'popToRoot');

    component.deletaGrupo();

    expect(groupProvider.remove).toHaveBeenCalled();
    expect(groupProvider.remove).toHaveBeenCalledWith(key);
    expect(navCtrl.popToRoot).toHaveBeenCalled();
  });

  it('should be delete a member on deletaMembro', () => {
    let member = new Membro(1, "Eduardo", "00:01:20");
    let members = [];
    members.push(new Membro(1, "Eduardo", "00:01:20"));

    component.membros = members;

    spyOn(memberProvider, 'deletaMembro');

    component.deletaMembro(member);

    expect(memberProvider.deletaMembro).toHaveBeenCalled();
    expect(memberProvider.deletaMembro).toHaveBeenCalledWith(member, component.membros);
  });

});