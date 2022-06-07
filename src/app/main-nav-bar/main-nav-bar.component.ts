import { ToastrService } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { HomeComponent } from './../home/home.component';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.scss'],
})
export class MainNavBarComponent implements OnInit {
  userDetails: any;
  LoginStatus$ = new BehaviorSubject<boolean>(false);
  Username$?: Observable<string>;
  constructor(
    public service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}
  isExpanded = false;
  collapse() {
    this.isExpanded = false;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  onLogout() {
    localStorage.removeItem('token');
    this.service.isAuthenticated = false;
    this.router.navigate(['/user/login']);
    this.toastr.success('', 'Logout succesfull.');
  }
  onProfile() {}
  getEvents() {}
  createEvent() {}
  userNav() {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        console.log(res);
        this.userDetails = res;
      },
      (err: any) => {
        this.userDetails = null;
        console.log(err);
      }
    );
  }

  goHomePage() {}
}
