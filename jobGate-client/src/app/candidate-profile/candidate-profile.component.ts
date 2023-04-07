import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {
candidate:any
id= this.activatedroute.snapshot.params["id"]
  constructor(private activatedroute:ActivatedRoute, private candidateservice:CandidateService) { }

  ngOnInit(): void {
    this.getCandidate()
  }

  getCandidate(){
    this.candidateservice.getCandidate(this.id).subscribe((res:any)=>{
      this.candidate = res["data"]
      console.log(this.candidate)
    })
    }
}
