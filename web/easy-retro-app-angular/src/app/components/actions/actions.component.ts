import { Component, OnInit } from '@angular/core';
import { RetroItemService } from 'src/app/core/services/retro-item.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getItemsForActionsTab } from 'src/app/shared/helpers/helper-methods.helper';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  allItems: any;

  private _unsubscribeAll = new Subject<void>();

  constructor(private itemService: RetroItemService) { }

  ngOnInit(): void {
    this.itemService.loadItems(1).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(response => {
      this.allItems = getItemsForActionsTab(JSON.parse(JSON.stringify(response)).response);
    })
  }

  changeItemType(event: any) {
    this.itemService.loadItemById(event.itemId).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(res => {
      const item = JSON.parse(JSON.stringify(res)).response;
      switch(event.newType) {
        case 'start':
          this.allItems[0].push(item);
          break;
        case 'continue':
          this.allItems[1].push(item);
          break;
        case 'stop':
          this.allItems[2].push(item);
          break;
      }
    })  
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
