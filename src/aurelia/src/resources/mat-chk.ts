import {autoinject, bindable, customElement, inject} from "aurelia-framework";


@customElement("mat-chk")
export class MatChk {
  @bindable value: any;
  @bindable checked: boolean;

  public uniqId: string;

  constructor() {
    this.uniqId = this.guid();
  }

  private guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
