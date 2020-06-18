import { MyApp } from '../../src/app/app.component';
import { PlatformMock } from '../mocks/platform.mock';
import { StatusBarMock } from '../mocks/status-bar.mock';
import { SplashScreenMock } from '../mocks/splash-screen.mock';
import { AdMobFreeMock } from '../mocks/ad-mob-free.mock';

describe('MyApp', () => {
  
  let component: MyApp;

  beforeEach(() => {
    component = new MyApp
      (
        new PlatformMock(),
        new StatusBarMock(),
        new SplashScreenMock(),
        new AdMobFreeMock()
      );
  });
  
  it('showSplash needs to be true when init app', () => {
    expect(component.showSplash).toBeTrue();
  });

  it('showSplash needs to be true after 2.79s', () => {
    setTimeout(() => {
      expect(component.showSplash).toBeTrue();
    }, 2799);
  });

  it('showSplash needs to be false after 2.8s', () => {
    setTimeout(() => {
      expect(component.showSplash).toBeFalse();
    }, 2800)
  });

});