import { Component, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-button-shared',
  templateUrl: 'button-shared.html',
})
export class ButtonSharedPage {

  @Input() msg: string;


  constructor(private shareProvider: SocialSharing) {}

  public share() {
    this.shareProvider.share(this.msg).then(() => {
      console.log('success');
    }).catch(() => console.log('error'));
  }

}
