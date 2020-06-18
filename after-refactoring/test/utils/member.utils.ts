import { Membro } from "../../src/contents/membro";

export class MemberUtils {

  static createMembers(): Membro[] {
    let members: Membro[] = [];
    members.push(new Membro(1, 'Eduardo', '00:01:20'));
    members.push(new Membro(2, 'André', '00:01:20'));
    members.push(new Membro(3, 'Carol', '00:01:20'));
    return members;
  }

  static createManyMembers(): Membro[] {
    let members: Membro[] = [];
    members.push(new Membro(1, 'Eduardo', '00:01:20'));
    members.push(new Membro(2, 'André', '00:01:20'));
    members.push(new Membro(3, 'Carol', '00:01:20'));
    members.push(new Membro(4, 'Barbara', '00:01:20'));
    members.push(new Membro(5, 'Cláudia', '00:01:20'));
    members.push(new Membro(6, 'Paulo', '00:01:20'));
    members.push(new Membro(7, 'Ana', '00:01:20'));
    members.push(new Membro(8, 'Angelo', '00:01:20'));
    members.push(new Membro(9, 'Lula', '00:01:20'));
    return members;
  }

  static createMember(): Membro {
    return new Membro(3, 'Carol', '00:01:20');
  }

}