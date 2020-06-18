import { GrupoList } from "../../src/contents/Grupos";
import { GroupSelectorPage } from "../../src/pages/group-selector/group-selector";
import { GroupPage } from "../../src/pages/group/group";
import { SettingsGroupPage } from "../../src/pages/settings-group/settings-group";
import { GrupoProviderMock } from "../mocks/group-provider.mock";
import { NavControllerMock } from "../mocks/nav-controller.mock";
import { NavParamsMock } from "../mocks/nav-params.mock";
import { GroupListUtils } from "../utils/group-list.utils";

/*
* Tratar caso getAll não ache nenhum grupo
*/
describe('GroupSelectorPage', () => {

  let component: GroupSelectorPage;
  let navCtrl: NavControllerMock;
  let navParams: NavParamsMock;
  let groupProvider: GrupoProviderMock;

  beforeEach(() => {
    navCtrl = new NavControllerMock();
    navParams = new NavParamsMock();
    groupProvider = new GrupoProviderMock();

    navParams.isGroupSelectorTest = true;

    component = new GroupSelectorPage(navCtrl, navParams, groupProvider);
  });

  it('should be initialized component', () => {
    expect(component).toBeTruthy();
  });

  it('should be set group in component on ionViewDidEnter', (done) => {
    let listGroup: GrupoList[] = GroupListUtils.createGroupList();
    let spy = spyOn(groupProvider, 'getAll').and.returnValue(Promise.resolve(listGroup));

    component.ionViewDidEnter();
    spy.calls.mostRecent().returnValue.then((resultGroup) => {
      expect(groupProvider.getAll).toHaveBeenCalled();
      expect(resultGroup).toEqual(listGroup);
      expect(component.grupos).toEqual(listGroup);
      done();
    });
  });

  it('should be push to GroupPage on vaiParaGroup', () => {
    component.vaiParaGroup('Group team-timer');
    expect(navCtrl.page).toEqual(GroupPage)
    expect(navCtrl.params.groupKey).toEqual('Group team-timer');
    let qtyNavCtrlParams = Object.keys(navCtrl.params);
    expect(qtyNavCtrlParams.length).toEqual(1);
  });

  it('should be push to SettingsGroupPage on adicionarGrupo', () => {
    component.adicionarGrupo();
    expect(navCtrl.page).toEqual(SettingsGroupPage);
    expect(navCtrl.params.nome).toEqual('');
    expect(navCtrl.params.tempoGrupo).toEqual('00:00:00');
    expect(navCtrl.params.novoGrupo).toBeTrue();
    let qtyNavCtrlParams = Object.keys(navCtrl.params);
    expect(qtyNavCtrlParams.length).toEqual(3);
  });

})