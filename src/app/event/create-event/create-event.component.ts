import { Router, RouterModule } from '@angular/router';
import { UserDetails } from './../../UserDetails';
import { UserService } from 'src/app/shared/user.service';
import { EventService } from './../../shared/event.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  userDetails?: UserDetails;
  //startDate= new Date();
  picker: any;

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

  constructor(
    public services: EventService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userService.isAuthenticated = true;
        this.userDetails = res;
      },
      (err: any) => {
        localStorage.removeItem('token');
        this.userService.isAuthenticated = false;
        console.log(err);
        this.router.navigate(['/user/login']);
      }
    );
  }
  onSubmit() {
    this.services.createEvent(this.userDetails).subscribe(
      (res: any) => {
        this.services.formModel.reset();
        this.toastr.success('', 'Event is created.');
      },
      (err) => {
        console.log(err);
        this.toastr.error('', 'Error has occured.');
      }
    );
  }
}
