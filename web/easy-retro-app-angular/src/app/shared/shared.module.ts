import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetroItemComponent } from './components/retro-item/retro-item.component';
import { RetroColumnComponent } from './components/retro-column/retro-column.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AddReportComponent } from './components/add-report/add-report.component';

const components = [
  RetroItemComponent,
  RetroColumnComponent
];

@NgModule({
  declarations: [
    RetroItemComponent,
    RetroColumnComponent,
    AddItemComponent,
    DialogComponent,
    AddReportComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...components]
})
export class SharedModule { }
