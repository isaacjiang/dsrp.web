import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: 'edp-directive-menu-main',
})
export class MainMenuDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
