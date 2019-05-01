import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';

import {BudgetMenuDirective} from '../directives/budget.menu.directive';
import {FixedMenuDirective} from '../directives/fixed.menu.directive';
import {ContentDirective} from '../directives/content.directive';
import {StatusDirective} from '../directives/status.directive';
import {AlertController, Events, LoadingController, MenuController, ModalController, NavController, ToastController} from '@ionic/angular';
import {MenuActionComponent} from './menu-action/menu.action.component';
import {HeaderComponent} from './header/header.component';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(MenuActionComponent) menuActionComponent: MenuActionComponent;
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;
  @ViewChild(BudgetMenuDirective) budgetMenuHost: BudgetMenuDirective;
  @ViewChild(FixedMenuDirective) fixedMenuHost: FixedMenuDirective;
  @ViewChild(ContentDirective) contentHost: ContentDirective;
  @ViewChild(StatusDirective) statusMenuHost: StatusDirective;

  public current_user: any;
  public user_info: any;
  private loader: any;
  constructor(
      public events: Events,
      public menuCtrl: MenuController,
      public navCtrl: NavController,
      public modalCtl: ModalController,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController, private route: ActivatedRoute, private router: Router,
      private componentFactoryResolver: ComponentFactoryResolver) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.current_user = this.router.getCurrentNavigation().extras.state.current_user;
      }
      // this.authentication();
    });
  }

  ionViewWillEnter() {
    // this.loader = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   duration: 2000
    // });
    // this.loader.present();
  }

  ionViewDidEnter() {
    // this.current_user = this.headerComponent.current_user;
    this.menuActionComponent.initialiazation(this.current_user);
  }

  ionViewWillLeave() {
  }


}
