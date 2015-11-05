import {autoinject, customAttribute, customElement, inject} from "aurelia-framework";
import {} from "materialize";


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
    if (this.element.classList.contains("collapsible"))
      $(this.element).collapsible();
    if (this.element.classList.contains("tooltipped"))
      $(this.element).tooltip();
  }
}

// customAttribute signature was different from documentation
