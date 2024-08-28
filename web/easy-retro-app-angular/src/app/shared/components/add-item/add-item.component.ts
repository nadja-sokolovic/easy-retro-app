import { RetroItemService } from 'src/app/core/services/retro-item.service';
import { RetroItem } from './../../../core/models/retro-item.model';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  loading: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { type: string; },
    private dialogRef: MatDialogRef<AddItemComponent>, 
    private formBuilder: FormBuilder,
    private itemService: RetroItemService) {
    this.formGroup = this.formBuilder.group({
      text: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    let retroItem = new RetroItem();
    retroItem.type = this.data.type;
    retroItem.text = this.formGroup.value.text;
    this.itemService.addNewItem(retroItem).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

}
