/// <reference path="../jquery/jquery.d.ts" />

interface JQuery {
	tooltip();
	collapsible();
	materialbox();
	sideNav();
}

declare var Materialize : {
    toast(contents: string, timeout: number);
}