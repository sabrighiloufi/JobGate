import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CompanyAuthGuard implements CanActivate {
  user = JSON.parse(localStorage.getItem("user")!)
  constructor(private route: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     

    if(this.user && this.user.itemtype == "companies"){
      return true;
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please sign in to company account',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl("/")
      
      return false;
    }
  }
  
}
