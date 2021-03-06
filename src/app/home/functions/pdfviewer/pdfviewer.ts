/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';

import 'rxjs';
import {NavParams} from '@ionic/angular';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import {DocumentViewerOptions} from '@ionic-native/document-viewer';




@Component({
    selector: 'edp-pdfviewer',
    templateUrl: 'pdfviewer.html',
})
export class PdfViewerComponent {
    private title: string;
    private file_info: any;
    private pdfSrc: any;

    constructor(
                private document: DocumentViewer,
                public navParam: NavParams) {
        this.file_info = navParam.data;
        this.initialiazation();
    }

    initialiazation() {
        this.title = this.file_info['filename'];
        const options: DocumentViewerOptions = {
            title: this.file_info['filename']
        };
        this.document.viewDocument('assets/myFile.pdf', 'application/pdf', options);
        // $scope.pdfName = ' Introduction';
        this.pdfSrc = '/api/files/download?filename=' + this.file_info['filename'] +
            '&id=' + this.file_info['objectID'] + '&ctype=' + this.file_info['content_type'];
        // //'static/pdf/oea-big-data-guide-1522052.pdf';
        //
        // $scope.scroll = 100;
        // $scope.loading = '';
        //
        // $scope.getNavStyle = function (scroll) {
        //   if (scroll > 100) return 'pdf-controls fixed';
        //   else return 'pdf-controls';
        // }
    }

    private dismiss() {
        // this.viewCtl.dismiss();
    }




}
