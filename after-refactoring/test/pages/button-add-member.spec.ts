import { AlertButton, App, Config, Platform } from "ionic-angular"
import { Membro } from "../../src/contents/membro"
import { ButtonAddMemberPage } from "../../src/pages/button-add-member/button-add-member"
import { AlertControllerMock, AlertMock } from "../mocks/alert-controller.mock"
import { NavControllerMock } from "../mocks/nav-controller.mock"
import { NavParamsMock } from "../mocks/nav-params.mock"


/* TODO LIST
* - Teste para verificar se a propriedade tempo está no formato certo (On click Ok button)
* - Padronizar classe para inglês
* - Verificar se o membro está null ou não ao chamar emiteMembro
* - Verificar se o membro está null ou não ao clicar no botão OK (On click Ok button)
*/
describe('ButtonAddMember', () => {

  let component: ButtonAddMemberPage;
  let alertCtrl: AlertControllerMock;

  beforeEach(() => {
    alertCtrl = new AlertControllerMock(
      new App(
        new Config(),
        new Platform()
      ),
      new Config()
    );
    component = new ButtonAddMemberPage(new NavControllerMock(), new NavParamsMock(), alertCtrl);
  })

  it('should be initialized component', () => {
    expect(component).toBeTruthy();
  })

  it('should be build title', () => {
    component.openAddMembro();
    expect(alertCtrl.alert.alertOptions.title).toEqual('Add member');
  })

  it('should be build member name input', () => {
    component.openAddMembro();
    let memberNameInput = alertCtrl.alert.alertOptions.inputs[0];
    expect(memberNameInput.name).toEqual('nome');
    expect(memberNameInput.placeholder).toEqual('Member name');
  })

  it('should be build cancel button', () => {
    component.openAddMembro();
    let cancelButton = alertCtrl.alert.alertOptions.buttons[0];
    expect((cancelButton as AlertButton).text).toEqual('Cancel');
    expect((cancelButton as AlertButton).role).toEqual('cancel');
  })

  it('On click cancel button', () => {
    spyOn(window.console, 'log');

    component.openAddMembro();
    let cancelButton = alertCtrl.alert.alertOptions.buttons[0];
    (cancelButton as AlertButton).handler(null);
    expect(window.console.log).toHaveBeenCalled();
  })

  it('should be build Ok button', () => {
    component.openAddMembro();
    let OkButton = alertCtrl.alert.alertOptions.buttons[1];
    expect((OkButton as AlertButton).text).toEqual('Ok');
  })

  it('On click Ok button', () => {
    spyOn(component, 'emiteMembro');

    component.id = 1;
    component.tempo = '01:20';
    expect(component.membro).toBeUndefined();
    component.openAddMembro();
    let OkButton = alertCtrl.alert.alertOptions.buttons[1];
    (OkButton as AlertButton).handler({nome: 'Eduardo Albuquerque da Silva'});
    expect(component.membro).toBeTruthy();
    expect(component.membro.id).toEqual(1);
    expect(component.membro.nome).toEqual('Eduardo Albuquerque da Silva');
    expect(component.membro.tempo).toEqual('01:20');
    expect(component.membro.passouTempoSugerido).toBeFalse();
    expect(component.membro.presenca).toBeTrue();
    expect(component.emiteMembro).toHaveBeenCalled();
    expect(component.emiteMembro).toHaveBeenCalledWith(component.membro);
  })

  it('should be call present function on call openAddMembro', () => {
    spyOn(AlertMock.prototype, 'present');

    component.openAddMembro();
    expect(AlertMock.prototype.present).toHaveBeenCalled();
  })

  it('should be call EventEmitter.emit function on call emiteMembro', () => {
    spyOn(component.respostaMembros, 'emit');

    let member: Membro = new Membro(1, 'Eduardo Albuquerque da Silva', '01:20');
    component.emiteMembro(member);
    expect(component.respostaMembros.emit).toHaveBeenCalled();
    expect(component.respostaMembros.emit).toHaveBeenCalledWith(member);
  })

})