import {Injectable} from '@angular/core';

import {HttpService} from './http.service';
import {HttpHeaders} from '@angular/common/http';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class ShareService {
    public current_user: any = {username: 'isaacjiang', anonymous: false}; // {username: 'Anonymous', anonymous: true};

    constructor(private httpService: HttpService) {

    }

    setCurrentUser(user: any) {
        this.current_user = user;
    }

    status(username: any) {
        return this.httpService.get('/api/user/status/' + username);
    }
    getGroupAll() {
        return this.httpService.get('/api/group/all');
    }

    getCompanyAll() {
        return this.httpService.get('/api/company/all');
    }

    getCompanyBase() {
        return this.httpService.get('/api/company/base');
    }

    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    login(user: any) {
        const credentials = 'username=' + user.username + '&password=' + user.password;
        let header = new HttpHeaders();
        header = header.append('Accept', '*/*');
        header = header.append('Content-Type', 'application/x-www-form-urlencoded');
        header = header.append('Authorization', 'Basic ' + btoa(user.username + ':' + user.password));
        // console.log(credentials);
        return this.httpService.post('/api/login', credentials, {headers: header});
    }

    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    signup(accountInfo: any) {
        return this.httpService.post('/api/register', accountInfo);
    }

    logout() {
        return this.httpService.get('/api/user/logout');
    }

    public formatNum(num) {
        const n = num.toString(), p = n.indexOf('.');
        return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
            return p < 0 || i < p ? ($0 + ',') : $0;
        });
    }


}
