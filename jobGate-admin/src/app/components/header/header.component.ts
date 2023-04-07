import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  admin = JSON.parse(localStorage.getItem("user")!)
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/")
  }

}
