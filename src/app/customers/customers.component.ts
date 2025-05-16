import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers : any;
  errorMessage! : string;
  constructor(private customerService : CustomerService) {
  }
  ngOnInit(): void {
   this.customerService.getCustomers().subscribe({
    next : (data : any) => {
      this.customers = data;
    },
    error : (err : any) => {
      this.errorMessage = err.message;
    }
   })
  }
}
