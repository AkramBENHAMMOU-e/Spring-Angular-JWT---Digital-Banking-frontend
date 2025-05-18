import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  sub: string;
  scope: string[];
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  roles : any;
  username : any;
  accessToken! : string;
  constructor(private http : HttpClient){}

  public login(username : string, password : string){
    let params = new HttpParams()
    .set("username", username)
    .set("password", password);
    let options = {
     headers : new HttpHeaders()
     .set("content-type", "application/x-www-form-urlencoded")
    }
    return this.http.post("http://localhost:8080/auth/login", params, options);
  }


  loadProfile(response : any){
    this.isAuthenticated = true;
    this.accessToken = response["access-token"];
    let decodedJwt : any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
  }
}
