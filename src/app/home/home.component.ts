import { Observable } from 'rxjs';
import { EventService } from './../shared/event.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userDetails: any;


  constructor(
    private router: Router,
    private service: UserService,
    public EventService: EventService
  ) {}


  ngOnInit() {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.service.isAuthenticated = true;
        this.userDetails = res;


        //this.dataSource2.data = this.EventService.temp;

      },
      (err: any) => {
        this.service.isAuthenticated = false;
        localStorage.removeItem('token');
        this.router.navigate(['/user/login']);
      }
    );
    /*     this.service.getUserProfile().subscribe(
    res=>{
      this.userDetails = res ;

    },
    err=>{
    console.log(err);
    }) */
  }


}
