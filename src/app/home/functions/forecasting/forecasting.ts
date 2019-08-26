import {Component, OnInit} from '@angular/core';
import {Events, ModalController, NavParams} from '@ionic/angular';
import {HttpService} from '../../../services/http.service';
import {ShareService} from '../../../services/share.service';


@Component({
    selector: 'forecasting',
    templateUrl: 'forecasting.html',
    styleUrls: ['forecasting.scss'],
})
export class Forecasting implements OnInit {
    private task_info: any;
    private tabs: any;
    private parameters: any = {tabs_value: ['projected_sale'], tabs_disp: ['Projected Sale'], labels: ['B2B', 'B2C', 'New Offering']};
    private forcast: any;

    constructor(private events: Events,
                private shareService: ShareService,
                private httpService: HttpService,
                private modalCtl: ModalController,
                private navParam: NavParams) {
        this.initialization();
    }

    ngOnInit(): void {
        this.task_info = this.navParam.data;
    }

    private dismiss() {
        this.modalCtl.dismiss();
    }

    private initialization() {
        this.tabs = this.parameters.tabs_value[0];
        this.forcast = {b2b: 0, b2c: 0, newoffering: 0, total: 0, total_disp: '0'};
        if (this.task_info.companyName === 'NewCo') {
            this.parameters.labels = ['Niche #1', 'Niche #2', 'Niche #3', 'Total'];
        }

        this.httpService.get('/api/forecasting/' + this.shareService.current_user.companyId)
            .subscribe((forecast) => {
                    if (Object.keys(forecast).length > 0) {
                        this.forcast = forecast;
                        this.forcast.total_disp = this.shareService.formatNum(this.forcast.total);
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
