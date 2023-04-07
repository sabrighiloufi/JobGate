import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  
  constructor(private http:HttpClient) { }

  
  deleteComment(id:any){
    return this.http.delete(`${environment.baseurl}/comments/delete/${id}`)
  }
  updateComment(id:any, comment:any){
    return this.http.put(`${environment.baseurl}/comments/update/${id}`, comment)
  }
  addComment(comment:any){
    return this.http.post(`${environment.baseurl}/comments/create`, comment)
  }
}
