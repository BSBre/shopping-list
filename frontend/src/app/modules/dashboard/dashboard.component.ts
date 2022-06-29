import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ShoppingListItem } from 'src/app/models/shoppingListItem.model';
import { Router } from '@angular/router';
import { UserDashboardService } from 'services/user-dashboard-service/user-dashboard.service';
import { LocalStorageService } from 'services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  id: String;
  shoppingList: ShoppingListItem[];
  error: boolean = false;

  constructor(private userDashboardService: UserDashboardService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUsersShoppingList();
  }

  getUsersShoppingList() {
    let shoppingListId = this.localStorageService.getItem('user').shoppingListId
    this.userDashboardService.getUsersShoppingList(shoppingListId).subscribe((shopingList: ShoppingListItem[]) => {
      this.shoppingList = shopingList as ShoppingListItem[];
    });
  }

  deleteShoppingistItem(event: any) {
    this.userDashboardService.deleteShoppingListItem(event.shoppingListId, event.shoppingListItemId).subscribe(() => {
      this.getUsersShoppingList();
    });
  }

  checkShoppingListItem(event: any, shoppingListId: string, shoppingListItemId: string) {
    let data = {
      checked: event,
      shoppingListId: shoppingListId,
      shoppingListItemId: shoppingListItemId
    }
    this.userDashboardService.checkShoppingListItem(data).subscribe(() => {
      this.getUsersShoppingList();
    });
  }

  editShoppingListItem(event: any, shoppingListId: string, shoppingListItemId: string) {
    if (event.quantity == "" || event.price == "" || isNaN(event.quantity) || isNaN(event.quantity)) {
      this.error = true;
    } else {
      let data = {
        updatedData: event,
        shoppingListId: shoppingListId,
        shoppingListItemId: shoppingListItemId
      }

      this.userDashboardService.editShoppingListItem(data).subscribe(() => {
        this.getUsersShoppingList();
        this.error = false;
      });
    }
  }

  goToAddNewItemPage() {
    let shoppingListId = this.localStorageService.getItem('user').shoppingListId
    this.router.navigateByUrl(`/add-item/${shoppingListId}`);
  }

  logout() {
    this.localStorageService.removeItem("user");
    this.router.navigateByUrl('');
  }

}
