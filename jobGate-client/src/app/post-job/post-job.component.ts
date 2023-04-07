import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriesService } from '../services/categories.service';
import { ContractTypesService } from '../services/contract-types.service';
import { JobService } from '../services/job.service';
import { LocationService } from '../services/location.service';
import { SkillsService } from '../services/skills.service';
import { SpecialtiesService } from '../services/specialties.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
categories:any
specialties:any
contracts:any
postJobForm:FormGroup
skills:any
user = JSON.parse(localStorage.getItem("user")!)
// contract_types = [];
locations:any
addLocationForm: FormGroup
  constructor(private jobservice:JobService,
              private formbuilder:FormBuilder ,
              private locationservice:LocationService ,
              private skillservice:SkillsService ,
              private specialtisService: SpecialtiesService,
              private categoriesService:CategoriesService,
              private contractService:ContractTypesService,
              private route:Router) { }

  ngOnInit(): void {
    this.getcategories()
    this.getcontracts()
    this.getLocations()
    this.postJobForm = this.formbuilder.group({
      title:['', Validators.required],
      postes:['', Validators.required],
      salary:['', Validators.required],
      contract_types: this.formbuilder.array([]),
      expiration_date:['', Validators.required],
      description:['', Validators.required],
      type:['', Validators.required],
      skills:this.formbuilder.array([]),
      speciality:['', Validators.required],
      location:['', Validators.required],
      company:['']
    })
    this.addLocationForm = this.formbuilder.group({
      address:['', Validators.required],
      city:['', Validators.required],
      country:['', Validators.required],
    })
  }


  getcategories(){
    this.categoriesService.getCategories().subscribe((res:any)=>{
      this.categories = res["data"]
      console.log(this.categories)
    })
  }

  addLocation(){
    this.locationservice.addLocation(this.addLocationForm.value).subscribe((res:any)=>{
      this.getLocations()
    })
  }

  getLocations(){
    this.locationservice.getLocations().subscribe((res:any)=>{
      this.locations = res["data"]
      console.log(this.locations)
    })
  }

  getSpecialties(event:any){
    this.specialtisService.getSpecialtiesByCategory(event.target.value).subscribe((res:any)=>{
      this.specialties = res["data"]
      console.log(this.specialties)
    })
  }

  getSkills(event:any){
    this.skillservice.getSkills().subscribe((res:any)=>{
      this.skills = res["data"].filter((el:any)=>(el.speciality == event.target.value))
      console.log(this.skills)
    })
  }

  getcontracts(){
    this.contractService.getContracts().subscribe((res:any)=>{
      this.contracts = res["data"]
      console.log(this.contracts)
    })
  }
  
  postJob(){
    this.postJobForm.value.company = this.user._id
    // console.log(this.postJobForm.value)
    this.jobservice.postJob(this.postJobForm.value).subscribe((res:any)=>{
      Swal.fire({
        title: 'Do you want to define the job test now?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'define Test',
        denyButtonText: `Later`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.route.navigateByUrl(`post-test/${res["data"]._id}`)
        } else if (result.isDenied) {
          this.route.navigateByUrl("/")
        }
      })
    })
  }
  

  onCheckboxChange(e: any) {
    const contract_types: FormArray = this.postJobForm.get('contract_types') as FormArray;
    if (e.target.checked) {
      contract_types.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      contract_types.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          contract_types.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onCheckboxChangeSkills(e: any) {
    const skills: FormArray = this.postJobForm.get('skills') as FormArray;
    if (e.target.checked) {
      skills.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      skills.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          skills.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
