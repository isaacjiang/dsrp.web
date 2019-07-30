import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: 'edp-directive-status',
})
export class StatusDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
