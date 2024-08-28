import { Report } from './../../../core/models/report.model';
import { ReportService } from './../../../core/services/report.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<AddReportComponent>,
    private formBuilder: FormBuilder,
    private reportService: ReportService) { 
      this.formGroup = this.formBuilder.group({
        sprint: ['', Validators.required],
        text: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    let report = new Report();
    report.sprint = this.formGroup.value.sprint;
    report.text = this.formGroup.value.text;
    this.reportService.createNewReport(report).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

}
