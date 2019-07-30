import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: 'edp-directive-message',
})
export class MessagesDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
