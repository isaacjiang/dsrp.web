import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-workforce',
    templateUrl: './workforce.component.html',
    styleUrls: ['./workforce.component.scss'],
})
export class Workforce implements OnInit {
    private tabs: any;
    private parameters: any = {tabs_value: ['test'], tabs_disp: ['TEST'], labels: []};
    private test1 = 0;
    private test2 = 0;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        this.tabs = this.parameters.tabs_value[0];
    }

    dismiss() {
        this.modalController.dismiss();
    }

    submit(){
        
    }

}
