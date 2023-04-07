import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  token = localStorage.getItem("accessToken")!
  headersoption = new HttpHeaders({
    "authorization": this.token
  })

  deleteProfile(id:any){
    return this.http.delete(`${environment.baseurl}/admins/delete/${id}`, {headers: this.headersoption})
  }
  updateProfile(id:any, admin:any){
    return this.http.put(`${environment.baseurl}/admins/update/${id}`, admin, {headers: this.headersoption})
  }

  getAdmin(id:any){
    return this.http.get(`${environment.baseurl}/admins/getByID/${id}`)
  }

}
