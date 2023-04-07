import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateAuthGuard implements CanActivate {
  user = JSON.parse(localStorage.getItem("user")!)
  constructor(private route: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     

    if(this.user && this.user.itemtype == "candidates"){
      return true;
    }else{
      this.route.navigateByUrl("/")
      return false;
    }
  }
  
}
