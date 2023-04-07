import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillsService } from 'src/app/services/skills.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.css']
})
export class AddSkillsComponent implements OnInit {
skills:any
skillForm:FormGroup
specialties:any

  constructor(private skillservice:SkillsService, private specialityservice: SpecialityService ,private formbuilder:FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.getSkills()
    this.getSpecialties()
    this.skillForm = this.formbuilder.group({
      skillname:['', Validators.required],
      speciality:['', Validators.required]
    })
  }
  getSkills(){
    this.skillservice.getSkills().subscribe((res:any)=>{
      this.skills = res["data"]
      console.log(this.skills)
    })
  }
  getSpecialties(){
    this.specialityservice.getSpecialties().subscribe((res:any)=>{
      this.specialties = res["data"]
      console.log(this.specialties)
    })
  }

  addskills(){
    this.skillservice.addSkills(this.skillForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'skills has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl("/dashboard/skills")
    })
  }
}
