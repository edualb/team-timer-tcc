import { MembroProvider } from "../../src/providers/grupo/membro"
import { MemberUtils } from "../utils/member.utils";

describe('MembroProvider', () => {

  let provider: MembroProvider;

  beforeEach(() => {
    provider = new MembroProvider();
  });

  it('should be initialized provider', () => {
    expect(provider).toBeTruthy();
  })

  it('should be delete member with id and name equals on deletaMembro', () => {
    let members = MemberUtils.createMembers();
    let member = MemberUtils.createMember();

    expect(members.length).toEqual(3);
    expect(members[0].id).toEqual(1);
    expect(members[1].id).toEqual(2);
    expect(members[2].id).toEqual(3);
    expect(members[2].nome).toEqual('Carol');
    expect(member.id).toEqual(3);
    expect(member.nome).toEqual('Carol');

    provider.deletaMembro(member, members)

    expect(members.length).toEqual(2);
    expect(members[0].id).toEqual(1);
    expect(members[1].id).toEqual(2);
    expect(members[2]).toBeUndefined();
  });

  it('should not be delete member with name different on deletaMembro', () => {
    let members = MemberUtils.createMembers();
    let membersAux = members;
    let member = MemberUtils.createMember();
    member.nome = 'André'

    expect(members.length).toEqual(3);
    expect(members[0].id).toEqual(1);
    expect(members[1].id).toEqual(2);
    expect(members[2].id).toEqual(3);
    expect(members[2].nome).toEqual('Carol');
    expect(member.id).toEqual(3);
    expect(member.nome).toEqual('André');

    provider.deletaMembro(member, members)

    expect(members.length).toEqual(3);
    expect(members).toEqual(membersAux);
  });

  it('should not be delete member with id different on deletaMembro', () => {
    let members = MemberUtils.createMembers();
    let membersAux = members;
    let member = MemberUtils.createMember();
    member.id = 2

    expect(members.length).toEqual(3);
    expect(members[0].id).toEqual(1);
    expect(members[1].id).toEqual(2);
    expect(members[2].id).toEqual(3);
    expect(members[2].nome).toEqual('Carol');
    expect(member.id).toEqual(2);
    expect(member.nome).toEqual('Carol');

    provider.deletaMembro(member, members)

    expect(members.length).toEqual(3);
    expect(members).toEqual(membersAux);
  });

  it('should not be delete member with id and name different on deletaMembro', () => {
    let members = MemberUtils.createMembers();
    let membersAux = members;
    let member = MemberUtils.createMember();
    member.id = 2
    member.nome = 'Eduardo'

    expect(members.length).toEqual(3);
    expect(members[0].id).toEqual(1);
    expect(members[1].id).toEqual(2);
    expect(members[2].id).toEqual(3);
    expect(members[2].nome).toEqual('Carol');
    expect(member.id).toEqual(2);
    expect(member.nome).toEqual('Eduardo');

    provider.deletaMembro(member, members)

    expect(members.length).toEqual(3);
    expect(members).toEqual(membersAux);
  });

})