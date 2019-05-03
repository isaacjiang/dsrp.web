import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';

import {BudgetMenuDirective} from '../directives/budget.menu.directive';
import {FixedMenuDirective} from '../directives/fixed.menu.directive';
import {ContentDirective} from '../directives/content.directive';
import {StatusDirective} from '../directives/status.directive';
import {AlertController, Events, LoadingController, MenuController, ModalController, NavController, ToastController} from '@ionic/angular';
import {MenuActionComponent} from './menu-action/menu.action.component';
import {HeaderComponent} from './header/header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../services/share.service';


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
  private loader: any;
  constructor(
      private events: Events,
      public menuCtrl: MenuController,
      public navCtrl: NavController,
      public modalCtl: ModalController,
      public toastCtrl: ToastController, public orgService: ShareService,
      public loadingCtrl: LoadingController, private route: ActivatedRoute, private router: Router,
      private componentFactoryResolver: ComponentFactoryResolver) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.orgService.setCurrentUser(this.router.getCurrentNavigation().extras.state.current_user);
      }
    });
  }

  ionViewWillEnter() {
    this.headerComponent.authentication();
    this.eventsOn();
    // this.loader = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   duration: 2000
    // });
    // this.loader.present();
  }

  ionViewDidEnter() {
    // this.current_user = this.headerComponent.current_user;

  }

  ionViewWillLeave() {
  }

  eventsOn() {
    const root = this;
    this.events.unsubscribe('load-action-menu')
    this.events.subscribe('load-action-menu', () => {
      root.menuActionComponent.initialization();
    });
  }


}
