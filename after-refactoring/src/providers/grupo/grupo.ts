import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { Grupo } from '../../contents/Grupo';
import { GrupoList } from '../../contents/Grupos';

@Injectable()
export class GrupoProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) {}

  public insert(grupo: Grupo) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, grupo);
  }

  public update(key: string, grupo: Grupo) {
    return this.save(key, grupo);
  }

  private save(key: string, grupo: Grupo) {
    return this.storage.set(key, grupo);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getGrupo(key: string): Promise<Grupo> {
    return this.storage.get(key);
  }

  public getAll() {
    let grupos: GrupoList[] = [];
 
    return this.storage.forEach((value: Grupo, key: string, iterationNumber: Number) => {
      let grupo = new GrupoList(key, value);
      grupos.push(grupo);
    })
      .then(() => {
        return Promise.resolve(grupos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

}
