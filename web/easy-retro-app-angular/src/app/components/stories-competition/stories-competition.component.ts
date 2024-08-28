import { RetroItem } from './../../core/models/retro-item.model';
import { DialogService } from './../../core/services/dialog.service';
import { takeUntil } from 'rxjs/operators';
import { RetroItemService } from 'src/app/core/services/retro-item.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getItemsForStoryCompetitionTab, initItemList } from 'src/app/shared/helpers/helper-methods.helper';

@Component({
  selector: 'app-stories-competition',
  templateUrl: './stories-competition.component.html',
  styleUrls: ['./stories-competition.component.scss']
})
export class StoriesCompetitionComponent implements OnInit {
  selectedSprint = new FormControl(-1);
  sprint = -1;
  sprints = []
  allItems: any;

  private _unsubscribeAll = new Subject<void>();

  constructor(
    private itemService: RetroItemService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getSprints();
  }

  onSelectSprint(sprint: number) {
    this.itemService.loadItems(2, sprint).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(response => {
      this.allItems = getItemsForStoryCompetitionTab(JSON.parse(JSON.stringify(response)).response);
    })
  }

  createNewCompetition() {
    this.selectedSprint = new FormControl(-1);
    this.dialogService
      .openConfirmDialog('Unesite broj sprinta za koji želite kreirati takmičenje', true)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.sprint = res;
          this.allItems = initItemList();
        }
      });
  }

  finishCreating() {
    this.getSprints();
    this.sprint = -1;
    this.allItems = null;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private getSprints() {
    this.itemService.getAllSprints().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(res => {
      this.sprints = JSON.parse(JSON.stringify(res)).response;
    })
  }

}
