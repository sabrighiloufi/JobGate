import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }
  
  getSkills(){
    return this.http.get(`${environment.baseurl}/skills/getAll`)
  }
  deleteSkills(id:any){
    return this.http.delete(`${environment.baseurl}/skills/delete/${id}`)
  }
  updateSkills(id:any, skill:any){
    return this.http.put(`${environment.baseurl}/skills/update/${id}`, skill)
  }
  addSkills(skills:any){
    return this.http.post(`${environment.baseurl}/skills/create`, skills)
  }
}
