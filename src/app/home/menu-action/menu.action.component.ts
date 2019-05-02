/**
 * Created by isaacjiang on 2017-07-17.
 */

import 'rxjs';
import {Component} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {OrgService} from '../../services/org.service';

@Component({
    selector: 'edp-main-menu',
    templateUrl: './menu.action.component.html'
})
export class MenuActionComponent {
    public title: any = 'Action Centre';
    public workflow: any;

    constructor(public httpService: HttpService, public orgService: OrgService) {
    }


    public initialization() {
        const root = this;
        console.log(root.orgService.current_user);
        const url = '/api/action/'  + this.orgService.current_user.companyId;
        this.httpService.get(url).subscribe((resp) => {
            console.log(resp);
            root.workflow = resp;
        });
    }

     menuClick(funcName) {
        // this.events.publish('menu-click-item',funcName)
     }


}
