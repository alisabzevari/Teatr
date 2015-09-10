import {autoinject, customAttribute, customElement, inject} from "aurelia-framework";


@customElement("mat-chk")
@autoinject()
export class MatChk {
  constructor(private element: Element) { }
}
