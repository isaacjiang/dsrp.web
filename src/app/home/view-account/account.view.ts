/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';

import 'rxjs';
import {ShareService} from '../../services/share.service';
import {Events} from '@ionic/angular';
import {HttpService} from '../../services/http.service';



@Component({
    selector: 'dsrp-account',
    templateUrl: 'account.view.html',
    styleUrls: ['account.view.scss'],
})
export class AccountView {

    public formData = [];



    constructor(public shareService: ShareService,
                public httpService: HttpService,
                public events: Events) {
    }
    initialiazation( type) {
      const url = '/api/accountbook/' + type + '/' + this.shareService.current_user.companyId;
      console.log(url);
      this.httpService.get(url).subscribe((res) => {
        this.formData = JSON.parse(JSON.stringify(res)).data;
        console.log(res);
      });
    }
    selectLine(row) {}
}
