import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { catchError, Observable, throwError, map } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers! :   Observable<Array<Customer>>;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  constructor(private customerService : CustomerService, private fb : FormBuilder, private router: Router, public authService: AuthService) {
  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(""),
    });
    this.handleSearchCustomers();
  }
  handleSearchCustomers(){

    let kw = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }
  handleDeleteCustomer(c: Customer){
    let conf = confirm("Are you sure you want to delete this customer?");
    if(conf){
      this.customerService.deleteCustomer(c.id).subscribe({
        next : (resp) => {
          this.customers = this.customers.pipe(
            map(data => {
              let index = data.indexOf(c);
              data.slice(index, 1);
              return data;
            })
          );
        },
        error : (err) => {
          alert("Customer not deleted");
        }
      });
    }
  }

  handleCustomerDetails(customer: Customer) {
    this.router.navigateByUrl("/admin/customer-accounts/" + customer.id, { state: customer });
  }

  handleEditCustomer(customer: Customer) {
    this.router.navigate(["/admin/customer-accounts/" + customer.id], {
      state: customer,
      queryParams: { edit: 'true' }
    });
  }
}
