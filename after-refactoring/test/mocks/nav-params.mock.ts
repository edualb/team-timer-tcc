import { NavParams } from "ionic-angular";

export class NavParamsMock extends NavParams {

  isNewGroup = false;
  isGroupTest = false;
  isGroupSelectorTest = false;
  isTimerGroupTest = false;

  get(param: string): any {
    if (this.isGroupTest || this.isGroupSelectorTest || this.isTimerGroupTest) {
      return 'Group team-timer';
    }
    if (param === 'novoGrupo') {
      return this.isNewGroup;
    }
    return "Group team-timer";
  }
}