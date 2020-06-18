import { ButtonSharedPage } from "../../src/pages/button-shared/button-shared";
import { SocialSharingMock } from "../mocks/social-sharing.mock";

/* TO DO LIST
* Verificar se a mensagem de envio está na formatação correta
* Tratar error caso a mensagem não tenha sido enviada com sucesso (feature)
* Pedir para o usuário avaliar o aplicativo após o sucesso do envio (feature)
*/
describe('ButtonSharedPage', () => {
  
  let component: ButtonSharedPage;
  let socialSharing: SocialSharingMock;

  beforeEach(() => {
    socialSharing = new SocialSharingMock();
    component = new ButtonSharedPage(socialSharing);
  });

  it('should be initialized component', () => {
    expect(socialSharing).toBeTruthy();
    expect(socialSharing.isShareSuccess).toBeTrue();
    expect(component).toBeTruthy();
    expect(component.msg).toBeUndefined();
  });

  it('should be show success message after share() function', (done) => {
    spyOn(window.console, 'log');
    let spy = spyOn(socialSharing, 'share').and.returnValue(Promise.resolve('done'));

    component.msg = 'send a message to share'
    component.share();
    spy.calls.mostRecent().returnValue.then(() => {
      expect(socialSharing.share).toHaveBeenCalled();
      expect(socialSharing.share).toHaveBeenCalledWith(component.msg);
      expect(window.console.log).toHaveBeenCalled();
      expect(window.console.log).toHaveBeenCalledWith('success');
      done();
    });
  });

  it('should be show error message after share() function', async (done) => {
    spyOn(window.console, 'log');
    let spy = spyOn(socialSharing, 'share').and.returnValue(Promise.reject('done'));

    component.msg = 'send a message to share';
    component.share();

    spy.calls.mostRecent().returnValue.then(() => {}).catch(() => {
      expect(socialSharing.share).toHaveBeenCalled();
      expect(socialSharing.share).toHaveBeenCalledWith(component.msg);
      expect(window.console.log).toHaveBeenCalled();
      expect(window.console.log).toHaveBeenCalledWith('error');
      done();
    });
});

});