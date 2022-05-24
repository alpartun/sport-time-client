import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
userDetails:any;


  constructor(private router : Router, private service: UserService) { }

  ngOnInit() {

     this.service.getUserProfile().subscribe(
      (res:any)=>{

        this.service.isAuthenticated=true;
        this.userDetails = res ;

      },
      (err:any)=>{
        this.service.isAuthenticated=false;
        localStorage.removeItem('token');
        console.log(err)
      }
    )
/*     this.service.getUserProfile().subscribe(
    res=>{
      this.userDetails = res ;

    },
    err=>{
    console.log(err);
    }) */
    }

  onLogout(){
    localStorage.removeItem('token');
    this.service.isAuthenticated = false;
    this.router.navigate(['/user/login']);

  }

}
