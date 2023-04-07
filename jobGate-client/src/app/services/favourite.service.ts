import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  token = localStorage.getItem("accessToken")!
  headersoption = new HttpHeaders({
    "authorization": this.token
  })

  constructor(private http: HttpClient) { }

  addtoFavouriteJob(favourite:any){
    return this.http.post(`${environment.baseurl}/favorites/create`, favourite,  {headers: this.headersoption})
  }
  getMyFavouriteJobs(id:any){
    return this.http.get(`${environment.baseurl}/favorites/getMyFavorites/${id}`,  {headers: this.headersoption})

  }
  deleteFavourite(FavouriteId:any){
    return this.http.delete(`${environment.baseurl}/favorites/delete/${FavouriteId}`,  {headers: this.headersoption})
  }
  deleteAll(CandidateId:any){
    return this.http.delete(`${environment.baseurl}/favorites/deleteMyfavorites/${CandidateId}`,  {headers: this.headersoption})
  }

}
