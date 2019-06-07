import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';


import {HomePage} from './home.page';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {MenuActionComponent} from './menu-action/menu.action.component';
import {MenuBudgetComponent} from './menu-budget/menu.budget.component';
import {HelpMenuComponent} from './menu-help/menu.help.component';
import {PdfViewerComponent} from './functions/pdfviewer/pdfviewer';
import {Forecasting} from './functions/forecasting/forecasting';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {FooterComponent} from './footer/footer.component';
import {Hiring} from './functions/hiring/hiring';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule, PdfViewerModule,
        FormsModule,
        IonicModule, FileUploadModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    entryComponents: [Forecasting, Hiring, PdfViewerComponent],
    declarations: [HomePage, HeaderComponent, FooterComponent, MenuActionComponent, MenuBudgetComponent, HelpMenuComponent,
        PdfViewerComponent, Forecasting, Hiring]
})
export class HomePageModule {
}
