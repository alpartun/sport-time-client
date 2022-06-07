import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { UserService } from 'src/app/shared/user.service';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.scss'],
})
export class EventdetailsComponent implements OnInit {
  id?: any;
  userDetails?: any;
  event!: Event[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: EventService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userService.isAuthenticated = true;
        this.userDetails = res;
        console.log(this.id);
        var body = {
          userId: this.userDetails.id,
          eventId: parseInt(this.id),
        };
        this.userService.showEventUsers(body);
      },
      (err: any) => {
        localStorage.removeItem('token');
        this.userService.isAuthenticated = false;
        console.log(err);
        this.router.navigate(['/user/login']);
      }
    );
    this.id = this.route.snapshot.params['id'];
    this.getOne();

    //this.event = this.service.getOne(this.id);
  }
  getOne() {
    return this.service.getOne(this.id);
  }
  check() {
    return this.userService.isAuthenticated ? true : false;
  }
  deleteEvent(userId:string, eventId:number){
    var body = {
      userId: userId,
      eventId: eventId
    }
    this.service.deleteEvent(body);
    }
}
