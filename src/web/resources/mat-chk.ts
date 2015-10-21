import {autoinject, bindable, customElement, inject} from "aurelia-framework";


@customElement("mat-chk")
@autoinject()
export class MatChk {
  @bindable value: any;
  @bindable checked: boolean;

  public uniqId: string;

  constructor(private element: Element) {
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

  public click() {
    let event = new CustomEvent("change");
    this.element.dispatchEvent(event);
    return true;
  }
}
