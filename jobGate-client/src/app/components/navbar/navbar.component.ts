import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
user = JSON.parse(localStorage.getItem("user")!)
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem("state")=='0'){
      return true
    }else{
      return false
    }
  }
  isCompany(): Boolean{
    return this.isLoggedIn() && this.user.itemtype.includes("companies")
  }
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('state');
    localStorage.removeItem('accessToken');
    this.route.navigateByUrl("/login")
  }
}
