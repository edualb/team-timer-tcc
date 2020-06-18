import { DatePipe } from "@angular/common";
import { Storage, StorageConfig } from "@ionic/storage";
import { Grupo } from "../../src/contents/Grupo";
import { Membro } from "../../src/contents/membro";
import { GrupoProvider } from "../../src/providers/grupo/grupo";
import { GroupUtils } from "../utils/group.utils";


export class GrupoProviderMock extends GrupoProvider {
  
  constructor() {
    super(new StorageMock(), new DatePipeMock());
  }

  public getGrupo(key: string): Promise<Grupo> {
    return new Promise((resolve, reject) => {
      let members = [];
      members.push(new Membro(1, 'Eduardo', '01:20'));
      members.push(new Membro(2, 'André', '01:20'));

      resolve(new Grupo('Group team-timer', members, '01:20'));
    });
  }

  public update(key: string, grupo: Grupo): Promise<any> {
    return Promise.resolve({key: key, group: grupo});
  }

  public getAll(): Promise<any> {
    return Promise.resolve();
  }

  public insert(group: Grupo): Promise<any> {
    return Promise.resolve();
  }

}

export class StorageMock extends Storage {

  isForEachResolve = true;

  constructor() {
    super(new StorageConfigMock())
  }

  forEach(iteratorCallback: (value: any, key: string, iterationNumber: Number) => any): Promise<void> {
    let group1 = GroupUtils.createGroup();
    iteratorCallback(group1, '161019960810', 1);
    return this.isForEachResolve ? Promise.resolve() : Promise.reject('error message');
  }

}

export class DatePipeMock extends DatePipe {

  constructor() {
    super('');
  }

  transform(value: any, format?: string, timezone?: string, locale?: string): string | null {
    return '161019960810';
  }

}

class StorageConfigMock implements StorageConfig {}