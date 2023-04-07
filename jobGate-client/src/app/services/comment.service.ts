import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  addComment(comment:any){
    return this.http.post(`${environment.baseurl}/comments/create`, comment)
  }
}
