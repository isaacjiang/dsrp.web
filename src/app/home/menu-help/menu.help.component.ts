/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import 'rxjs';

import {HttpService} from '../../services/http.service';


@Component({
    selector: 'edp-help-menu',
    templateUrl: 'menu.help.component.html',
    providers: [HttpService]
})
export class HelpMenuComponent {
    public workflow: any;
    public title: any;

    constructor(public httpService: HttpService) {

    }


    private initialiazation(current_user, menuId) {
        this.title = menuId.toUpperCase();
        const root = this;
        const url = '/api/dtools/taskslist' + '?username=' + current_user.username;
        this.httpService.get(url).subscribe((resp) => {
            root.workflow = resp;
        });
    }

    menuClick(funcName) {
        // this.events.publish('menu-click-item', funcName);
    }


}
