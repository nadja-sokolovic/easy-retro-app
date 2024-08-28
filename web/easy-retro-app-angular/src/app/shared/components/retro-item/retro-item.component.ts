import { takeUntil } from 'rxjs/operators';
import { RetroItemService } from 'src/app/core/services/retro-item.service';
import { DialogService } from './../../../core/services/dialog.service';
import { RetroItem } from './../../../core/models/retro-item.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-retro-item',
  templateUrl: './retro-item.component.html',
  styleUrls: ['./retro-item.component.scss']
})
export class RetroItemComponent implements OnInit {
  @Input() retroItem: RetroItem = new RetroItem();
  @Input() selectedSprint: number = -1;
  @Input() sprint = -1;
  @Output() deletedItem = new EventEmitter<number>();
  @Output() changedItem = new EventEmitter<{}>();
  clickTimeout: any = null; // count the clicks
  editItemForm: FormGroup;
  editable: boolean = false;
  oldFormValue = {text: '', description: ''};
  defaultItem = new RetroItem();
  placeholder = {
    text: '',
    description: ''
  };

  private _unsubscribeAll = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private itemService: RetroItemService) {
    this.editItemForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    this.editItemForm = this.formBuilder.group({
      text: [this.retroItem.text, [Validators.required]],
      description: [this.retroItem.description]
    });
    if(this.retroItem.text === '') {
      this.placeholder.text = 'Unesite naziv price';
    }
    if(this.retroItem.description === '') {
      this.placeholder.description = 'Unesite opis price';
    }
  }

  onChangeItemType(item: RetroItem) {
    this.dialogService
      .openConfirmDialog('Odaberite novi tip za ovu stavku?', false, true, ['start', 'continue', 'stop'], item.itemId, item.type)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.itemService.changeItemType(item.itemId, res).subscribe(
            res => {
              this.changedItem.emit({
                itemId: item.itemId,
                newType: JSON.parse(JSON.stringify(res)).response.type,
                oldItem: item.type
              });
            }
          );
        }
      });
  }

  onSaveAction(item:RetroItem) {
    item.text = this.editItemForm.value.text;
    item.description = this.editItemForm.value.description;
    if(this.isFirstCategory()) {
      this.itemService.editItem(item).pipe(
        takeUntil(this._unsubscribeAll)
      ).subscribe(res => {
        this.editable = false;
      });
    } else {
      item.sprint = this.sprint;
      this.itemService.addNewItem(item).subscribe(res => {
        this.editable = false;
      });
    }
  }

  onCancelEditing() {
    this.editItemForm.setValue({text: this.oldFormValue.text, description: this.oldFormValue.description});
    this.editable = false;
  }

  onDeleteItem(itemId: number) {
    this.dialogService
      .openConfirmDialog('Da li želite obrisati ovu stavku?')
      .afterClosed()
      .subscribe((res) => {
        if (res !== false) {
          this.itemService.deleteItem(itemId).subscribe(
            (response: any) => {
              this.deletedItem.emit(itemId);
            },
            (error: any) => {
              console.log(error);
            }
          );
        }
      });
  }


  onSubmit() {

  }

  public onClick(event: any, itemId: number): void {
    if (this.clickTimeout) {
        this.setClickTimeout(() => {});
        this.handleDoubleClick(itemId)
    } else {
      // if timeout doesn't exist, we know it's first click 
      // treat as single click until further notice
      this.setClickTimeout((itemId: any) =>  
         this.handleSingleClick(itemId));
    }
  }

    // sets the click timeout and takes a callback 
    // for what operations you want to complete when
    // the click timeout completes
    public setClickTimeout(callback: any) {
      // clear any existing timeout
      clearTimeout(this.clickTimeout);
      this.clickTimeout = setTimeout(() => {
        this.clickTimeout = null;
        callback();
      }, 200);
    }

    public handleSingleClick(itemId: string) {
      //The actual action that should be performed on click      
    }

    public handleDoubleClick(itemId: number) {
      //The actual action that should be performed on double click      
      this.editable = true;
      this.oldFormValue.text = this.editItemForm.value.text;
      this.oldFormValue.description = this.editItemForm.value.description;
    }

  isFirstCategory() {
    return this.retroItem.type === 'start' || this.retroItem.type === 'continue' || this.retroItem.type === 'stop';
  }

  addReaction(itemId: number, reactionType: string) {
    this.itemService.addReactionToItem(itemId, reactionType).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(res => {
      if(reactionType === 'like') {
        this.retroItem.reactions.likeCount += 1;
      } else if(reactionType === 'dislike') {
        this.retroItem.reactions.dislikeCount += 1;
      }
    });
  }

  preventEditingForPreviousSprints() {
    return !this.isFirstCategory() && this.selectedSprint !== -1;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
