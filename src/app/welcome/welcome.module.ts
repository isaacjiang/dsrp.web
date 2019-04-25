import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Welcome } from './welcome';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: Welcome
      }
    ])
  ],
  declarations: [
    Welcome,
  ]
})
export class WelcomeModule { }
