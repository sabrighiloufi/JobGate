import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  constructor(private http: HttpClient) { }
  getSpecialties(){
    return this.http.get(`${environment.baseurl}/specialties/getAll`)
  }
  getSpecialtiesByCategory(id:any){
    return this.http.get(`${environment.baseurl}/specialties/getByCategory/${id}`)
  }

}
