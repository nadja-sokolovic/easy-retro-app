import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public openConfirmDialog(msg: any, hasInputField?: boolean, hasOptions?: boolean, categories?: string[], itemId?: number, oldType?: string) {
    return this.dialog.open(DialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg,
        showInputField: hasInputField ? hasInputField : false,
        showCategories: hasOptions ? hasOptions : false,
        categories: categories ? categories : [],
        itemId,
        oldType
      }
    });
  }
}
