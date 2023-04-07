import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http : HttpClient) { }

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

  getJobsPerMonth(){
    return this.http.get(`${environment.baseurl}/offers/offersPerMonth`)
  }
  getJobsPerSpeciality(){
    return this.http.get(`${environment.baseurl}/offers/OffersPerSpeciality`)
  }
}
