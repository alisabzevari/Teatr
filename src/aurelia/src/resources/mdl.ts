import {autoinject, customAttribute, inject} from "aurelia-framework";
declare var componentHandler: any;

@customAttribute("mdl", {})
@inject(Element)
export class MdlAttr {
  constructor(private element: Element) {
  }

  public attached() {
    componentHandler.upgradeElement(this.element);
  }
}

// autoinject didn't work
// customAttribute signature was different from documentation
//
