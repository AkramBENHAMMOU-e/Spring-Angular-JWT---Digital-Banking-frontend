import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  backendhost : string = "http://localhost:8080";
  constructor(private http : HttpClient) { }
  public getCustomers(): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendhost+"/customers");
  }
  public searchCustomers(keyword: string): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendhost+"/customers/search?keyword="+keyword);
  }

  public saveCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.backendhost+"/customers", customer);
  }

  public deleteCustomer(id: number): Observable<void>{
    return this.http.delete<void>(this.backendhost+"/customers/"+id);
  }

  public updateCustomer(customer: Customer): Observable<Customer>{
    return this.http.put<Customer>(this.backendhost+"/customers/"+customer.id, customer);
  }
}
