import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Membro } from '../../contents/membro';

@Component({
  selector: 'page-button-add-member',
  templateUrl: 'button-add-member.html',
})
export class ButtonAddMemberPage {

    membro: Membro;
    @Input() id: number;
    @Input() tempo: string;
    @Output() respostaMembros = new EventEmitter<Membro>();

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddMemberPage');
    }

    openAddMembro() {
        let alert = this.alertCtrl.create({
        title: 'Add member',
        inputs: [
            {
            name: 'nome',
            placeholder: 'Member name'
            },
        ],
        buttons: [
            {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
                console.log('Cancel clicked');
            }
            },
            {
            text: 'Ok',
            handler: data => {
                this.membro = new Membro(this.id, data.nome, this.tempo);
                this.emiteMembro(this.membro);
            }
            }
        ]
        });
        alert.present();
    }

    emiteMembro(membro: Membro) {
        this.respostaMembros.emit(membro)
    }

}
