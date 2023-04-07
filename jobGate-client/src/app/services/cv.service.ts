import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  token = localStorage.getItem("accessToken")!
  headersoption = new HttpHeaders({
    "authorization": this.token
  })

  constructor(private http: HttpClient) { }
  uploadCV(cv:any){
    return this.http.post(`${environment.baseurl}/cvs/create`, cv,  {headers: this.headersoption})
  }
  numberCVs(){
    return this.http.get(`${environment.baseurl}/cvs/countcvs`)
  }
}
