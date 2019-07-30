import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-startupfunding',
    templateUrl: './startupfunding.component.html',
    styleUrls: ['./startupfunding.component.scss'],
})
export class Startupfunding implements OnInit {
    private task_info: any;
    private tabs: any;
    private parameters: any = {tabs_value: ['test'], tabs_disp: ['TEST'], labels: []};

    constructor(private modalController: ModalController,
                private navParam: NavParams) {
    }

    ngOnInit(): void {
        this.task_info = this.navParam.data;
    }

    dismiss() {
        this.modalController.dismiss();
    }

    submit() {

    }
}