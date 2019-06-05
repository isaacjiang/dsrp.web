import {Component, EventEmitter} from '@angular/core';
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

    private uploader: FileUploader;

    constructor(public events: Events,
                public shareService: ShareService,
                public httpService: HttpService,
                public modalCtl: ModalController,
                public navParam: NavParams) {
        this.eventsHandles(this);
        this.initialization(this, navParam.data);
        this.fileUploadInit();
    }


    public fileUploadInit() {
        this.uploader = new FileUploader({
            url: '/api/files/upload',
            method: 'POST',
            autoUpload: true
        });
        this.uploader.onCompleteItem = (item: any, resp: any, status, opt) => {

            // console.log(resp);
            // console.log(this.currentEmployee);
            this.currentEmployee['avatarId'] = resp;
            this.httpService.post('/api/employee/save', this.currentEmployee)
                .subscribe(results => {
                    console.log(results);
                });

            // this.task_info.infoFile = JSON.parse(resp);
            // this.httpService.post('/api/dtools/updatetaskfile', {
            //     task_id: this.task_info._id,
            //     infoFile: JSON.parse(resp)
            // }).subscribe(resp2 => {
            //     console.log(resp2);
            //     // $rootScope.tasklists.forEach(function (t) {
            //     //   if (t._id == task._id){
            //     //     t.infoFile = response.data[0]
            //     //   }
            //     // })
            // });
        };
    }

    private uploadAvatar(e) {
        this.currentEmployee = e;
        document.getElementById('selectedFile').click();
    }


    private eventsHandles(root) {
        root.events.subscribe('root-login-modal-dismiss', (param) => {
            this.dismiss();
        });
    }

    private dismiss() {
        this.modalCtl.dismiss();
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
            console.log(resp);
            this.dismiss();
        });

    }

    private openPdf(fileInfo) {
        // this.modalCtl.create(PdfViewerComponent, fileInfo).present();
    }


    private clickFileInput() {
        document.getElementById('selectedFile').click();
    }

    private fileChange(event) {
        // console.log(this.uploader);
    }

}
