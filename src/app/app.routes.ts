import { Routes } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {LoginComponent} from './login/login.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { authentificationGuard } from './guards/authentication.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
export const routes: Routes = [
  {path : "customers", component: CustomersComponent},
  {path : "admin", component : AdminTemplateComponent,
    canActivate : [authentificationGuard],
    children : [
    {path : "accounts", component : AccountsComponent},
    {path : "accounts/:accountId", component : AccountsComponent},
    {path : "new-customer", component : NewCustomerComponent, canActivate : [authentificationGuard] , data : {roles : ["ADMIN"]}},
    {path : "customer-accounts/:id", component : CustomerAccountsComponent},
    {path : "customers", component : CustomersComponent},
    {path:"notAuthorized", component : NotAuthorizedComponent}
  ]},
  {path : "login", component : LoginComponent},
  {path : "", redirectTo : "login", pathMatch : "full"}

];
