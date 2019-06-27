import {Component} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Events, ModalController, NavParams} from '@ionic/angular';
import {ShareService} from '../../../services/share.service';
import {HttpService} from '../../../services/http.service';
import {PdfViewerComponent} from '../pdfviewer/pdfviewer';

@Component({
    selector: 'hiring',
    templateUrl: 'hiring.html'
})
export class Hiring {
    private task_info: any;
    private tabs: any;
    private parameters: any = {tabs_value: []};
    private employees: any;
    private currentEmployee: any;

    private uploaderImage: FileUploader;
    private uploaderPDF: FileUploader;

    constructor(private events: Events,
                private shareService: ShareService,
                private httpService: HttpService,
                private modalController: ModalController,
                private navParam: NavParams) {
        this.task_info = this.navParam.data;
        this.eventsHandles(this);
        this.initialization(this, navParam.data);
        this.fileUploadInit();
    }


    public fileUploadInit() {
        this.uploaderImage = new FileUploader({
            url: '/api/files/upload',
            method: 'POST',
            autoUpload: true
        });
        this.uploaderImage.onCompleteItem = (item: any, resp: any, status, opt) => {
            if (this.currentEmployee['avatarId'] != null && this.currentEmployee['avatarId'] != undefined && this.currentEmployee['avatarId'] != '') {
                this.httpService.get('/api/files/delete/' + this.currentEmployee['avatarId'])
                    .subscribe(results => {
                        this.currentEmployee['avatarId'] = resp;
                        this.updateEmpolyee();
                    });
            } else {
                this.currentEmployee['avatarId'] = resp;
                this.updateEmpolyee();
            }
        };

        this.uploaderPDF = new FileUploader({
            url: '/api/files/upload',
            method: 'POST',
            autoUpload: true
        });
        this.uploaderPDF.onCompleteItem = (item: any, resp: any, status, opt) => {
            if (this.currentEmployee['resumeId'] != null && this.currentEmployee['resumeId'] != undefined && this.currentEmployee['resumeId'] != '') {
                this.httpService.get('/api/files/delete/' + this.currentEmployee['resumeId'])
                    .subscribe(results => {
                        this.currentEmployee['resumeId'] = resp;
                        this.updateEmpolyee();
                    });
            } else {
                this.currentEmployee['resumeId'] = resp;
                this.updateEmpolyee();
            }
        };
    }

    async presentModal(fileId) {
        const modal = await this.modalController.create({
            component: PdfViewerComponent,
            componentProps: {fileId: fileId},
            backdropDismiss: false,
            cssClass: 'modalCss-pdf',
        });

        return await modal.present();
    }

    private updateEmpolyee() {
        this.httpService.post('/api/employee/save', this.currentEmployee)
            .subscribe(results => {
            });
    }

    private uploadImage(e) {
        this.currentEmployee = e;
        document.getElementById('imageFile').click();
    }


    private eventsHandles(root) {
        root.events.subscribe('root-login-modal-dismiss', (param) => {
            this.dismiss();
        });
    }

    private uploadPDF(e) {
        this.currentEmployee = e;
        document.getElementById('PDFFile').click();
    }

    private initialization(root, params) {
        root.task_info = params.params;
        root.employees = params.data;
        if (params.data.length > 0) {
            const categoryMap = {};
            root.employees.forEach(employee => {
                employee.minimumSalary = 100000;
                categoryMap[employee.category] = employee.category;
            });
            root.parameters.tabs_value = Object.keys(categoryMap);
            root.parameters.tabs_disp = Object.keys(categoryMap);
            root.tabs = this.parameters.tabs_value[0];
        }
        // Object.keys(params.data).forEach(function (key) {
        //     params.data[key].forEach(function (e) {
        //         if (e.photo) {
        //             e.url = '/api/files/download?filename=' + e.photo['filename'] +
        //                 '&id=' + e.photo['objectID'] + '&ctype=' + e.photo['content_type'];
        //         }
        //
        //         e.salaryOffer_t = e.minimumSalary === undefined ? 0 : root.formatNum(parseInt(e.minimumSalary, 10));
        //         e.salaryOffer = e.minimumSalary;
        //     });
        // });

    }

    private onTabChange() {

    }

    private onChange(e) {
        e.salaryOffer_t = this.shareService.formatNum(parseInt(e.salaryOffer, 10));
    }

    private submit() {
        const employees = this.employees;
        const offeredEmployees = [];
        Object.keys(employees).forEach(function (key) {
            employees[key].forEach(function (e) {
                if (e.salaryOffer) {
                    offeredEmployees.push(e);
                }
            });
        });

        this.httpService.post('/api/dtools/hiring', {
            username: this.task_info.username,
            taskID: this.task_info.taskID,
            companyName: this.task_info.companyName,
            teamName: this.task_info.teamName,
            period: this.task_info.period,
            offer: offeredEmployees
        }).subscribe(resp => {
            this.dismiss();
        });

    }

    private dismiss() {
        this.modalController.dismiss();
    }

    private openPdf(fileId) {
        this.presentModal(fileId);
    }


    private clickFileInput() {
        document.getElementById('selectedFile').click();
    }

}
