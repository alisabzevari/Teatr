interface JQuery {
  sideNav();
  materialbox();
  collapsible();
  tooltip();
}

interface MaterializeStatic {
  toast(text: string, delay?: number, rounded?: string);
}

declare var Materialize: MaterializeStatic;
