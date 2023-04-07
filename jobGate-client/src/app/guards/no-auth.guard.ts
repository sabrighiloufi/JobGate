import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private route: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(localStorage.getItem("state")=="0"){
        this.route.navigateByUrl("/")
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please sign out to continue',
          showConfirmButton: false,
          timer: 1500
        })
        return false;
      }else{
        return true;
      }
  }
  
}
