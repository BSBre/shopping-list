import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDashboardService } from 'services/user-dashboard-service/user-dashboard.service';
import { ShoppingListItem } from 'src/app/models/shoppingListItem.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  isEdit: boolean = false;
  @Input() shoppingListItem: ShoppingListItem;
  @Output() listItemDeleted = new EventEmitter<Object>();
  @Output() listItemCheck = new EventEmitter<boolean>();
  @Output() listItemEdit = new EventEmitter<Object>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteShoppingistItem(shoppingListId: String, shoppingListItemId: String) {
    this.listItemDeleted.emit({ shoppingListId: shoppingListId, shoppingListItemId: shoppingListItemId });
  }

  checkShoppingListItem(event: any) {
    this.listItemCheck.emit(event.checked);
  }

  editShoppingListItem() {
    this.isEdit = true;
  }

  saveShoppingListItem() {
    this.isEdit = false;
    this.listItemEdit.emit(this.shoppingListItem);
  }

}
