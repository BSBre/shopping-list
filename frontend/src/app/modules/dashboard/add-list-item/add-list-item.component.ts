import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDashboardService } from 'services/user-dashboard-service/user-dashboard.service';

@Component({
  selector: 'app-add-list-item',
  templateUrl: './add-list-item.component.html',
  styleUrls: ['./add-list-item.component.css']
})
export class AddListItemComponent implements OnInit {
  shoppingListId: string;
  error: boolean = false;

  constructor(private userDashboardService: UserDashboardService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.shoppingListId = this.activatedRoute.snapshot.params['id'];
  }

  onSubmit(formData: any) {
    if (formData.value.name == "" || formData.value.quantity == "" || formData.value.price == "" || isNaN(formData.value.price) || isNaN(formData.value.quantity)) {
      this.error = true;
    } else {
      this.userDashboardService.addNewItem(formData.form.value).subscribe(() => {
        this.router.navigateByUrl('/dashboard')
      });
    }
  }

}
