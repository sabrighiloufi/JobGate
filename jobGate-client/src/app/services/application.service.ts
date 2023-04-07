import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  deleteApp(id:any){
    return this.http.delete(`${environment.baseurl}/applications/delete/${id}`)
  }
  apply(app:any){
    return this.http.post(`${environment.baseurl}/applications/create`, app)
  }

  update(id:any,app:any){
    return this.http.put(`${environment.baseurl}/applications/update/${id}`, app)
  }

}
