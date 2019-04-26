import {Injectable} from '@angular/core';

import {Api} from './api.service';
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
export class User {

    constructor(public api: Api) {

    }

    status(username: any) {
        return this.api.get('/api/user/status/' + username);
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
        return this.api.post('/api/login', credentials, {headers: header});
    }

    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    signup(accountInfo: any) {
        return this.api.post('/api/register', accountInfo);
    }

    logout() {
        return this.api.get('/api/user/logout');
    }


}
