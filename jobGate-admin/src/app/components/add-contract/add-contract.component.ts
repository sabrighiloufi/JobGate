import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit {
contracts: any
contractForm:FormGroup
  constructor(private contractservice: ContractService, private formbuilder:FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.getContracts()
    this.contractForm = this.formbuilder.group({
      name:['', Validators.required]
    })
  }


  getContracts(){
    this.contractservice.getContracts().subscribe((res:any)=>{
      this.contracts = res["data"]
      console.log(this.contracts)
    })
  }

  addcontract(){
    this.contractservice.addContract(this.contractForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'contract has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl("/dashboard/contract")
    })
  }


}
