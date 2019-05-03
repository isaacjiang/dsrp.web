import {Component} from '@angular/core';
import {AlertController, Events} from '@ionic/angular';
import {Router} from '@angular/router';
import {ShareService} from '../services/share.service';


/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
 */

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.html',
    styleUrls: ['welcome.scss'],
})
export class Welcome {

    public current_user: any = {username: ''};

    constructor(public events: Events, public alertCtrl: AlertController, public router: Router,
                public shareService: ShareService) {

    }


    async login() {
        // this.modalCtl.create(Login,null,{enableBackdropDismiss:false}).present();


        const prompt = await this.alertCtrl.create({
            header: 'Login',
            //  message: "Enter a name for this new album you're so keen on adding",
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Username'
                },
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Password'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Login',
                    handler: data => {
                        // console.log('Saved clicked',data);
                        if (data.username !== '' && data.password !== '') {
                           // this.events.publish('login-do-login', data);
                            this._doLogin(data);
                        }

                    }
                }
            ]
        });
        await prompt.present();

    }

    async signup() {
        const prompt = await this.alertCtrl.create({
            header: 'SignUp',
            // message: "Enter a name for this new album you're so keen on adding",
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
                    text: 'Regular User',
                    handler: data => {
                        console.log('Cancel clicked');
                        data.permission = 1;
                        if (data.username !== '' && data.password !== '' && data.username.length >= 6 && data.password === data.password2) {
                            this.events.publish('signup-do-signup', data);
                        } else {
// todo send message
                        }
                    }
                }
            ]
        });

        await prompt.present();
    }

    private _doLogin(account) {
        this.shareService.login(account).subscribe((resp) => {
            // console.log(1, resp);
            this.current_user = resp;
            if (resp['authenticated']) {
                this.router.navigate(['/home'], {
                    state: {current_user: this.current_user}
                });
            } else {
                console.log('Authenticate Failure. ');
            }
        });

    }
}
