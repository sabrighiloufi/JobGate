import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillsService } from 'src/app/services/skills.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills:any
  p:number = 1
  specialties:any
  skillForm:FormGroup
  constructor(private skillservice:SkillsService, private specialityservice:SpecialityService, private formbuilder:FormBuilder) { }

 
  ngOnInit(): void {
    this.getSkills()
    this.getSpecialties()
    this.skillForm = this.formbuilder.group({
      skillname:['', Validators.required],
      _id:['', Validators.required]
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
  getBySpecialties(e:any){
    this.skillservice.getSkills().subscribe((res:any)=>{
      this.skills = res["data"].filter((element:any)=> element.speciality == e)
    })
  }
  deleteskill(id:any){
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
        this.skillservice.deleteSkills(id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'skill has been deleted.',
            'success'
          )
          this.getSkills()
        })
        
      }
    })
  }

  setUpdatedSkill(skill:any){
    this.skillForm.patchValue({
      skillname: skill.skillname, 
      _id:skill._id
    }); 
  }

  updateSkill(){
    this.skillservice.updateSkills(this.skillForm.value._id, this.skillForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your changes has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.getSkills()
    })
  }

}
