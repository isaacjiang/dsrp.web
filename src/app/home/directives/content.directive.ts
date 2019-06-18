import {ViewContainerRef, Directive} from '@angular/core';

@Directive({
  selector: 'directive-content',
})
export class ContentDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
