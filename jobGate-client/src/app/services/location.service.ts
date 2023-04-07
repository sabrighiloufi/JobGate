import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  getLocations(){
    return this.http.get(`${environment.baseurl}/locations/getAll`)
  }
  addLocation(location:any){
    return this.http.post(`${environment.baseurl}/locations/create`, location)
  }
}
