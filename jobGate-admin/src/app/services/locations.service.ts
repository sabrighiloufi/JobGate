import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }
  
  getLocations(){
    return this.http.get(`${environment.baseurl}/locations/getAll`)
  }
  deleteLocation(id:any){
    return this.http.delete(`${environment.baseurl}/locations/delete/${id}`)
  }
  updateLocations(id:any, location:any){
    return this.http.put(`${environment.baseurl}/locations/update/${id}`, location)
  }
  addLocation(location:any){
    return this.http.post(`${environment.baseurl}/locations/create`, location)
  }
}