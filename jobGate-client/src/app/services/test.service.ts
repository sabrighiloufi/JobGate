import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }
  createTest(test:any){
    return this.http.post(`${environment.baseurl}/tests/create`, test)
  }
  submit(id:any, test:any){
    return this.http.put(`${environment.baseurl}/tests/submit/${id}`, test)
  }
}
