import { Injectable } from '@angular/core';
import { HttpClient, HttpParams   } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }
  getJobs(){
    return this.http.get(`${environment.baseurl}/offers/getAll`)
  }
  getJobByID(id:any){
    return this.http.get(`${environment.baseurl}/offers/getByID/${id}`)
  }
  update(id:any, job:any){
    return this.http.put(`${environment.baseurl}/offers/update/${id}`, job)
  }
  deleteJob(id:any){
    return this.http.delete(`${environment.baseurl}/offers/delete/${id}`)
  }
  postJob(job:any){
    return this.http.post(`${environment.baseurl}/offers/create/`, job)
  }
  countJobs(){
    return this.http.get(`${environment.baseurl}/offers/numberOffers`)
  }
  recentJobs(){
    return this.http.get(`${environment.baseurl}/offers/offers-last-month`)

  }
  searchJobs(query:any){
    let params = new HttpParams().set('q', query)
    //console.log('service'+params.toString())
    return this.http.get(`${environment.baseurl}/offers/getByQuery`,  {params: params })

  }
}
