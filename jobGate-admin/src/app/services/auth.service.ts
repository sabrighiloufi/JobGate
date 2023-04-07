import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  token = localStorage.getItem("accessToken")!
  headersoption = new HttpHeaders({
    "authorization": this.token
  })


  signin(loginRequest:any){
    return this.http.post(`${environment.baseurl}/auth/login`, loginRequest)
  }

  register(registerRequest:any){
    return this.http.post(`${environment.baseurl}/admins/create`, registerRequest)
  }
  forgotPassword(email:any){
    return this.http.post(`${environment.baseurl}/auth/forget-password`, email)
  }
  resetPassword(resetPasswordToken:any, resetRequest:any){
    return this.http.post(`${environment.baseurl}/auth/reset-password/${resetPasswordToken}`, resetRequest)
  }
  changePassword(id:any, pwdRequest:any){
    return this.http.post(`${environment.baseurl}/auth/change-password/${id}`, pwdRequest, {headers: this.headersoption})
  }
}
