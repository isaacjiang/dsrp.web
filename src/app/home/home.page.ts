import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {MainMenuDirective} from '../directives/main.menu.directive';
import {HelpMenuDirective} from '../directives/help.menu.directive';
import {BudgetMenuDirective} from '../directives/budget.menu.directive';
import {FixedMenuDirective} from '../directives/fixed.menu.directive';
import {ContentDirective} from '../directives/content.directive';
import {StatusDirective} from '../directives/status.directive';
import {Events, LoadingController, MenuController, ModalController, NavController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(MainMenuDirective) mainMenuHost: MainMenuDirective;
  @ViewChild(HelpMenuDirective) helpMenuHost: HelpMenuDirective;
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
      public loadingCtrl: LoadingController,
      private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ionViewWillEnter() {
    // this.loader = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   duration: 2000
    // });
    // this.loader.present();
  }

  ionViewDidEnter() {
  }

  ionViewWillLeave() {
  }


}
