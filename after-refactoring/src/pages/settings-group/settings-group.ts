import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Grupo } from '../../contents/Grupo';
import { GrupoProvider } from '../../providers/grupo/grupo';
import { Membro } from '../../contents/membro';
import { MembroProvider } from '../../providers/grupo/membro';

@Component({
    selector: 'page-settings-group',
    templateUrl: 'settings-group.html',
})
export class SettingsGroupPage {

    nomeGrupoInput: string = '';
    tempoGrupo: string = '00:00:00';
    grupo: Grupo;
    key: string;
    membros: Membro[] = [];
    novoGrupo: boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private grupoProvider: GrupoProvider,
                private toast: ToastController,
                private membroProvider: MembroProvider) {
    }

    ionViewWillEnter() {
        this.novoGrupo = this.navParams.get('novoGrupo');

        if (!this.novoGrupo) {
            this.key = this.navParams.get('groupKey');
            this.grupoProvider.getGrupo(this.key).then((result) => {
                this.grupo = result;
                this.nomeGrupoInput = this.grupo.titulo;
                this.tempoGrupo = this.grupo.tempoLimite;
            });
        }
    }

    criarNovoGrupo() {
        this.inserirTempoNosMembros(this.tempoGrupo);
        this.grupo = new Grupo(this.nomeGrupoInput, this.membros, this.tempoGrupo)
        return this.grupoProvider.insert(this.grupo)
            .then(() => {
                this.toast.create({
                        message: 'Grupo Criado',
                        duration: 2000,
                        position: 'top'
                }).present();
                this.navCtrl.pop();
            })
            .catch(() => {
                this.toast.create({
                    message: 'Erro ao criar novo grupo',
                    duration: 3000,
                    position: 'top'
                }).present()
            });
    }

    inserirTempoNosMembros(tempo: string) {
        this.membros.forEach(membro => {
            membro.tempo = tempo;
        });
    }

    addMembro(membro) {
        this.membros.push(membro);
    }

    saveGrupo() {
        this.grupo.titulo = this.nomeGrupoInput;
        this.grupo.tempoLimite = this.tempoGrupo;
        this.inserirTempoNosMembros(this.grupo.tempoLimite);

        this.grupoProvider.update(this.key, this.grupo);
        this.navCtrl.pop();
    }

    deletaGrupo() {
        this.grupoProvider.remove(this.key);
        this.navCtrl.popToRoot();
    }

    deletaMembro(membro: Membro) {
        this.membroProvider.deletaMembro(membro, this.membros);
    }

}
