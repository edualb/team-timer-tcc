import { GrupoProvider } from "../../src/providers/grupo/grupo";
import { DatePipeMock, StorageMock } from "../mocks/group-provider.mock";
import { GroupUtils } from "../utils/group.utils";

/*
* Verificar se o grupo existe em update
*/
describe('GrupoProvider', () => {

  let provider: GrupoProvider;
  let storage: StorageMock;
  let datePipe: DatePipeMock;

  beforeEach(() => {
    storage = new StorageMock();
    datePipe = new DatePipeMock();

    provider = new GrupoProvider(storage, datePipe);
  });

  it('should be initialized provider', () => {
    expect(provider).toBeTruthy();
  })

  it('should be insert a new group on insert', () => {
    let group = GroupUtils.createGroup();

    spyOn(datePipe, 'transform').and.returnValue('161019960810');
    spyOn(storage, 'set');

    provider.insert(group);

    expect(datePipe.transform).toHaveBeenCalled();
    expect(storage.set).toHaveBeenCalled()
    expect(storage.set).toHaveBeenCalledWith('161019960810', group);
  })

  it('should be update a group on update', () => {
    let key = '161019960810';
    let group = GroupUtils.createGroup();

    spyOn(storage, 'set');

    provider.update(key, group);

    expect(storage.set).toHaveBeenCalled()
    expect(storage.set).toHaveBeenCalledWith(key, group);
  });

  it('should be remove a group on remove', () => {
    let key = '161019960810';

    spyOn(storage, 'remove');

    provider.remove(key);

    expect(storage.remove).toHaveBeenCalled();
    expect(storage.remove).toHaveBeenCalledWith(key);
  });

  it('should be get a group on getGrupo', () => {
    let key = '161019960810';

    spyOn(storage, 'get');

    provider.getGrupo(key);

    expect(storage.get).toHaveBeenCalled();
    expect(storage.get).toHaveBeenCalledWith(key);
  });

  it('should be get all groups on getAll success', () => {
    let group = GroupUtils.createGroup();
    provider.getAll().then((groupList) => {
      expect(groupList).toBeTruthy();
      expect(groupList.length).toEqual(1);
      expect(groupList[0].key).toEqual('161019960810');
      expect(groupList[0].grupo).toEqual(group);
    });
  });

  it('should not be get all groups on getAll fail', () => {
    storage.isForEachResolve = false;
    provider.getAll().then(() => {}).catch((error) => {
      expect(error).toEqual('error message');
    });
  });

});