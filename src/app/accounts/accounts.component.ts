import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { AccountsService } from '../services/accounts.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accountFormGroup! : FormGroup;
  currentPage : number = 0;
  pageSize : number = 5;
  accountObservable! : Observable<AccountDetails>;
  operationFormGroup! : FormGroup;
  errorMessage! : string;
  constructor(private fb : FormBuilder, public authService : AuthService, private accountService : AccountsService){  }
  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control(''),
      accountNumber : this.fb.control(null),

    });
    this.operationFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(null),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null),
    });
  }

  handleSearchAccount(){
    let accountId = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number){
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation(){
    let accountId : string = this.accountFormGroup.value.accountId;
    let operationType : string = this.operationFormGroup.value.operationType;
    if(operationType == 'DEBIT'){
      this.accountService.debit(accountId, this.operationFormGroup.value.amount, this.operationFormGroup.value.description).subscribe({
        next : (data) => {
          alert("Success Debit");
          this.handleSearchAccount();
        },
        error : (err) => {
          console.log(err);
        }
      });
    }
    else if(operationType == 'CREDIT'){
      this.accountService.credit(accountId, this.operationFormGroup.value.amount, this.operationFormGroup.value.description).subscribe({
        next : (data) => {
          alert("Success Credit");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },  
        error : (err) => {
          console.log(err);
        }
      });
    }
    else if(operationType == 'TRANSFERT'){
      this.accountService.transfert(accountId, this.operationFormGroup.value.amount, this.operationFormGroup.value.description, this.operationFormGroup.value.accountDestination).subscribe({
        next : (data) => {
          alert("Success Transfert");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error : (err) => {
          console.log(err);
        }
      });
    } 
  }
}
