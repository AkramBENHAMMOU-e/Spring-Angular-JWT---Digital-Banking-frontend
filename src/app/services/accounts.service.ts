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
}
