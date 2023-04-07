import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/services/locations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
locationForm:FormGroup
  constructor(private locationservice: LocationsService, private formbuilder:FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.locationForm = this.formbuilder.group({
      country:['', Validators.required],
      city:['', Validators.required],
      address:['', Validators.required],
    })
  }
  addLocation(){
    this.locationservice.addLocation(this.locationForm.value).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Location has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl("/dashboard/locations")
    })
  }

}
