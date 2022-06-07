import { EventService } from 'src/app/shared/event.service';
import { UserDetails } from './../../UserDetails';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails?: UserDetails;


  constructor(
    private service: UserService,
    private router: Router,
    public EventService: EventService,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.service.isAuthenticated = true;
        this.userDetails = res;


      },
      (err: any) => {
        localStorage.removeItem('token');
        this.service.isAuthenticated = false;
        console.log(err);
        this.router.navigate(['/user/login']);
      }
    );
  }


  check() {
    return this.service.isAuthenticated ? true : false;
  }
  edit() {}
  deleteUser(userId: string, eventId: number) {
    if(window.confirm('Are you sure want to delete your account?')){
    var body = {
      userId: userId,
      eventId: eventId,
    };
    this.service.deleteUser(body);
    localStorage.removeItem('token');
    this.service.isAuthenticated = false;
    this.router.navigate(['/user/login']);
  }
  }
}
