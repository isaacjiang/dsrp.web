/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import 'rxjs';
import {HttpService} from '../../services/http.service';

@Component({
    selector: 'edp-budget-menu',
    templateUrl: 'menu.budget.component.html',
    providers: [HttpService]
})
export class MenuBudgetComponent {
    private current_budget: any = [];
    private current_index = 0;
    public title: any;

    constructor(public httpService: HttpService) {

    }

    private formatNum(num) {
        const n = num.toString(), p = n.indexOf('.');
        return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
            return p < 0 || i < p ? ($0 + ',') : $0;
        });
    }

    private initialiazation(current_user, menuId) {
        this.title = menuId.toUpperCase();
        const root = this;
        const url = '/api/account/accountbudget' + '?username=' + current_user.username;
        this.httpService.get(url).subscribe((resp) => {
            // console.log(resp)
            root.current_budget = resp;
            root.current_budget.forEach(function (d) {
                d['currentValue_text'] = root.formatNum(d['currentValue'].toFixed());
            });
        });
    }

    private budget_input(index, budget) {
        this.current_index = index;
    }


}
