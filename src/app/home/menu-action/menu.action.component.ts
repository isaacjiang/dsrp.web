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
                public modalController: ModalController, public orgService: ShareService) {
    }


    public initialization() {
        const root = this;
        // console.log(root.orgService.current_user);
        const url = '/api/action/'  + this.orgService.current_user.companyId;
        this.httpService.get(url).subscribe((resp) => {
           // console.log(resp);
            root.workflow = resp;
        });
    }

    public menuClick(param) {
        // this.events.publish('menu-click-item',funcName)
         console.log(param);
         switch (param.type) {
             case 'Forecasting':
                 this._showForecasting(param);
         }
         this.menuController.close('action');
     }

    private async _showForecasting(params) {
        params['username'] = this.orgService.current_user.username
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
