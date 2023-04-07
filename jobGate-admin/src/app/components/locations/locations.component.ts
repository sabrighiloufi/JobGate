import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from 'src/app/services/locations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
locations:any
p: number = 1
locationPerPage = 5
search:any
locationForm:FormGroup
  constructor(private locationservice:LocationsService, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getLocations()
    this.locationForm = this.formbuilder.group({
      country:['', Validators.required],
      city:['', Validators.required],
      address:['', Validators.required],
      _id:['', Validators.required],
    })
  }

  getLocations(){
    this.locationservice.getLocations().subscribe((res:any)=>{
      this.locations = res["data"]
      console.log(this.locations)
    })
  }

  deleteLocation(id:any){
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
        this.locationservice.deleteLocation(id).subscribe((res:any)=>{
          Swal.fire(
            'Deleted!',
            'location has been deleted.',
            'success'
          )
          this.getLocations()
        })
        
      }
    })
    
  }

  setLocationValue(location:any){
    this.locationForm.patchValue({
      address: location.address, 
      city: location.city, 
      country: location.country, 
      _id:location._id
    }); 
 }

 update(){
  this.locationservice.updateLocations(this.locationForm.value._id, this.locationForm.value).subscribe((res:any)=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your changes has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.getLocations()
  })
}

}
