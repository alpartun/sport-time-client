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
  displayedColumns2: string[] = [
    'name',
    'city',
    'sportType',
    'startDate',
    'size',
    'count',
    'info',
  ];
  dataSourceCreatedEvents = new MatTableDataSource<Event>();
  events2!: Observable<Event>;

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
        var body = {
          userId: this.userDetails?.id,
          eventId: 2,
        };
        this.EventService.createdEventsObservable(body).subscribe((e: any) => {
          this.dataSourceCreatedEvents.data = e;
        });
      },
      (err: any) => {
        localStorage.removeItem('token');
        this.service.isAuthenticated = false;
        console.log(err);
        this.router.navigate(['/user/login']);
      }
    );
  }
  ngAfterViewInit() {

    this.dataSourceCreatedEvents.sort = this.sort;
    this.dataSourceCreatedEvents.paginator = this.paginator;
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
    this.dataSourceCreatedEvents.filter = value.trim().toLocaleLowerCase();
  };



  check() {
    return this.service.isAuthenticated ? true : false;
  }
  edit() {}
  deleteUser(userId: string, eventId: number) {
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
