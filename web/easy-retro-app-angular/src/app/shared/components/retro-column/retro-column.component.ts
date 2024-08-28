import { AddItemComponent } from './../add-item/add-item.component';
import { RetroItem } from './../../../core/models/retro-item.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-retro-column',
  templateUrl: './retro-column.component.html',
  styleUrls: ['./retro-column.component.scss']
})
export class RetroColumnComponent implements OnInit {
  @Input() title = '';
  @Input() retroItems: RetroItem[] = [];
  @Input() type = '';
  @Input() selectedSprint: number = -1;
  @Input() sprint = -1;
  @Output() changedItemType = new EventEmitter<{}>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addNewItem() {
    this.dialog
        .open(AddItemComponent, { data: { type: this.type } })
        .afterClosed()
        .subscribe((response: any) => {
          if (response != undefined) {
            this.retroItems.push(JSON.parse(JSON.stringify(response)).response)
          }
        });
  }

  removeItemFromList(itemId: number) {
    this.retroItems = this.retroItems.filter(item => item.itemId !== itemId)
  }

  moveItemToAnotherList(event: any) {
    this.retroItems = this.retroItems.filter(item => item.itemId !== event.itemId);
    this.changedItemType.emit(event);
  }

  isFirstCategory() {
    return this.type === 'start' || this.type === 'continue' || this.type === 'stop';
  }

}
