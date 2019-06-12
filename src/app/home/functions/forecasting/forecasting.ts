import {Component} from '@angular/core';
import {Events, ModalController, NavParams} from '@ionic/angular';
import {HttpService} from '../../../services/http.service';
import {ShareService} from '../../../services/share.service';


@Component({
    selector: 'forecasting',
    templateUrl: 'forecasting.html',
    styleUrls: ['forecasting.scss'],
})
export class Forecasting {
    private task_info: any;
    private tabs: any;
    private parameters: any = {tabs_value: ['projected_sale'], tabs_disp: ['Projected Sale'], labels: ['B2B', 'B2C', 'New Offering']};
    private forcast: any;

    constructor(public events: Events,
                public shareService: ShareService,
                public httpService: HttpService,
                public modalCtl: ModalController,
                public navParam: NavParams) {
        this.task_info = navParam.data;
        // console.log(this.task_info);
        this.initialization();
    }

    private dismiss() {
        this.modalCtl.dismiss();
    }

    private initialization() {
        this.tabs = this.parameters.tabs_value[0];
        this.forcast = {b2b: 0, b2c: 0, newoffering: 0, total: 0, total_disp: '0'};
        if (this.task_info.companyName === 'NewCo') {
            this.parameters.labels = ['Niche #1', 'Niche #3', 'Niche #3', 'Total'];
        }

        this.httpService.get('/api/forecasting/' + this.shareService.current_user.companyId)
            .subscribe((forecast) => {
                    if (Object.keys(forecast).length > 0) {
                        this.forcast = forecast;
                    }
                }
            );
    }

    private onChange() {
        this.forcast.total = this.forcast.b2b + this.forcast.b2c + this.forcast.newoffering;
        this.forcast.total_disp = this.shareService.formatNum(this.forcast.total);
    }

    private submit() {
        // console.log(this.forcast)
        this.httpService.post('/api/forecasting/save', this.forcast
        ).subscribe(resp => {
            console.log(resp);
            this.dismiss();
        });

    }

    private openPdf() {
        // this.modalCtl.create(PdfViewerComponent, fileInfo).present();
    }
}
