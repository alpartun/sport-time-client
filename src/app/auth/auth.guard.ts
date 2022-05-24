import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router,private toastr : ToastrService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('token') != null){
        return true;
      }
      else
      this.toastr.error("Your process denied !!! Please Login...");
      this.router.navigate(['/user/login']);
      return false;
  }

}
