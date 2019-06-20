import {Component} from '@angular/core';
import {Events, PopoverController} from '@ionic/angular';


@Component({
    template: `
    <ion-list>
      <ion-item button (click)="open('SUMMARY')">
        <ion-label>Summary</ion-label>
      </ion-item>
      <ion-item button (click)="open('BALANCE')">
        <ion-label>Balance Sheet</ion-label>
      </ion-item>
      <ion-item button (click)="open('PL')">
        <ion-label>P L </ion-label>
      </ion-item>
      <ion-item button (click)="open('CF')">
        <ion-label>Cash Flow</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class AccountSelectPopover {
    constructor(public events: Events, public popoverCtrl: PopoverController) {}

    open(type: string) {
        this.events.publish('home-load-view', 'Account', type);
        this.popoverCtrl.dismiss();
    }
}
