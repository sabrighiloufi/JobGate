import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private http: HttpClient) { }
  subscribe(subRequest:any){
    return this.http.post(`${environment.baseurl}/subscribers/add`, subRequest)
  }
}
