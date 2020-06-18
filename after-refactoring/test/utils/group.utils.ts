import { Grupo } from "../../src/contents/Grupo";
import { Membro } from "../../src/contents/membro";

export class GroupUtils {

  static createGroup(): Grupo {
    let members = [];
    members.push(new Membro(1, 'Eduardo', '00:01:20'));
    members.push(new Membro(2, 'André', '00:01:20'));
    return new Grupo('Group team-timer', members, '00:01:20');
  }
  
}