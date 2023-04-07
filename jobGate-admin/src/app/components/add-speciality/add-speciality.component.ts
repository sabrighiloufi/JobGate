import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-speciality',
  templateUrl: './add-speciality.component.html',
  styleUrls: ['./add-speciality.component.css']
})
export class AddSpecialityComponent implements OnInit {
  categories:any
  specialityForm:any
    constructor(private categoryservice: CategoriesService, private specialityservice:SpecialityService,private formbuilder:FormBuilder, private route:Router) { }
    
    ngOnInit(): void {
      this.getCategories()
      this.specialityForm = this.formbuilder.group({
        name:['', Validators.required],
        description:['', Validators.required],
        category:['', Validators.required]
      })
    }
  
    getCategories(){
      this.categoryservice.getCategories().subscribe((res:any)=>{
        this.categories = res["data"]
        console.log(this.categories)
      })
    }

    addSpeciality(){
      this.specialityservice.addSpeciality(this.specialityForm.value).subscribe((res:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'speciality has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigateByUrl("/dashboard/specialties")
      })
    }
}
