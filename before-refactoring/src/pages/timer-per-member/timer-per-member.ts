import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-timer-per-member',
  templateUrl: 'timer-per-member.html',
})
export class TimerPerMemberPage {

  @Input() show: boolean;
  @Input() membros: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.membros);
    console.log(this.show);
    console.log('ionViewDidLoad TimerPerMemberPage');
  }

}
