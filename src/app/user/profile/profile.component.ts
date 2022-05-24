import {UserDetails} from "./../../UserDetails";
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails?:UserDetails;

  constructor(private service : UserService, private router : Router) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      (res:any)=>{
        this.service.isAuthenticated=true;
        this.userDetails = res ;
      },
      (err:any)=>{
        localStorage.removeItem('token');
        this.service.isAuthenticated=false;
        console.log(err)
        this.router.navigate(['/user/login']);
      }
    )
  }
  check(){
    return this.service.isAuthenticated? true:false;
  }
  edit(){
  }
}
