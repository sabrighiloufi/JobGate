import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  token = localStorage.getItem("accessToken")!
  headersoption = new HttpHeaders({
    "authorization": this.token
  })

  constructor(private http: HttpClient) { }
  getCompanies(){
    return this.http.get(`${environment.baseurl}/companies/getAll`)
  }
  getCompany(id:any){
    return this.http.get(`${environment.baseurl}/companies/getByID/${id}`)
  }
  updateCompany(id:any,company:any){
    return this.http.put(`${environment.baseurl}/companies/update/${id}`, company,  {headers: this.headersoption})
  }
  numberCompanies(){
    return this.http.get(`${environment.baseurl}/companies/numberCompany`)
  }
  popularCompanies(){
    return this.http.get(`${environment.baseurl}/companies/popular-companies`)
  }
}
