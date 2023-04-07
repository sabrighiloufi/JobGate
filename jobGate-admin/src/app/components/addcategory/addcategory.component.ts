import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
categories:any
categoryForm:any
  constructor(private categoryservice: CategoriesService, private formbuilder:FormBuilder, private route:Router) { }
  
  ngOnInit(): void {
    this.getCategories()
    this.categoryForm = this.formbuilder.group({
      name:['', Validators.required],
      description:['', Validators.required],
    })
  }

  getCategories(){
    this.categoryservice.getCategories().subscribe((res:any)=>{
      this.categories = res["data"]
      console.log(this.categories)
    })
  }

  addCategory(){
    this.categoryservice.addCategory(this.categoryForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'category has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl("/dashboard/categories")
    })
  }

}
