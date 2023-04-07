import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
company:any
id= this.activatedRoute.snapshot.params["id"]
  constructor(private activatedRoute: ActivatedRoute, private companyService:CompaniesService) { }

  ngOnInit(): void {
    this.getCompany()
  }

  getCompany(){
    this.companyService.getCompany(this.id).subscribe((res:any)=>{
      this.company = res["data"]
      console.log(this.company)
    })
  }

}
