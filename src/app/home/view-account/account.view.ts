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
    templateUrl: 'account.view.html'

})
export class AccountView {

    public formData = [];



    constructor(public shareService: ShareService,
                public httpService: HttpService,
                public events: Events) {
       this.eventsHandles(this);
    }

    eventsHandles(root) {
        // root.events.unsubscribe('policyList')
        // root.events.subscribe('policyList', (originalData) => {
        //     console.log(originalData)
        //    root.fillingData(originalData)
        //
        // })
    }

    initialiazation( menuID) {
      const root = this;
      const url = '/api/accountbook/' + this.shareService.current_user.companyId;
      console.log(url);
      this.httpService.get(url).subscribe((res) => {
        const resp = JSON.parse(JSON.stringify(res));
        // switch (menuID){
        //   case "account2":{
        //     root.formData = resp.filter(function (d) {
        //       return d.accountDescType == "PL"
        //     })
        //     break;
        //   }
        //   case "account3":{
        //     root.formData = resp.filter(function (d) {
        //       return d.accountDescType == "BALANCE"
        //     })
        //     break;
        //   }
        //   case "account4":{
        //     root.formData = resp.filter(function (d) {
        //       return d.accountDescType == "CF"
        //     })
        //     break;
        //   }
        //   default:{
        //     root.formData = resp.filter(function (d) {
        //       return d.summaryFLag == true
        //     })
        //     break;
        //   }
        // }


        console.log(res);
      });
    }

    fillingData(originalData) {

        // let titleList = [];

    }
    selectLine(event){

    }

    selectCell(row, col){

    }






}
