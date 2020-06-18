import { SocialSharing } from "@ionic-native/social-sharing";

export class SocialSharingMock extends SocialSharing {
  isShareSuccess = true;

  share(message?: string, subject?: string, file?: string | string[], url?: string): Promise<any> {
      return new Promise((resolve, reject) => {
        if (this.isShareSuccess) {
          resolve('done');
        } else {
          reject('share error');
        }
      });
  }
}