/**
 * Created by isaacjiang on 2017-09-01.
 */
import {Component} from '@angular/core';
import {AlertController, Events, MenuController} from '@ionic/angular';
import {ShareService} from '../../services/share.service';
import {Router} from '@angular/router';
import {HttpService} from '../../services/http.service';

@Component({
    selector: 'edp-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})

export class HeaderComponent {
    public viewCtl = {showJoinTeam: true, showSignup: true, showLogOut: true};

    constructor(public alertController: AlertController, private router: Router,
                public menuController: MenuController, private events: Events,
                public shareService: ShareService, public httpService: HttpService) {
    }

    loadPage(pageName) {
        // this.events.publish('header-load-page',pageName)
    }

    toggleMenu(menuId) {
        this.menuController.enable(true, menuId);
        this.menuController.open(menuId);
        switch (menuId) {
            case 'action':
                this.events.publish('load-action-menu', {});
                break;
            case 'help':
                this.events.publish('load-help-menu', {});
                break;
        }
        this.events.publish('send-message', 'toggle menu');
    }

    joinTeam() {
        const inputs = [];
        const buttons = [];
        const root = this;
        const buttonClick = function (data) {
            if (data === undefined) {
                console.log('PLease select Group ' + data);
            } else {
                root.httpService.post('/api/user/join', {
                    uid: root.shareService.current_user['uid'],
                    username: root.shareService.current_user['username'],
                    companyId: data + this.companyId.substr(this.companyId.length - 3),
                    groupId: data
                })
                    .subscribe(resp => {
                        // console.log(resp);
                        root.shareService.setCurrentUser(resp);
                        root.events.publish('refresh-footer', {});

                    });
            }
        };
        this.shareService.getGroupAll().toPromise().then((group) => {
            const groupArray = JSON.parse(JSON.stringify(group));
            groupArray.forEach(group1 => {
                // console.log('Group', group1);
                inputs.push({
                    type: 'radio',
                    label: group1['groupName'],
                    value: group1['id']
                });
            });
            this.shareService.getCompanyBase().toPromise().then((company) => {
                const companyArray = JSON.parse(JSON.stringify(company));
                // console.log(companyArray);
                companyArray.forEach(company1 => {
                    buttons.push({
                        companyId: company1['id'],
                        text: company1['companyName'],
                        handler: buttonClick
                    });
                });
                this.joinTeamAlert(inputs, buttons);
            });
        });
    }

    async joinTeamAlert(inputs, buttons) {
        // const inputs = [];
        const alert = await this.alertController.create({
            header: 'SignUp',
            // message: 'Enter a name for this new album you're so keen on adding',
            inputs: inputs,
            buttons: buttons
        });
        return alert.present();
    }

    logout() {
        // this.events.publish('header-logout-current-user')
    }

    async signUp() {
        const prompt = await this.alertController.create({
            header: 'SignUp',
            // message: 'Enter a name for this new album you're so keen on adding',
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Username'
                },
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email'
                },
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Password'
                },
                {
                    name: 'password2',
                    type: 'password',
                    placeholder: 'Confirm Password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Regular',
                    handler: data => {
                        console.log('Cancel clicked');
                        data.permission = 1;
                        if (data.username !== '' && data.password !== '' && data.username.length >= 6 && data.password === data.password2) {
                            // this.events.publish('signup-do-signup', data);
                            this._doSignup(data);
                        } else {
// todo send message
                        }
                    }
                }
            ],
            cssClass: 'userSignUpAlert'
        });

        if (this.shareService.current_user.permission === '0') {
            console.log('++++', prompt.buttons);
            await prompt.buttons.push({
                text: 'Admin',
                handler: data => {
                    console.log('Saved clicked', data);
                    data.permission = '0';
                    if (data.username !== '' && data.password !== '' && data.username.length >= 6 && data.password === data.password2) {
                        //  this.events.publish('signup-do-signup', data);
                    } else {
// todo send message
                    }

                }
            });
            console.log('++++', prompt.buttons);
        }
        await prompt.present();
    }

    public authentication() {
        this.shareService.status(this.shareService.current_user.username).subscribe((resp) => {
            this.shareService.setCurrentUser(resp);
        });
        // console.log(this.shareService.current_user);
        if (this.shareService.current_user['anonymous']) {
            this.router.navigate(['/welcome']);
        }
        return this.shareService.current_user;
    }


    private _doSignup(account) {
        // console.log(account);
        this.shareService.signup(account).subscribe((resp) => {
            // console.log(1, resp);

            // if(resp["register_status"]){
            //     if (this.navCtrl.length()>1){this.navCtrl.pop()}
            //     this.authentication()
            //     // this.events.publish("root-login-modal-dismiss",this.current_user)
            // }
            // else{
            //     console.log(resp["message"])
            // }
        });
    }

    private _doLogout() {
        this.shareService.logout().subscribe((resp) => {
            // console.log("logout",resp)
            // if(resp["logout_status"]){
            //     this.authentication()
            // }
            // else{
            //     console.log(resp["message"])
            // }
        });
    }
}
