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
  displayedColumns: string[] = [
    'name',
    'city',
    'sportType',
    'startDate',
    'size',
    'count',
    'info',
  ];

  dataSource2 = new MatTableDataSource<Event>();
  events2!: Observable<Event>;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private service: UserService,
    public EventService: EventService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngOnInit() {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.service.isAuthenticated = true;
        this.userDetails = res;
        var body = {
          userId: this.userDetails?.id,
          eventId: 2,
        };
        this.EventService.profileEvents(body);
        this.EventService.profileEventsObservable(body).subscribe((e: any) => {
          this.events2 = e;
          this.dataSource2.data = e;
        });

        //this.dataSource2.data = this.EventService.temp;
      },
      (err: any) => {
        this.service.isAuthenticated = false;
        localStorage.removeItem('token');
        this.router.navigate(['/user/login']);
      }
    );
    console.log(this.dataSource2.data.values);
    /*     this.service.getUserProfile().subscribe(
    res=>{
      this.userDetails = res ;

    },
    err=>{
    console.log(err);
    }) */
  }
  ngAfterViewInit() {
    this.dataSource2.sort = this.sort;
    this.dataSource2.paginator = this.paginator;

  }

  onLogout() {
    localStorage.removeItem('token');
    this.service.isAuthenticated = false;
    this.router.navigate(['/user/login']);
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  public doFilter = (value: string) => {
    this.dataSource2.filter = value.trim().toLocaleLowerCase();
  };
}
