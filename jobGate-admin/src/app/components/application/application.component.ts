import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { SpecialityService } from 'src/app/services/speciality.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
apps:any
p:number = 1
specialties:any

  constructor(private appservice: ApplicationService,  private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.getApps()
    this.getSpecialties()
  }

  getApps(){
    this.appservice.getApps().subscribe((res:any)=>{
      this.apps = res["data"]
      console.log(this.apps)
    })
  }

  getSpecialties(){
    this.specialityService.getSpecialties().subscribe((res:any)=>{
      this.specialties = res["data"]
      console.log(this.specialties)
    })
  }
  getBySpecialties(e:any){
    this.appservice.getApps().subscribe((res:any)=>{
      this.apps = res["data"].filter((element:any)=> element.offer.speciality._id == e)
    })
  }

}
