/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';

import 'rxjs';
import {NavParams} from '@ionic/angular';
// import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import {DocumentViewerOptions} from '@ionic-native/document-viewer';

@Component({
    selector: 'edp-pdfviewer',
    templateUrl: 'pdfviewer.html',
})
export class PdfViewerComponent {
    private title: string;
    private fileId: any;
    private pdfSrc: any;
    private zoom = 1;
    private currentPage = 1;
    private rotate = 0;
    private pageCount = 0;

    constructor(public navParam: NavParams) {
        this.fileId = navParam['data']['fileId'];
        console.log(navParam);
        this.initialiazation();
    }

    initialiazation() {
        this.title = 'test';
        const options: DocumentViewerOptions = {
            title: 'test'
        };
        // this.document.viewDocument('assets/myFile.pdf', 'application/pdf', options);
        this.pdfSrc = 'http://0.0.0.0/api/files/download/' + this.fileId;
    }

    onZoom(value) {
        if (value == 1) {
            this.zoom = value;
        } else {
            this.zoom += value;
        }
    }

    onPage(value) {
        switch (value) {
            case 0:
                this.currentPage = 1;
                break;
            case 9:
                this.currentPage = this.pageCount;
                break;
            default:
                this.currentPage += value;
        }

    }

    onRotate(value) {
        if(value==0){
            this.rotate=value;
        }else{
            this.rotate += value;
        }
    }

    afterLoadComplete(event) {
        this.pageCount = event.numPages;
    }

    private dismiss() {
        // this.viewCtl.dismiss();
    }
}
