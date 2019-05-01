/**
 * Created by isaacjiang on 2017-07-17.
 */

import 'rxjs';
import {Component} from '@angular/core';
import {Events} from '@ionic/angular';
import {HttpService} from '../../services/http.service';

@Component({
    selector: 'edp-main-menu',
    templateUrl: './menu.action.component.html'
})
export class MenuActionComponent{
    public title: any = 'Action Centre';

    public workflow: any;

    constructor(public httpService: HttpService, public events: Events) {
    }


    public initialiazation(current_user) {
        const root = this;
        const url = '/api/action/all' + '?username=' + current_user.username;
        this.httpService.get(url).subscribe((resp) => {
            console.log(resp);
            root.workflow = resp;
        });
    }

     menuClick(funcName) {
        // this.events.publish('menu-click-item',funcName)
     }


}
