import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-expenditure',
    templateUrl: './expenditure.component.html',
    styleUrls: ['./expenditure.component.scss'],
})
export class Expenditure implements OnInit {
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
