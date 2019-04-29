/**
 * Created by isaacjiang on 2017-09-01.
 */
import {Component} from '@angular/core';
import {AlertController, Events, NavController} from '@ionic/angular';
import {OrgService} from '../../services/org.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../services/http.service';


@Component({
    selector: 'edp-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})


export class HeaderComponent {
    public current_user: any = {};
    public user_detail: any;
    public viewCtl = {showJoinTeam: true, showSignup: true, showLogOut: true};


    constructor(public alertController: AlertController, private route: ActivatedRoute, private router: Router,
                public orgService: OrgService, public httpService: HttpService) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.current_user = this.router.getCurrentNavigation().extras.state.current_user;
            }
            this.authentication();
        });
    }

//     eventsHandles(root) {
//       root.events.subscribe('root-update-user-status', (user) => {
//         this.current_user=user
//         this.updateViewCtrl(user)
//       })
//       root.events.subscribe('root-login-success', (user) => {
//         this.current_user=user
//         this.updateViewCtrl(user)
//       })
//       root.events.subscribe('root-update-user-info', (user_info) => {
//         this.user_info=user_info
//         if(user_info.userInfo.status =='Init'){this.viewCtl.showJoinTeam=true}
//       })
//
//     }
//
//     updateViewCtrl(current_user){
//       if(current_user['status']){
//         console.log(current_user)
//         if(current_user['status']['is_authenticated']){
//           this.viewCtl.showLogOut=true
//           if(current_user['permission']==0){ this.viewCtl.showSignup=true}
//         }
//         else if(current_user['status']['is_anonymous']){
//           this.viewCtl.showLogOut=false
//           this.viewCtl.showSignup=false
//         }
//       }
//     }
//
    loadPage(pageName) {
        // this.events.publish('header-load-page',pageName)
    }

    toggleMenu(menuId) {
        // this.events.publish('header-toggle-menu',menuId)
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
                    uid: root.current_user['uid'],
                    username: root.current_user['username'],
                    companyId: data + this.companyId.substr(this.companyId.length - 3),
                    groupId: data
                })
                    .subscribe(resp => {
                    console.log(resp);
                    // this.events.publish('header-load-page','home')
                    // this.updateViewCtrl(this.current_user)
                });
            }
        }
        this.orgService.getGroupAll().toPromise().then((group) => {
            const groupArray =  JSON.parse(JSON.stringify(group));
            groupArray.forEach(group1 => {
                console.log('Group', group1);
                inputs.push({type: 'radio',
                    label: group1['groupName'],
                    value: group1['id']});
            });
            this.orgService.getCompanyBase().toPromise().then((company) => {
                const companyArray = JSON.parse(JSON.stringify(company));
                console.log(companyArray);
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

        if (this.current_user.permission === '0') {
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
        console.log(this.current_user);
        this.orgService.status(this.current_user.username).subscribe((resp) => {
            console.log(resp);
            this.current_user = resp;
            // if (this.loader != undefined) {
            //     this.loader.dismiss();
            // }
            // this.events.publish('root-update-user-status', this.current_user);
            if (this.current_user == null || this.current_user['anonymous']) {
               // this.router.navigate(['/welcome']);
            } else {
                // this.upateUserInfo(this.current_user.username);
                // this.loadFixedMenu('home');
                // this.loadContentView('mainpage1');
            }
        });
    }



    private _doSignup(account) {
        console.log(account);

        this.orgService.signup(account).subscribe((resp) => {
            console.log(1, resp);

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
        this.orgService.logout().subscribe((resp) => {
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
