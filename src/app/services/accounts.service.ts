import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  backendhost : string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.backendhost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(accountId: string, amount: number, description: string): Observable<AccountDetails>{
    return this.http.post<AccountDetails>(this.backendhost+"/accounts/debit", {accountId, amount, description});
  }
  public credit(accountId: string, amount: number, description: string): Observable<AccountDetails>{
    return this.http.post<AccountDetails>(this.backendhost+"/accounts/credit", {accountId, amount, description});
  }
  public transfert(accountSource: string, amount: number, description: string, accountDestination: string): Observable<AccountDetails>{
    return this.http.post<AccountDetails>(this.backendhost+"/accounts/transfer", {accountSource, amount, description, accountDestination});
  }

  public getAccountsByCustomerId(customerId: number): Observable<Array<any>>{
    return this.http.get<Array<any>>(this.backendhost+"/customers/"+customerId+"/accounts");
  }
}
