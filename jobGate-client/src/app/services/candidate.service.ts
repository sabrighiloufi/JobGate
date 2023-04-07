import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  token = localStorage.getItem("accessToken")!
  headersoption = new HttpHeaders({
    "authorization": this.token
  })

  constructor(private http: HttpClient) { }

  getCandidates(){
    return this.http.get(`${environment.baseurl}/candidates/getAll`)
  }
  getCandidate(id:any){
    return this.http.get(`${environment.baseurl}/candidates/getByID/${id}`)
  }
  updateCandidate(id:any,candidate:any){
    return this.http.put(`${environment.baseurl}/candidates/update/${id}`, candidate,  {headers: this.headersoption})
  }
  countCandidates(){
    return this.http.get(`${environment.baseurl}/candidates/numberCandidates`)
  }
  
}


