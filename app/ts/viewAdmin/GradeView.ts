import {UI} from "../util/UI";
import {AdminController} from "../controllers/AdminController";

export class GradeView {

    private controller: AdminController;

    constructor(controller: AdminController) {
        this.controller = controller;
    }

    public updateTitle() {
        // document.querySelector('#adminTabsHeader').innerHTML = data.course;
        document.querySelector('#adminTabsHeader').innerHTML = "Grades";
    }

    public render(data: any) {

        console.log('GradeView::render(..) - start');
        this.updateTitle();

        console.log('GradeView::render(..) - data: ' + JSON.stringify(data));
        // grades
        var gradeList = document.querySelector('#admin-grade-list');
        if (gradeList !== null) {
            gradeList.innerHTML = '';

            var headers = null;

            var table = '<table style="width: 100%"><tr>';

            if (typeof data.response.students !== 'undefined') {
                for (let student of data.response.students) {
                    if (headers === null) {
                        table += '<th style="text-align:left;">Student</th>';
                        for (let deliv of student.deliverables) {
                            if (typeof deliv.final !== 'undefined') {
                                table += '<th>' + deliv.id + '</th>'
                            }
                        }
                        table += '</tr>';
                        headers = true;
                    }

                    table += '<tr>';
                    table += '<td>' + student.id + '</td>';
                    for (let deliv of student.deliverables) {
                        if (typeof deliv.final !== 'undefined') {
                            table += '<td style="text-align: center;">' + deliv.final + '</td>'
                        }
                    }
                    table += '</tr>';
                }
                table += '</table>';
                gradeList.innerHTML = table;
            } else {
                gradeList.innerHTML = '<h2 style="text-align: center;">No grades returned.</h2>';
            }
        } else {
            console.log('GradeView::render - element is null');
        }
        UI.hideModal();
    }


}