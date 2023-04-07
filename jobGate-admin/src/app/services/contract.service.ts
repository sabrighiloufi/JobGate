import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }
  
  getContracts(){
    return this.http.get(`${environment.baseurl}/contracts/getAll`)
  }

  deleteContracts(id:any){
    return this.http.delete(`${environment.baseurl}/contracts/delete/${id}`)
  }

  updateContracts(id:any, contract:any){
    return this.http.put(`${environment.baseurl}/contracts/update/${id}`, contract)
  }

  addContract(contract:any){
    return this.http.post(`${environment.baseurl}/contracts/create`, contract)
  }

}
