import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     

    if(localStorage.getItem("state")=="0"){
      return true;
    }else{
      this.route.navigateByUrl("/")
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Your are not authenticated',
        showConfirmButton: false,
        timer: 1500
      })
      return false;
    }
  }
  
}
