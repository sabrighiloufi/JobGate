import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private http:HttpClient) { }

  getSpecialties(){
    return this.http.get(`${environment.baseurl}/specialties/getAll`)
  }
  addSpeciality(speciality:any){
    return this.http.post(`${environment.baseurl}/specialties/create`, speciality)
  }
  deleteSpeciality(id:any){
    return this.http.delete(`${environment.baseurl}/specialties/delete/${id}`)
  } 
  updateSpeciality(id:any,speciality:any){
    return this.http.put(`${environment.baseurl}/specialties/update/${id}`, speciality)
  }  
}
