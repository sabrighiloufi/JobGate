import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {
  specialties:any
  specialityForm:any
  p: number = 1
  categories:any
  
    constructor(private categoryservice: CategoriesService, private specialityservice:SpecialityService, private formbuilder:FormBuilder) { }
    
    ngOnInit(): void {
      this.getspecialties()
      this.getCategories()
      this.specialityForm = this.formbuilder.group({
        name:['', Validators.required],
        description:['', Validators.required],
        _id:['', Validators.required]
        
      })
    }
  
    getspecialties(){
      this.specialityservice.getSpecialties().subscribe((res:any)=>{
        this.specialties = res["data"]
        console.log(this.specialties)
      })
    }

    getCategories(){
      this.categoryservice.getCategories().subscribe((res:any)=>{
        this.categories = res["data"]
        console.log(this.categories)
      })
    }
    getByCategories(e:any){
      this.specialityservice.getSpecialties().subscribe((res:any)=>{
        this.specialties = res["data"].filter((element:any)=> element.category._id == e)
      })
    }

    deleteSpeciality(id:any){
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
          this.specialityservice.deleteSpeciality(id).subscribe((res:any)=>{
            Swal.fire(
              'Deleted!',
              'speciality has been deleted.',
              'success'
            )
            this.getspecialties()
          })
          
        }
      })
    }
    setSpecialityToUpdate(speciality:any){
      this.specialityForm.patchValue({
        name: speciality.name, 
        description: speciality.description,
        _id:speciality._id
      }); 
      
    }

    updateSpeciality(){
      this.specialityservice.updateSpeciality(this.specialityForm.value._id, this.specialityForm.value).subscribe((res:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your changes has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.getspecialties()
      })
    }
}
