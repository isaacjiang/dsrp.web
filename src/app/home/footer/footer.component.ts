/**
 * Created by isaacjiang on 2017-09-01.
 */
import {Component} from '@angular/core';
import {AlertController, Events, MenuController} from '@ionic/angular';
import {ShareService} from '../../services/share.service';
import {Router} from '@angular/router';
import {HttpService} from '../../services/http.service';


@Component({
    selector: 'edp-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})


export class FooterComponent {

    public companySummary = {};
    public sys_message = '';
    constructor(public alertController: AlertController, private router: Router,
                public menuController: MenuController, private events: Events,
                public shareService: ShareService, public httpService: HttpService) {
    }

    public refresh() {
        console.log(this.shareService.current_user);
        if (this.shareService.current_user.companyId !== undefined) {
            const url = '/api/company/summary/'  + this.shareService.current_user.companyId;
            this.httpService.get(url).subscribe((resp) => {
                console.log(resp);
                this.companySummary = resp;
            });
        }
    }
    public messaging(message: string) {
        this.sys_message = message;

        setTimeout(() => {
            this.sys_message = '';
        }, 5000);
    }


}
