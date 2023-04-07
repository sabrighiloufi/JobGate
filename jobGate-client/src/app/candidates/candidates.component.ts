import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
candidates:any
p: number = 1;

  constructor(private candidateService:CandidateService) { }

  ngOnInit(): void {
    this.getCandidates()
  }

  getCandidates(){
    this.candidateService.getCandidates().subscribe((res:any)=>{
      this.candidates = res["data"].filter((elemnt:any)=>(elemnt.verified == true))
      console.log(this.candidates)
    })
  }
}
