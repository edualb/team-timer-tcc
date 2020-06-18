import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SettingsGroupPage } from '../settings-group/settings-group';
import { TimerGroupPage } from '../timer-group/timer-group';
import { GrupoProvider } from '../../providers/grupo/grupo';
import { Grupo } from '../../contents/Grupo';
import { Membro } from '../../contents/membro';
import { MembroProvider } from '../../providers/grupo/membro';
import { Insomnia } from '@ionic-native/insomnia';

@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage{

    key: string;
    grupo: Grupo;
    nome = true;
    faltouTodosMembros: boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private grupoProvider: GrupoProvider,
                private membroProvider: MembroProvider,
                private insomnia: Insomnia,
                private platform: Platform) {
    }

    ionViewWillEnter() {
        this.key = this.navParams.get('groupKey');
        this.grupoProvider.getGrupo(this.key).then((result) => {
            this.grupo = result;
            this.possuiPresencaMembros(this.grupo);
        });

        if (this.platform.is('cordova')) {
            this.insomnia.allowSleepAgain().then(() => {
                console.log('success'),
                console.log('error')
            });
        }
    }

    vaiParaSettingsGroup() {
        this.navCtrl.push(SettingsGroupPage, {
            groupKey: this.key,
            novoGrupo: false
        });
    }

    vaiParaTimer() {
        this.grupoProvider.update(this.key, this.grupo);
        this.navCtrl.push(TimerGroupPage, {
            groupKey: this.key
        });
    }

    addMembro(membro: Membro) {
        this.grupo.membros.push(membro);
        this.grupoProvider.update(this.key, this.grupo);
    }

    deletaMembro(membro: Membro) {
        this.membroProvider.deletaMembro(membro, this.grupo.membros);
    }

    possuiPresencaMembros(grupo: Grupo) {
        let countMembers = 0;

        this.grupoProvider.update(this.key, grupo);
        grupo.membros.forEach(element => {
            if (element.presenca === true) {
                countMembers++;
            }
        });
        this.faltouTodosMembros = countMembers === 0;
    }

}
