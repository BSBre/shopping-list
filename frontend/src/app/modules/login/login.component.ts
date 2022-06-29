import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDashboardService } from 'services/user-dashboard-service/user-dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userNameIconUrl: string = 'https://firebasestorage.googleapis.com/v0/b/shopping-app-d0dcf.appspot.com/o/icons%2FemailLoginIcon.png?alt=media&token=0820a55c-5635-4c24-ae3e-891f2ba893c8';
  passwordIconUrl: string = 'https://firebasestorage.googleapis.com/v0/b/shopping-app-d0dcf.appspot.com/o/icons%2FpasswordLoginIcon.png?alt=media&token=e17789d6-6939-4b6a-900a-9ce86543ef07';
  loginIconUrl: string = 'https://firebasestorage.googleapis.com/v0/b/shopping-app-d0dcf.appspot.com/o/icons%2FloginIcon.png?alt=media&token=099bd1b2-fe9c-4300-a96f-932b7ef4ee6e';

  constructor(private router: Router, private userDashboardService: UserDashboardService, public snackBar: MatSnackBar) { }
  error: boolean = false;
  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    if (formData.value.email == "" || formData.value.password == "") {
      this.error = true;
    } else {
      this.userDashboardService.login(formData.form.value).subscribe((response: { error: string; }) => {
        if (response.error == "loginError") {
          this.error = true;
        } else {
          this.router.navigateByUrl('/dashboard')
        }
      })
    }
  }

}
