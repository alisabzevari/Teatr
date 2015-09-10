import {autoinject, customAttribute, inject} from "aurelia-framework";

@customAttribute("materialize", {})
@autoinject()
export class MaterializeAttr {
  constructor(private element: Element) {
  }

  public attached() {
    if (this.element.classList.contains("button-collapse"))
      $(this.element).sideNav();
    if (this.element.classList.contains("materialboxed"))
      $(this.element).materialbox();
  }
}

// autoinject didn't work
// customAttribute signature was different from documentation
//
