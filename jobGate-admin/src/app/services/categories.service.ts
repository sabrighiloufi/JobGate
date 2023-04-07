import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get(`${environment.baseurl}/categories/getAll`)
  }
  deleteCategory(id:any){
    return this.http.delete(`${environment.baseurl}/categories/delete/${id}`)
  }
  updateCategory(id:any, category:any){
    return this.http.put(`${environment.baseurl}/categories/update/${id}`, category)
  }
  addCategory(category:any){
    return this.http.post(`${environment.baseurl}/categories/create`, category)
  }
}
