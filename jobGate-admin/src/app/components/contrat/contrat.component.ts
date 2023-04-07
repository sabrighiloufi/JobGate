import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {
contracts:any
p:number = 1
search_name:any
contractPerPage: number = 5
contractToUpdate:any
newContract:FormGroup
  constructor(private contractservice: ContractService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getContracts()
    this.newContract = this.formBuilder.group({
      name:['', Validators.required],
      _id:['', Validators.required],
    })
  }

  getContracts(){
    this.contractservice.getContracts().subscribe((res:any)=>{
      this.contracts = res["data"]
      console.log(this.contracts)
    })
  }

  deleteContracts(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contractservice.deleteContracts(id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'contract has been deleted.',
            'success'
          )
          this.getContracts()
        })
        
      }
    })
    
  }

  setContractUpdate(contract:any){
    this.newContract.patchValue({
      name: contract.name, 
      _id:contract._id
    }); 
  }

  update(){
    this.contractservice.updateContracts(this.newContract.value._id, this.newContract.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your changes has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.getContracts()
    })
  }
}
