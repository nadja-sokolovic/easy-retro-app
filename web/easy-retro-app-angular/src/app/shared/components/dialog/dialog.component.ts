import { FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  selectedType = '';
  sprint: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogComponent>) { }

  public closeDialog() {
    this.dialogRef.close(false);
  }

  getCloseValue() {
    return this.data.showCategories ? this.selectedType : this.sprint;  
  }

  ngOnInit(): void {
  }

}
