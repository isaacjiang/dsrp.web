import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';

import {BudgetMenuDirective} from './directives/budget.menu.directive';
import {FixedMenuDirective} from './directives/fixed.menu.directive';
import {ContentDirective} from './directives/content.directive';
import {StatusDirective} from './directives/status.directive';
import {AlertController, Events, LoadingController, MenuController, ModalController, NavController, ToastController} from '@ionic/angular';
import {MenuActionComponent} from './menu-action/menu.action.component';
import {HeaderComponent} from './header/header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../services/share.service';
import {FooterComponent} from './footer/footer.component';
import {AccountView} from './view-account/account.view';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(MenuActionComponent) menuActionComponent: MenuActionComponent;
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;
  @ViewChild(FooterComponent) footerComponent: FooterComponent;
  @ViewChild(BudgetMenuDirective) budgetMenuHost: BudgetMenuDirective;
  @ViewChild(FixedMenuDirective) fixedMenuHost: FixedMenuDirective;
  @ViewChild(ContentDirective) contentHost: ContentDirective;
  @ViewChild(StatusDirective) statusMenuHost: StatusDirective;

  constructor(
      private events: Events,
      public menuCtrl: MenuController,
      public navCtrl: NavController,
      public modalCtl: ModalController, public loadingController: LoadingController,
      public toastCtrl: ToastController, public shareService: ShareService,
      public loadingCtrl: LoadingController, private route: ActivatedRoute, private router: Router,
      private componentFactoryResolver: ComponentFactoryResolver) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.shareService.setCurrentUser(this.router.getCurrentNavigation().extras.state.current_user);
      }
    });
  }

  ionViewWillEnter() {
    this.headerComponent.authentication();
    this.footerComponent.refresh();
    this.eventsOn();
    this.presentLoading();
  }

  ionViewDidEnter() {

  }

  ionViewWillLeave() {
  }

  eventsOn() {
    const root = this;
    this.events.unsubscribe('load-action-menu');
    this.events.unsubscribe('home-load-view');
    this.events.unsubscribe('refresh-footer');
    this.events.unsubscribe('send-message');
    this.events.subscribe('load-action-menu', () => {
      root.menuActionComponent.initialization();
    });
    this.events.subscribe('home-load-view', (viewName, type) => {
      console.log(viewName, type);
      const ref = this._loadComponent(this.contentHost.viewContainerRef, AccountView);
      ref.instance.initialiazation(type);
    });
    this.events.subscribe('refresh-footer', () => {
      root.footerComponent.refresh();
    });
    this.events.subscribe('send-message', (message) => {
      root.footerComponent.messaging(message);
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      duration: 1000,
      message: 'Loading Data...',
      translucent: true
    });
    return await loading.present();
  }

  private _loadComponent(viewContainerRef, component) {
    viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    return viewContainerRef.createComponent(componentFactory);
  }

}
