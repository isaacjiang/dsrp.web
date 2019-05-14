/**
 * Created by isaacjiang on 2017-07-17.
 */

import 'rxjs';
import {Component} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ShareService} from '../../services/share.service';
import {MenuController, ModalController} from '@ionic/angular';
import {Forecasting} from '../functions/forecasting/forecasting';

@Component({
    selector: 'edp-main-menu',
    templateUrl: './menu.action.component.html',
    styleUrls: ['menu.action.component.scss'],
})
export class MenuActionComponent {
    public title: any = 'Action Centre';
    public workflow: any;

    constructor(public httpService: HttpService, public menuController: MenuController,
                public modalController: ModalController, public shareService: ShareService) {
    }


    public initialization() {
        const root = this;
         console.log(root.shareService.current_user);
        const url = '/api/action/'  + this.shareService.current_user.companyId;
        this.httpService.get(url).subscribe((resp) => {
            console.log(resp);
            root.workflow = resp;
        });
    }

    public menuClick(params) {
        // this.events.publish('menu-click-item',funcName)
         console.log(params);
         // param['username'] = this.shareService.current_user.username;
         // param['companyId'] = this.shareService.current_user.companyId;
         // param['groupId'] = this.shareService.current_user.groupId;
         // param['period'] = this.shareService.current_user.groupId;
         switch (params.type) {
             case 'Forecasting':
                 this._showForecasting(params);
                 break;
             case 'Recruit':
                 this._showForecasting(params);
                 break;
         }
         this.menuController.close('action');
     }

    private async _showForecasting(params) {
        const modal = await this.modalController.create({
            component: Forecasting,
            componentProps: params,
            backdropDismiss: false,
            cssClass: 'modalCss',
        });
        // console.log(modal)
        // modal.setAttribute('backdrop-dismiss', 'false');
        // modal.setAttribute('css-class', 'modalcss');
        return await modal.present();
    }

}
