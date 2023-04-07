import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }
  
  getCompanies(){
    return this.http.get(`${environment.baseurl}/companies/getAll`)
  }
  getCompaniesPerMonth(){
    return this.http.get(`${environment.baseurl}/companies/company-in-month`)
  }
  update(id:any, company:any){
    return this.http.put(`${environment.baseurl}/companies/update/${id}`, company)
  }
  deleteCompany(id:any){
    return this.http.delete(`${environment.baseurl}/companies/delete/${id}`)
  }
}
