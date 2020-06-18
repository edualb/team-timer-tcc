import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { SettingsGroupPage } from '../settings-group/settings-group';
import { GrupoProvider } from '../../providers/grupo/grupo';
import { GrupoList } from '../../contents/Grupos';
import { Grupo } from '../../contents/Grupo';

@Component({
  selector: 'page-group-selector',
  templateUrl: 'group-selector.html'
})
export class GroupSelectorPage{

  nomeGrupo: string = 'Grupo Bndes';
  grupos: GrupoList[] = [];
  grupo: Grupo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private grupoProvider: GrupoProvider
            ) {}

  ionViewDidEnter() {
    this.grupoProvider.getAll().then((grupos) => {
      this.grupos = grupos
    });
  }

  vaiParaGroup(key: string) {
    this.navCtrl.push(GroupPage, {
      groupKey: key
    });
  }

  adicionarGrupo() {
    this.navCtrl.push(SettingsGroupPage, {
      nome: '',
      tempoGrupo: '00:00:00',
      novoGrupo: true
    });
  }

}
