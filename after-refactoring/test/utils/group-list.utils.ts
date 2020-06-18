import { Grupo } from "../../src/contents/Grupo";
import { Membro } from "../../src/contents/membro";
import { GrupoList } from "../../src/contents/Grupos";

export class GroupListUtils {

  static createGroupList(): GrupoList[] {
    let members = [];
    members.push(new Membro(1, 'Eduardo', '01:20'));
    members.push(new Membro(2, 'André', '01:20'));
    let group1 = new Grupo('Group team-timer1', members, '01:20');
    let group2 = new Grupo('Group team-timer2', members, '02:40');

    let listGroup: GrupoList[] = [];
    listGroup.push(new GrupoList('first group', group1));
    listGroup.push(new GrupoList('second group', group2));

    return listGroup;
  }
  
}