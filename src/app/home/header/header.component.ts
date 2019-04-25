/**
 * Created by isaacjiang on 2017-09-01.
 */
import {Component} from '@angular/core';
import {AlertController, Events, NavController} from '@ionic/angular';
import {User} from '../../services/user.service';
import {Router} from '@angular/router';


@Component({
    selector: 'edp-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})


export class HeaderComponent {
    public current_user: any = {username: ''};
    // public user_info:any;
    public viewCtl = {showJoinTeam: true, showSignup: true, showLogOut: true};


    constructor(public alertController: AlertController, public router: Router, public user: User) {
         this.authentication();
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

    async joinTeam() {
        const alert = await this.alertController.create({
            header: 'SignUp',
            // message: 'Enter a name for this new album you're so keen on adding',
            inputs: [
                {
                    type: 'radio',
                    label: 'Team A',
                    value: 'Team A'
                },
                {
                    type: 'radio',
                    label: 'Team B',
                    value: 'Team B'
                },
                {
                    type: 'radio',
                    label: 'Team C',
                    value: 'Team C'
                },
                {
                    type: 'radio',
                    label: 'Team D',
                    value: 'Team D'
                },
                {
                    type: 'radio',
                    label: 'Team E',
                    value: 'Team E'
                },
                {
                    type: 'radio',
                    label: 'Team F',
                    value: 'Team F'
                },
            ],
            buttons: [
                {
                    text: 'Join LegacyCo',
                    handler: data => {
                        console.log('Join LegacyCo' + data);


                        // this.api.post('/api/dtools/jointeam',{
                        //   username: this.current_user.username,
                        //   //taskID:this.task_info.taskID,
                        //   companyName :'LegacyCo',
                        //   teamName : data,
                        //   //period:this.task_info.period,
                        //   data:{username:this.current_user.username,
                        //     teamName:data,
                        //     companyName: 'LegacyCo',
                        //     userrole: 'CEO'}
                        // }).subscribe(resp=>{
                        //    console.log(resp)
                        //   this.events.publish('header-load-page','home')
                        //   this.updateViewCtrl(this.current_user)
                        // })


                    }
                },
                {
                    text: 'Join NewCo',
                    handler: data => {
                        console.log('Cancel clicked');
                        // this.api.post('/api/dtools/jointeam',{
                        //   username: this.current_user.username,
                        //   //taskID:this.task_info.taskID,
                        //   companyName :'LegacyCo',
                        //   teamName : data,
                        //   //period:this.task_info.period,
                        //   data:{username:this.current_user.username,
                        //     teamName:data,
                        //     companyName: 'NewCo',
                        //     userrole: 'CEO'}
                        // }).subscribe(resp=>{
                        //   console.log(resp)
                        //   this.events.publish('header-load-page','home')
                        //   this.updateViewCtrl(this.current_user)
                        // })
                    }
                }
            ]
        });


        await alert.present();

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
                    text: 'Regular User',
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

//         if (this.current_user.permission === 0) {
//             prompt.addButton({
//                 text: 'Administrator',
//                 handler: data => {
//                     console.log('Saved clicked', data);
//                     data.permission = 0;
//                     if (data.username !== '' && data.password !== '' && data.username.length >= 6 && data.password === data.password2) {
//                         this.events.publish('signup-do-signup', data);
//                     } else {
// // todo send message
//                     }
//
//                 }
//             });
//         }


        await prompt.present();
    }

    public authentication() {
        this.user.status().subscribe((resp) => {
            console.log(resp);
            this.current_user = resp;
            // if (this.loader != undefined) {
            //     this.loader.dismiss();
            // }
            // this.events.publish('root-update-user-status', this.current_user);
            if (this.current_user != null && this.current_user['anonymous']) {
                 // this.navController.push(Welcome);
                this.router.navigate(['/welcome']);
            } else {
                // this.upateUserInfo(this.current_user.username);
                // this.loadFixedMenu('home');
                // this.loadContentView('mainpage1');
            }
        });
    }



    private _doSignup(account) {
        console.log(account);

        this.user.signup(account).subscribe((resp) => {
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
        this.user.logout().subscribe((resp) => {
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
