import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { AccountsService } from '../services/accounts.service';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-accounts',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit{
  customerId! : string;
  customer! : Customer;
  accounts$! : Observable<Array<any>>;
  errorMessage! : string;
  editMode: boolean = false;
  customerForm!: FormGroup;
  updateSuccess: boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private accountsService : AccountsService,
    private customerService: CustomerService,
    private fb: FormBuilder
  ){
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.loadAccounts();
    this.initCustomerForm();

    // Check if edit mode is requested via query params
    this.route.queryParams.subscribe(params => {
      if (params['edit'] === 'true') {
        this.editMode = true;
      }
    });
  }

  initCustomerForm() {
    this.customerForm = this.fb.group({
      name: [this.customer.name, [Validators.required, Validators.minLength(3)]],
      email: [this.customer.email, [Validators.required, Validators.email]]
    });
  }

  loadAccounts() {
    this.accounts$ = this.accountsService.getAccountsByCustomerId(Number(this.customerId)).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  goToAccountOperations(accountId: string) {
    this.router.navigateByUrl('/admin/accounts/' + accountId);
  }

  editCustomer() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.initCustomerForm(); // Reset form to original values
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      const updatedCustomer: Customer = {
        id: this.customer.id,
        name: this.customerForm.value.name,
        email: this.customerForm.value.email
      };

      this.customerService.updateCustomer(updatedCustomer).subscribe({
        next: (data) => {
          this.customer = data;
          this.editMode = false;
          this.updateSuccess = true;
          // Hide success message after 3 seconds
          setTimeout(() => {
            this.updateSuccess = false;
          }, 3000);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Error updating customer';
        }
      });
    }
  }
}
