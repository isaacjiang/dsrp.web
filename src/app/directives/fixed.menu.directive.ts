import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: 'edp-directive-menu-fixed',
})
export class FixedMenuDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
