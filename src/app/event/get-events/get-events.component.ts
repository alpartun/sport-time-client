import { Observable, timestamp } from 'rxjs';
import { UserDetails } from './../../UserDetails';
import { UserService } from 'src/app/shared/user.service';
import { EventService } from './../../shared/event.service';
import { Component, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Event } from 'src/app/Event';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-get-events',
  templateUrl: './get-events.component.html',
  styleUrls: ['./get-events.component.scss'],
})
export class GetEventsComponent implements OnInit {
  userDetails!: UserDetails;
  /*   displayedColumns: string[] = ['id', 'name', 'description', 'city','location','sporttype','size','startDate','endDate','estimateTime','amount','createdBy','count','join','info'];
   */
  displayedColumns: string[] = [
    'name',
    'city',
    'location',
    'sportType',
    'size',
    'startDate',
    'endDate',
    'estimateTime',
    'amount',
    'count',
    'join',
    'info',
  ];
  elements: any = [];
  dataSource?: any;
  events?: Event[];
  flagAny?: any;
  eventIdList!: string[];

  events2?: Event[];
  dataSource2 = new MatTableDataSource<Event>();

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public service: EventService,
    public userService: UserService
  ) {}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userService.isAuthenticated = true;
        this.userDetails = res;
        this.eventIdList = this.buttonStatus(this.userDetails.id);
      },
      (err: any) => {
        localStorage.removeItem('token');
        this.userService.isAuthenticated = false;
        console.log(err);
        this.router.navigate(['/user/login']);
      }
    );
    this.service.eventsList().subscribe((e) => {
      this.events2 = e;
      this.dataSource2.data = this.events2;
    });
    this.service.refreshList();
    //this.events = this.service.refreshList();
    //this.dataSource = new MatTableDataSource(this.service.refreshList());

    //this.service.buttonStatus(this.userDetails.id);
    //this.buttonStatus();
  }
  ngAfterViewInit() {
    this.dataSource2.sort = this.sort;
    this.dataSource2.paginator = this.paginator;
  }
  check() {
    return this.userService.isAuthenticated ? true : false;
  }
  joinEvent(userId: string, eventId: number) {
    // User join butonuna bastiginda buton statusu cagir ve userin join oldugu event listesini getir, sonrasinda ngIf kullanarak bu userin kayit oldugu eventlere bak
    var body = {
      userId: userId,
      eventId: eventId,
    };
    this.service.joinEventS(body);
    this.ngOnInit();

  }
  disjoinEvent(userId: string, eventId: number) {
    var body = {
      userId: userId,
      eventId: eventId,
    };
    this.service.disJointEvent(body);
    this.ngOnInit();
    this.router.navigateByUrl('/get-events');
    this.ngOnInit();
  }
  /*    async buttonStatus(userId: string, eventId: number){
    if(this.userDetails.id === undefined) {return}

    var body = {
      userId: userId,
      eventId: eventId
    };
  this.service.buttonStatus(body)
  await new Promise(resolve => setTimeout(resolve, 15));

  console.log(this.service.flagAny);
  this.flagAny = this.service.flagAny;
  console.log(this.flagAny);

    if(this.service.flagAny=="False"){
      return true;
    }
    else if(this.service.flagAny=="True"){
      return false;
    }
    return false;
  } */
  buttonStatus(userId: any) {
    var body = {
      userId: userId,
      eventId: 1,
    };
    return this.service.buttonStatus(body);
    //await new Promise(resolve => setTimeout(resolve, 15));
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
