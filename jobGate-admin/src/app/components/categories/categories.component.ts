import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
categories:any
p: number =1
categoryForm:any
  constructor(private categoryservice: CategoriesService, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCategories()
    this.categoryForm = this.formbuilder.group({
      name:['', Validators.required],
      description:['', Validators.required],
      _id:['', Validators.required]

    })
  }

  getCategories(){
    this.categoryservice.getCategories().subscribe((res:any)=>{
      this.categories = res["data"]
      console.log(this.categories)
    })
  }

  deleteCategory(id:any){
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
        this.categoryservice.deleteCategory(id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'category has been deleted.',
            'success'
          )
          this.getCategories()
        })
        
      }
    })
  }

  setCategoryUpdated(category:any){
    this.categoryForm.patchValue({
      name: category.name, 
      description: category.description,
      _id:category._id
    }); 
  }

  updateCategory(){
    this.categoryservice.updateCategory(this.categoryForm.value._id, this.categoryForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your changes has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.getCategories()
    })
  }

}
