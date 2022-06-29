import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddListItemComponent } from "../modules/dashboard/add-list-item/add-list-item.component";
import { DashboardComponent } from "../modules/dashboard/dashboard.component";
import { LoginComponent } from "../modules/login/login.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'add-item/:id', component: AddListItemComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }