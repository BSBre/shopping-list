import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ShoppingListItem } from 'src/app/models/shoppingListItem.model';
import { LocalStorageService } from 'services/local-storage-service/local-storage.service';

interface LoginResponse {
  user: User
  error: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  login(form: { userName: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:3080/users/login`, form).pipe(tap(response => {
      if (response.error != "loginError") {
        this.localStorageService.setItem("user", response.user);
      }
    }))
  }

  getUsersShoppingList(shoppingListId: String) {
    return this.http.get<ShoppingListItem[]>(`http://localhost:3080/users/shopping-list/${shoppingListId}`);
  }

  addNewItem(form: { name: string; quantity: number; price: number; shoppingListId: string }) {
    return this.http.post<ShoppingListItem>(`http://localhost:3080/users/add-list-item`, form);
  }

  deleteShoppingListItem(shoppingListId: String, shoppingListItemId: String) {
    return this.http.delete(`http://localhost:3080/users/delete-list-item/${shoppingListId}/${shoppingListItemId}`);
  }

  checkShoppingListItem(data) {
    return this.http.post('http://localhost:3080/users/check-list-item', data);
  }

  editShoppingListItem(data) {
    return this.http.post('http://localhost:3080/users/edit-list-item', data);
  }

}
