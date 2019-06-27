/**
 * Created by isaacjiang on 2017-07-17.
 */

import 'rxjs';
import {Component} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ShareService} from '../../services/share.service';
import {MenuController, ModalController} from '@ionic/angular';
import {Forecasting} from '../functions/forecasting/forecasting';
import {Hiring} from '../functions/hiring/hiring';
import {Workforce} from '../functions/workforce/workforce.component';
import {ResourceAcquisition} from '../functions/resource-acquisition/resource-acquisition.component';
import {Actions} from '../functions/actions/actions.component';
import {Startupfunding} from '../functions/startupfunding/startupfunding.component';
import {Expenditure} from '../functions/expenditure/expenditure.component';

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
        // console.log(root.shareService.current_user);
        const url = '/api/task/' + this.shareService.current_user.companyId;
        this.httpService.get(url).subscribe((resp) => {
            console.log(resp);
            root.workflow = resp;
        });
    }

    public menuClick(params) {
        // this.events.publish('menu-click-item',funcName)
        //  console.log(params);
        // param['username'] = this.shareService.current_user.username;
        // param['companyId'] = this.shareService.current_user.companyId;
        // param['groupId'] = this.shareService.current_user.groupId;
        // param['period'] = this.shareService.current_user.groupId;
        switch (params.type) {
            case 'Forecasting':
                this._showForecasting(params);
                break;
            case 'Recruit':
                this._showHiring(params);
                break;
            case 'Workforce':
                this._showWorkforce(params);
                break;
            case 'Resource':
                this._showResourceAcquisition(params);
                break;
            case 'Expenditure':
                this._showExpenditure(params);
                break;
            case 'StartUpFunding':
                this._showStartUpFunding(params);
                break;
            case 'Actions':
                this._showActions(params);
                break;
        }
        this.menuController.close('action');
    }

    private async _showForecasting(params) {
        const modal = await this.modalController.create({
            component: Forecasting,
            componentProps: {params: params, data: {}},
            backdropDismiss: false,
            cssClass: 'modalCss',
        });
        return await modal.present();
    }

    private async _showHiring(params) {
        this.httpService.get('/api/employee/' + this.shareService.current_user.companyId)
            .subscribe(async (employees) => {
                const modal = await this.modalController.create({
                    component: Hiring,
                    componentProps: {params: params, data: employees},
                    backdropDismiss: false,
                    cssClass: 'modalCss',
                });
                return await modal.present();
            });
    }

    private async _showWorkforce(params){
        const modal = await this.modalController.create({
            component: Workforce,
            componentProps: {params: params, data: {}},
            backdropDismiss: false,
            cssClass: 'modalCss',
        });
        return await modal.present();
    }

    private async _showResourceAcquisition(params){
        const modal = await this.modalController.create({
            component: ResourceAcquisition,
            componentProps: {params: params, data: {}},
            backdropDismiss: false,
            cssClass: 'modalCss',
        });
        return await modal.present();
    }

    private async _showExpenditure(params){
        const modal = await this.modalController.create({
            component: Expenditure,
            componentProps: {params: params, data: {}},
            backdropDismiss: false,
            cssClass: 'modalCss',
        });
        return await modal.present();
    }

    private async _showStartUpFunding(params){
        const modal = await this.modalController.create({
            component: Startupfunding,
            componentProps: {params: params, data: {}},
            backdropDismiss: false,
            cssClass: 'modalCss',
        });
        return await modal.present();
    }

    private async _showActions(params){
        const modal = await this.modalController.create({
            component: Actions,
            componentProps: {params: params, data: {}},
            backdropDismiss: false,
            cssClass: 'modalCss',
        });
        return await modal.present();
    }
}
