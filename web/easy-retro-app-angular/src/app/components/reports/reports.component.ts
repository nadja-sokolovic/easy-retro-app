import { AddReportComponent } from './../../shared/components/add-report/add-report.component';
import { Report } from './../../core/models/report.model';
import { ReportService } from './../../core/services/report.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  selectedSprint = new FormControl(-1);
  sprints: number[] = [];
  report: Report = new Report();

  private _unsubscribeAll = new Subject<void>();

  constructor(private reportService: ReportService,
    private dialogService: DialogService,
    private dialog: MatDialog) { }

    ngOnInit(): void {
      this.getSprints();
    }

    onSelectSprint(sprint: number) {
      //load report for sprint
      this.reportService.loadReportForSprint(sprint).pipe(
        takeUntil(this._unsubscribeAll)
      ).subscribe(res => {
        this.report = JSON.parse(JSON.stringify(res)).response;
      })
    }

    createNewReport() {
      this.dialog
          .open(AddReportComponent)
          .afterClosed()
          .subscribe((response: any) => {
            if (response != undefined) {
              this.sprints.push(JSON.parse(JSON.stringify(response)).response.sprint);
            }
          });
    }

    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }

    private getSprints() {
      this.reportService.getAllSprints().pipe(
        takeUntil(this._unsubscribeAll)
      ).subscribe(res => {
        this.sprints = JSON.parse(JSON.stringify(res)).response;
      })
    }

}
