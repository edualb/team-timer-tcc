import { 
  AdMobFree, 
  AdMobFreeBanner, 
  AdMobFreeBannerConfig 
} from "@ionic-native/admob-free";

export class AdMobFreeMock extends AdMobFree {
  banner: AdMobFreeBannerMock;
}

class AdMobFreeBannerMock extends AdMobFreeBanner {
  config(options: AdMobFreeBannerConfig): AdMobFreeBannerConfig {
    return options;
  }

  prepare(): Promise<any> {
    return new Promise<any>(resolve => {
      resolve('done');
    });
  }

  show(): Promise<any> {
    return new Promise<any>(resolve => {
      resolve('done');
    });
  }
}