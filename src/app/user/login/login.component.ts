import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel : any ;
  hide = true;
  constructor(public service: UserService, private router : Router, private toeastr : ToastrService) { }
  LoginStatus$ = new BehaviorSubject<boolean>(false);
  ngOnInit(): void {
    this.formModel = new FormGroup({
      UserName : new FormControl(),
      Password: new FormControl()
    });
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/home');
    }
    }
    onSubmit(form : NgForm){
      this.service.login(form.value).subscribe(
        (res:any) => {
          localStorage.setItem('token',res.token);
          this.service.isAuthenticated = true;
          this.toeastr.success("Succesfully Logged-in");
          this.router.navigateByUrl('/home');
        },
        err => {
          if(err.status == 400){
            this.service.isAuthenticated = false;
            this.toeastr.error('Incorrect username or password.','Authetication failed.');
          }
          else
            this.toeastr.error('Server error has occured.')
          console.log(err);
        }
      );
    }
  }


